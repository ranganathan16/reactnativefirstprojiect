import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Modal,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomizeDropDown from './CustomizeDropDown';
// import SearchableDropdown from 'react-native-searchable-dropdown';
// import RNPicker from "rn-modal-picker";

export default function AddPurchaseProduct({
  productData,
  closeHandler,
  addProductHandler,
  editData,
}) {
  const [dropdownVisible, setdropdownVisible] = useState(false);
  const [selectedProduct, setselectedProduct] = useState(
    editData
      ? {product_id: editData.product_id, product_name: editData.product_name}
      : null,
  );
  const [qty, setqty] = useState(editData ? editData.qty : '');
  const [price, setprice] = useState(editData ? editData.price : '');

  const productSelectHandler = item => {
    setselectedProduct({product_id: item.id, product_name: item.product_name});
    setdropdownVisible(false);
  };
  const submitHandler = () => {
    if (selectedProduct && qty > 0 && price > 0) {
      let index = editData ? editData.index : -1;
      addProductHandler(selectedProduct, qty, price, index);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.heading}>
          <View>
            <Text style={styles.title}>Title</Text>
          </View>
          <TouchableOpacity onPress={() => closeHandler()}>
            <Icon name="close" size={30} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Text style={styles.lable}>Product Name</Text>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.dropdown}
            onPress={() => setdropdownVisible(true)}>
            <Text>
              {selectedProduct
                ? selectedProduct.product_name
                : 'Select product'}
            </Text>
          </TouchableOpacity>
          <Text style={styles.lable}>Quantity</Text>
          <TextInput
            keyboardType="number-pad"
            style={styles.textinput}
            placeholder="Enter quantity"
            value={qty.toString()}
            onChangeText={text => setqty(text)}
          />
          <Text style={styles.lable}>Total price</Text>
          <TextInput
            keyboardType="number-pad"
            style={styles.textinput}
            placeholder="Enter quantity"
            value={price.toString()}
            onChangeText={text => setprice(text)}
          />
          <Button
            title="Submit"
            onPress={() => {
              submitHandler();
            }}
          />
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={dropdownVisible}
        onRequestClose={() => {
          setdropdownVisible(false);
        }}>
        <CustomizeDropDown
          closeModal={() => setdropdownVisible(false)}
          data={productData}
          productSelectHandler={productSelectHandler}
        />
      </Modal>
    </>
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
  lable: {
    marginBottom: 5,
    color: 'black',
    fontWeight: 'bold',
  },
  textinput: {
    backgroundColor: 'white',
    marginBottom: 30,
    color: 'black',
    fontWeight: 'bold',
  },
  dropdown: {
    backgroundColor: 'white',
    marginBottom: 30,
    color: 'black',
    fontWeight: 'bold',
    height: 45,
    padding: 5,
    justifyContent: 'center',
  },
});
