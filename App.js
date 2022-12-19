import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider as PaperProvider } from 'react-native-paper';
import theme from './src/theme/Theme'
import Screens from './src/screens'
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

export default function App() {
  return (
    <SafeAreaProvider style={{ marginTop: 24 }}>
      <Provider store={store}>
        <PaperProvider theme={theme}>

          <Screens />

        </PaperProvider>
      </Provider>
    </SafeAreaProvider>
  )
}