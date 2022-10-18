import React, {useEffect} from 'react';
import {AppState, AppStateStatus, LogBox, Platform} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {focusManager, QueryClient, QueryClientProvider} from 'react-query';
import AppThemeProvider from './provider/theme';
import Router from './router';

export default (): JSX.Element => {
  // Create a client
  const queryClient = new QueryClient();

  const onAppStateChange = (status: AppStateStatus): void => {
    if (Platform.OS !== 'web') {
      focusManager.setFocused(status === 'active');
    }
  };

  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange);
    LogBox.ignoreAllLogs();
    return () => subscription.remove();
  }, []);

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
