import * as React from 'react';
import { Text, View ,StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import { Avatar, Card, IconButton } from 'react-native-paper';

import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../store/actions/index';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ProductList({navigation}) {
  const productData = useSelector((state) => state.home.productlist);


  return (
   
      <View style={styles.container}>
        <ScrollView style={styles.scroll}>
        {
          productData && productData.map((ele,index)=>{
            return(
              <Card  style={styles.card} key={index+'product'}>
                <Card.Title title={ele.productName}  right={(props)=><TouchableOpacity style={styles.rightContent} onPress={()=>navigation.navigate('AddProduct',{editdata:ele})}><Text> <Icon name="edit" size={30} color="black" /> </Text></TouchableOpacity>}  />
            </Card>
            );
          })
        }     
      </ScrollView>

      <TouchableOpacity style={styles.addIcon} onPress={()=>navigation.navigate('AddProduct')} >
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
  card:{
    marginBottom:8
  },
  scroll:{
    flex:1,
    
  },
  rightContent:{
    flex:1,
    padding:3,
    justifyContent:'center',
    alignItems:'center',
    marginHorizontal:3,
  },
  addIcon:{
    position:'absolute',
    bottom:50,
    right:15,
    backgroundColor:'grey',
    width:60,
    height:60,
    borderRadius:30,
    alignItems:'center',
    justifyContent:'center',
    


  }



  
});