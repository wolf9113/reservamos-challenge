import React from 'react';
import { ImageBackground, View, StyleSheet } from 'react-native';
import { CurrentWeather } from '@/models/Weather';

/**
 * Determines if it's currently night based on OpenWeatherMap timestamps
 * @param {CurrentWeather} current - The current weather data from OpenWeatherMap
 * @returns {boolean}
 */
const isNightTime = (current: CurrentWeather): boolean => {
  return current.dt < current.sunrise || current.dt > current.sunset;
};

/**
 * Selects the appropriate weather background image based on OpenWeatherMap conditions
 * @param {string} weatherCondition - The current weather condition
 * @param {boolean} isNight - Whether it's night or day
 * @returns {any} Image source
 */
const getLocalWeatherImage = (weatherCondition: string, isNight: boolean): any => {
  switch (weatherCondition.toLowerCase()) {
    case 'clear sky':
      return isNight
        ? require('@/assets/weather/clear-night.png')
        : require('@/assets/weather/clear.png');
    case 'few clouds':
    case 'scattered clouds':
      return require('@/assets/weather/few-cloudy.png');
    case 'broken clouds':
    case 'overcast clouds':
      return require('@/assets/weather/cloudy.png');
    case 'fog':
    case 'mist':
      return require('@/assets/weather/fog.png');
    case 'light rain':
    case 'moderate rain':
    case 'drizzle':
      return require('@/assets/weather/rain.png');
    case 'heavy rain':
    case 'very heavy rain':
    case 'extreme rain':
      return require('@/assets/weather/heavy-rain.png');
    case 'thunderstorm':
      return require('@/assets/weather/thunderstorm.png');
    case 'snow':
    case 'light snow':
    case 'heavy snow':
      return require('@/assets/weather/snow.png');
    default:
      return require('@/assets/weather/default.png');
  }
};

/**
 * WeatherBackground Component
 * Wraps content with a dynamic weather background
 * @param {object} props
 * @param {CurrentWeather} props.currentWeather - Current weather data
 * @param {React.ReactNode} props.children - Content to render inside the background
 * @returns {JSX.Element}
 */
export default function WeatherBackground({
  currentWeather,
  children,
}: {
  currentWeather?: CurrentWeather;
  children: React.ReactNode;
}): JSX.Element {
  let isNight = false;
  let weatherCondition = '';
  let backgroundImage;

  if (currentWeather) {
    isNight = isNightTime(currentWeather);
    weatherCondition = currentWeather.weather[0].description;
    backgroundImage = getLocalWeatherImage(weatherCondition, isNight);
  } else {
    backgroundImage = getLocalWeatherImage('', isNight);
  }

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
      imageStyle={styles.imageStyle}>
      <View style={styles.nightOverlay} />
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  imageStyle: {
    resizeMode: 'cover',
  },
  nightOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
});
