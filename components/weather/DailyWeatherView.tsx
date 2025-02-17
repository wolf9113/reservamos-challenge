import { DailyWeather, Weather } from '@/models/Weather';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DateTime } from 'luxon';
import CardView from '../CardView';
import WeatherIcon from '@/components/weather/WeatherIcon';
import i18n from '@/utils/i18n/i18n';
import { Routes } from '@/constants/Routes';
import { useRouter } from 'expo-router';
import { useAppDispatch } from '@/store/store';
import { setCurrentDailyWeather } from '@/store/slices/currentDailyWeatherSlice';
import { formatTemperature } from '@/utils/formatTemperature';

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
  const dispatch = useAppDispatch();
  const router = useRouter();
  const date = DateTime.fromSeconds(dailyWeather.dt);
  const isToday = DateTime.now().hasSame(date, 'day');

  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        dispatch(setCurrentDailyWeather(dailyWeather));
        router.push(`/${Routes.WEATHER_DETAILS}`);
      }}>
      <View
        style={{
          flexDirection: 'row',
          flex: 0,
          alignItems: 'center',
          justifyContent: 'space-between',
          width: 200,
        }}>
        <Text style={styles.day}>
          {isToday
            ? i18n.t('today').toUpperCase()
            : date.toLocaleString({ weekday: 'long' }).toLocaleUpperCase()}
        </Text>
        <WeatherIcon iconCode={dailyWeather.weather[0].icon} />
      </View>
      <Text style={styles.temp}>
        {formatTemperature(dailyWeather.temp.min)} - {formatTemperature(dailyWeather.temp.max)}
      </Text>
    </TouchableOpacity>
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
    fontSize: 16,
    color: 'white',
    textTransform: 'capitalize',
  },
});

export default DailyWeatherView;
