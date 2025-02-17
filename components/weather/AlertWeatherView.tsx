import { StyleSheet, Text, View } from 'react-native';
import { DateTime } from 'luxon';
import CardView from '../CardView';
import i18n from '@/utils/i18n/i18n';
import { Weather, WeatherAlert } from '@/models/Weather';

const AlertWeatherView = ({ weather }: { weather: Weather }) => {
  const emptyAlerts = (weather?.alerts?.length ?? 0) <= 0;

  return (
    <CardView title={i18n.t('alerts')}>
      <View style={styles.container}>
        {emptyAlerts ? (
          <View style={styles.emptyAlertsContainer}>
            <Text style={styles.event}>{i18n.t('emptyAlerts')}</Text>
          </View>
        ) : (
          <View>
            {weather.alerts?.map((alert: any, index: number) => {
              return <AlertItem key={index} weatherAlert={alert} />;
            })}
          </View>
        )}
      </View>
    </CardView>
  );
};

const AlertItem = ({ weatherAlert }: { weatherAlert: WeatherAlert }) => {
  const start = DateTime.fromSeconds(weatherAlert.start);
  const end = DateTime.fromSeconds(weatherAlert.end);

  return (
    <View style={styles.itemContainer}>
      <Text style={styles.event}>{weatherAlert.event}</Text>
      <Text style={styles.label}>{weatherAlert.sender_name}</Text>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.event}>
          {start.toLocaleString({ hour: '2-digit', minute: '2-digit' })}
        </Text>
        <Text style={styles.label}>{i18n.t('to')}</Text>
        <Text style={styles.event}>
          {end.toLocaleString({ hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    flex: 0,
  },
  emptyAlertsContainer: {
    width: '100%',
    height: 50,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0,
  },
  itemContainer: {
    flexDirection: 'column',
    flex: 0,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: 'white',
  },
  label: {
    fontSize: 12,
    color: 'white',
  },
  separator: {
    height: 15,
  },
  event: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
  },
});

export default AlertWeatherView;
