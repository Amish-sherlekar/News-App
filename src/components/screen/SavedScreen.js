import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ImageBackground, Dimensions, TouchableOpacity } from "react-native";
import { auth, db, firebase } from "../../auth/config";
import moment from "moment"
import { Actionsheet, useDisclose } from "native-base";

const windowHeight = Dimensions.get("window").height;

const SavedScreen = () => {
  const { isOpen, isClose, onOpen, onClose } = useDisclose();
  const [savedData, setSavedData] = useState(null);
  const [openActionSheet, setOpenActionSheet] = useState(false);

  const getFirestoreSavedData = async () => {
    db.collection("users")
      .doc(auth.currentUser.email)
      .collection("savedNews")
      .orderBy("createAt", "desc")
      .onSnapshot((snapshot) => {
        setSavedData(snapshot.docs.map((doc) => doc.data()));
      });
  };

  useEffect(() => {
    getFirestoreSavedData();
  }, []);

  return (
    <View>
      <FlatList
        data={savedData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          return (
            <ImageBackground source={{ uri: item.urlToImage }} style={{ width: "100%", height: windowHeight - 60 }}>
              <TouchableOpacity onPress={() => setOpenActionSheet(true)} style={{ alignItems: "center", position: "absolute", top: "50%", left: "40%", backgroundColor: "#fff" }}>
                <Text style={{ fontSize: 30, fontWeight: "bold", color: "#06c", position: "absolute", top: -260, left: 50, margin: 30 }}>
                  Read News
                </Text>
              </TouchableOpacity>
              <Actionsheet isOpen={!index ? openActionSheet : false} onClose={onClose}>
                <Actionsheet.Content>
                  <TouchableOpacity onPress={()=> setOpenActionSheet(false)}>
                    <Text style={{ fontWeight: "bold" }}>Tap To Close</Text>
                  </TouchableOpacity>
                  <View style={{ justifyContent: "center", alignItems: "center", margin: 20 }}>
                    <Text style={{ margin: 20, color: "#000", fontSize: 20, textAlign: "center", fontWeight: "bold" }}>{item.title}</Text>
                    <Text style={{ margin: 20, color: "#101010", fontSize: 15, textAlign: "center" }}>{item.description}</Text>
                    <Text style={{ margin: 20, color: "#909090", fontSize: 12, textAlign: "center", fontWeight: "bold" }}>{moment(item.created).fromNow()}</Text>
                  </View>
                </Actionsheet.Content>
              </Actionsheet>
            </ImageBackground>
          )
        }}
        pagingEnabled
      />
    </View>
  );
};

export default SavedScreen;
