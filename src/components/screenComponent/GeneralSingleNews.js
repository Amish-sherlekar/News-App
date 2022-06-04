import React, { useState } from 'react'
import { View, Text, Image, Dimensions, TouchableOpacity, StyleSheet, Linking, Platform, ImageBackground } from 'react-native'
import { Actionsheet, useDisclose } from "native-base"
import { auth, db, firebase } from '../../auth/config'
import { Ionicons } from '@expo/vector-icons'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const GeneralSingleNews = ({ item, index, currentIndex }) => {
  const { isOpen, isClose, onOpen, onClose } = useDisclose();
  const [openActionSheet, setOpenActionSheet] = useState(false)

  const saveDataToFireStore = async (title, description, url, urlToImage) => {
    try {
      await db.collection("users")
        .doc(auth.currentUser.email)
        .collection("savedNews")
        .add({
          title: title,
          description: description,
          url: url,
          urlToImage: urlToImage,
          createAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
    } catch (err) {
      alert(err);
    }
  }

  return (
    <ImageBackground style={styles.container} source={{ uri: item.urlToImage }}>
      {/* <Image
                source={{ uri: item.urlToImage }}
                style={{
                    width: windowWidth,
                    height: windowHeight + 50,
                }}
            /> */}
      <TouchableOpacity onPress={() => setOpenActionSheet(true)} style={{
        // justifyContent: "center",
        alignItems: "center",
        position: 'absolute',
        top: "50%",
        left: "35%",
      }}>
        <Text style={{
          fontSize: 27,
          fontWeight: 'bold',
          color: '#06c',
          position: "absolute",
          top: -260,
          left: 50,
          margin: 30,
          backgroundColor: "#fff",
          borderRadius: 100,
          width: 170,
          textAlign: "center",
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
            <TouchableOpacity onPress={() => saveDataToFireStore(item.title, item.description, item.url, item.urlToImage)}>
              <Ionicons name="save" size={40} color={"#909090"} />
            </TouchableOpacity>
            <Text>Save This News</Text>
          </View>
        </Actionsheet.Content>
      </Actionsheet>
    </ImageBackground>
  )
}

export default GeneralSingleNews

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#fff",
    width: windowWidth,
    height: windowHeight - 55,
    // borderColor: "#f00",
  },
})