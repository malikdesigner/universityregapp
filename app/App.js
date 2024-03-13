import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from './components/SignUpPage'
// import 'react-native-gesture-handler';
import Login from './components/LoginPage';
import FormData from './components/FormData';
import AllUserData from './components/AllUserData';
import TeacherRegistration from './components/TeacherRegistration';
import AddSubject from './components/AddSubject';
// import AddGame from './component/AddGame';

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Add more screens as needed */}
        <Stack.Screen options={{
          headerShown: false,
        }} name="Login" component={Login} />
        <Stack.Screen options={{
          headerShown: false,
        }} name="SignUp" component={SignUp} />
        <Stack.Screen options={{
          headerShown: false,
        }} name="FormData" component={FormData} />
        <Stack.Screen  name="AllUserData" component={AllUserData} />
        <Stack.Screen options={{
          headerShown: false,
        }} name="TeacherRegistration" component={TeacherRegistration} />
          <Stack.Screen options={{
          headerShown: false,
        }} name="AddSubject" component={AddSubject} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


