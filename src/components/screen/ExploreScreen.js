import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { EventRegister } from 'react-native-event-listeners'
import { NewsCategory } from "../../../NewsProps"

const ExploreScreen = ({ navigation }) => {

  const [darkApp, setDarkApp] = useState(false)

  useEffect(() => {
    let eventListener = EventRegister.addEventListener(
      "changeThemeEvent",
      (data) => {
          setDarkApp(data);
      }
  );
  return () => {
    false
  }
  }, [])

  return (
    <FlatList
      data={NewsCategory}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity style={[styles.container, {backgroundColor: !darkApp ? "#f0f0f0" : "#202020" }]} onPress={()=>navigation.navigate("SeeNews", { newsType: item.id })}>
          <Image source={{ uri: item.image }} style={styles.imageStyle} />
          <Text
            style={{
              fontFamily: 'JetBrainsMono-ExtraBoldItalic',
              fontSize: 20,
              color: !darkApp ? "#303030" : "#909090"
            }}
          >{item.type}</Text>
        </TouchableOpacity>
      )}
      horizontal
    />
  )
}

export default ExploreScreen

const styles = StyleSheet.create({
  container: {
    top: "50%",
    width: 300,
    height: 300,
    margin: 10,
    borderRadius: 20,
    // backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    shadowColor: "#404040",
    shadowOffset: { width: -10, height: -2 },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 10,
  },
  imageStyle: {
    top: -10,
    width: "85%",
    height: 200,
  }
})