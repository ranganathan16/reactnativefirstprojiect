import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import {Avatar, Card, Searchbar} from 'react-native-paper';

import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../store/actions/index';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function PurchaseList({navigation}) {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = React.useState('');
  const productData = useSelector((state) => state.home.productlist);
const deleteHandler=(data)=>{
let tempProductlist=[...productData];
tempProductlist=tempProductlist.filter(p=>p.id!==data.id);
console.log([...tempProductlist]);
dispatch(actions.setProductData([...tempProductlist]));
        Alert.alert("Deleted sucessfully");



}

  return (
    <View style={styles.container}>
      {productData && productData.length === 0 ? (
        <Text style={styles.empty}>No data found</Text>
      ) : <Searchbar
      placeholder="Search"
      onChangeText={(text)=>setSearchQuery(text)}
      value={searchQuery}
    />}
      <ScrollView style={styles.scroll}>
        {productData &&
          productData.map((ele, index) => {
            return (
              <Card style={[styles.card,{display:ele.productName.includes(searchQuery)?'flex':'none'}]} key={index + 'product'}>
                <Card.Title
                  title={ele.productName}
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
                        onPress={() =>
                          deleteHandler(ele)
                        }>
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
    flexDirection:'row',
   
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
  rightContentele:{
    marginHorizontal:4
  }
});
