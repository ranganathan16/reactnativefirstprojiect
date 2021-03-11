import * as React from 'react';
import {Text, View, StyleSheet, TextInput, Button, Alert} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../store/actions/index';

export default function AddProduct(props) {
  const dispatch = useDispatch();
  const editdata=props.route.params?props.route.params.editdata:null;
  const productData = useSelector((state) => state.home.productlist);

  const [productName, setProductName] = React.useState(editdata?editdata.productName:'');
 
  const addHandler = () => {
    const tempproductData = [...productData];
    let isempty=productName.trim()==="";
    let index;
    if(editdata){
       index=tempproductData.findIndex(ele=>ele.productName.toLowerCase().trim()===productName.toLowerCase().trim() && ele.id !==editdata.id);
       if(index===-1 && !isempty)
       {
         let tempIndex=tempproductData.findIndex(p=>p.id===editdata.id);

        tempproductData[tempIndex].productName=productName;
        dispatch(actions.setProductData([...tempproductData]));
        Alert.alert("Product updated sucessfully");
       }
       else{
        Alert.alert(isempty?"enter the producr name":"product name already exits");
       }

    }
    else{
   
     index=tempproductData.findIndex(ele=>ele.productName.toLowerCase().trim()===productName.toLowerCase().trim())
    if(index===-1 && !isempty)
    {
    let maxid =
      tempproductData.length > 0
        ? tempproductData.reduce(
            (max, p) => (p.id > max ? p.id : max),
            tempproductData[0].id,
          )
        : 0;
    maxid = maxid + 1;
    let data = {
      id: maxid,
      productName,
      avalible: 0,
    };
    console.log([...tempproductData, data]);
    dispatch(actions.setProductData([...tempproductData, data]));
    Alert.alert("Product added sucessfully");
    setProductName("");
  }
  else{
    Alert.alert(isempty?"enter the producr name":"product name already exits")
  }
}
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{editdata?"Edit":"Add"} Product</Text>
      </View>
      <View>
        <TextInput
          style={styles.textinput}
          placeholder="Enter product"
          value={productName}
          onChangeText={(text) => setProductName(text)}
        />
        <Button title={editdata?"Update":"Add"} onPress={() => addHandler()} />
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
