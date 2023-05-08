import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./src/navigations/appStack";
import { Provider } from "react-redux";
import { store } from "./src/rtkQuery/store";
import Help from "./src/screens/example";

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <AppStack />
      </Provider>
    </NavigationContainer>
    // <Provider store={store}>
    //   <Help />
    // </Provider>
  );
}
