import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

export default class GameEntrance extends Component {
  render() {
    return (
      <View style={{flexDirection: 'column', width: '100%', height: '100%'}}>
        <View
          style={{
            flex: 2,
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Offline');
            }}>
            <View
              style={{
                width: 320 * global.unit,
                height: 80 * global.unit,
                backgroundColor: global.BlackColor,
                borderRadius: 40 * global.unit,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../assets/images/star.png')}
                style={{
                  width: global.unit * 36,
                  resizeMode: 'contain',
                  marginRight: 20 * global.unit,
                }}
              />
              <Text
                style={{
                  color: global.WhiteColor,
                  ...global.TitleFont,
                }}>
                Single
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Offline');
            }}>
            <View
              style={{
                width: 320 * global.unit,
                height: 80 * global.unit,
                backgroundColor: global.BlackColor,
                borderRadius: 40 * global.unit,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../assets/images/online.png')}
                style={{
                  width: global.unit * 36,
                  resizeMode: 'contain',
                  marginRight: 20 * global.unit,
                }}
              />
              <Text
                style={{
                  color: global.WhiteColor,
                  ...global.TitleFont,
                }}>
                Online
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Offline');
            }}>
            <View
              style={{
                width: 320 * global.unit,
                height: 80 * global.unit,
                backgroundColor: global.BlackColor,
                borderRadius: 40 * global.unit,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../assets/images/setting.png')}
                style={{
                  width: global.unit * 36,
                  resizeMode: 'contain',
                  marginRight: 20 * global.unit,
                }}
              />
              <Text
                style={{
                  color: global.WhiteColor,
                  ...global.TitleFont,
                }}>
                Setting
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Image
            source={require('../../assets/images/thinker.png')}
            style={{
              width: global.unit * 200,
              resizeMode: 'contain',
              marginLeft: 'auto',
            }}
          />
        </View>
      </View>
    );
  }
}
