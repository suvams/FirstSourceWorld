import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CourseCataloguesScreen from "../screens/courseCataloguesScreen";
import CourseCatalogueDetailScreen from "../screens/courseCatalogueDetailScreeen";
// import HomeScreen from "../screens/HomeScreen";
import ContactUsScreen from "../screens/ContactUsScreen";
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
      {/* <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name="First Source World"
        component={CourseCataloguesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Detail" component={CourseCatalogueDetailScreen} />
      <Stack.Screen
        name="Contact Us"
        component={ContactUsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default AppStack;
