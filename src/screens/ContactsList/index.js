import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  View,
  FlatList
} from 'react-native';

import Axios from 'axios';
import { Feather as Icon, MaterialCommunityIcons } from '@expo/vector-icons';

import styles from "./styles";

export const ContactsList = () => {
  const [users, setUsers] = useState(null);

  function UserCard({ item }) {
    return (
      <View
        style={styles.containerCard}
      >
        <View>
          <Image
            style={styles.containerImage}
            source={{ uri: item.picture.thumbnail }}
          />
        </View>
        <View style={styles.containerName}>
          <Text
            style={styles.textName}
          >{`${item.name.first} ${item.name.last}`}</Text>
        </View>
        <View style={styles.containerContact}>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(`Ligando ${item.phone}`);
            }}
          >
            <Icon name='phone' style={styles.iconPhone} size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(`Mensagem ${item.phone}`);
            }}
          >
            <Icon name='message-circle' style={styles.iconMessage} size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(`Email ${item.email}`);
            }}
          >
            <MaterialCommunityIcons name="email-outline" size={21} style={styles.iconMessage} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  useEffect(() => {
    Axios.get('https://randomuser.me/api/?results=50&nat=br&inc=gender,name,nat,email,phone,cell,picture').then(({ data }) => {

      let sortedUsers = data.results.sort((user1, user2) => (user1.name.first[0] > user2.name.first[0]) ?
        1 : (user1.name.first[0] < user2.name.first[0]) ? -1 : 0)

      setUsers(sortedUsers);
    });
  }, []);



  return (
    <>
      {!users ? (
        <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
          <ActivityIndicator size='large' />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.containerHeader}>
            <Text style={styles.headerTitle}>Contatos</Text>
          </View>
          <FlatList
            data={users || []}
            keyExtractor={(_, index) => index.toString()}
            ItemSeparatorComponent={<View style={styles.itemSeparator} />}
            renderItem={UserCard}
          />
        </View >
      )
      }
    </>
  );
}