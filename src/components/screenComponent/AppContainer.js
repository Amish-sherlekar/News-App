import { View, Text } from 'react-native'
import React, {useEffect, useState} from 'react'
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native'
import { NativeBaseProvider } from 'native-base'
import DrawerNavigation from '../../nav/Drawer/DrawerNavigation'
import { EventRegister } from "react-native-event-listeners"

const AppContainer = () => {
    useEffect(() => {
        let eventListener = EventRegister.addEventListener(
            "changeThemeEvent",
            (data) => {
                setDarkApp(data);
            }
        );
        return () => {
            true
        }
    }, []);

    const [darkApp, setDarkApp] = useState(true);
    const appTheme = darkApp ? DarkTheme : DefaultTheme;
    return (
        <NavigationContainer theme={appTheme}>
            <NativeBaseProvider>
                <DrawerNavigation />
            </NativeBaseProvider>
        </NavigationContainer>
    )
}

export default AppContainer