import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CourseCataloguesScreen from "../screens/courseCataloguesScreen";
import CourseCatalogueDetailScreen from "../screens/courseCatalogueDetailScreeen";

const Stack = createNativeStackNavigator();
const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="First Source World"
        component={CourseCataloguesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Detail" component={CourseCatalogueDetailScreen} />
    </Stack.Navigator>
  );
};
export default AppStack;
