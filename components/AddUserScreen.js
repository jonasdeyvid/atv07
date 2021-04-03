import React, {Component} from 'react';
import {Text, TextInput} from 'react-native';

import MyButton from './card/Button';
import Card from './card/Card';
import CardItem from './card/CardItem';
import firestore from '@react-native-firebase/firestore';

export default class AddUserScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {name: ''};
  }

  addUser = () => {
    firestore()
      .collection('users')
      .add({name: this.state.name})
      .then(() => {
        console.log('User added!');
        this.props.navigation.goBack();
      });
  };

  render() {
    return (
      <Card>
        <CardItem>
          <Text>Add User</Text>
        </CardItem>
        <CardItem>
          <TextInput
            onChangeText={text => this.setState({name: text})}
            placeholder="Enter name"
          />
        </CardItem>
        <CardItem>
          <MyButton title="Add User" onPress={this.addUser} />
          <MyButton
            title="Back"
            onPress={() => this.props.navigation.navigate('ListUserScreen', {})}
          />
        </CardItem>
      </Card>
    );
  }
}
