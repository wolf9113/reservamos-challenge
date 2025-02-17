import { useCallback, useEffect } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import { RootState, useAppDispatch, useAppSelector } from '@/store/store';
import { getWeatherByCoordinates } from '@/store/slices/weatherSlice';
import WeatherView from '@/components/weather/WeatherView';
import { ThemedText } from '@/components/ThemedText';
import { Routes } from '@/constants/Routes';
import BlurViewBackground from '@/components/BlurViewBackground';
import { SafeAreaView } from 'react-native-safe-area-context';
import WeatherBackground from '@/components/weather/WeatherBackground';
import { SpacingBox } from '@/components/SpacingBox';
import Loading from '@/components/Loading';
import i18n from '@/utils/i18n/i18n';

/**
 * Fetches the user's current location
 * @returns {Promise<{ latitude: number; longitude: number } | null>}
 */
const getLocation = async () => {
  try {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      return null;
    }

    let location = await Location.getCurrentPositionAsync({});
    return { latitude: location.coords.latitude, longitude: location.coords.longitude };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default function HomeScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const weatherState = useAppSelector((state: RootState) => state.weather);
  const currentPlaceState = useAppSelector((state: RootState) => state.currentPlace);

  const fetchWeather = useCallback(async () => {
    if (currentPlaceState.place) {
      dispatch(
        getWeatherByCoordinates({
          latitude: currentPlaceState.place.lat,
          longitude: currentPlaceState.place.long,
        }),
      );
    } else {
      const location = await getLocation();
      if (location) {
        dispatch(getWeatherByCoordinates(location));
      }
    }
  }, [currentPlaceState.place, dispatch]);

  useEffect(() => {
    fetchWeather().then(() => console.log('Get weather'));
  }, [currentPlaceState.place, dispatch, fetchWeather]);

  if (weatherState.loading)
    return (
      <WeatherBackground>
        <Loading />
      </WeatherBackground>
    );

  return (
    <WeatherBackground currentWeather={weatherState.weather?.current}>
      <SafeAreaView style={styles.safeArea}>
        {weatherState.error && <ErrorView errorMessage={weatherState.error} />}
        {!weatherState.error && (
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            refreshControl={
              <RefreshControl refreshing={weatherState.loading} onRefresh={fetchWeather} />
            }>
            <WeatherView place={currentPlaceState.place} weather={weatherState.weather} />
          </ScrollView>
        )}
      </SafeAreaView>
      <View style={styles.footerContainer}>
        <BlurViewBackground>
          <TouchableOpacity style={styles.button} onPress={() => router.push(`/${Routes.SEARCH}`)}>
            <Text style={styles.buttonText}>{i18n.t('searchLocation')}</Text>
          </TouchableOpacity>
          <SpacingBox height={20} />
        </BlurViewBackground>
      </View>
    </WeatherBackground>
  );
}

const ErrorView = ({ errorMessage }: { errorMessage?: string }) => {
  return (
    <View style={styles.errorContainer}>
      <ThemedText style={styles.error}>{errorMessage ?? i18n.t('unknownError')}</ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    width: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 120,
  },
  expandedContainer: {
    flex: 1,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 110,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 24,
    color: 'white',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  error: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'darkgray',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});
