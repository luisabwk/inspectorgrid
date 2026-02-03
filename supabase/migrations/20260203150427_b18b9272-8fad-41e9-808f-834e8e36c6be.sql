-- Create a function to verify case solutions server-side
-- This prevents cheating by keeping solutions on the server

CREATE OR REPLACE FUNCTION public.verify_case_solution(
  _case_id UUID,
  _placements JSONB
) RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _solution JSONB;
  _grid_size INT;
  _suspect_id TEXT;
  _position JSONB;
  _cell_key TEXT;
  _row INT;
  _col INT;
  _row_suspects TEXT[];
  _col_suspects TEXT[];
  _is_correct BOOLEAN := true;
BEGIN
  -- Get the solution and grid size from the cases table
  SELECT solution, grid_size INTO _solution, _grid_size 
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
    RETURN jsonb_build_object(
      'valid', true,
      'message', 'Parabéns! Você resolveu o caso!'
    );
  ELSE
    RETURN jsonb_build_object(
      'valid', false,
      'message', 'Algo está errado. Continue investigando!'
    );
  END IF;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.verify_case_solution(UUID, JSONB) TO authenticated;