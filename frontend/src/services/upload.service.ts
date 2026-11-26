import apiClient from "./apiClient";
export function uploadFile<T>(path: string, file: File) {
  const data = new FormData();
  data.append("file", file);
  return apiClient.post<T>(path, data, { headers: { "Content-Type": undefined } });
}
