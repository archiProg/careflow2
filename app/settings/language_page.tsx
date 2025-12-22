import { BG } from "@/constants/styles";
import { changeLanguage } from "@/services/I18n";
import Provider from "@/services/Provider";
import { FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { replace } from "expo-router/build/global-state/routing";
import React, { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LanguageSelector = () => {
  const colorScheme = useColorScheme();
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [defaultLanguage, setDefaultLanguage] = useState("en");
  const [isApplyButtonDisabled, setIsApplyButtonDisabled] = useState(true);
  const { reference_page } = useLocalSearchParams<{
    reference_page?: string;
  }>();
  const languages = [
    { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
    { code: "th", name: "Thai", nativeName: "ไทย", flag: "🇹🇭" },
  ];

  const handleLanguageSelect = (code: string) => {
    setSelectedLanguage(code);
    if (defaultLanguage == code) {
      setIsApplyButtonDisabled(true);
    } else {
      setIsApplyButtonDisabled(false);
    }
  };

  const handleApply = () => {
    changeLanguage(selectedLanguage);
    setDefaultLanguage(selectedLanguage);
    setIsApplyButtonDisabled(true);
  };

  const handleBack = () => {
    if (reference_page === "setting") {
      // Navigate back to settings page
    } else if (reference_page === "login") {
      replace("/auth/login");
    }
  };

  useEffect(() => {
    if (Provider.Language) {
      setSelectedLanguage(Provider.Language);
      setDefaultLanguage(Provider.Language);
    }
  }, []);

  return (
    <SafeAreaView className={`${BG.default} ${BG.center}`}>
      <View className="flex w-full p-5 justify-start items-start">
        <Pressable
          className="flex-row items-center justify-start px-3 rounded-full"
          onPress={() => {
            handleBack();
          }}
        >
          <FontAwesome
            name="angle-left"
            size={36}
            className=" text-black dark:text-white"
            color={colorScheme === "dark" ? "#fff" : "#000"}
          />
        </Pressable>
      </View>

      <ScrollView
        contentContainerClassName="p-5 pb-10"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="items-center mb-8">
          <View className="w-16 h-16 rounded-full bg-white items-center justify-center mb-4 shadow-lg">
            <FontAwesome
              name="globe"
              size={36}
              color="#000"
              className="text-black dark:text-white"
            />
          </View>
          <Text className="text-3xl font-bold text-gray-800 mb-2 text-center dark:text-white">
            Select Your Language
          </Text>
          <Text className="text-base text-gray-600 text-center dark:text-gray-400">
            Choose your preferred language to continue
          </Text>
        </View>

        {/* Language List */}
        <View className="bg-white rounded-2xl p-2 shadow-lg mb-6 dark:bg-gray-900">
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              className={`flex-row items-center justify-between p-4 rounded-xl my-1 border-2 mb-2 ${selectedLanguage === lang.code
                ? "bg-gray-50 border-black dark:bg-indigo-50 dark:border-[#2196F3]"
                : "bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700"
                }`}
              onPress={() => handleLanguageSelect(lang.code)}
              activeOpacity={0.7}
            >
              <View className="flex-row items-center flex-1">
                <Text className="text-3xl mr-4">{lang.flag}</Text>
                <View className="flex-1">
                  <Text
                    className={`text-base font-semibold text-gray-800  ${selectedLanguage === lang.code ? "dark:text-gray-800" : "dark:text-gray-400 "}`}
                  >
                    {lang.name}
                  </Text>
                  <Text
                    className={`text-sm text-gray-500  ${selectedLanguage === lang.code ? "dark:text-gray-800" : "dark:text-gray-400 "}`}
                  >
                    {lang.nativeName}
                  </Text>
                </View>
              </View>

              {selectedLanguage === lang.code && (
                <View className="w-6 h-6 rounded-full bg-black items-center justify-center dark:bg-[#2196F3]">
                  <Text className="text-white text-xs font-bold">✓</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View className="p-4 px-6">
        <TouchableOpacity
          disabled={isApplyButtonDisabled}
          className={`bg-black py-4 px-8 rounded-[24px] h-[56px] items-center shadow-lg mb-4 dark:bg-[#2196F3] ${isApplyButtonDisabled ? "opacity-50" : ""}`}
          onPress={isApplyButtonDisabled ? undefined : handleApply}
          activeOpacity={0.8}
        >
          <Text className="text-white text-lg font-semibold">Apply</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LanguageSelector;
