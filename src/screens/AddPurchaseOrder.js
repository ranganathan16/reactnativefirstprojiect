import React, {useState} from 'react';
import {
  Text,
  View,
  Modal,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../store/actions/index';
import DateTimePicker from '@react-native-community/datetimepicker';
import {DataTable} from 'react-native-paper';

import moment from 'moment';
// import RNPickerSelect from 'react-native-picker-select';
// import {Picker} from '@react-native-picker/picker';
import SearchableDropdown from 'react-native-searchable-dropdown';
import AddPurchaseProduct from './AddPurchaseProduct';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function AddPurchaseOrder(props) {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.home.productlist);

  const [companyName, setcompanyName] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [productList, setproductList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editData, seteditData] = useState(null);

  const addPurchaseHandler = () => {
    if (productList.length > 0 && companyName != '') {
    }
  };

  const addProductHandler = (pdata, qty, price) => {
    let tempData = {
      ...pdata,
      qty: qty,
      price: price,
    };
    let tid = editData ? editData.id : 0;
    setproductList((p) => {
      if (tid === 0) tid = p.length > 0 ? p[p.length - 1].id + 1 : 1;
      else p = p.filter((p) => p.id !== editData.id);
      return [...p, {id: tid, ...tempData}];
    });
    setModalVisible(false);
    seteditData(null);
  };
  const RemoveProductHandler = (id) => {
    let tempProductList = [...productList];
    tempProductList = tempProductList.filter((p) => p.id !== id);
    setproductList([...tempProductList]);
  };
  const renderItem = ({item}) => {
    return (
      <View style={styles.row}>
        <View style={[styles.cell, {flex: 4}]}>
          <Text>{item.pname}</Text>
        </View>
        <View style={[styles.cell, {flex: 1}]}>
          <Text>{item.qty}</Text>
        </View>
        <View style={[styles.cell, {flex: 1}]}>
          <Text>{item.price}</Text>
        </View>
        <TouchableOpacity
          onPress={() => RemoveProductHandler(item.id)}
          style={{
            width: 25,
            height: 25,
            position: 'absolute',
            right: -3,
            top: -12,
          }}>
          <Icon name="close" size={25} color="red" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => seteditData(item)}
          style={{
            width: 25,
            height: 25,
            position: 'absolute',
            right: -3,
            bottom: -12,
          }}>
          <Icon name="pencil" size={25} color="black" />
        </TouchableOpacity>

        {/* <View style={{width:25,height:25,position:'absolute',right:-3,bottom:-5}}>
          <Icon name="pencil" size={25} color="pencil" />
        </View> */}
      </View>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Add Purchase</Text>
        </View>
        <View>
          <Text style={styles.lable}>Company Name</Text>
          <TextInput
            style={styles.textinput}
            placeholder="Enter product"
            value={companyName}
            onChangeText={(text) => setcompanyName(text)}
          />
          <Text style={styles.lable}>Date</Text>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.dateinput}
            onPress={() => setShowDate(true)}>
            <Text>{moment(date).format('DD-MM-YYYY')}</Text>
          </TouchableOpacity>

          {showDate && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={'date'}
              is24Hour={true}
              display="default"
              onChange={(e, seldate) => {
                setShowDate(false);
                if (seldate) setDate(seldate);
              }}
            />
          )}

          <View
            style={{
              backgroundColor: 'white',
              paddingVertical: 10,
              flexDirection: 'row',
            }}>
            <View style={[{flex: 5}]}>
              <Text>Product List</Text>
            </View>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={[
                {flex: 1, alignItems: 'flex-end', paddingHorizontal: 10},
              ]}>
              <Icon name="plus" size={20} color="black" />
            </TouchableOpacity>
          </View>

          {productList && productList.length > 0 && (
            <View style={styles.row}>
              <View style={[styles.cell, {flex: 4}]}>
                <Text>Product Name</Text>
              </View>
              <View style={[styles.cell, {flex: 1}]}>
                <Text>Qty</Text>
              </View>
              <View style={[styles.cell, {flex: 1}]}>
                <Text>Price</Text>
              </View>
            </View>
          )}

          <FlatList
            data={productList}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            //extraData={selectedId}
          />
          <Button
            title={'Save'}
            disabled={productList && productList.length < 1}
            onPress={() => addPurchaseHandler()}></Button>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible || editData !== null}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <AddPurchaseProduct
          closeHandler={() => {
            setModalVisible(false);
            seteditData(null);
          }}
          productData={productData}
          addProductHandler={addProductHandler}
          editData={editData}
        />
      </Modal>
    </>
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
    marginBottom: 20,
  },
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
  dateinput: {
    backgroundColor: 'white',
    marginBottom: 20,
    color: 'black',
    fontWeight: 'bold',
    height: 45,
    padding: 5,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    marginVertical: 10,
    backgroundColor: 'white',
    color: 'black',
    borderRadius: 5,
    paddingVertical: 10,
  },
  cell: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});
