import React from 'react';
import {View, Text, Animated, Easing, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// styles
import {flexPage} from '../../common/styles/styles';
import {styles} from './styles';

export default props => {
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

  return (
    <View style={flexPage}>
      <Text style={styles.title}>Home</Text>
      <View style={styles.content}>
        <View style={styles.raccourci}>
          <TouchableOpacity
            style={styles.settingTouch}
            onPress={() => navigation.navigate('Settings')}>
            <Animated.Image
              style={[
                styles.settingImg,
                {
                  transform: [{rotate: spin}],
                },
              ]}
              resizeMode="contain"
              source={require('../../common/assets/settings.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
