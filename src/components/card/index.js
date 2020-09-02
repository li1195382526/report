import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components';
import styles from './style.js';

import image from '../../assets/images/img_blue.png'

class Card extends Component {

  render() {
    
    return (
      <View style={styles.Card}>
      <View style={styles.container}>
        {true && (
          <View style={styles.downloadDetail}>
            <View style={styles.downloadDetailContainer}>
              <Text style={styles.info}>{this.state.info}</Text>
              <Text style={styles.count}>{this.state.count}</Text>
            </View>
          </View>
        )}
        <Image style={styles.image} src={image} />
      </View>
    </View>
    )
  }
}

export default Card
