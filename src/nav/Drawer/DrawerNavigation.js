import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import GeneralScreen from '../../components/screen/GeneralScreen'
import ExploreScreen from '../../components/screen/ExploreScreen'
import CustomDrawer from './CustomDrawer'
import NewsScreen from '../../components/screen/NewsScreen'
import SavedScreen from "../../components/screen/SavedScreen"
import StackNavigation from "../Stack/StackNavigation"
import { Feather, Ionicons } from "@expo/vector-icons"

const Drawer = createDrawerNavigator()

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerStyle:{
          backgroundColor: '#909090',
        },
        drawerStyle: {
          width: '90%',
        },
        drawerLabelStyle: {
          fontSize: 20,
          marginLeft: -25,
        },
        drawerItemStyle: {
          left: -10
        },
        drawerActiveBackgroundColor: '#606060',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#606060',
      }}
    >
      <Drawer.Screen name='Home' component={GeneralScreen} options={{
        drawerIcon: ({ focused, color, size }) => (
          <View>
            <Ionicons name="ios-home" size={30} color={color} />
          </View>
        )
      }} />
      <Drawer.Screen name='News Type' component={StackNavigation} options={{
        drawerIcon: ({ focused, color, size }) => (
          <View>
            <Ionicons name="newspaper" size={30} color={color} />
          </View>
        )
      }} />
      <Drawer.Screen name='Saved News' component={SavedScreen} options={{
        drawerIcon: ({ focused, color, size }) => (
          <View>
            <Ionicons name="ios-save" size={30} color={color} />
          </View>
        )
      }} />
    </Drawer.Navigator>
  )
}

export default DrawerNavigation
