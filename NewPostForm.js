import React, { useState } from "react";
import {
  TouchableOpacity,
  TextInput,
  View,
  StyleSheet,
  Text,
  Modal,
  Dimensions,
  Keyboard
} from "react-native";
import { Image } from "react-native";
import { RadioButton } from "react-native-paper";
import CustomSlider from "./Slider.js";


export default function NewPostForm() {
  const [isFocused, setIsFocused] = useState(false); // new state variable
  const [wasVisible, setWasVisible] = useState(true); // new state variable
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");

  const [modalVisible, setModalVisible] =
    useState(false); /* for tribe and private selection */
  const [value, setValue] = useState("tribe");

  const [isVisible, setIsVisible] =
    useState(true); /* For slider to dissaper when clicked on dottedCircle */

  const closeModal = () => {
    setModalVisible(false);
  };

  const toggleVisibility = () => {
    if (!isFocused) {
      setIsVisible(!isVisible);
    } else {
      Keyboard.dismiss();
      setIsFocused(false);
      setIsVisible(wasVisible);
    }
  };

  const handleSubmit = () => {
    let isPrivate;

    if (value === "private") {
      isPrivate = true;
    } else {
      isPrivate = false;
    }

    fetch("http://10.0.2.2:5000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rating: rating,
        text: text,
        user_id: 1,
        private: isPrivate,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));

    console.log(`Submitting rating: ${rating}, text: ${text}`);
  };

  const images = [
    require("./assets/1.png"),
    require("./assets/2.png"),
    require("./assets/3.png"),
    require("./assets/4.png"),
    require("./assets/5.png"),
    require("./assets/6.png"),
    require("./assets/7.png"),
    require("./assets/8.png"),
    require("./assets/9.png"),
    require("./assets/10.png"),
  ];

  return (
    <View style={styles.container}>
      {/* first */}
      <View style={styles.firstContainer}>
        <TouchableOpacity
          style={styles.shareButton}
          onPress={() => console.log("Share button pressed")}
        >
          <View style={styles.shareContainer}>
            <Text style={styles.shareButtonText}>share</Text>
            <Text style={styles.shareButtonIcon}>&gt;</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.postButton} onPress={handleSubmit}>
          <Text style={styles.postButtonText}>post</Text>
        </TouchableOpacity>
      </View>

      {/* second */}
      <View style={styles.secondContainer}>
        <View style={styles.profileContainer}>
          <Image
            style={{
              width: 160,
              height: 160,
              marginLeft: -52,
              marginBottom: -20,
            }}
            source={images[rating - 1]}
          />

          <View>
            <Text
              style={{
                fontWeight: "bold",
                marginLeft: -28,
                marginTop: -32,
                fontSize: 20,
              }}
            >
              bartu
            </Text>
            <Text style={{ fontSize: 12, marginLeft: -28, marginTop: 3 }}>
              Tuzla, TR &#183; just now
            </Text>
          </View>
        </View>

        <TextInput
          style={styles.typeText}
          value={text}
          onChangeText={setText}
          multiline
          placeholder="tell us more about it"
          onFocus={() => {
            setWasVisible(isVisible);
            setIsVisible(false);
            setIsFocused(true);
          }} // to make slider dissapear when typing
        />
      </View>

      {/* third */}
      <View style={styles.thirdContainer}>
        {/* sharing mood in tribe */}
        <View style={styles.moodContainer}>
          <Text style={{ fontSize: 11, marginRight: 3 }}>sharing</Text>

          <Image
            style={{ width: 28, height: 28}}
            source={require("./assets/dottedCircle.png")}
          />
          <Text style={{ fontSize: 12, fontWeight: "bold", marginRight: 5 }}>
            mood 
          </Text>
          <Text
            style={{
              fontSize: 26,
              transform: [{ rotate: "90deg" }],
              marginRight: 6,
            }}
          >
            &gt;
          </Text>

          <Text style={{ fontSize: 11, marginRight: 8 }}>in</Text>

          <TouchableOpacity
            style={styles.tribeContainer}
            onPress={() => setModalVisible(true)}
          >
            <Image
              style={{ width: 24, height: 24, marginRight: 3 }}
              source={
                value === "private"
                  ? require("./assets/lock.png")
                  : require("./assets/tribe.png")
              }
            />
            <Text style={{ fontSize: 12, fontWeight: "bold", marginRight: 5 }}>
              {value}
            </Text>
            <Text style={{ fontSize: 26, transform: [{ rotate: "90deg" }] }}>
              &gt;
            </Text>
          </TouchableOpacity>
        </View>

        
        <View style={styles.lineStyle} />

        {/* Photo/GIF/Location */}
        <View style={styles.iconContainer}>
          <Image
            style={{ width: 24, height: 24, marginRight: 16 }}
            source={require("./assets/addImage.png")}
          />
          <Image
            style={{ width: 32, height: 32, marginRight: 16 }}
            source={require("./assets/gif.png")}
          />
          <Image
            style={{ width: 24, height: 24, marginRight: 16 }}
            source={require("./assets/location.png")}
          />
          <TouchableOpacity
            onPress={toggleVisibility}
            style={{ width: 28, height: 28, right: 0, position: "absolute" }}
          >
            <Image
              style={{ width: 32, height: 28, right: 0, marginBottom: -12, position: "absolute" }}
              source={
                isFocused
                  ? require("./assets/keyboard.png")
                  : isVisible
                  ? require("./assets/dottedCircleS.png")
                  : require("./assets/dottedCircleN.png")
              }
            />
          </TouchableOpacity>
        </View>

        {isVisible && (
          <CustomSlider rating={rating} setRating={setRating} />

        )}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <TouchableOpacity style={styles.modalOverlay} onPress={closeModal}>
          <View style={styles.modalView}>
            <RadioButton.Group
              onValueChange={(newValue) => setValue(newValue)}
              value={value}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontWeight: "bold", marginBottom: 16 }}>
                  who can see your post
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                onPress={() => {
                  setValue("tribe");
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    style={{ width: 28, height: 28, marginRight: 12 }}
                    source={require("./assets/tribe.png")}
                  />
                  <Text style={styles.modalText}>tribe</Text>
                </View>
                <RadioButton value="tribe" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 16,
                }}
                onPress={() => {
                  setValue("private");
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    style={{ width: 28, height: 28, marginRight: 12 }}
                    source={require("./assets/lock.png")}
                  />
                  <Text style={styles.modalText}>private</Text>
                </View>
                <RadioButton value="private" />
              </TouchableOpacity>
            </RadioButton.Group>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 10,
  },

  /* first part */

  firstContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  postButton: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginTop: 15,
    position: "absolute",
    right: 0,
  },
  postButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  shareButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginTop: 10,
    alignSelf: "center",
  },
  shareButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  shareButtonIcon: {
    fontSize: 24,
    transform: [{ rotate: "90deg" }],
    color: "black",
    marginLeft: 5,
  },
  shareContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  /* second part */
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  typeText: {
    textAlign: "left",
    fontSize: 15,
  },

  /* third part */
  thirdContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  moodContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  tribeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 35,
    shadowColor: "#000",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.26,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    textAlign: "center",
  },

  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  lineStyle: {
    height: 1, 
    backgroundColor: 'gray', 
    width: '100%',
    alignSelf: 'center',
    marginBottom: 8, 
    marginTop: 0, 
  },


});
