import React from 'react';
import {View, TextInput, Platform, TouchableOpacity, Image} from 'react-native';
import {styles} from './styles';

type Props = {
  value: string | null;
  onChange: any;
  onClear: any;
  onSubmit: any;
};
export default ({value, onChange, onClear, onSubmit}: Props) => {
  return (
    <View style={styles.content}>
      <TextInput
        style={styles.input}
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
    </View>
  );
};
