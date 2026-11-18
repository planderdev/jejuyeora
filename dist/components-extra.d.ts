import type { Locale } from './components.js';
export const extraStrings: Record<Locale, Record<string, string>>;
export function renderExtra(id: string, options?: { lang?: Locale; variant?: string }): string;
export function mountExtraInteractions(root: Document | HTMLElement): void;
export function useSnackbar(message: string, options?: {
  actionLabel?: string;
  onAction?: () => void;
  duration?: number;
}): { dismiss(): void };
export function openDrawer(options?: { lang?: Locale; profile?: boolean }): { close(): void };
