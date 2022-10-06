/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';

import Main from './src';
import AppThemeProvider from './src/provider/theme';

const App = () => {
  return (
    <AppThemeProvider>
      <Main />
    </AppThemeProvider>
  );
};

export default App;
