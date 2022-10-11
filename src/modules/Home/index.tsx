import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  Animated,
  Easing,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from 'react-query';
import Config from 'react-native-config';
import FlashMessage, {showMessage} from 'react-native-flash-message';
// styles
import {flexPage} from '../../common/styles/styles';
import {styles} from './styles';
// Context
import {AppThemeContext} from '../../provider/theme';
// Comp
import SearchBar from '../../components/SearchBar';
import Loader from '../../components/Loader';
// utils
import {request} from '../../utils/interceptor';

// Fetch data
const fetchMovies = async (title: string | null): Promise<any> => {
  if (title) {
    return request({url: `/?apikey=${Config.APIKEY}&s=${title}`});
  } else {
    return request({url: `/?apikey=${Config.APIKEY}`});
  }
};

export default () => {
  // Context values
  const {backgroundStyle, isDark} = useContext(AppThemeContext);

  /** Local */
  //Variables
  const spinValue = new Animated.Value(0);
  //Hooks
  const navigation = useNavigation();
  //State
  const [title, setTitle] = useState<string | null>(null);
  /** Local */

  /** Input actions */
  const typeTitle = (val: string): void => setTitle(val);
  const clearField = (): void => setTitle(null);
  const searchTitle = (): void => console.log('cc');
  /** Input actions */

  // Navigation action
  const navigate = (): void => navigation.navigate('Settings');

  // Query
  const {data, isError, error, isLoading}: any = useQuery(
    ['fetch-movies', title],
    () => fetchMovies(title),
  );

  console.log('===============data=====================');
  console.log(data?.data);
  console.log('===============data=====================');

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

  const FlashMessageComponent = (): void => {
    if (!isError) {
      return;
    }
    showMessage({
      message: 'Error message',
      type: 'danger',
      description: error?.message || '',
      textStyle: {fontWeight: 'bold'},
    });
  };
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
        <SearchBar
          value={title}
          onChange={typeTitle}
          onClear={clearField}
          onSubmit={searchTitle}
        />
        <ScrollView contentContainerStyle={styles.scroll}>
          <Loader />
        </ScrollView>
      </View>
      {isError && FlashMessageComponent()}
      <FlashMessage
        position="bottom"
        animationDuration={1000}
        autoHide={false}
        icon="danger"
      />
    </View>
  );
};
