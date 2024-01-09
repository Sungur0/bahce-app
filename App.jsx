import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import RootNavigator from './src/navigators/RootNavigator';
import { ProductProvider } from './src/context/ProductContext';
import { SepetProvider } from './src/context/SepetProvider';
export default function App() {
  return (
    <View style={styles.container}>
      <SepetProvider>
        <ProductProvider>
          <NavigationContainer>
            <RootNavigator />
            <StatusBar style='auto' />
          </NavigationContainer>
        </ProductProvider>
      </SepetProvider>

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
