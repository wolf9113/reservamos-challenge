import { DailyWeather, Weather } from '@/models/Weather';
import { StyleSheet, Text, View } from 'react-native';
import { DateTime } from 'luxon';
import CardView from '../CardView';
import WeatherIcon from '@/components/weather/WeatherIcon';
import i18n from '@/utils/i18n/i18n';

const DailyWeatherView = ({ weather }: { weather: Weather }) => {
  return (
    <CardView title={i18n.t('daysForecast')}>
      <View style={styles.container}>
        {weather.daily?.map((day: any, index: number) => {
          return <DailyItem key={index} dailyWeather={day} />;
        })}
      </View>
    </CardView>
  );
};

const DailyItem = ({ dailyWeather }: { dailyWeather: DailyWeather }) => {
  const date = DateTime.fromSeconds(dailyWeather.dt);
  const isToday = DateTime.now().hasSame(date, 'day');

  return (
    <View style={styles.itemContainer}>
      <View
        style={{
          flexDirection: 'row',
          flex: 0,
          alignItems: 'center',
          justifyContent: 'space-between',
          width: 200,
        }}>
        <Text style={styles.day}>
          {isToday ? i18n.t('today') : date.toLocaleString({ weekday: 'long' })}
        </Text>
        <WeatherIcon iconCode={dailyWeather.weather[0].icon} />
      </View>
      <Text style={styles.temp}>
        {Math.round(dailyWeather.temp.min)}°C - {Math.round(dailyWeather.temp.max)}°C
      </Text>
    </View>
  );
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
  },
  temp: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  separator: {
    height: 15,
  },
  day: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
  },
});

export default DailyWeatherView;
