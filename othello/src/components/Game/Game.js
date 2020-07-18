import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import GameBoard from './Gameboard';
import Notify from '../../views/Notify';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.notify;
    this.self_dice_sum = 2;
    this.oppo_dice_sum = 2;
    this.state = {
      side: 1,
    };
  }

  render() {
    return (
      <View style={{flexDirection: 'column', width: '100%', height: '100%'}}>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 20 * global.unit,
            }}>
            {this.state.side == -1 && (
              <Image
                source={require('../../assets/images/bullet.png')}
                style={{
                  width: 21 * global.unit,
                  resizeMode: 'contain',
                  marginRight: 10 * global.unit,
                }}
              />
            )}
            <Text
              style={{
                color: global.WhiteColor,
                ...global.TitleFont,
              }}>
              CPU
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 20 * global.unit,
              marginBottom: 10 * global.unit,
            }}>
            <View
              style={{
                backgroundColor: global.WhiteColor,
                borderRadius: global.unit * 8,
                width: global.unit * 16,
                height: global.unit * 16,
              }}></View>
            <Text
              style={{
                color: global.WhiteColor,
                ...global.BodyTitleFont,
                marginLeft: 10 * global.unit,
              }}>
              {this.oppo_dice_sum}
            </Text>
          </View>
        </View>
        <View style={{flex: 5, alignItems: 'center'}}>
          <GameBoard
            show_message={(message) => {
              this.notify.showMessage(message);
            }}
            ref={(ref) => {
              this.gameboard = ref;
            }}
            side={this.state.side}
            change_side={(dices) => {
              this.self_dice_sum = 0;
              this.oppo_dice_sum = 0;
              for (let column of dices) {
                for (let element of column) {
                  if (element == 1) {
                    this.self_dice_sum += 1;
                  }
                  if (element == -1) {
                    this.oppo_dice_sum += 1;
                  }
                }
              }
              this.setState({
                side: this.state.side * -1,
              });
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 'auto',
              marginTop: 20 * global.unit,
              marginRight: 20 * global.unit,
            }}>
            {this.state.side == 1 && (
              <Image
                source={require('../../assets/images/bullet.png')}
                style={{width: 21 * global.unit, resizeMode: 'contain'}}
              />
            )}
            <Text
              style={{
                color: global.WhiteColor,
                ...global.TitleFont,
                marginLeft: 10 * global.unit,
              }}>
              You
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 'auto',
              marginRight: 20 * global.unit,
            }}>
            <View
              style={{
                backgroundColor: global.BlackColor,
                borderColor: global.WhiteColor,
                borderRadius: global.unit * 8,
                borderWidth: global.unit * 2,
                width: global.unit * 16,
                height: global.unit * 16,
              }}></View>
            <Text
              style={{
                color: global.WhiteColor,
                ...global.BodyTitleFont,
                marginLeft: 10 * global.unit,
              }}>
              {this.self_dice_sum}
            </Text>
          </View>
        </View>
        <Notify ref={(ref) => (this.notify = ref)} />
      </View>
    );
  }
}
