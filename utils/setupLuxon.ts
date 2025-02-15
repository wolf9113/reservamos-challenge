import { Settings } from 'luxon';
import * as Localization from 'expo-localization';

const deviceLocale = Localization.getLocales()[0]?.languageTag || 'en';
Settings.defaultLocale = deviceLocale;
