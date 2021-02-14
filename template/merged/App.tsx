import React from 'react';
import { SafeAreaView, ViewStyle, ScrollView, StyleSheet } from 'react-native';
import { SomeComponent } from 'src/someFeature/SomeComponent';

declare const global: { HermesInternal: null | {} };

export const App = () => {
  return (
    <>
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
          <SomeComponent />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "white",
  } as ViewStyle,
});
