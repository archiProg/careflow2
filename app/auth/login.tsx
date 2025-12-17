import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";

import { LoginResponse } from "@/models/LoginModel";
import { changeLanguage } from "@/services/I18n";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { useInternet } from "../../hooks/UseInternet";
import { RequestApi } from "../../services/RequestApi";

const LoginPage = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("kurt@gmail.com");
  const [password, setPassword] = useState("1");
  const isConnected = useInternet();
  const router = useRouter();

  const TryLogin = async (email: string, password: string) => {

    if (!isConnected) {
      Alert.alert("No Internet", "Please check your connection");
      return;
    }

    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    const api = new RequestApi();

    const body = {
      email: email,
      password: password,
    };

    const response = await api.postApi("/login", JSON.stringify(body));

    if (response.success) {
      let getResponse: LoginResponse;

      getResponse = JSON.parse(response.response);

      if (getResponse != null) {
        if (getResponse.token != null) {
          await AsyncStorage.setItem("email", email);
          await AsyncStorage.setItem("password", password);
          router.replace("/index");
        } else {
          if (getResponse.message == "Invalid email or password") {
            Alert.alert("Notification", getResponse.message);
          } else if (getResponse.message == "User not found or inactive") {
            Alert.alert("Notification", getResponse.message);
          } else {
            Alert.alert("Notification", getResponse.message);
          }
        }
      } else {
        Alert.alert("Response Error", JSON.stringify(response.response));
      }
    } else {
      Alert.alert("API Error", JSON.stringify(response.response));
    }
  };

  return (
    <SafeAreaView className="h-full p-4">
      <View>
        <View className="flex justify-end items-end">
          <View className="flex flex-row ">
            <Button title="EN" onPress={() => changeLanguage("en")} />
            <Button title="TH" onPress={() => changeLanguage("th")} />
          </View>
        </View>
        <Text>{t("email")}</Text>
        <TextInput
          placeholder={t("placeholder_email")}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <Text>{t("password")}</Text>
        <TextInput
          placeholder={t("placeholder_password")}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Button
          title={t("login")}
          onPress={async () => {
            await TryLogin(email, password);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default LoginPage;
