export type Locale = 'ko' | 'en' | 'zh';
export type ButtonColor = 'primary' | 'dark' | 'light' | 'danger';
export interface ButtonOptions {
  color?: ButtonColor;
  variant?: 'fill' | 'weak' | 'outlined';
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  display?: 'inline' | 'block' | 'full';
  disabled?: boolean;
  loading?: boolean;
  action?: string;
  leadingIcon?: string;
}
export function Button(label: string, options?: ButtonOptions): string;
export function Badge(label: string, options?: { variant?: 'fill' | 'weak'; color?: 'success' | 'warning' | 'danger'; size?: 'large' }): string;
export function Switch(label: string, options?: { checked?: boolean; disabled?: boolean }): string;
export function Checkbox(label: string, options?: { checked?: boolean; disabled?: boolean; radio?: boolean; name?: string }): string;
export function TextField(label: string, options?: { placeholder?: string; error?: string; disabled?: boolean; value?: string }): string;
export function icon(name: string, size?: number): string;
export function escapeHTML(value: unknown): string;
/** Returns editable HTML for one catalog item. See catalog.json for ids. */
export function renderComponent(id: string, options?: { lang?: Locale; variant?: string }): string;
/** Delegates sample interactions. Safe to call repeatedly on the same root. */
export function mountInteractions(root?: Document | HTMLElement): void;
export function useToast(message: string, options?: { duration?: number }): { dismiss(): void };
export function useDialog(options?: { title?: string; description?: string; confirmLabel?: string; cancelLabel?: string; lang?: Locale; onConfirm?: () => void }): Promise<boolean>;
export function useBottomSheet(options?: { title?: string; description?: string; options?: string[]; lang?: Locale; onSelect?: (option: string) => void }): { close(): void };
export const strings: Record<Locale, Record<string, string>>;
