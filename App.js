import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./src/navigations/appStack";
import { Provider } from "react-redux";
import { store } from "./src/rtkQuery/store";
import { LogBox } from "react-native";

export default function App() {
  LogBox.ignoreLogs(["Warnings:..."]);
  LogBox.ignoreAllLogs();
  return (
    <NavigationContainer>
      <Provider store={store}>
        <AppStack />
      </Provider>
    </NavigationContainer>
  );
}
