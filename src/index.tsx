import React from 'react';
import AppThemeProvider from './provider/theme';
import Router from './router';

export default props => {
  return (
    <AppThemeProvider>
      <Router />
    </AppThemeProvider>
  );
};
