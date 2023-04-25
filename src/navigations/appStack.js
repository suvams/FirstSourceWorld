import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DropdownScreen from "../screens/homeSreen";
import DetailScreen from "../screens/detailScreen";

const Stack = createNativeStackNavigator();
const AppStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="First Source World"
                component={DropdownScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="Detail"
                component={DetailScreen} />
        </Stack.Navigator>
    )
}
export default AppStack;