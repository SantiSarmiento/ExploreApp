import React, { useEffect } from 'react';
import { ThemeProvider } from 'react-native-elements';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import mainReducer from './redux/Reducer/mainReducer'
import AppLoading from 'expo-app-loading';
import { useFonts, DancingScript_400Regular, DancingScript_700Bold } from '@expo-google-fonts/dancing-script';
import { Montserrat_700Bold, Montserrat_400Regular } from '@expo-google-fonts/montserrat';
import { NavigationContainer } from '@react-navigation/native'
import Drawer from './navigation/Drawer';
import Toast from 'react-native-toast-message';


const miStore = createStore(mainReducer, applyMiddleware(thunk))

const App = () => {

  let [fontsLoaded] = useFonts({
    DancingScript_400Regular,
    DancingScript_700Bold,
    Montserrat_700Bold,
    Montserrat_400Regular
  })

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <Provider store={miStore}>
      <ThemeProvider>
        <NavigationContainer>
          <Drawer />
        </NavigationContainer>
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </ThemeProvider>
    </Provider>
  );


}

export default App