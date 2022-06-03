import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native'
import { Actionsheet, Box, Button, useDisclose } from "native-base"
import { auth, db } from '../../auth/config';
import GeneralSingleNews from '../screenComponent/GeneralSingleNews';
import { SwiperFlatList } from "react-native-swiper-flatlist"

const GeneralScreen = () => {
  const { isOpen, isClose, onOpen, onClose } = useDisclose();

  const [article, setArticle] = useState("")
  const [getData, setGetData] = useState("")

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleChangeIndexValue = ({ index }) => {
    setCurrentIndex(index);
  };

  const getNews = async () => {
    try {
      var url = `https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=${getData}`;
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
    getNews()
    db.collection("users").doc(auth.currentUser.email).onSnapshot((snapshot) => {
      setGetData(snapshot.data().apiKey);
    })
  }, [getData])

  if (article.articles === []) {
    return (
      <View></View>
    )
  } else {
    return (
      <SwiperFlatList
        vertical={true}
        onChangeIndex={handleChangeIndexValue}
        data={article.articles}
        renderItem={({ item, index }) => (
          <GeneralSingleNews item={item} index={index} currentIndex={currentIndex} />
        )}
        keyExtractor={(item, index) => index}
        style={{
          width: "100%",
          height: 400,
        }}
      />
    )
  }
}

export default GeneralScreen