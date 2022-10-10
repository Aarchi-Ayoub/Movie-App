import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClient, QueryClientProvider} from 'react-query';
import AppThemeProvider from './provider/theme';
import Router from './router';

export default props => {
  // Create a client
  const queryClient = new QueryClient();

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <AppThemeProvider>
          <Router />
        </AppThemeProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};
