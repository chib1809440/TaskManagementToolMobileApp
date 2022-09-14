import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import useCachedResources from './src/hooks/useCachedResources';

import Screens from './src/screens'

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <Screens />
        </PaperProvider>
      </SafeAreaProvider>
    )
  }

}