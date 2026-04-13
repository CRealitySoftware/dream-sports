import React, { createContext, useCallback, useContext, useState } from "react";
import i18n, { Locale } from "./index";

type I18nContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (scope: string, options?: Record<string, unknown>) => string;
};

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(i18n.locale as Locale);

  function setLocale(newLocale: Locale) {
    i18n.locale = newLocale;
    setLocaleState(newLocale);
  }

  // Passing locale explicitly ensures i18n-js uses the React state value,
  // not just the mutated global — and useCallback(locale) guarantees a new
  // function reference (and context re-render) on every locale change.
  const t = useCallback(
    (scope: string, options?: Record<string, unknown>) => {
      return i18n.t(scope, { locale, ...options });
    },
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useTranslation must be used inside I18nProvider");
  return ctx;
}
