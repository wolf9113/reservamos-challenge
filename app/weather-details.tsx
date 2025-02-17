import { StyleSheet, View } from 'react-native';
import { RootState, useAppSelector } from '@/store/store';
import DetailsWeatherView from '@/components/weather/DetailsWeatherView';
import WeatherBackground from '@/components/weather/WeatherBackground';
import { useEffect } from 'react';
import { DateTime } from 'luxon';
import { useNavigation } from 'expo-router';
import { useHeaderHeight } from '@react-navigation/elements';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function WeatherDetailsScreen() {
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();
  const tintColor = useColorScheme() ?? 'light';

  const currentDailyWeatherState = useAppSelector((state: RootState) => state.currentDailyWeather);

  useEffect(() => {
    const date = DateTime.fromSeconds(currentDailyWeatherState.dailyWeather?.dt ?? 0);
    navigation.setOptions({
      title: date.toLocaleString({ weekday: 'long' }).toLocaleUpperCase(),
      headerBlurEffect: tintColor,
    });
  }, [currentDailyWeatherState, navigation, tintColor]);

  return (
    <WeatherBackground currentWeather={currentDailyWeatherState.dailyWeather}>
      <View style={[styles.container, { paddingTop: headerHeight }]}>
        <DetailsWeatherView dailyWeather={currentDailyWeatherState.dailyWeather} />
      </View>
    </WeatherBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
