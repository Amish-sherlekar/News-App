import React, { useState } from 'react'
import { View, Text, Image, Dimensions, TouchableOpacity, StyleSheet, Linking, Platform } from 'react-native'
import { Actionsheet, useDisclose } from "native-base"

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width


const SingleNews = ({ item, index, currentIndex, navigation }) => {
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
        alignItems: "center",
        top: -400,
        left: "40%",
        justifyContent: "center",
      }}>
        <Text style={{
          width: 150,
          fontSize: 25,
          fontWeight: 'bold',
          color: '#06c',
          position: "absolute",
          top: -300,
          left: 50,
          margin: 30,
          backgroundColor: "#fff",
          borderRadius: 100,
          textAlign: "center"
        }}>Read News</Text>
      </TouchableOpacity>
      <Actionsheet isOpen={currentIndex || !index ? openActionSheet : false} onClose={onClose}>
        <Actionsheet.Content>
          <TouchableOpacity onPress={() => setOpenActionSheet(false)} style={{ top: 30, position: "absolute" }}>
            <Text>Tap To Close</Text>
          </TouchableOpacity>
          <View style={{ height: 400, width: "105%", justifyContent: "center", alignItems: "center" }}>
            <Text style={{ textAlign: "center", margin: 30, fontWeight: "bold", fontSize: 20 }}>{item.title}</Text>
            <Text style={{ textAlign: "center", margin: 30, fontWeight: "bold", fontSize: 15 }}>{item.description}</Text>
            <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
              <Text style={{ textAlign: "center", margin: 30, color: "#06c", fontWeight: "bold", fontSize: 13 }}>Read Full Article on their website</Text>
            </TouchableOpacity>
          </View>
        </Actionsheet.Content>
      </Actionsheet>
    </View>
  )
}

export default SingleNews

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: windowWidth,
    height: windowHeight,
    borderColor: "#f00",
  },
})