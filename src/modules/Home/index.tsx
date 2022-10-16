import React, {useContext, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
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

  // Search comp
  const searchSection = () => {
    return (
      <SearchBar
        value={title}
        onChange={typeTitle}
        onClear={clearField}
        onSubmit={searchTitle}
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
      <FlatList
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
