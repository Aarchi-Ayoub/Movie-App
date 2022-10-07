import React, {useContext} from 'react';
import {View, Text, Switch} from 'react-native';
// styles
import {flexPage} from '../../common/styles/styles';
import {AppThemeContext} from '../../provider/theme';

export default props => {
  // Context values
  const {isDark, changeTheme, backgroundStyle, textColorStyle} =
    useContext(AppThemeContext);

  // Switch actions
  const toggleValue = (arg: boolean): void => {
    changeTheme(arg);
  };

  return (
    <View style={flexPage}>
      <View style={[backgroundStyle, flexPage]}>
        <Text style={textColorStyle}>Settings</Text>
        <Text style={textColorStyle}>Main page</Text>
        <Text style={textColorStyle}>
          Mode {isDark ? 'Sombre' : 'Claire'} :
        </Text>

        <Switch value={isDark} onValueChange={toggleValue} />
      </View>
    </View>
  );
};
