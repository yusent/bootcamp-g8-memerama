import React from 'react';
import { Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  image: {
    height: 70,
    width: 70,
  },
});

class Card extends React.Component {
  render() {
    return <Image source={this.props.source} style={styles.image} />;
  }
}

export default Card;
