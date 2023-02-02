import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  StatusBar,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  View,
  SectionList,
  FlatList
} from 'react-native';

import Axios from 'axios';
import { Feather as Icon } from '@expo/vector-icons';

export const ContactsList = () => {
  const [users, setUsers] = useState(null);

  function UserCard({ item }) {
    //  console.log("nkdfgbdkjgndflkjnglkn")
    return (
      <View
        style={{
          margin: 4,
          backgroundColor: '#fff',
          // marginRight: 20,
          paddingHorizontal: 10,
          paddingVertical: 4,
          borderRadius: 10,
          flexDirection: 'row',
          alignItems: 'center',
          height: 60,
        }}
      >
        <View>
          <Image
            style={{ width: 50, height: 50, borderRadius: 100 }}
            source={{ uri: item.picture.thumbnail }}
          />
        </View>
        <View style={{ flex: 1, paddingHorizontal: 10 }}>
          <Text
            style={{ fontSize: 16 }}
          >{`${item.name.first} ${item.name.last}`}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(`Ligando ${item.phone}`);
            }}
          >
            <Icon name='phone' style={{ marginLeft: 12 }} size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(`Mensagem ${item.phone}`);
            }}
          >
            <Icon name='message-circle' style={{ marginLeft: 14 }} size={20} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  useEffect(() => {
    Axios.get('https://randomuser.me/api/?results=50&nat=br&inc=gender,name,nat,email,phone,cell,picture').then(({ data }) => {

      const usersOrdened = []
      const alphabeticUsers = [
        { title: "A" },
        { title: "B" },
        { title: "C" },
        { title: "D" },
        { title: "E" },
        { title: "F" },
        { title: "G" },
        { title: "H" },
        { title: "I" },
        { title: "J" },
        { title: "K" },
        { title: "l" },
        { title: "M" },
        { title: "N" },
        { title: "O" },
        { title: "P" },
        { title: "Q" },
        { title: "R" },
        { title: "S" },
        { title: "T" },
        { title: "U" },
        { title: "V" },
        { title: "W" },
        { title: "X" },
        { title: "Y" },
        { title: "Z" },
      ];


       let sortedUsers = data.results.sort((user1, user2) => 
       (user1.name.first[0] > user2.name.first[0]) ? 
       1 : 
       (user1.name.first[0] < user2.name.first[0]) ? 
       -1 : 0 )
      console.log("-------objexamplo", sortedUsers)
      setUsers(sortedUsers);
    });
  }, []);



  return (
    <>
      {!users ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size='large' />
        </View>
      ) : (
        <View style={{ flex: 1, paddingVertical: 10 }} >
          <View style={{ marginTop: 20, padding: 20, alignItems: 'center', backgroundColor: '#025FA6' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>Contatos</Text>
          </View>
          <FlatList
            data={users || []}
            keyExtractor={(_, index) => index.toString()}
            renderItem={UserCard}
          // renderSectionHeader={({section: {title}}) => (
          //   <Text style={styles.header}>{title}</Text>
          // )}
          />
        </View >
      )
      }
    </>
  );
}