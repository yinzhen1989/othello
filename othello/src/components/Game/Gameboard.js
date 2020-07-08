import React, {Component} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import FlipDice from './FlipDice';

export default class Gameboard extends Component {
  constructor(props) {
    super(props);
    this.dices = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, -1, 0, 0, 0],
      [0, 0, 0, -1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    this.directions = [
      [0, -2],
      [-2, -2],
      [0, 2],
      [2, 2],
      [2, -2],
      [-2, 2],
      [2, 0],
      [-2, 0],
    ];
    this.legal_moves = [];
    this.dice_refs = Array(8)
      .fill(null)
      .map(() => Array(8));
    this.state = {
      side: 1,
    };
  }

  componentDidMount() {
    this.legal_moves = this.check_illeagal_moves(1);
  }

  place_dice(row_index, column_index) {
    if (
      !JSON.stringify(this.legal_moves).includes(
        JSON.stringify([column_index, row_index]),
      )
    ) {
      this.props.show_message(' Illeagal Move! ');
    } else {
      this.dices[column_index][row_index] = this.state.side;
      this.change_turn();
    }
  }

  change_turn() {
    let tmp_side = this.state.side;
    this.setState(
      {
        side: tmp_side * -1,
      },
      () => {
        this.legal_moves = this.check_illeagal_moves(this.state.side);
        console.log(this.legal_moves);
      },
    );
  }

  check_illeagal_moves(side) {
    let legal_moves = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        for (let direction of this.directions) {
          try {
            if (
              this.dices[i + direction[0]][j + direction[1]] == side &&
              this.dices[i + direction[0] / 2][j + direction[1] / 2] ==
                side * -1
            ) {
              legal_moves.push([i, j]);
            }
          } catch (error) {
            // console.log(error);
          }
        }
      }
    }
    return legal_moves;
  }

  render() {
    this.boardWidth = global.width - 2 * global.unit * 20;
    this.gridWidth = (this.boardWidth - 9 * 5) / 8.0;

    return (
      <View
        style={{
          width: this.boardWidth,
          height: this.boardWidth,
          borderColor: global.WhiteColor,
          borderWidth: 5,
          borderRadius: 5,
        }}>
        {new Array(7).fill(0).map((element, index) => {
          return (
            <View
              key={index}
              style={{
                position: 'absolute',
                width: 5,
                height: this.boardWidth,
                left: (index + 1) * this.gridWidth + index * 5,
                top: -5,
                backgroundColor: global.WhiteColor,
              }}></View>
          );
        })}
        {new Array(7).fill(0).map((element, index) => {
          return (
            <View
              key={index}
              style={{
                position: 'absolute',
                width: this.boardWidth,
                height: 5,
                top: (index + 1) * this.gridWidth + index * 5,
                left: -5,
                backgroundColor: global.WhiteColor,
              }}></View>
          );
        })}
        {this.dices.map((elements, row_index) => {
          return elements.map((dice, column_index) => {
            return (
              <TouchableOpacity
                key={column_index * 8 + row_index}
                style={{
                  position: 'absolute',
                  top: column_index * (this.gridWidth + 5),
                  left: row_index * (this.gridWidth + 5),
                  width: this.gridWidth,
                  height: this.gridWidth,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.place_dice(row_index, column_index, 1);
                }}>
                <FlipDice
                  index={column_index * 8 + row_index}
                  ref={(ref) => (this.dice_refs[column_index][row_index] = ref)}
                  dice_index={this.dices[column_index][row_index]}
                />
              </TouchableOpacity>
            );
          });
        })}
      </View>
    );
  }
}
