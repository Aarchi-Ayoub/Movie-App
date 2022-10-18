import React, {useContext, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {useQuery} from 'react-query';
import Config from 'react-native-config';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

// styles
import {flexPage, width} from '../../common/styles/styles';
import {styles} from './styles';

// Context
import {AppThemeContext} from '../../provider/theme';

// Comp
import SearchBar from '../../components/SearchBar';
import Loader from '../../components/Loader';
import {Poster} from '../../components/Poster';

// utils
import {request} from '../../utils/interceptor';
import Settings from '../../components/Settings';

// Fetch data
const fetchMovies = async (
  title: string | null,
  page: number,
): Promise<any> => {
  if (title) {
    return request({url: `/?apikey=${Config.APIKEY}&s=${title}&page=${page}`});
  } else {
    return request({url: `/?apikey=${Config.APIKEY}`});
  }
};

export default () => {
  // Context values
  const {backgroundStyle, isDark} = useContext(AppThemeContext);

  /** Local */
  const scrollY = useSharedValue(0);

  //State
  const [title, setTitle] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);

  /** Local */

  /** Input actions */
  const typeTitle = (val: string): void => setTitle(val);
  const clearField = (): void => {
    setTitle(null);
    setPage(0);
  };
  const searchTitle = (): void => console.log('cc');
  /** Input actions */

  // Query
  const {data, isError, error, isLoading}: any = useQuery(
    ['fetch-movies', title, page],
    () => fetchMovies(title, page),
  );

  /** Animations */
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyles = useAnimatedStyle(() => {
    return {
      width: interpolate(
        scrollY.value,
        [10, 400],
        [350, 50],
        Extrapolation.CLAMP,
      ),
      marginBottom: interpolate(
        scrollY.value,
        [0, 30],
        [20, 10],
        Extrapolation.CLAMP,
      ),
      // marginTop: interpolate(
      //   scrollY.value,
      //   [0, 100, 200],
      //   [20, 10, 5],
      //   Extrapolation.CLAMP,
      // ),
      marginLeft: interpolate(
        scrollY.value,
        [0, 100, 1000],

        [45, -width / 4.5, -width * 2.5],
        Extrapolation.CLAMP,
      ),
      alignSelf: 'center',
    };
  });

  const textStyles = useAnimatedStyle(() => {
    return {
      fontSize: interpolate(
        scrollY.value,
        [0, 20],
        [4, 8],
        Extrapolation.CLAMP,
      ),
    };
  });
  /** Animations */

  // Search comp
  const searchSection = () => {
    return (
      <SearchBar
        value={title}
        onChange={typeTitle}
        onClear={clearField}
        onSubmit={searchTitle}
        animatedStyle={headerStyles}
        animatedText={textStyles}
      />
    );
  };

  //Error Message
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

  //Movie render
  const renderItemComp = ({item}: any) => {
    return <Poster movie={item} />;
  };

  //Empty render
  const renderEmptyComp = () => {
    if (title === null || data?.data.Error === 'Incorrect IMDb ID.') {
      return <View />;
    }
    return <Text style={styles.error}>{data?.data?.Error}</Text>;
  };

  return (
    <View style={[flexPage, backgroundStyle]}>
      <Text style={styles.title}>Home</Text>

      <Settings isDark={isDark} />

      {searchSection()}

      {isLoading && <Loader />}
      <Animated.FlatList
        extraData={data?.data}
        data={data?.data?.Search}
        style={styles.list}
        keyExtractor={({imdbID}) => imdbID}
        renderItem={renderItemComp}
        ItemSeparatorComponent={() => {
          return <View style={styles.separator} />;
        }}
        onEndReachedThreshold={0.5}
        onEndReached={() => setPage(page + 1)}
        ListEmptyComponent={renderEmptyComp}
        onScroll={scrollHandler}
        bounces={false}
      />

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
