import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Avatar, Card, Searchbar} from 'react-native-paper';

export default function CustomizeDropDown({
  data,
  closeModal,
  productSelectHandler,
}) {
  const [searchQuery, setSearchQuery] = React.useState('');

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          display: item.product_name.includes(searchQuery) ? 'flex' : 'none',
        }}
        onPress={() => productSelectHandler(item)}>
        <Card style={styles.card}>
          <Card.Title title={item.product_name} />
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <View>
          <Text style={styles.title}>Select Product</Text>
        </View>
        <TouchableOpacity onPress={() => closeModal()}>
          <Icon name="close" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Searchbar
          placeholder="Search"
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
          style={{marginBottom: 10}}
        />
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          //extraData={selectedId}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  heading: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  content: {},
  card: {
    marginBottom: 8,
    // backgroundColor: '#D3D3D3',
  },
});
