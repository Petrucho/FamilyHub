import React from 'react';
import { View, Text } from 'react-native';

export default class Home extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };
  render() {
    return (
      <View>
        <Text style={{fontSize: 30, marginTop: 50, textAlign: 'center'}}>Main</Text>
      </View>
    );
  }
}