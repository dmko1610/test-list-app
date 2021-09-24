import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Image, Text, View } from "react-native";

export const DetailsScreen = ({ route }) => {
  const [details, setDetails] = React.useState({});
  const { url } = route.params;

  const getDetailsFromApi = async () => {
    const response = await fetch(url);
    const json = await response.json();
    setDetails(json);
  };

  useEffect(() => {
    getDetailsFromApi();
  }, []);
  console.log("route ", details);
  return (
    <View
      style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}
    >
      <Image
        source={{ uri: details.avatar_url }}
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          marginVertical: 20,
        }}
      />
      <Text style={{ fontSize: 25 }}>
        {details.name ? details.name : details.login}
      </Text>
      <Text style={{ fontSize: 20, padding: 15 }}>
        {details.bio ? details.bio : "No Bio"}
      </Text>
      <Text>{`public_repos: ${details.public_repos}`} </Text>
      <Text>{`public_gists: ${details.public_gists}`} </Text>
      <Text>{`followers: ${details.followers}`} </Text>
      <Text>{`following: ${details.following}`} </Text>
      <Text>{`created at: ${new Date(details.created_at).toLocaleDateString()}`} </Text>
    </View>
  );
};

DetailsScreen.propTypes = {
  route: PropTypes.object,
};
