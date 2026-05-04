const API_BASE_URL = (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");

if (!API_BASE_URL && import.meta.env.PROD) {
  console.warn("VITE_API_URL is not set; API calls will be relative to the current origin.");
}

export type FetchAuthed = (
  path: string,
  init?: RequestInit
) => Promise<Response>;

export const buildAuthedFetch = (
  getToken: () => Promise<string | null>
): FetchAuthed => {
  return async (path, init = {}) => {
    const token = await getToken();
    const headers = new Headers(init.headers);
    if (token) headers.set("Authorization", `Bearer ${token}`);
    if (init.body && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    const url = `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
    return fetch(url, { ...init, headers });
  };
};

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

export const parseJson = async <T>(res: Response): Promise<T> => {
  if (!res.ok) {
    let message = `Request failed with status ${res.status}`;
    try {
      const body = (await res.json()) as { message?: string };
      if (body?.message) message = body.message;
    } catch {
      /* ignore */
    }
    throw new ApiError(res.status, message);
  }
  return (await res.json()) as T;
};
