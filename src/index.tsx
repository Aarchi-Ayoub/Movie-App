import React, {useContext} from 'react';
import {View, Text, Switch} from 'react-native';
import AppThemeProvider, {AppThemeContext} from './provider/theme';

export default props => {
  const {isDark, changeTheme, backgroundStyle, textColorStyle} =
    useContext(AppThemeContext);

  const toggleValue = (arg: boolean): void => {
    changeTheme(arg);
  };

  return (
    <AppThemeProvider>
      <View style={backgroundStyle}>
        <Text style={textColorStyle}>Main page</Text>
        <Text style={textColorStyle}>
          Mode {isDark ? 'Sombre' : 'Claire'} :
        </Text>

        <Switch value={isDark} onValueChange={toggleValue} />
      </View>
    </AppThemeProvider>
  );
};
