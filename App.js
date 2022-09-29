import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider as PaperProvider } from 'react-native-paper';
import theme from './src/theme/Theme'
import Screens from './src/screens'

export default function App() {
  return (
    <SafeAreaProvider style={{ marginTop: 24 }}>
      <PaperProvider theme={theme}>
        <Screens />
      </PaperProvider>
    </SafeAreaProvider>
  )
}