import * as React from 'react';
import { Text, View ,StyleSheet} from 'react-native';


export default function ProductList() {
  return (
   
      <View style={styles.container}>
          <Text>ProductList</Text>
      </View>

  );
}

const styles = StyleSheet.create({
  container:{
      flex:1
  }
});