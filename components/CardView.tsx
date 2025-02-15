import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { BlurView } from 'expo-blur';

/**
 * Renders a card view
 * @param title
 * @param {React.ReactNode} children - Content inside the blurred view
 * @returns {JSX.Element}
 */
export default function CardView({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <BlurView
      intensity={60}
      style={styles.blurContainer}
      experimentalBlurMethod={'dimezisBlurView'}>
      <Text style={styles.label}>{title ?? ''}</Text>
      <View style={styles.content}>{children}</View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  blurContainer: {
    width: '100%',
    padding: 20,
    borderRadius: 20,
    overflow: 'hidden',
    marginVertical: 10,
  },
  content: {
    flexDirection: 'column',
    flex: 0,
  },
  label: {
    fontSize: 16,
    color: '#e3e3e3',
    marginBottom: 10,
  },
});
