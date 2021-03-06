import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { shuffle } from '../utils';
import Card from './Card';
import meme0 from '../../assets/0.jpg';
import meme1 from '../../assets/1.jpg';
import meme2 from '../../assets/2.jpg';
import meme3 from '../../assets/3.jpg';
import meme4 from '../../assets/4.jpg';
import meme5 from '../../assets/5.jpg';
import meme6 from '../../assets/6.jpg';
import meme7 from '../../assets/7.jpg';
import meme8 from '../../assets/8.jpg';
import meme9 from '../../assets/9.jpg';

const sources = [
  meme0,
  meme1,
  meme2,
  meme3,
  meme4,
  meme5,
  meme6,
  meme7,
  meme8,
  meme9,
];

function getNewState() {
  return {
    matches: sources.reduce((o, key) => ({
      ...o,
      [key]: false,
    }), {}),

    memes: shuffle([...sources, ...sources].map(source => ({
      shown: false,
      source,
    }))),

    pressedSource: null,
  };
}

const styles = StyleSheet.create({
  cardsContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },

  resetButton: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#00f',
    borderRadius: 4,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  resetButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  score: {
    alignSelf: 'center',
    color: '#aaa',
    fontSize: 32,
    fontWeight: 'bold',
  },
});

class Cards extends React.Component {
  state = getNewState();

  keyExtractor = (_, index) => String(index);

  get score() {
    return Object.values(this.state.matches)
      .reduce((sum, x) => sum + Number(x));
  }

  reset = () => {
    this.setState(getNewState());
  };

  renderCard = ({ index, item }) => {
    const onCardPress = () => {
      const { matches, memes, pressedSource } = this.state;

      if (pressedSource && item.shown || matches[item.source]) {
        return;
      }

      const newState = {};

      if (pressedSource) {
        if (item.source === pressedSource) {
          newState.matches = {
            ...matches,
            [pressedSource]: true,
          };
        }

        newState.pressedSource = null;

        newState.memes = memes.map((meme, i) => ({
          ...meme,
          shown: meme.shown || i === index,
        }));
      } else {
        newState.pressedSource = item.source;

        newState.memes = memes.map((meme, i) => ({
          ...meme,
          shown: i === index,
        }));
      }

      this.setState(newState);
    };


    return (
      <TouchableWithoutFeedback onPress={onCardPress}>
        <View>
          <Card
            shown={item.shown || this.state.matches[item.source]}
            source={item.source}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  get resetButton() {
    if (this.score < sources.length) {
      return null;
    }

    return (
      <TouchableWithoutFeedback onPress={this.reset}>
        <View style={styles.resetButton}>
          <Text style={styles.resetButtonText}>
            Reset
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    return (
      <View>
        <FlatList
          contentContainerStyle={styles.cardsContainer}
          data={this.state.memes}
          keyExtractor={this.keyExtractor}
          numColumns={4}
          renderItem={this.renderCard}
        />

        <Text style={styles.score}>
          {this.score}
        </Text>

        {this.resetButton}
      </View>
    );
  }
}

export default Cards;
