-- Drop the direct INSERT policy on progress table
-- Progress will only be recorded through the verify_case_solution function
DROP POLICY IF EXISTS "Users can insert their own progress" ON public.progress;

-- Update verify_case_solution to handle progress recording atomically
CREATE OR REPLACE FUNCTION public.verify_case_solution(
  _case_id UUID,
  _placements JSONB,
  _time_taken INTEGER DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  _solution JSONB;
  _grid_size INT;
  _difficulty INT;
  _suspect_id TEXT;
  _position JSONB;
  _cell_key TEXT;
  _row INT;
  _col INT;
  _row_suspects TEXT[];
  _col_suspects TEXT[];
  _is_correct BOOLEAN := true;
  _score INT;
  _time_bonus INT;
  _user_id UUID;
  _already_completed BOOLEAN;
BEGIN
  -- Get the authenticated user
  _user_id := auth.uid();
  
  IF _user_id IS NULL THEN
    RETURN jsonb_build_object(
      'valid', false,
      'message', 'Usuário não autenticado'
    );
  END IF;

  -- Get the solution, grid size and difficulty from the cases table
  SELECT solution, grid_size, difficulty INTO _solution, _grid_size, _difficulty 
  FROM public.cases 
  WHERE id = _case_id;
  
  IF _solution IS NULL THEN
    RETURN jsonb_build_object(
      'valid', false,
      'message', 'Caso não encontrado'
    );
  END IF;
  
  -- Check Latin Square rules (one suspect per row/column)
  -- Check rows
  FOR _row IN 0..(_grid_size - 1) LOOP
    _row_suspects := ARRAY[]::TEXT[];
    FOR _col IN 0..(_grid_size - 1) LOOP
      _cell_key := _row || '-' || _col;
      _suspect_id := _placements->>_cell_key;
      IF _suspect_id IS NOT NULL AND _suspect_id != '' THEN
        IF _suspect_id = ANY(_row_suspects) THEN
          RETURN jsonb_build_object(
            'valid', false,
            'message', 'Linha ' || (_row + 1) || ' tem suspeitos duplicados!'
          );
        END IF;
        _row_suspects := array_append(_row_suspects, _suspect_id);
      END IF;
    END LOOP;
  END LOOP;
  
  -- Check columns
  FOR _col IN 0..(_grid_size - 1) LOOP
    _col_suspects := ARRAY[]::TEXT[];
    FOR _row IN 0..(_grid_size - 1) LOOP
      _cell_key := _row || '-' || _col;
      _suspect_id := _placements->>_cell_key;
      IF _suspect_id IS NOT NULL AND _suspect_id != '' THEN
        IF _suspect_id = ANY(_col_suspects) THEN
          RETURN jsonb_build_object(
            'valid', false,
            'message', 'Coluna ' || (_col + 1) || ' tem suspeitos duplicados!'
          );
        END IF;
        _col_suspects := array_append(_col_suspects, _suspect_id);
      END IF;
    END LOOP;
  END LOOP;
  
  -- Check against solution
  FOR _suspect_id, _position IN SELECT * FROM jsonb_each(_solution) LOOP
    _row := (_position->>'row')::INT;
    _col := (_position->>'col')::INT;
    _cell_key := _row || '-' || _col;
    
    IF _placements->>_cell_key IS DISTINCT FROM _suspect_id THEN
      _is_correct := false;
      EXIT;
    END IF;
  END LOOP;
  
  IF _is_correct THEN
    -- Check if user already completed this case
    SELECT EXISTS(
      SELECT 1 FROM public.progress 
      WHERE user_id = _user_id AND case_id = _case_id
    ) INTO _already_completed;
    
    -- Only record progress if not already completed and time is provided
    IF NOT _already_completed AND _time_taken IS NOT NULL THEN
      -- Validate time is reasonable (1 sec to 1 hour)
      IF _time_taken < 1 THEN
        _time_taken := 1;
      ELSIF _time_taken > 3600 THEN
        _time_taken := 3600;
      END IF;
      
      -- SERVER-SIDE score calculation
      -- Base score: 100 * difficulty
      -- Time bonus: max 100 extra points, decreases after 60 seconds
      _time_bonus := GREATEST(0, 100 - GREATEST(0, _time_taken - 60) / 2);
      _score := (100 + _time_bonus) * _difficulty;
      
      -- Atomically insert progress
      INSERT INTO public.progress (user_id, case_id, score, time_taken)
      VALUES (_user_id, _case_id, _score, _time_taken);
      
      -- Update profile stats
      UPDATE public.profiles 
      SET total_score = total_score + _score
      WHERE user_id = _user_id;
      
      RETURN jsonb_build_object(
        'valid', true,
        'message', 'Parabéns! Você resolveu o caso!',
        'score', _score,
        'time_taken', _time_taken,
        'already_completed', false
      );
    ELSE
      RETURN jsonb_build_object(
        'valid', true,
        'message', CASE WHEN _already_completed THEN 'Caso já resolvido anteriormente!' ELSE 'Parabéns! Você resolveu o caso!' END,
        'already_completed', _already_completed
      );
    END IF;
  ELSE
    RETURN jsonb_build_object(
      'valid', false,
      'message', 'Algo está errado. Continue investigando!'
    );
  END IF;
END;
$$;