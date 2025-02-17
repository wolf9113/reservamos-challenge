import { View, StyleSheet, ScrollView } from 'react-native';
import { Place } from '@/models/Place';
import { Weather } from '@/models/Weather';
import PlaceWeatherSummaryView from '@/components/place/PlaceWeatherSummaryView';
import HourlyWeatherView from '@/components/weather/HourlyWeatherView';
import DailyWeatherView from '@/components/weather/DailyWeatherView';
import AlertWeatherView from '@/components/weather/AlertWeatherView';
import WindWeatherView from '@/components/weather/WindWeatherView';

export default function WeatherView({ weather, place }: { weather?: Weather; place?: Place }) {
  if (!weather) {
    return <View />;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <PlaceWeatherSummaryView place={place} weather={weather} />
      <AlertWeatherView weather={weather} />
      <HourlyWeatherView weather={weather} />
      <DailyWeatherView weather={weather} />
      <WindWeatherView
        windSpeed={weather.current?.wind_speed ?? 0}
        windGust={weather.current?.wind_gust ?? 0}
        windDeg={weather.current?.wind_deg ?? 0}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    width: '100%',
    padding: 0,
  },
  scrollContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 24,
    color: 'white',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    fontSize: 18,
  },
});
