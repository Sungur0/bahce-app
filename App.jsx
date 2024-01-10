import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import RootNavigator from './src/navigators/RootNavigator';
import { ProductProvider } from './src/context/ProductContext';
import { Provider } from 'react-redux';
import store from './src/store';
export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <ProductProvider>
          <NavigationContainer>
            <RootNavigator />
            <StatusBar style="auto" />
          </NavigationContainer>
        </ProductProvider>
      </View>
    </Provider>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
