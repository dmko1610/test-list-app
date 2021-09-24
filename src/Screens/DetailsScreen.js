import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { toggleDetails } from "../Actions/Actions";

export const DetailsScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const change = (isOpened) => dispatch(toggleDetails(isOpened));

  const [details, setDetails] = React.useState({});
  const {
    name,
    avatar_url,
    login,
    bio,
    public_repos,
    followers,
    following,
    created_at,
  } = details;

  const { url } = route.params;

  const getDetailsFromApi = async () => {
    const response = await fetch(url);
    const json = await response.json();
    setDetails(json);
  };

  useEffect(() => {
    getDetailsFromApi();
  }, []);

  return (
    <View style={styles.detailsContainer}>
      <Pressable
        style={styles.backButton}
        android_ripple={{
          borderless: false,
          color: "white",
        }}
        onPress={() => {
          change(false);
          navigation.goBack();
        }}
      >
        <Text style={styles.backText}>Back</Text>
      </Pressable>
      <Image source={{ uri: avatar_url }} style={styles.avatar} />
      <Text style={styles.name}>{name ? name : login}</Text>
      <Text style={styles.bio}>{bio ? bio : "No Bio"}</Text>
      <Text style={styles.details}>{`public_repos: ${public_repos}`}</Text>
      <Text style={styles.details}>{`followers: ${followers}`} </Text>
      <Text style={styles.details}>{`following: ${following}`} </Text>
      <Text style={styles.details}>
        {`created at: ${new Date(created_at).toLocaleDateString()}`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "lightgray",
  },
  backButton: {
    alignSelf: "flex-start",
    marginLeft: 15,
    marginTop: 15,
    backgroundColor: "darkgray",
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  backText: {
    fontSize: 15,
    color: "white",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginVertical: 20,
  },
  details: {
    textAlign: "justify",
    fontSize: 20,
    paddingVertical: 10,
    letterSpacing: 2
  },
  bio: {
    fontSize: 25,
    padding: 15,
  },
  name: {
    fontSize: 35,
  },
});

DetailsScreen.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
};
