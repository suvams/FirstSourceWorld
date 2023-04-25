import { NavigationContainer } from '@react-navigation/native';
import AppStack from './src/navigations/appStack';

export default function App() {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
}
