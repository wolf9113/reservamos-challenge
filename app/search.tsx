import React, { useEffect, useRef, useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedInput } from '@/components/ThemedInput';
import { ThemedView } from '@/components/ThemedView';
import { Place } from '@/models/Place';
import { RootState, useAppDispatch, useAppSelector } from '@/store/store';
import { clearPlaces, getPlaceByQuery } from '@/store/slices/placeSlice';
import { setCurrentPlace } from '@/store/slices/currentPlaceSlice';
import { useRouter } from 'expo-router';
import i18n from '@/utils/i18n/i18n';
import { SpacingBox } from '@/components/SpacingBox';

export default function SearchScreen() {
  const dispatch = useAppDispatch();
  const placesState = useAppSelector((state: RootState) => state.places);
  const inputRef = useRef<TextInput>(null);

  const [query, setQuery] = useState('');

  const searchPlaces = useCallback(() => {
    if (query.trim() === '') return;
    if (query.length >= 3) {
      dispatch(getPlaceByQuery(query));
    }
  }, [query, dispatch]);

  useEffect(() => {
    requestAnimationFrame(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    });
  }, []);

  useEffect(() => {
    searchPlaces();
  }, [searchPlaces]);

  const itemSeparator = () => <View style={styles.separator} />;

  return (
    <ThemedView style={styles.container}>
      <ThemedInput
        ref={inputRef}
        placeholder={i18n.t('searchLocation')}
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={searchPlaces}
        onClearText={() => {
          dispatch(clearPlaces());
        }}
        leadingIconName={'search'}
      />
      <SpacingBox height={20} />
      <FlatList
        data={placesState.places}
        keyExtractor={(item: Place, index) => `${item.slug}_${index.toString()}`}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={itemSeparator}
        renderItem={({ item: place }) => <PlaceItem place={place} />}
      />
    </ThemedView>
  );
}

const PlaceItem = ({ place }: { place: Place }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const setPlace = () => {
    dispatch(setCurrentPlace(place));
    if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <TouchableOpacity style={styles.cityItem} onPress={setPlace}>
      <ThemedText style={styles.title}>{place.display}</ThemedText>
      <ThemedText>
        {place.cityName} {place.state}, {place.country}
      </ThemedText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  cityItem: {
    padding: 20,
    fontSize: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'gray',
  },
  separator: {
    height: 20,
  },
});
