export function mergeData<T = any, D = any>(oldData: T, newData: D) {
  return Object.assign({}, oldData, newData);
}
