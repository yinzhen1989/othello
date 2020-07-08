import React, {Component} from 'react';
import './Constants';
import {Image, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import GameEntrance from './components/GameEntrance/GameEntrance';
import Offline from './components/Offline/Offline';

const Stack = createStackNavigator();

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const forFade = ({current, closing}) => ({
  cardStyle: {
    opacity: current.progress,
    transform: [
      {
        scaleY: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        }),
      },
      {
        scaleX: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        }),
      },
    ],
  },
});

export default class App extends Component {
  componentDidMount() {
    StatusBar.setHidden(true);
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTitleStyle: {
              ...global.TitleFont,
            },
            headerTitleAlign: 'left',
            headerMode: 'screen',
            cardStyle: {backgroundColor: global.WhiteColor},
            transitionSpec: {
              open: config,
              close: config,
            },
          }}>
          <Stack.Screen
            name="GameEntrance"
            component={GameEntrance}
            options={{title: 'Othello'}}
          />
          <Stack.Screen
            name="Offline"
            component={Offline}
            options={({route}) => ({
              title: '',
              headerBackTitleVisible: false,
              headerStyle: {
                backgroundColor: global.BlackColor,
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
              },
              cardStyle: {backgroundColor: global.BlackColor},
              headerBackImage: () => (
                <Image
                  source={require('./assets/images/back.png')}
                  style={{width: 25, height: 25, marginLeft: 10}}
                />
              ),
              cardStyleInterpolator: forFade,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
