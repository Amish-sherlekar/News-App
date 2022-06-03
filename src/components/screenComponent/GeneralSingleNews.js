import React, { useState } from 'react'
import { View, Text, Image, Dimensions, TouchableOpacity, StyleSheet, Linking, Platform } from 'react-native'
import { Actionsheet, useDisclose } from "native-base"
// import {  } from 'react-native-reanimated'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const GeneralSingleNews = ({ item, index, currentIndex }) => {
    const { isOpen, isClose, onOpen, onClose } = useDisclose();
    const [openActionSheet, setOpenActionSheet] = useState(false)

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: item.urlToImage }}
                style={{
                    width: windowWidth,
                    height: windowHeight + 50,
                }}
            />
            <TouchableOpacity onPress={() => setOpenActionSheet(true)} style={{
                // justifyContent: "center",
                alignItems: "center",
                position: 'absolute',
                top: "50%",
                left: "40%",
            }}>
                <Text style={{
                    fontSize: 30,
                    fontWeight: 'bold',
                    color: '#06c',
                    position: "absolute",
                    top: -260,
                    left: 50,
                    margin: 30
                }}>Read News</Text>
            </TouchableOpacity>
            <Actionsheet isOpen={currentIndex || !index ? openActionSheet : false} onClose={onClose}>
                <Actionsheet.Content>
                <TouchableOpacity onPress={() => setOpenActionSheet(false)} style={{ top: 30, position: "absolute"}}>
                    <Text>Tap To Close</Text>
                </TouchableOpacity>
                    <View style={{ height: 400, width: "105%", justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ textAlign: "center", margin: 30, fontWeight: "bold", fontSize: 20 }}>{item.title}</Text>
                        <Text style={{ textAlign: "center", margin: 30, fontWeight: "bold", fontSize: 15 }}>{item.description}</Text>
                        <TouchableOpacity onPress={()=> Linking.openURL(item.url) }>
                            <Text style={{ textAlign: "center", margin: 30, color: "#06c", fontWeight: "bold", fontSize: 13 }}>Read Full Article on their website</Text>
                        </TouchableOpacity>
                    </View>
                </Actionsheet.Content>
            </Actionsheet>
        </View>
    )
}

export default GeneralSingleNews

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        width: windowWidth,
        height: windowHeight - 55,
        borderColor: "#f00",
    },
})