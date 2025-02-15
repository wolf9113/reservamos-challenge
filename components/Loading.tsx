import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

/**
 * Loading Component
 * Displays a centered activity indicator
 * @param {number} size - Size of the spinner (default "large")
 * @returns {JSX.Element}
 */
export default function Loading({
  size = 'large',
}: {
  size?: number | 'small' | 'large';
}): JSX.Element {
  const color = useThemeColor({}, 'loading');

  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
