import { I18n } from "i18n-js";
import * as Localization from "expo-localization";
import es from "./locales/es";
import it from "./locales/it";

const i18n = new I18n({ es, it });

// Detecta el idioma del dispositivo, cae a español si no es italiano
const deviceLocale = Localization.getLocales()?.[0]?.languageCode ?? "es";
i18n.locale = deviceLocale === "it" ? "it" : "es";
i18n.enableFallback = true;
i18n.defaultLocale = "es";

export type Locale = "es" | "it";
export default i18n;
