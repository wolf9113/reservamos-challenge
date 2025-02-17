import React, { forwardRef, useState } from 'react';
import { TextInput, StyleSheet, TextInputProps, View, TouchableOpacity } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

export type ThemedInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  onClearText?: () => void;
  leadingIconName?: any;
};

export const ThemedInput = forwardRef<TextInput, ThemedInputProps>(
  (
    { style, lightColor, darkColor, onChangeText, onClearText, leadingIconName, value, ...rest },
    ref,
  ) => {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
    const inputBackground = useThemeColor(
      { light: lightColor, dark: darkColor },
      'inputBackground',
    );
    const borderColor = useThemeColor({ light: lightColor, dark: darkColor }, 'borderColor');

    const [inputValue, setInputValue] = useState(value || '');

    const handleClear = () => {
      setInputValue('');
      if (onChangeText) {
        onChangeText('');
        if (onClearText) {
          onClearText();
        }
      }
    };

    return (
      <BlurView intensity={0} style={styles.blurContainer}>
        <View
          style={[
            styles.inputContainer,
            { backgroundColor: inputBackground, borderColor: borderColor },
          ]}>
          {leadingIconName && (
            <View style={styles.iconContainer}>
              <Ionicons name={leadingIconName} size={20} color="gray" />
            </View>
          )}
          <TextInput
            ref={ref}
            style={[{ color }, styles.input, style]}
            value={inputValue}
            placeholderTextColor={color}
            onChangeText={(text) => {
              setInputValue(text);
              if (onChangeText) {
                onChangeText(text);
              }
            }}
            {...rest}
          />
          {inputValue.length > 0 && (
            <TouchableOpacity style={styles.iconContainer} onPress={handleClear}>
              <Ionicons name="close-circle" size={20} color="gray" />
            </TouchableOpacity>
          )}
        </View>
      </BlurView>
    );
  },
);

ThemedInput.displayName = 'ThemedInput';

const styles = StyleSheet.create({
  blurContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
  },
  iconContainer: {
    marginHorizontal: 5,
  },
});

export default ThemedInput;
