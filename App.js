import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import AppContainer from './src/components/screenComponent/AppContainer';
import * as Font from "expo-font"
import {createAppContainer, createSwitchNavigator} from "react-navigation"
import LoadingScreen from './src/StarterScreens/LodingScreen';
import LoginScreen from './src/StarterScreens/LoginScreen';
import SignupScreen from './src/StarterScreens/SignupScreen';

export default function App() {
  const AppSwitchNavigator = createSwitchNavigator({
    LoadingScreen: LoadingScreen,
    LoginScreen: LoginScreen,
    SignupScreen: SignupScreen,
    DashboardScreen: AppContainer,
  });

  const AppNavigator = createAppContainer(AppSwitchNavigator);

  const [fontsLoaded] = Font.useFonts({
    "JetBrainsMono-Bold": require("./assets/fonts/JetBrainsMono-Bold.ttf"),
    "JetBrainsMono-BoldItalic": require("./assets/fonts/JetBrainsMono-BoldItalic.ttf"),
    "JetBrainsMono-ExtraBold": require("./assets/fonts/JetBrainsMono-ExtraBold.ttf"),
    "JetBrainsMono-ExtraBoldItalic": require("./assets/fonts/JetBrainsMono-ExtraBoldItalic.ttf"),
    "JetBrainsMono-Medium": require("./assets/fonts/JetBrainsMono-Medium.ttf"),
    "JetBrainsMono-MediumItalic": require("./assets/fonts/JetBrainsMono-MediumItalic.ttf"),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  return (
    <AppNavigator/>
  );
}
