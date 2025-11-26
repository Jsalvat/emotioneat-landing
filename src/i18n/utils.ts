import en from './en.json';

export const defaultLang = 'en';

export const translations = {
  en,
} as const;

export function useTranslations() {
  return function t(key: string) {
    const keys = key.split('.');
    let value: any = translations.en;

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };
}
