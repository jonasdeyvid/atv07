import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'

import firestore from '@react-native-firebase/firestore'

import Card from './card/Card'
import CardItem from './card/CardItem'

export default class FirebaseApp extends Component {

  constructor(props) {
    super(props)
    this.state = { name: '', users: [] }
  }

  componentDidMount() {
    this.listUsers()
  }

  getUserV1 = async () => {
    const userDocument = await firestore().collection('users')
      .doc('lu4JwMroBSPDeNdUN0KY').get()
    //console.log(userDocument._data.name)
    this.setState({ name: userDocument._data.name })
  }

  getUserV2() {
    this.subscriber = firestore().collection('users')
      .doc('lu4JwMroBSPDeNdUN0KY').onSnapshot(
        (doc) => {
          this.setState({ name: doc.data().name })
        }
      )
  }

  listUsers() {
    firestore()
      .collection('users')
      .get()
      .then(querySnapshot => {
        //console.log('Total users: ', querySnapshot.size);
        let users = []
        querySnapshot.forEach(
          documentSnapshot => {
            //console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
            users.push(documentSnapshot.data())
          }
        );
        this.setState({ users })
      });
  }

  renderUsers() {
    return (
      <FlatList
        data={this.state.users}
        renderItem={
          ({ item }) => {
            return (
              <View>
                <Text style={{ fontSize: 18 }}>{item.name}</Text>
              </View>
            )
          }
        }
        keyExtractor={(item, index) => item + index}
      />
    )
  }

  render() {
    return (
      <Card>
        <CardItem>
          {this.renderUsers()}
        </CardItem>
      </Card>
    )
  }
}