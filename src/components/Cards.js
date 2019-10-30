import React from 'react';
import { FlatList, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
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

const styles = StyleSheet.create({
  cardsContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
});

// Card states
const CARD_HIDDEN = 0;
const CARD_SHOWN = 1;
const CARD_MATCHED = 2;

class Cards extends React.Component {
  state = {
    memes: [...sources, ...sources].map(source => ({
      source,
      state: CARD_HIDDEN,
    })),
  };

  keyExtractor = (_, index) => String(index);

  renderCard = ({ index, item }) => {
    const onCardPress = () => {
      if (item.state !== CARD_HIDDEN) {
        return;
      }

      const { memes } = this.state;

      this.setState({
        memes: memes.map((meme, i) => {
          if (index === i) {
            return { ...meme, state: CARD_SHOWN };
          }

          return meme;
        }),
      });
    };

    return (
      <TouchableWithoutFeedback onPress={onCardPress}>
        <View>
          <Card
            shown={item.state !== CARD_HIDDEN}
            source={item.source}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    return (
      <FlatList
        contentContainerStyle={styles.cardsContainer}
        data={this.state.memes}
        keyExtractor={this.keyExtractor}
        numColumns={4}
        renderItem={this.renderCard}
      />
    );
  }
}

export default Cards;
