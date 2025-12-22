import { BG, BUTTON, CARD, TEXT } from "@/constants/styles";
import Provider from "@/services/Provider";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DoctorHome = () => {
    const [statusWorking, setStatusWorking] = useState("end_working"); // end_working, stop_working, start_work
    const [startWork, setStartWork] = useState("");
    const [endWork, setEndWork] = useState("");
    const colorScheme = useColorScheme();
    const { t } = useTranslation();
    const router = useRouter();


    const checkWork = async () => {
        const start_work = await AsyncStorage.getItem("start_work");
        const end_work = await AsyncStorage.getItem("end_work");
        const stop_work = await AsyncStorage.getItem("stop_work");
        setStartWork(start_work ? start_work : "00:00");
        setEndWork(end_work ? end_work : "00:00");
        setStatusWorking(start_work && end_work ? "start_work" : stop_work ? "stop_work" : "end_working");
    }

    useEffect(() => {
        checkWork();
    }, []);


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
                        <View className="flex-1">
                            <Text className="text-white dark:text-white font-bold text-lg mb-1">{t("doctor_title_search")}</Text>

                            {statusWorking === "end_working" ?
                                <Text className="text-white dark:text-white text-md">{t("doctor_search_description")}</Text>
                                :
                                <View>
                                    <Text className="text-white dark:text-white text-md">  {startWork} - {endWork}</Text>
                                </View>
                            }

                            {statusWorking === "end_working" ? <View className="flex justify-center items-end">
                                <TouchableOpacity
                                    onPress={() => router.replace("/doctor/search_patient")}

                                    className={`${BUTTON.default} mt-4 flex justify-center items-center bg-white w-24 text-center h-14`}
                                >
                                    <Text className={`${BUTTON.default}  text-center  `}>{t("start_work")}</Text>
                                </TouchableOpacity>
                            </View>
                                :
                                <View className="flex flex-row justify-end">
                                    <TouchableOpacity
                                        onPress={() => router.replace("/doctor/search_patient")}

                                        className={`${BUTTON.default} mt-4 flex justify-center items-center bg-white w-24 text-center h-14 mr-2`}
                                    >
                                        <Text className={`${BUTTON.default}  text-center`}>{t("stop_work")}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => router.replace("/doctor/search_patient")}

                                        className={`${BUTTON.default} mt-4 flex justify-center items-center bg-white w-24 text-center h-14`}
                                    >
                                        <Text className={`${BUTTON.default}  text-center`}>{t("end_work")}</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default DoctorHome;