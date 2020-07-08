import React, {Component} from 'react';
import {View, Text, Animated, Easing} from 'react-native';

export default class Notify extends Component {
  constructor(props) {
    super(props);
    this.animation = new Animated.Value(0);
    this.state = {
      show: false,
      message: '',
    };
  }

  componentDidMount() {
    this.showMessage('Illegal Move');
  }

  showMessage(message) {
    this.setState({
      message: message,
      show: true,
    });
    Animated.timing(this.animation, {
      toValue: 1,
      duration: 400,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        this.setState({
          message: '',
          show: false,
        });
      }, 500);
    });
  }

  render() {
    return (
      <>
        {this.state.show && (
          <View
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              zIndex: 99,
            }}>
            <Animated.View
              style={{
                alignSelf: 'center',
                paddingLeft: 12,
                paddingRight: 12,
                paddingTop: 8,
                paddingBottom: 8,
                backgroundColor: global.LightGreyColor,
                borderRadius: 16,
                justifyContent: 'center',
                alignItems: 'center',
                transform: [
                  {
                    translateY: this.animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [5, -5],
                    }),
                  },
                ],
              }}>
              <Text style={{...global.BodyTextFont, color: global.WhiteColor}}>
                {this.state.message}
              </Text>
            </Animated.View>
          </View>
        )}
      </>
    );
  }
}
