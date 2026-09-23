/**
 * Common base entity contract for data models across feature domains.
 */
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Standard envelope for API responses.
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
}

/**
 * Core pagination parameters for collections and lists.
 */
export interface PaginationParams {
  page: number;
  limit: number;
}

/**
 * Paginated query result wrapper.
 */
export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

