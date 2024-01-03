import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import RootNavigator from './src/navigators/RootNavigator';
import { ProductProvider } from './src/context/ProductContext';

export default function App() {
  return (
    <View style={styles.container}>
      <ProductProvider>
        <NavigationContainer>
          <RootNavigator />
          <StatusBar style='auto' />
        </NavigationContainer>
      </ProductProvider>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
