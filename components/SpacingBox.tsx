import { View } from 'react-native';

export type SpacingBoxProps = {
  height?: number;
  width?: number;
};

export function SpacingBox({ width = 0, height = 0 }: SpacingBoxProps) {
  return <View style={{ width: width, height: height }} />;
}
