import { StyleSheet, Text, View } from 'react-native';
import CardView from '../CardView';
import i18n from '@/utils/i18n/i18n';

const WindWeatherView = ({
  windSpeed,
  windDeg,
  windGust,
}: {
  windSpeed: number;
  windDeg: number;
  windGust: number;
}) => {
  return (
    <CardView title={i18n.t('wind')}>
      <View style={styles.container}>
        <WindDataItem title={i18n.t('windSpeed')} value={formatWindSpeed(windSpeed)} />
        <WindDataItem title={i18n.t('windGust')} value={formatWindSpeed(windGust)} />
        <WindDataItem title={i18n.t('windDeg')} value={formatWindDirection(windDeg)} />
      </View>
    </CardView>
  );
};

const WindDataItem = ({ title, value }: { title: string; value?: string }) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.label}>{title}</Text>
      <Text style={styles.value}>{value ?? '_'}</Text>
    </View>
  );
};

const windDirectionsEN = [
  'N',
  'NNE',
  'NE',
  'ENE',
  'E',
  'ESE',
  'SE',
  'SSE',
  'S',
  'SSW',
  'SW',
  'WSW',
  'W',
  'WNW',
  'NW',
  'NNW',
  'N',
];

const windDirectionsES = [
  'N',
  'NNE',
  'NE',
  'ENE',
  'E',
  'ESE',
  'SE',
  'SSE',
  'S',
  'SSO',
  'SO',
  'OSO',
  'O',
  'ONO',
  'NO',
  'NNO',
  'N',
];

/**
 * Converts wind speed (m/s) to human-readable format (km/h)
 * @param {number} speed - Wind speed in meters per second (m/s)
 * @returns {string} Wind speed in km/h
 */
const formatWindSpeed = (speed?: number): string => {
  if (!speed) return '_';
  return `${Math.round(speed * 3.6)} km/h`;
};

/**
 * Formats wind direction based on locale
 * @param {number} deg - Wind direction in degrees
 * @returns {string} Human-readable wind direction (e.g., "93° E" or "93° Este")
 */
const formatWindDirection = (deg?: number): string => {
  if (deg === undefined) return '';

  const index = Math.round(deg / 22.5);
  const isSpanish = i18n.locale.startsWith('es');
  const windDirections = isSpanish ? windDirectionsES : windDirectionsEN;

  return `${deg}° ${windDirections[index]}`;
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    flex: 0,
  },
  itemContainer: {
    flexDirection: 'row',
    flex: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: 'white',
  },
  label: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  value: {
    fontSize: 18,
    color: 'white',
  },
});

export default WindWeatherView;
