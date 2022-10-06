import React, {createContext, useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {flexPage} from '../../common/styles/styles';

export const AppThemeContext = createContext<any>(null);

const AppThemeProvider: React.FC = ({children}) => {
  const [theme, setTheme] = useState<string>('');
  const [isDark, setIsDark] = useState<boolean>(useColorScheme() === 'dark');

  useEffect(() => {
    isDark ? setTheme('dark') : setTheme('light');
  }, [isDark]);

  const changeTheme = (): void => {
    setIsDark(!isDark);
  };

  const backgroundStyle = {
    ...flexPage,
    backgroundColor: isDark ? Colors.darker : Colors.lighter,
  };

  const textColorStyle = {
    color: !isDark ? Colors.darker : Colors.lighter,
  };
  return (
    <AppThemeContext.Provider
      value={{theme, isDark, changeTheme, backgroundStyle, textColorStyle}}>
      <SafeAreaView style={backgroundStyle}>
        {isDark && (
          <StatusBar
            backgroundColor={'#5E8D48'}
            translucent
            barStyle={'light-content'}
          />
        )}
        {children}
      </SafeAreaView>
    </AppThemeContext.Provider>
  );
};

export default AppThemeProvider;
