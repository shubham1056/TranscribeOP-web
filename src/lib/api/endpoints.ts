import { apiClient } from '@/lib/api/client';
import type {
  AuthResponse,
  Conversation,
  Document as Doc,
  LoginPayload,
  SOP,
  SOPListItem,
  User,
} from '@/types';

export const authApi = {
  login: (payload: LoginPayload) =>
    apiClient.post<AuthResponse>('/auth/login', payload).then((r) => r.data),
  me: () => apiClient.get<User>('/auth/me').then((r) => r.data),
};

export const documentsApi = {
  list: () => apiClient.get<Doc[]>('/documents').then((r) => r.data),
  get: (id: string) => apiClient.get<Doc>(`/documents/${id}`).then((r) => r.data),
  upload: (file: File, onProgress?: (pct: number) => void) => {
    const form = new FormData();
    form.append('file', file);
    return apiClient
      .post<Doc>('/documents', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (e) => {
          if (e.total) onProgress?.(Math.round((e.loaded / e.total) * 100));
        },
      })
      .then((r) => r.data);
  },
  remove: (id: string) => apiClient.delete(`/documents/${id}`).then((r) => r.data),
};

export const sopsApi = {
  list: () => apiClient.get<SOPListItem[]>('/sops').then((r) => r.data),
  get: (id: string) => apiClient.get<SOP>(`/sops/${id}`).then((r) => r.data),
  generate: (documentId: string, title?: string, instructions?: string) =>
    apiClient
      .post<SOP>('/sops/generate', { document_id: documentId, title, instructions })
      .then((r) => r.data),
  update: (id: string, payload: Partial<Pick<SOP, 'title' | 'markdown'>>) =>
    apiClient.patch<SOP>(`/sops/${id}`, payload).then((r) => r.data),
  remove: (id: string) => apiClient.delete(`/sops/${id}`).then((r) => r.data),
};

export const conversationsApi = {
  list: () => apiClient.get<Conversation[]>('/conversations').then((r) => r.data),
  create: (sopId?: string, title?: string) =>
    apiClient
      .post<Conversation>('/conversations', { sop_id: sopId, title })
      .then((r) => r.data),
  get: (id: string) => apiClient.get<Conversation>(`/conversations/${id}`).then((r) => r.data),
};
