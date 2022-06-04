import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import NewsScreen from '../../components/screen/NewsScreen'
import ExploreScreen from '../../components/screen/ExploreScreen'
import SearchScreen from '../../components/screen/SearchScreen'

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
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  )
}

export default StackNavigation