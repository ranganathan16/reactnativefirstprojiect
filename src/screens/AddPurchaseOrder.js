import  React,{useState} from 'react';
import {Text, View, StyleSheet, TextInput, Button, Alert,TouchableOpacity, TouchableHighlight} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../store/actions/index';
import DateTimePicker from '@react-native-community/datetimepicker';

import moment from "moment";

export default function AddPurchaseOrder(props) {
  const dispatch = useDispatch();
    const [companyName, setcompanyName] = useState('')
    const [billAmt, setbillAmt] = useState('')
    const [date, setDate] = useState(new Date());
    const [showDate, setShowDate] = useState(false);
    const [productList, setproductList] = useState([]);
  
    return (
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
        <Text style={styles.lable}>Bill Total Amount</Text>
        <TextInput
          style={styles.textinput}
          placeholder="Enter amount"
          value={billAmt}
           onChangeText={(text) => setbillAmt(text)}
           keyboardType="number-pad"
        />
        <Text style={styles.lable}>Date</Text>
        <TouchableOpacity activeOpacity={1} style={styles.dateinput} onPress={()=>setShowDate(true)}>
        <Text >{moment(date).format("DD-MM-YYYY")}</Text>
        </TouchableOpacity>

      {showDate && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={(e,seldate)=>{
              setShowDate(false);
              if(seldate)
                setDate(seldate);
            
          }}
        />
      )}
    
        <Button title={"Add"}  />
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
    marginBottom: 20,
  },
  lable:{
    marginBottom: 5,
    color:'black',
    fontWeight:'bold'
    
  },
  textinput: {
    backgroundColor: 'white',
    marginBottom: 30,
    color: 'black',
    fontWeight: 'bold',
  },
  dateinput:{

    backgroundColor: 'white',
    marginBottom: 30,
    color: 'black',
    fontWeight: 'bold',
    height:45,
    padding:5,
    justifyContent:'center'
    
  }
});
