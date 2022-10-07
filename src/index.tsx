import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppThemeProvider from './provider/theme';
import Router from './router';

export default props => {
  return (
    <SafeAreaProvider>
      <AppThemeProvider>
        <Router />
      </AppThemeProvider>
    </SafeAreaProvider>
  );
};
