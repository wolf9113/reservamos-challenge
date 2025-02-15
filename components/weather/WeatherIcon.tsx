import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

/**
 * Displays the weather icon from OpenWeatherMap
 * @param {string} iconCode - OpenWeatherMap icon code (e.g., "01n", "02d")
 * @param {number} size - Icon size (default 50)
 * @returns {JSX.Element}
 */
export default function WeatherIcon({
  iconCode,
  size = 50,
}: {
  iconCode: string;
  size?: number;
}): JSX.Element {
  if (!iconCode) return <View />;

  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return <Image source={{ uri: iconUrl }} style={[styles.icon, { width: size, height: size }]} />;
}

const styles = StyleSheet.create({
  icon: {
    resizeMode: 'contain',
  },
});
