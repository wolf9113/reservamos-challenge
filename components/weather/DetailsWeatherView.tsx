import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { DailyWeather } from '@/models/Weather';
import CardView from '@/components/CardView';
import i18n from '@/utils/i18n/i18n';
import WindWeatherView from '@/components/weather/WindWeatherView';
import { formatTemperature } from '@/utils/formatTemperature';
import WeatherIcon from '@/components/weather/WeatherIcon';

export default function DetailsWeatherView({ dailyWeather }: { dailyWeather?: DailyWeather }) {
  if (!dailyWeather) {
    return <View />;
  }

  const max = dailyWeather.temp.max;
  const min = dailyWeather.temp.min;
  const day = dailyWeather.temp.day;
  const night = dailyWeather.temp.night;
  const evening = dailyWeather.temp.eve;
  const morning = dailyWeather.temp.morn;

  const feelsLikeDay = dailyWeather.feels_like.day;
  const feelsLikeNight = dailyWeather.feels_like.night;
  const feelsLikeEvening = dailyWeather.feels_like.eve;
  const feelsLikeMorning = dailyWeather.feels_like.morn;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <CardView title={i18n.t('weather').toUpperCase()}>
        <View style={{ alignSelf: 'center' }}>
          <WeatherIcon size={120} iconCode={dailyWeather.weather[0].icon} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 0,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingBottom: 20,
          }}>
          <Text style={styles.description}>{`${i18n.t('max')}: ${formatTemperature(max)}`}</Text>
          <Text style={styles.description}>{` ${i18n.t('min')}:${formatTemperature(min)}`}</Text>
        </View>
        <LabelValueItem title={i18n.t('morning')} value={formatTemperature(morning)} />
        <LabelValueItem title={i18n.t('day')} value={formatTemperature(day)} />
        <LabelValueItem title={i18n.t('evening')} value={formatTemperature(evening)} />
        <LabelValueItem title={i18n.t('night')} value={formatTemperature(night)} />
      </CardView>
      <CardView title={i18n.t('feelsLike').toUpperCase()}>
        <LabelValueItem title={i18n.t('morning')} value={formatTemperature(feelsLikeMorning)} />
        <LabelValueItem title={i18n.t('day')} value={formatTemperature(feelsLikeDay)} />
        <LabelValueItem title={i18n.t('evening')} value={formatTemperature(feelsLikeEvening)} />
        <LabelValueItem title={i18n.t('night')} value={formatTemperature(feelsLikeNight)} />
      </CardView>
      <WindWeatherView
        windSpeed={dailyWeather.wind_speed}
        windGust={dailyWeather.wind_gust}
        windDeg={dailyWeather.wind_deg}
      />
    </ScrollView>
  );
}

const LabelValueItem = ({ title, value }: { title: string; value?: string }) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.label}>{title}</Text>
      <Text style={styles.value}>{value ?? '_'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  temp: {
    fontSize: 80,
    color: 'white',
    textAlign: 'center',
  },
  description: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
    alignSelf: 'center',
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
