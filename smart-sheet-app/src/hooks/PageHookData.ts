export interface PageHookData<T> {
  pending: boolean;
  data: T | null;
}
