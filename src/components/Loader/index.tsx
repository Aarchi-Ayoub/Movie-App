import React, {ReactChild, useEffect, useRef} from 'react';
import {Animated, View} from 'react-native';
import {styles} from './styles';

export default () => {
  //Balls ref
  const Animations: object = {
    one: useRef(new Animated.Value(0)).current,
    two: useRef(new Animated.Value(0)).current,
    three: useRef(new Animated.Value(0)).current,
    four: useRef(new Animated.Value(0)).current,
    five: useRef(new Animated.Value(0)).current,
  };
  //Balls names
  let keyNames = Object.keys(Animations);

  const onAnimate = (animation: any, nextAnimation: any): void => {
    Animated.sequence([
      Animated.timing(animation, {
        toValue: -30,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue: 30,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(nextAnimation);
  };

  const onStartAnimate = () => {
    onAnimate(Animations.one, secondAnimation);

    function secondAnimation(): void {
      onAnimate(Animations.two, thirdAnimation);
    }
    function thirdAnimation(): void {
      onAnimate(Animations.three, fourthAnimation);
    }
    function fourthAnimation(): void {
      onAnimate(Animations.four, fifthAnimation);
    }
    function fifthAnimation(): void {
      onAnimate(Animations.five, () => {});
    }
  };

  useEffect(() => {
    onStartAnimate();
  }, []);

  // Balls render
  const ballRender = (): JSX => {
    return keyNames.map((val, pos) => {
      return (
        <Animated.View
          key={pos}
          style={[styles.ball, {transform: [{translateY: Animations[val]}]}]}
        />
      );
    });
    // for (let name in Animations) {
    //   return (
    //     <Animated.View
    //       style={[styles.ball, {transform: [{translateY: Animations[name]}]}]}
    //     />
    //   );
    // }
  };
  return (
    <View style={styles.container}>
      {ballRender()}
      {/* <Animated.View
        style={[styles.ball, {transform: [{translateY: Animations.one}]}]}
      />
      <Animated.View
        style={[styles.ball, {transform: [{translateY: Animations.two}]}]}
      />
      <Animated.View
        style={[styles.ball, {transform: [{translateY: Animations.three}]}]}
      />
      <Animated.View
        style={[styles.ball, {transform: [{translateY: Animations.four}]}]}
      />
      <Animated.View
        style={[styles.ball, {transform: [{translateY: Animations.five}]}]}
      /> */}
    </View>
  );
};
