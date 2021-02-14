import React from 'react';
import { StyleSheet, Text, TextStyle, ViewStyle, View } from 'react-native';

export type SomeComponentProps = {};

export const SomeComponent: React.FC<SomeComponentProps> = ({}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Some Feature Title</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  } as ViewStyle,
  title: {
    fontSize: 46,
  } as TextStyle,
});
