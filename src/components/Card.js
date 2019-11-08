import React from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';

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
    width: cardWidth,
  },
});

class Card extends React.Component {
  opacity = new Animated.Value(0);

  componentDidUpdate(prevProps) {
    if (prevProps.shown !== this.props.shown) {
      Animated.timing(this.opacity, {
        duration: 100,
        toValue: Number(this.props.shown),
        useNativeDriver: true,
      }).start();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.Image
          source={this.props.source}
          style={[
            styles.image,
            { opacity: this.opacity },
          ]}
        />
      </View>
    );
  }
}

export default Card;
