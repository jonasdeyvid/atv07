import React, {Component} from 'react';
import {Text, TextInput} from 'react-native';

import MyButton from './card/Button';
import Card from './card/Card';
import CardItem from './card/CardItem';
import firestore from '@react-native-firebase/firestore';

export default class EditUserScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {user: this.props.route.params.user};
  }
  editUser() {
    console.log(this.state.user);
    firestore()
      .collection('users')
      .doc(this.state.user.id)
      .update({
        name: this.state.user.name,
      })
      .then(() => {
        console.log('User updated!');
        this.props.navigation.goBack()
      });
  }
  render() {
    return (
      <Card>
        <CardItem>
          <Text>Edit User</Text>
        </CardItem>
        <CardItem>
          <TextInput
            onChangeText={name =>
              this.setState({user: {...this.state.user, name: name}})
            }
            value={this.state.user.name}
          />
        </CardItem>
        <CardItem>
          <MyButton title="Update" onPress={() => this.editUser()} />
          <MyButton
            title="Back"
            onPress={() => this.props.navigation.goBack()}
          />
        </CardItem>
      </Card>
    );
  }
}
