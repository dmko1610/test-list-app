import React, { useEffect } from "react";
import {
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  Text,
  View,
  StyleSheet,
} from "react-native";
import PropTypes from "prop-types";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { toggleDetails } from "../Actions/Actions";

const GET_EVENTS = "https://api.github.com/events";

let interval = 0;

const initInterval = (getUsersFromApi) => {
  getUsersFromApi();
  interval = setInterval(() => getUsersFromApi(), 6 * 1000);
  console.log("I was emitted");
};

const UsersList = ({ change, users, getUsersFromApi }) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getUsersFromApi().then(() => setRefreshing(false));
    clearInterval(interval);
    initInterval(getUsersFromApi);
  }, []);
  return (
    <FlatList
      data={users}
      renderItem={({ item }) => (
        <UserItem
          change={change}
          avatarUrl={item.actor.avatar_url}
          displayLogin={item.actor.display_login}
          url={item.actor.url}
        />
      )}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      onScrollBeginDrag={() => {
        clearInterval(interval);
        console.log("after crol ", interval);
      }}
      onScrollEndDrag={() => initInterval(getUsersFromApi)}
    />
  );
};

const UserItem = ({ change, url, avatarUrl, displayLogin }) => {
  const navigation = useNavigation();
  const onPressItem = () => {
    clearInterval(interval);
    navigation.navigate("Details", { url });
    change(true);
  };
  return (
    <Pressable
      style={styles.userContainer}
      onPress={() => onPressItem()}
      android_ripple={{
        color: "darkgray",
        borderless: false,
      }}
    >
      <Image source={{ uri: avatarUrl }} style={styles.avatar} />
      <Text style={styles.login}>{displayLogin}</Text>
    </Pressable>
  );
};

export const HomeScreen = () => {
  const isOpened = useSelector((state) => state.main.isDetailsOpened);
  const dispatch = useDispatch();

  const change = (isOpened) => dispatch(toggleDetails(isOpened));

  const [users, setUsers] = React.useState([]);

  const getUsersFromApi = async () => {
    console.log("executed ", interval);
    try {
      const response = await fetch(GET_EVENTS);
      const json = await response.json();
      setUsers(json.slice(0, 25));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    initInterval(getUsersFromApi);
    return function cleanup() {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (isOpened) {
      initInterval(getUsersFromApi);
    }
  }, [isOpened]);

  return (
    <View>
      <UsersList
        change={change}
        getUsersFromApi={getUsersFromApi}
        users={users}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  login: {
    fontSize: 25,
    paddingLeft: 14,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userContainer: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 15,
    marginLeft: 10,
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

UsersList.propTypes = {
  users: PropTypes.array,
  getUsersFromApi: PropTypes.func,
  change: PropTypes.func,
};
UserItem.propTypes = {
  avatarUrl: PropTypes.string,
  displayLogin: PropTypes.string,
  url: PropTypes.string,
  change: PropTypes.func,
};
