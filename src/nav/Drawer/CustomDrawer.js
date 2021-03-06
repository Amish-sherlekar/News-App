import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
    useDrawerProgress,
} from '@react-navigation/drawer';
import { Switch } from 'native-base'
import { EventRegister } from 'react-native-event-listeners';
import Animated from 'react-native-reanimated';
import { auth, db, firebase } from '../../auth/config';

const CustomDrawer = (props) => {

    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        db.collection("users")
            .doc(auth.currentUser.email)
            .onSnapshot((doc) => {
                setYourName(doc.data().username);
            });
    }, [yourName])

    const [yourName, setYourName] = useState("")

    const progress = useDrawerProgress();

    const translateX = Animated.interpolateNode(progress, {
        inputRange: [0, 1],
        outputRange: [-500, 0],
    });
    const translateX2 = Animated.interpolateNode(progress, {
        inputRange: [0, 0.3],
        outputRange: [-1000, 0],
    });
    return (
        <DrawerContentScrollView {...props}>
            <Animated.View style={{ transform: [{ translateX }], margin: 15 }}>
                <Image source={require("../../../assets/images/userIcon.png")} style={styles.drawerHeaderImage} />
            </Animated.View>
            <Animated.View style={{ transform: [{ translateX }], marginLeft: 30, fontWeight: "bold", fontSize: 50 }}>
                <Text style={{
                    color: darkMode ? "#f0f0f0" : "#202020",
                }}>Welcome {yourName}</Text>
            </Animated.View>
            <Animated.View style={{ transform: [{ translateX2 }] }}>
                <View style={{ width: 350, height: 500, top: 100, left: 10 }}>
                    <DrawerItemList {...props} />
                </View>
                <View style={{
                    flexDirection: "row",
                    margin: 20,
                    justifyContent: "space-between"
                }}>
                    <Text style={{
                        color: "#909090",
                        fontSize: 20,
                    }}>Dark Mode</Text>
                    <Switch
                        style={{
                            top: -10
                        }}
                        value={darkMode}
                        onValueChange={(val) => {
                            setDarkMode(val);
                            EventRegister.emit("changeThemeEvent", val);
                        }}
                    />
                </View>
            </Animated.View>
        </DrawerContentScrollView>
    )
}

export default CustomDrawer

const styles = StyleSheet.create({
    drawerHeaderImage: {
        top: 30,
        width: 150,
        height: 150,
        borderRadius: 100,
    }
})