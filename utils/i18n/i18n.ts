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
    alerts: 'ALERTS',
    emptyAlerts: 'Empty alerts',
    to: 'TO',
    wind: 'WIND',
    windSpeed: 'Speed',
    windDeg: 'Degrees',
    windGust: 'Gust',
    weather: 'Weather',
    day: 'Day',
    night: 'Night',
    evening: 'Afternoon',
    morning: 'Early',
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
    alerts: 'ALERTAS',
    emptyAlerts: 'Sin alertas',
    to: 'HASTA',
    wind: 'VIENTO',
    windSpeed: 'Velocidad',
    windDeg: 'Dirección',
    windGust: 'Rafágas',
    weather: 'Clima',
    day: 'Día',
    night: 'Noche',
    evening: 'Tarde',
    morning: 'Madrugada',
  },
};

const i18n = new I18n(translations);

i18n.locale = Localization.getLocales()[0]?.languageTag || 'en';
i18n.enableFallback = true;

export default i18n;
