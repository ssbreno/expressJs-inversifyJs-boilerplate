export interface ErrorResult {
  status: number;
  message: string;
  place?: string;
  errors?: string[];
  stack?: string;
}
