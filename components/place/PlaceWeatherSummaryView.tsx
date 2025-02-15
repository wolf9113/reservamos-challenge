import { Place } from '@/models/Place';
import { Weather } from '@/models/Weather';
import { StyleSheet, Text, View } from 'react-native';
import i18n from '@/utils/i18n/i18n';

const PlaceWeatherSummaryView = ({ place, weather }: { place?: Place; weather: Weather }) => {
  let max = 0;
  let min = 0;

  if (weather.daily && weather.daily.length > 0) {
    max = weather.daily[0].temp.max;
    min = weather.daily[0].temp.min;
  }

  const feelsLike = weather.current.feels_like;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{i18n.t('location')}</Text>
      <Text style={styles.city}>{place?.display ?? i18n.t('yourLocation')}</Text>
      {!place && <Text style={styles.coords}>{`${weather.lat} ${weather.lon}`}</Text>}
      <Text style={styles.temp}>{Math.round(weather.current.temp)}°C</Text>
      <Text style={styles.label}>{`${i18n.t('feelsLike')} ${Math.round(feelsLike)}°C`}</Text>
      <Text
        style={
          styles.description
        }>{`${i18n.t('max')}: ${Math.round(max)}°  ${i18n.t('min')}:${Math.round(min)}°`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  city: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  label: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  coords: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  temp: {
    fontSize: 80,
    color: 'white',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
});

export default PlaceWeatherSummaryView;
