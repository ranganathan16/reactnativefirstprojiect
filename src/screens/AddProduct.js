import * as React from 'react';
import { Text, View,StyleSheet, TextInput, Button, Alert } from 'react-native';


export default function AddProduct() {
  return (
   
      <View style={styles.container}>
          
          <TextInput placeholder="Enter Email" />
          <Button
            title="Add"
            onPress={() => Alert.alert('Add prod')}
      />
      </View>

  );
}

const styles = StyleSheet.create({
  container:{
      flex:1
  }
});