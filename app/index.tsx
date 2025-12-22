import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router"; // <-- ใช้ router จาก expo-router
import React, { useEffect } from "react";
import { Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import "./global.css";

import Loading from "@/components/loading";
import { BG } from "@/constants/styles";
import { useInternet } from "@/hooks/UseInternet";
import { LoginResponse } from "@/models/LoginModel";
import { User } from "@/models/ProfileModel";
import Provider from "@/services/Provider";
import { RequestApi } from "@/services/RequestApi";
import { JWT } from "@/utils/jwt";
import { loadLanguage } from "../services/I18n";
const StartupPage = () => {
  const router = useRouter();
  const isConnected = useInternet();
  const initLang = async () => {
    await loadLanguage();
  };

  const initApp = async (): Promise<Boolean> => {
    const email = await AsyncStorage.getItem("email");
    const password = await AsyncStorage.getItem("password");
    if (email != null && password != null) {
      var result = await TryLogin(email, password);
      return result;
    } else {
      return false;
    }
  };

  const TryLogin = async (email: string, password: string): Promise<Boolean> => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return false;
    }

    if (!isConnected) {
      Alert.alert("No Internet", "Please check your connection");
      return false;
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
          await AsyncStorage.setItem("token", getResponse.token);
          JWT.setToken(getResponse.token);
          return true;
        } else {
          if (getResponse.message == "Invalid email or password") {
            Alert.alert("Notification", getResponse.message);
          } else if (getResponse.message == "User not found or inactive") {
            Alert.alert("Notification", getResponse.message);
          } else {
            Alert.alert("Notification", getResponse.message);
          }
          return false;
        }
      } else {
        Alert.alert("Response Error", JSON.stringify(response.response));
        return false;
      }
    } else {
      Alert.alert("API Error", JSON.stringify(response.response));
      return false;
    }
  };

  const initProfile = async () => {

    if (!isConnected) {
      Alert.alert("No Internet", "Please check your connection");
      return false;
    }

    const api = new RequestApi();

    const response = await api.getApiJwt("/authme");

    if (response.success) {
      let getResponse: User;

      getResponse = JSON.parse(response.response);
      if (getResponse != null) {
        if (getResponse.id != null) {
          Provider.setProfile(getResponse);
          return true;
        }
        return false;
      }
      return false;
    } else {
      Alert.alert("API Error", JSON.stringify(response.response));
      return false;
    }
  };

  useEffect(() => {
    if (isConnected === null) return;
    const bootstrap = async () => {
      await initLang();
      var result = await initApp();
      if (result) {
        var resultProfile = await initProfile();
        if (resultProfile) {
          if (Provider.Profile != null) {
            if (Provider.Profile.role == "admin") {
              router.replace("/admin/admin_home");
            }
            else if (Provider.Profile.role == "patient") {
              router.replace("/patient/patient_home");
            }
            else if (Provider.Profile.role == "doctor") {
              router.replace("/doctor/main/doctor_home");
            }
            else {
              router.replace("/");
            }
          }
          else {
            router.replace("/auth/login");
          }
        }
        else {
          router.replace("/auth/login");
        }
      }
      else {
        router.replace("/auth/login");
      }
    };

    bootstrap();
  }, [isConnected]);

  return (
    <SafeAreaView className={`${BG.default} ${BG.center}`}>
      <Loading />
    </SafeAreaView>
  );
};

export default StartupPage;
