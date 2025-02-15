import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';

/**
 * Renders a blurred background container
 * @param {React.ReactNode} children - Content inside the blurred view
 * @returns {JSX.Element}
 */
export default function BlurViewBackground({ children }: { children: React.ReactNode }) {
  return (
    <BlurView
      intensity={100}
      style={styles.blurContainer}
      experimentalBlurMethod={'dimezisBlurView'}>
      <View style={styles.content}>{children}</View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  blurContainer: {
    padding: 20,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  content: {
    alignItems: 'center',
  },
});
