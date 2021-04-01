import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Avatar, Card, Searchbar} from 'react-native-paper';

import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../store/actions/index';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'firebase';
import _ from 'lodash';

export default function ProductList({navigation}) {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [productData, setproductData] = React.useState([]);
  React.useEffect(() => {
    firebase
      .database()
      .ref('product')
      .on('value', (data) => {
        let tempData = _.map(data.val(), (val, id) => {
          return {...val, id};
        });
        setproductData(tempData);
      });

    return () => {};
  }, []);

  const deleteHandler = (data) => {
    firebase
      .database()
      .ref(`product/${data.id}`)
      .remove()
      .then(() => {})
      .catch(() => {});
  };

  return (
    <View style={styles.container}>
      {productData && productData.length === 0 ? (
        <Text style={styles.empty}>No data found</Text>
      ) : (
        <Searchbar
          placeholder="Search"
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
        />
      )}
      <ScrollView style={styles.scroll}>
        {productData &&
          productData.map((ele) => {
            return (
              <Card
                style={[
                  styles.card,
                  {
                    display: ele.product_name.includes(searchQuery)
                      ? 'flex'
                      : 'none',
                  },
                ]}
                key={ele.id + 'product'}>
                <Card.Title
                  title={ele.product_name}
                  right={(props) => (
                    <View style={styles.rightContent}>
                      <TouchableOpacity
                        style={styles.rightContentele}
                        onPress={() =>
                          navigation.navigate('AddProduct', {editdata: ele})
                        }>
                        <Icon name="edit" size={30} color="black" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.rightContentele}
                        onPress={() => deleteHandler(ele)}>
                        <Icon name="trash-o" size={30} color="red" />
                      </TouchableOpacity>
                    </View>
                  )}
                />
              </Card>
            );
          })}
      </ScrollView>

      <TouchableOpacity
        style={styles.addIcon}
        onPress={() => navigation.navigate('AddProduct')}>
        <Icon name="plus" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 20,
  },
  card: {
    marginBottom: 8,
  },
  scroll: {
    flex: 1,
  },
  rightContent: {
    flex: 1,
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3,
    flexDirection: 'row',
  },
  addIcon: {
    position: 'absolute',
    bottom: 50,
    right: 15,
    backgroundColor: 'grey',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  empty: {
    textAlign: 'center',
  },
  rightContentele: {
    marginHorizontal: 4,
  },
});
