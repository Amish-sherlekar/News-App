import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet, Dimensions } from 'react-native'
import { NewsCategory } from "../../../NewsProps"
import { SwiperFlatList } from "react-native-swiper-flatlist"
import SingleNews from '../screen/SingleNews'
import { Ionicons } from '@expo/vector-icons'
import {db, auth, firebase} from "../../auth/config"

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const NewsScreen = ({ route, navigation }) => {
  const [article, setArticle] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newsCat, setNewsCat] = useState(null)
  const [keyToApi, setKeyToApi] = useState(null)

  const handleChangeIndexValue = ({ index }) => {
    setCurrentIndex(index);
  };
  const getNews = async () => {
    try {
      var url = `https://newsapi.org/v2/top-headlines?country=in&category=${newsCat}&apiKey=${keyToApi}`;
      return fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
          setArticle(responseJson);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    db.collection("users")
    .doc(auth.currentUser.email)
    .onSnapshot((snapshot) => {
      setKeyToApi(snapshot.data().apiKey)
    })
    setNewsCat(route.params.newsType)
    getNews()
  }, [article]);

  if (article.articles === "") {
    return (
      <View></View>
    )
  } else {
    return (
      <View style={{
        width: windowWidth,
        height: windowHeight,
      }}>
        <SwiperFlatList
          vertical={true}
          onChangeIndex={handleChangeIndexValue}
          data={article.articles}
          renderItem={({ item, index }) => (
            <SingleNews item={item} index={index} currentIndex={currentIndex} />
          )}
          keyExtractor={(item, index) => index}
          style={{
            width: "100%",
            height: 400,
          }}
        />
        <TouchableOpacity style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        position: "absolute",
      }}
      onPress={() => navigation.goBack()}
      >
        <Ionicons name='md-caret-back-circle' color={"#000"} size={40} />
      </TouchableOpacity>
      </View>
    )
  }
}

export default NewsScreen

const styles = StyleSheet.create({
  container: {
    top: 50,
    width: 300,
    height: 300,
    margin: 10,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
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