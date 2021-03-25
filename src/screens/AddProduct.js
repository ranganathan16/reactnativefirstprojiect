import * as React from 'react';
import {Text, View, StyleSheet, TextInput, Button, Alert} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../store/actions/index';
import firebase from 'firebase';

export default function AddProduct(props) {
  const editdata = props.route.params ? props.route.params.editdata : null;
  const [productName, setProductName] = React.useState(
    editdata ? editdata.product_name : '',
  );

  const submitHandler = () => {
    let data;
    if (editdata) {
      data = {
        product_name: productName,
      };
      var productEditRef = firebase.database().ref(`product/${editdata.id}`);
      productEditRef
        .update({
          ...data,
        })
        .then(() => {})
        .catch(() => {});
    } else {
      data = {
        product_name: productName,
        avalible: 0,
      };
      var postListRef = firebase.database().ref('product');
      var newPostRef = postListRef.push();
      newPostRef
        .set({
          ...data,
        })
        .then(() => {})
        .catch(() => {});
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{editdata ? 'Edit' : 'Add'} Product</Text>
      </View>
      <View>
        <TextInput
          style={styles.textinput}
          placeholder="Enter product"
          value={productName}
          onChangeText={(text) => setProductName(text)}
        />
        <Button
          title={editdata ? 'Update' : 'Add'}
          onPress={() => submitHandler()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 20,
  },
  title: {
    textAlign: 'center',
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  textinput: {
    backgroundColor: 'white',
    marginVertical: 30,
    color: 'black',
    fontWeight: 'bold',
  },
});
