import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./Screens/HomeScreen";
import { DetailsScreen } from "./Screens/DetailsScreen";
import mainReducer from "./Reducers/Reducers";

const Stack = createNativeStackNavigator();

const store = createStore(mainReducer);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}


/* 
1) Подключен redux но для запросов используется обычный фетч, и данные сразу же используются на экране, смысл подключения redux потеряна так же не подключен middleWare (thunk, saga)
4) renderItem, keyExtractor нужно выносить в useCallback из  FlatList
5) keyExtractor отсутствует, нет гарантий что всегда будет приходить ключ key или id с бэка в формате   string лучше это дело контролировать через keyExtractor и менять в случае чего а не искать ошибку
6) Нет оптимизации memo...
7) Нет колбеков useCallback 
*/