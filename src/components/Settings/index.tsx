import React from 'react';
import {View, Animated, TouchableOpacity, Easing} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {styles} from './styles';

type Props = {
  isDark: boolean;
};

export default ({isDark}: Props): JSX.Element => {
  //Variables
  const spinValue = new Animated.Value(0);

  //Hooks
  const navigation = useNavigation();

  // Navigation action
  const navigate = (): void => navigation.navigate('Settings');

  /** Settings */
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
  /** Settings */
  return (
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
  );
};
