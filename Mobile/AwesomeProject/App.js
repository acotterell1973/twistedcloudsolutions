import React, { Component } from 'react';
import { StyleSheet, Text, Button, Alert, TextInput, View, AppRegistry, Image } from 'react-native';

class Greeting extends Component {
  render() {
    return (
      <Text>Hello {this.props.name}!</Text>
    );
  }
}
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' }
  }

  _onButtonPress(){
    Alert.alert('You tapped this button');
  }
  
  render() {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    return (
      <View style={{ paddingTop: 30, paddingLeft: 20, paddingRight: 30, paddingBottom: 20 }}>
        <TextInput
          style={{ height: 20 }}
          placeholder="Type to translate"
          onChangeText={(text) => { this.setState({ text }) }}
        />

        <Text style={{ padding: 10, fontSize: 42, backgroundColor: 'red', color: 'white' }}>
          {this.state.text.split(' ').map((word) => word && '🍕').join(' ')}
        </Text>

        <Button onPress={() => {
          Alert.alert('You tapped this button!');
        }} title='Press Me' />
      </View>


    );
  }
}

const styles = StyleSheet.create({
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
