import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';

const { width } = Dimensions.get('window');
const cardWidth = (width - 108) / 4;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    borderColor: '#000',
    borderWidth: 1,
    margin: 10,
  },

  image: {
    height: cardWidth,
    opacity: 0,
    width: cardWidth,
  },

  imageShown: {
    opacity: 1,
  },
});

class Card extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={this.props.source}
          style={[
            styles.image,
            this.props.shown && styles.imageShown,
          ]}
        />
      </View>
    );
  }
}

export default Card;
