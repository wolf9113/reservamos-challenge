import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Routes } from '@/constants/Routes';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import '@/utils/setupLuxon';
import i18n from '@/utils/i18n/i18n';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync().then();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync().then();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Provider store={store}>
        <Stack>
          <Stack.Screen name={Routes.HOME} options={{ headerShown: false }} />
          <Stack.Screen
            name={Routes.SEARCH}
            options={{
              title: i18n.t('location').toUpperCase(),
              headerTintColor: 'gray',
              headerBackButtonDisplayMode: 'minimal',
            }}
          />
          <Stack.Screen
            name={Routes.WEATHER_DETAILS}
            options={{
              headerTintColor: 'white',
              headerBackButtonDisplayMode: 'minimal',
              headerTransparent: true,
              headerStyle: {
                backgroundColor: 'transparent',
              },
              headerBlurEffect: 'light',
            }}
          />
          <Stack.Screen name={Routes.NOT_FOUND} />
        </Stack>
        <StatusBar style="auto" />
      </Provider>
    </ThemeProvider>
  );
}
