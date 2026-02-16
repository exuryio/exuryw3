import { createI18n } from 'vue-i18n';
import es from './locales/es';
import ca from './locales/ca';
import eu from './locales/eu';
import gl from './locales/gl';
import en from './locales/en';
import fr from './locales/fr';
import de from './locales/de';

const LOCALE_STORAGE_KEY = 'exury_locale';

export type LocaleCode = 'es' | 'ca' | 'eu' | 'gl' | 'en' | 'fr' | 'de';

const messages = {
  es,
  ca,
  eu,
  gl,
  en,
  fr,
  de,
};

const VALID_LOCALES: LocaleCode[] = ['es', 'ca', 'eu', 'gl', 'en', 'fr', 'de'];

function getInitialLocale(): LocaleCode {
  if (typeof window === 'undefined') return 'es';
  const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  if (stored && VALID_LOCALES.includes(stored as LocaleCode)) {
    return stored as LocaleCode;
  }
  return 'es';
}

export const i18n = createI18n({
  legacy: false,
  locale: getInitialLocale(),
  fallbackLocale: 'es',
  messages,
});

export function setStoredLocale(code: LocaleCode): void {
  i18n.global.locale.value = code;
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, code);
  }
}

export function getStoredLocale(): LocaleCode {
  const current = i18n.global.locale.value as string;
  if (VALID_LOCALES.includes(current as LocaleCode)) return current as LocaleCode;
  return 'es';
}

export const LOCALE_OPTIONS: { value: LocaleCode; label: string }[] = [
  { value: 'es', label: 'Español' },
  { value: 'ca', label: 'Català' },
  { value: 'eu', label: 'Euskara' },
  { value: 'gl', label: 'Galego' },
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'Français' },
  { value: 'de', label: 'Deutsch' },
];
