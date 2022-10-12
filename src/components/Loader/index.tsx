import React, {useState, useEffect, useRef} from 'react';
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

  //State
  const [repeat, setRepeat] = useState<boolean>(false);

  //Animations
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
      onAnimate(Animations.five, () => setRepeat(!repeat));
    }
  };

  useEffect(() => {
    onStartAnimate();
  }, [repeat]);

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
  };
  return <View style={styles.container}>{ballRender()}</View>;
};
