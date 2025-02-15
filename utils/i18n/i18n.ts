import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';

const translations = {
  en: {
    searchLocation: 'Search location',
    location: 'location',
    errorPlaces: 'Error getting locations',
    errorWeather: 'Error getting weather',
    unknownError: 'Unknown error',
    max: 'Max',
    min: 'Min',
    feelsLike: 'Feels Like of',
    today: 'Today',
    daysForecast: '8-DAY FORECAST',
    hourlyForecast: 'HOURLY FORECAST',
    yourLocation: 'Your location',
  },
  es: {
    searchLocation: 'Buscar ubicación',
    location: 'Ubicación',
    errorPlaces: 'Error al obtener ubicaciones',
    errorWeather: 'Error al obtener clima',
    unknownError: 'Error desconocido',
    max: 'Máxima',
    min: 'Mínima',
    feelsLike: 'Sensación termica de',
    today: 'Hoy',
    daysForecast: 'PRONÓSTICO PARA 8 DÍAS',
    hourlyForecast: 'PRONÓSTICO POR HORA',
    yourLocation: 'Tu ubicación',
  },
};

const i18n = new I18n(translations);

i18n.locale = Localization.getLocales()[0]?.languageTag || 'en';
i18n.enableFallback = true;

export default i18n;
