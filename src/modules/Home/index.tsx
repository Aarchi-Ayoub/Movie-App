import React, {useContext} from 'react';
import {View, Text, Animated, Easing, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// styles
import {flexPage} from '../../common/styles/styles';
import {styles} from './styles';
import {AppThemeContext} from '../../provider/theme';

export default props => {
  // Context values
  const {backgroundStyle, isDark} = useContext(AppThemeContext);

  // Local variables
  const spinValue = new Animated.Value(0);
  const navigation = useNavigation();

  // First set up animation
  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  ).start();

  // Next, interpolate beginning and end values (in this case 0 and 1)
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // Navigation action
  const navigate = (): void => navigation.navigate('Settings');

  return (
    <View style={[flexPage, backgroundStyle]}>
      <Text style={styles.title}>Home</Text>
      <View style={styles.content}>
        <View style={styles.raccourci}>
          <TouchableOpacity style={styles.settingTouch} onPress={navigate}>
            <Animated.Image
              style={[
                styles.settingImg,
                {
                  transform: [{rotate: spin}],
                },
              ]}
              resizeMode="contain"
              source={
                isDark
                  ? require('common/assets/settingsWhite.png')
                  : require('common/assets/settings.png')
              }
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
