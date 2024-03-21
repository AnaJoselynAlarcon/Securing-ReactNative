import React from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TRootStackParamList } from "./App";
/**
 * Import bcryptjs library and create a salt variable
 */

var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);

export interface IUser {
  username: string;
  password: string;
}

interface IProps {
  onLogin: (user: IUser) => void;
}

type TProps = NativeStackScreenProps<TRootStackParamList, "Login"> & IProps;

export default function Login(props: TProps) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  /*
   * Array of users with dynamically hashed passwords adding salt
   */
  const users: IUser[] = [
    { username: "joe", password: bcrypt.hashSync("secret", salt) },
    { username: "bob", password: bcrypt.hashSync("password", salt) },
  ];

  function login() {
    let foundUser: IUser | false = false;

    for (const user of users) {
      if (username === user.username) {
        /*
         * Compare hashed password with entered password
         */
        const isPasswordMatch = bcrypt.compare(password, user.password);
        if (isPasswordMatch) {
          foundUser = user;
          break;
        }
      }
    }

    if (foundUser) {
      props.onLogin(foundUser);
    } else {
      Alert.alert("Error", "Username or password is invalid.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.username}
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
      />
      <TextInput
        style={styles.password}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        /**
         * Set secureTextEntry to true to hide the password
         */
        secureTextEntry={true}
      />
      <Button title="Login" onPress={login} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  username: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
  },
  password: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
  },
});
