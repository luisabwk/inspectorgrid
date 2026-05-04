import { useAuth } from "@clerk/clerk-react";
import { useMemo } from "react";
import { buildAuthedFetch, type FetchAuthed } from "@/lib/api";

export const useApi = (): FetchAuthed => {
  const { getToken } = useAuth();
  return useMemo(() => buildAuthedFetch(() => getToken()), [getToken]);
};
