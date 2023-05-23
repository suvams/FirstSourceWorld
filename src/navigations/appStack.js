import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CourseCataloguesScreen from "../screens/courseCataloguesScreen";
import CourseCatalogueDetailScreen from "../screens/courseCatalogueDetailScreeen";
import OnboardingScreen from "../screens/OnBoardingScreen";

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="OnBoardingScreen"
        component={OnboardingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="eduXGateway"
        component={CourseCataloguesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Course Detail"
        component={CourseCatalogueDetailScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default AppStack;
