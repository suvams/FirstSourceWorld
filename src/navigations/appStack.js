import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CourseCataloguesScreen from "../screens/courseCataloguesScreen";
import CourseCatalogueDetailScreen from "../screens/courseCatalogueDetailScreeen";
import OnboardingScreen from "../screens/OnBoardingScreen";
import CourseCountDownScreen from "../screens/courseCountDownScreen";
import Tabs from "./tabStack";

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
        name="Tab Stack"
        component={Tabs}
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
      />
      <Stack.Screen name="Course CountDown" component={CourseCountDownScreen} />
    </Stack.Navigator>
  );
};
export default AppStack;
