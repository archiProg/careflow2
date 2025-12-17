import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router"; // <-- ใช้ router จาก expo-router
import React, { useEffect } from "react";
import { ActivityIndicator, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import "./global.css";

import { useInternet } from "@/hooks/UseInternet";
import { LoginResponse } from "@/models/LoginModel";
import { RequestApi } from "@/services/RequestApi";
import { loadLanguage } from "../services/I18n";
const StartupPage = () => {
  const router = useRouter();
  const isConnected = useInternet();
  const initLang = async () => {
    await loadLanguage();
  };

  const initApp = async () => {
    const email = await AsyncStorage.getItem("email");
    const password = await AsyncStorage.getItem("password");
    if (email != null && password != null) {
      TryLogin(email, password);
    } else {
      router.replace("/auth/login");
    }
  };

  const TryLogin = async (email: string, password: string) => {

    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    if (!isConnected) {
      Alert.alert("No Internet", "Please check your connection");
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
          if (getResponse.user.role == "patient") {
            router.replace("/patient/PatientHome");
          } else if (getResponse.user.role == "doctor") {
            router.replace("/doctor/DoctorHome");
          }
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

  useEffect(() => {
    if (isConnected === null) return;
    const bootstrap = async () => {
      await initLang();
      await initApp();
    };

    bootstrap();
  }, [isConnected]);

  return (
    <SafeAreaView className="h-full bg-gray-500 flex justify-center items-center">
      <ActivityIndicator size="large" color="#3498db" />
    </SafeAreaView>
  );
};

export default StartupPage;
