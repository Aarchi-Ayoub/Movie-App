import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {styles} from './styles';

export const Poster = ({movie}: any) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.title}>{movie?.Title}</Text>
      <FastImage
        style={styles.image}
        source={{
          uri:
            movie?.Poster !== 'N/A'
              ? movie?.Poster
              : 'https://www.publicdomainpictures.net/pictures/280000/nahled/not-found-image-15383864787lu.jpg',
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
      <View style={styles.row}>
        <Text style={styles.desc}>{movie?.Year}</Text>
        <Text style={styles.desc}>{movie?.Type}</Text>
      </View>
    </TouchableOpacity>
  );
};
