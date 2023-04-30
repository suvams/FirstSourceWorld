import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailScreen from "../screens/detailScreen";
import FirstScreen from "../screens/firstScreen";

const Stack = createNativeStackNavigator();
const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="First Source World"
        component={FirstScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
};
export default AppStack;
