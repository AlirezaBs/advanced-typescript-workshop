import type { Permission } from "../06-context-and-reducer/Warmup";

export type ApiError = {
  kind: "validation" | "network" | "server";
  message: string;
};

/** TODO: Typed endpoint definition connecting params, query, body, response, error. */
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

/** TODO: Implement typed get/post helpers that do not fake runtime safety. */
export function createApiClient(_baseUrl: string) {
  return {
    get: async <T>(_path: string): Promise<T> => {
      throw new Error("Not implemented");
    },
    post: async <TBody, TResponse>(_path: string, _body: TBody): Promise<TResponse> => {
      throw new Error("Not implemented");
    },
  };
}

void (null as Permission | null);
