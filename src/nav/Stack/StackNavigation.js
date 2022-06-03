import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import NewsScreen from '../../components/screen/NewsScreen'
import ExploreScreen from '../../components/screen/ExploreScreen'

const Stack = createStackNavigator()

const StackNavigation = () => {
  return (
    <Stack.Navigator
    initialRouteName='CreateNewFeed'
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="CreateNewFeed" component={ExploreScreen} />
      <Stack.Screen name="SeeNews" component={NewsScreen} />
    </Stack.Navigator>
  )
}

export default StackNavigation