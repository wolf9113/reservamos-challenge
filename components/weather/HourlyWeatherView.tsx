import { HourlyWeather, Weather } from '@/models/Weather';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { DateTime } from 'luxon';
import CardView from '../CardView';
import WeatherIcon from '@/components/weather/WeatherIcon';
import i18n from '@/utils/i18n/i18n';
import { formatTemperature } from '@/utils/formatTemperature';

const HourlyWeatherView = ({ weather }: { weather: Weather }) => {
  const itemSeparator = () => {
    return <View style={styles.separator} />;
  };

  return (
    <CardView title={i18n.t('hourlyForecast')}>
      <View style={styles.container}>
        <FlatList
          horizontal={true}
          data={weather.hourly ?? []}
          keyExtractor={(item: HourlyWeather) => item.dt.toString()}
          ItemSeparatorComponent={itemSeparator}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item: hourlyWeather }) => HourlyItem(hourlyWeather)}
        />
      </View>
    </CardView>
  );
};

const HourlyItem = (hourlyWeather: HourlyWeather) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.label}>
        {DateTime.fromSeconds(hourlyWeather.dt).toLocaleString({
          hour: '2-digit',
          minute: '2-digit',
        })}
      </Text>
      <WeatherIcon iconCode={hourlyWeather.weather[0].icon} />
      <Text style={styles.temp}>{formatTemperature(hourlyWeather.temp)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 'auto',
    flexDirection: 'column',
    flex: 0,
  },
  itemContainer: {
    height: 120,
    width: 80,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0,
  },
  label: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  temp: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  separator: {
    width: 15,
  },
});

export default HourlyWeatherView;
