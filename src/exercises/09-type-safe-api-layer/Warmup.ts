import type { Permission } from "../06-context-and-reducer/Warmup";

export type ApiError = {
  kind: "validation" | "network" | "server";
  message: string;
};

export type EndpointDefinition<
  TParams extends Record<string, string> = Record<string, never>,
  TQuery extends Record<string, string> = Record<string, never>,
  TBody = undefined,
  TResponse = unknown,
  TError extends ApiError = ApiError,
> = {
  path: string;
  method: "GET" | "POST" | "PATCH" | "DELETE";
  _types?: {
    params: TParams;
    query: TQuery;
    body: TBody;
    response: TResponse;
    error: TError;
  };
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "support" | "finance";
};

export type Paginated<T> = {
  items: T[];
  nextCursor: string | null;
};

export type UserListEndpoint = EndpointDefinition<
  Record<string, never>,
  { cursor?: string; limit?: string },
  undefined,
  Paginated<User>
>;

export function createApiClient(baseUrl: string) {
  return {
    get: async <TResponse>(path: string): Promise<TResponse> => {
      const response = await fetch(`${baseUrl}${path}`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return (await response.json()) as TResponse;
    },
    post: async <TBody, TResponse>(path: string, body: TBody): Promise<TResponse> => {
      const response = await fetch(`${baseUrl}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return (await response.json()) as TResponse;
    },
  };
}

void (null as Permission | null);
