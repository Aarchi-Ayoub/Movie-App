import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import {styles} from './styles';

export default props => {
  const [title, setTitle] = useState<string | null>(null);

  const typeTitle = (val: string): void => setTitle(val);

  const clearField = (): void => setTitle(null);

  const searchTitle = (): void => console.log('cc');

  return (
    <View style={styles.content}>
      <TextInput
        style={styles.input}
        value={title || ''}
        maxLength={25}
        placeholder={'Movie title..'}
        onChangeText={typeTitle}
        autoCorrect={false}
        clearButtonMode={'while-editing'}
        returnKeyType="search"
        onSubmitEditing={searchTitle}
      />
      {Platform.OS === 'android' && title?.length && (
        <TouchableOpacity style={styles.clearAnd} onPress={clearField}>
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
