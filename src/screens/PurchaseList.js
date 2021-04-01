import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Avatar, Card, Searchbar} from 'react-native-paper';
import {Accordion} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../store/actions/index';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'firebase';
import _ from 'lodash';

export default function PurchaseList({navigation}) {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [purchaseList, setPurchaseList] = React.useState([]);
  // const productData = useSelector((state) => state.home.productlist);

  useEffect(() => {
    firebase
      .database()
      .ref('purchase')
      .on('value', (data) => {
        let tempData = _.map(data.val(), (val, id) => {
          return {...val, id};
        });
        setPurchaseList(tempData);
      });

    return () => {};
  }, []);

  const deleteHandler = (data) => {
    // let tempProductlist=[...productData];
    // tempProductlist=tempProductlist.filter(p=>p.id!==data.id);
    // console.log([...tempProductlist]);
    // dispatch(actions.setProductData([...tempProductlist]));
    //         Alert.alert("Deleted sucessfully");
  };

  const _renderHeader = (item, expanded) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'white',
          marginTop: 10,
        }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('AddPurchaseOrder', {editPurchasedata: item})
          }>
          <Text style={{fontWeight: '900'}}> {item.company_name}</Text>
        </TouchableOpacity>
        {expanded ? (
          <Icon style={{fontSize: 18}} name="angle-down" />
        ) : (
          <Icon style={{fontSize: 18}} name="angle-right" />
        )}
      </View>
    );
  };
  const _renderContent = (item) => {
    return (
      <View style={styles.content}>
        {item.product_list.map((ele) => {
          return (
            <View style={styles.row}>
              <View style={[styles.cell, {flex: 4}]}>
                <Text>{ele.product_name}</Text>
              </View>
              <View style={[styles.cell, {flex: 1}]}>
                <Text>{ele.qty}</Text>
              </View>
              <View style={[styles.cell, {flex: 1}]}>
                <Text>{ele.price}</Text>
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {purchaseList && purchaseList.length === 0 ? (
        <Text style={styles.empty}>No data found</Text>
      ) : (
        <Searchbar
          placeholder="Search"
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
        />
      )}
      <Accordion
        dataArray={purchaseList}
        animation={true}
        expanded={true}
        renderHeader={_renderHeader}
        renderContent={_renderContent}
      />

      <TouchableOpacity
        style={styles.addIcon}
        onPress={() => navigation.navigate('AddPurchaseOrder')}>
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
  content: {
    padding: 10,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',

    color: 'black',
    borderRadius: 5,
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    paddingVertical: 10,
  },
  cell: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});
