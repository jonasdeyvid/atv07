import React, {Component} from 'react';
import {View, Text, FlatList, Alert} from 'react-native';

import firestore from '@react-native-firebase/firestore';

import Card from './card/Card';
import CardItem from './card/CardItem';
import MyButton from './card/Button';

export default class ListUserScrenn extends Component {
  constructor(props) {
    super(props);
    this.state = {users: []};
  }

  componentDidMount() {
    this.listUsers();
  }

  componentDidUpdate() {
    this.listUsers();
  }

  listUsers() {
    firestore()
      .collection('users')
      .get()
      .then(querySnapshot => {
        //console.log('Total users: ', querySnapshot.size);
        let users = [];
        querySnapshot.forEach(documentSnapshot => {
          // console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
          users.push({id: documentSnapshot.id, ...documentSnapshot.data()});
        });
        this.setState({users});
      });
  }

  deleteUser(user) {
    firestore()
      .collection('users')
      .doc(user.id)
      .delete()
      .then(() => {
        console.log('User deleted!');
      });
  }

  showDeleteUserDialog(user) {
    Alert.alert(
      `Deletar usuário ${user.name}?`,
      'o usuário será apagado do sistema',
      [
        {
          text: 'Sim',
          onPress: () => this.deleteUser(user),
        },
        {
          text: 'Não',
          onPress: () => console.log('Yes, discard changes'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  }

  renderUsers() {
    return (
      <FlatList
        data={this.state.users}
        renderItem={({item}) => {
          return (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-start',
              }}>
              <View style={{flex: 1.5}}>
                <Text style={{fontSize: 18}}>{item.name}</Text>
              </View>
              <View style={{flex: 1}}>
                <MyButton
                  title="Edit"
                  onPress={() => {
                    this.props.navigation.navigate('EditUserScreen', {
                      user: item,
                    });
                    console.log(item);
                  }}
                />
              </View>
              <View style={{flex: 1}}>
                <MyButton
                  title="Delete"
                  onPress={() => this.showDeleteUserDialog(item)}
                />
              </View>
            </View>
          );
        }}
        keyExtractor={(item, index) => item + index}
      />
    );
  }

  render() {
    return (
      <Card>
        <CardItem>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>List Users</Text>
        </CardItem>
        <CardItem>{this.renderUsers()}</CardItem>
        <CardItem>
          <MyButton
            title="Add User"
            onPress={() => this.props.navigation.navigate('AddUserScreen')}
          />
        </CardItem>
      </Card>
    );
  }
}
