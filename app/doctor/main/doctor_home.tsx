import { BG, BUTTON, CARD, TEXT } from "@/constants/styles";
import Provider from "@/services/Provider";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Image, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DoctorHome = () => {
    const colorScheme = useColorScheme();
    const { t } = useTranslation();
    const router = useRouter();
    return (
        <SafeAreaView className={`${BG.default}`}>
            <View className="flex flex-row items-center">
                <View>
                    {Provider.Profile?.doctor_profile?.profile_detail ? (
                        <Image
                            source={{ uri: Provider.Profile?.doctor_profile.profile_detail }}
                            className="w-24 h-24 rounded-full"
                        />
                    ) : (
                        <FontAwesome
                            name="user-md"
                            size={36}
                            className=" text-black dark:text-white"
                            color={colorScheme === "dark" ? "#fff" : "#444"}
                        />
                    )}
                </View>
                <View className="ml-4">
                    <Text className={`${TEXT.default} ${TEXT.subtitle}`}>{Provider.Profile?.name}</Text>
                    <Text className={`${TEXT.description}`}>{Provider.Profile?.role ? Provider.Profile?.role[0].toUpperCase() + Provider.Profile?.role.slice(1) : ""}</Text>
                </View>
            </View>
            <View className="mt-4">
                <View className={`${CARD.default} bg-black dark:bg-[#2196F3]`}>
                    <View className="flex-row justify-between items-center">
                        <View className="flex-1 pr-2">
                            <Text className="text-white dark:text-white font-bold text-lg mb-1">{t("doctor_title_search")}</Text>
                            <Text className="text-white dark:text-white text-sm">{t("doctor_search_description")}</Text>

                            <View className="flex justify-center items-end">
                                <TouchableOpacity
                                    onPress={() => router.replace("/doctor/search_patient")}

                                    className={`${BUTTON.default} mt-4 flex justify-center items-center bg-white w-24 text-center h-14`}
                                >
                                    <Text className={`${BUTTON.default}  text-center  `}>{t("start_work")}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default DoctorHome;