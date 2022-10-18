import React from 'react';
import {View, TextInput, Platform, TouchableOpacity, Image} from 'react-native';
import Animated from 'react-native-reanimated';
import {styles} from './styles';

type Props = {
  value: string | null;
  onChange: any;
  onClear: any;
  onSubmit: any;
  animatedStyle: any;
  animatedText: any;
};
export default ({
  value,
  onChange,
  onClear,
  onSubmit,
  animatedStyle,
  animatedText,
}: Props) => {
  console.log('====================================');
  console.log(animatedStyle);
  console.log('====================================');
  return (
    <Animated.View style={[styles.content, animatedStyle]}>
      <TextInput
        style={[styles.input, animatedText]}
        value={value || ''}
        maxLength={25}
        placeholder={'Movie title..'}
        onChangeText={onChange}
        autoCorrect={false}
        clearButtonMode={'while-editing'}
        returnKeyType="search"
        onSubmitEditing={onSubmit}
      />
      {Platform.OS === 'android' && value?.length && (
        <TouchableOpacity style={styles.clearAnd} onPress={onClear}>
          <Image
            resizeMode="contain"
            style={styles.clearImg}
            source={require('common/assets/cancel.png')}
          />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};
