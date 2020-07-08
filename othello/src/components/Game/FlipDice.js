import React, {Component} from 'react';
import {View, Animated, TouchableOpacity} from 'react-native';

export default class FlipDice extends Component {
  flip() {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(this.animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    }
  }

  render() {
    this.boardWidth = global.width - 2 * global.unit * 20;
    this.gridWidth = (this.boardWidth - 9 * 5) / 8.0;
    this.value = this.props.dice_index == 1 ? 180 : 0;
    this.animatedValue =
      this.props.dice_index == 1
        ? new Animated.Value(180)
        : new Animated.Value(0);
    this.animatedValue.addListener(({value}) => {
      this.value = value;
    });
    this.frontOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [1, 0],
    });
    this.backOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [0, 1],
    });
    return (
      this.props.dice_index != 0 && (
        <View>
          <Animated.View
            style={{
              width: this.gridWidth - 4,
              height: this.gridWidth - 4,
              borderRadius: (this.gridWidth - 4) / 2.0,
              borderColor: global.WhiteColor,
              borderWidth: 4,
              backfaceVisibility: 'hidden',
              position: 'absolute',
              opacity: this.frontOpacity,
              transform: [
                {
                  rotateY: this.animatedValue.interpolate({
                    inputRange: [0, 180],
                    outputRange: ['0deg', '180deg'],
                  }),
                },
              ],
            }}></Animated.View>
          <Animated.View
            style={{
              backgroundColor: global.WhiteColor,
              width: this.gridWidth - 4,
              height: this.gridWidth - 4,
              borderRadius: (this.gridWidth - 4) / 2.0,
              backfaceVisibility: 'hidden',
              opacity: this.backOpacity,
              transform: [
                {
                  rotateY: this.animatedValue.interpolate({
                    inputRange: [0, 180],
                    outputRange: ['180deg', '0deg'],
                  }),
                },
              ],
            }}></Animated.View>
        </View>
      )
    );
  }
}
