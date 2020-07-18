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
      [0, 1],
      [0, -1],
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1],
      [1, 0],
      [-1, 0],
    ];
    this.legal_moves = [];
    this.dice_refs = Array(8)
      .fill(null)
      .map(() => Array(8));
  }

  componentDidMount() {
    this.legal_moves = this.check_illeagal_moves(this.props.side);
  }

  place_dice(row_index, column_index) {
    if (!this.check_legal(row_index, column_index)) {
      this.props.show_message(' Illeagal Move! ');
    } else {
      this.dices[column_index][row_index] = this.props.side;
      this.change_turn(column_index, row_index);
    }
  }

  animated_dices(column_index, row_index, callback) {
    for (let legal_move of this.legal_moves) {
      if (
        legal_move['start'][0] == column_index &&
        legal_move['start'][1] == row_index
      ) {
        let x = column_index + legal_move['direction'][0];
        let y = row_index + legal_move['direction'][1];
        while (x + y != legal_move['end'][0] + legal_move['end'][1]) {
          console.log('In1');
          this.dice_refs[x][y].flip(() => {
            console.log('In2');
            callback();
          });
          this.dices[x][y] = this.props.side;
          x += legal_move['direction'][0];
          y += legal_move['direction'][1];
        }
      }
    }
  }

  change_turn(column_index, row_index) {
    this.setState(
      {
        animated: true,
      },
      () => {
        this.animated_dices(column_index, row_index, () => {
          console.log('In');
          this.props.change_side(this.dices);
          this.legal_moves = this.check_illeagal_moves(-1 * this.props.side);
        });
      },
    );
  }

  check_legal(row, column) {
    let tmp_list = [];
    for (let legal_move of this.legal_moves) {
      tmp_list.push(legal_move['start']);
    }
    return JSON.stringify(tmp_list).includes(JSON.stringify([column, row]));
  }

  check_illeagal_moves(side) {
    let legal_moves = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        let directions = this.check_potential_directions(i, j, side);
        let collect_positions = this.check_collect(i, j, directions, side);
        if (collect_positions.length > 0) {
          legal_moves = [...legal_moves, ...collect_positions];
        }
      }
    }
    return legal_moves;
  }

  check_potential_directions(i, j, side) {
    // check whether able to collect dices
    let directions = [];
    for (let direction of this.directions) {
      try {
        let dice_side = this.dices[i + direction[0]][j + direction[1]];
        if (dice_side == -1 * side && this.dices[i][j] == 0) {
          directions.push(direction);
        }
      } catch (error) {}
    }
    return directions;
  }

  check_collect(i, j, directions, side) {
    let collections = [];
    for (let direction of directions) {
      let x = i + direction[0];
      let y = j + direction[1];
      while (0 <= x && x <= 7 && 0 <= y && y <= 7) {
        if (this.dices[x][y] == side) {
          collections.push({start: [i, j], end: [x, y], direction: direction});
        }
        x += direction[0];
        y += direction[1];
      }
    }
    return collections;
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
