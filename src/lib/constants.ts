/**
 * Centralized API constants.
 */
export const APP_NAME = 'TranscribeOP';
export const APP_TAGLINE = 'AI-Powered SOP Intelligence Platform';

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

export const API_PREFIX = '/api/v1';

export const ROUTES = {
  login: '/login',
  dashboard: '/dashboard',
  workspace: '/workspace',
  upload: '/upload',
  history: '/history',
  settings: '/settings',
  sop: (id: string) => `/sop/${id}`,
} as const;

export const STORAGE_KEYS = {
  accessToken: 'transcribeop.access_token',
  refreshToken: 'transcribeop.refresh_token',
  user: 'transcribeop.user',
} as const;

export const SOP_SECTIONS = [
  'Title',
  'Objective',
  'Scope',
  'Prerequisites',
  'Step-by-step Instructions',
  'Validation',
  'Troubleshooting',
  'Notes',
  'Risks',
  'Best Practices',
] as const;

export const ALLOWED_EXTENSIONS = ['pdf', 'docx', 'txt', 'md'] as const;
export const MAX_UPLOAD_MB = 50;
