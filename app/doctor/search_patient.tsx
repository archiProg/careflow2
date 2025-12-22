import { BG } from "@/constants/styles";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, Text, useColorScheme, View } from "react-native";
import DatePicker from "react-native-date-picker";
import { SafeAreaView } from "react-native-safe-area-context";

const SearchPatient = () => {
    const colorScheme = useColorScheme();
    const { t } = useTranslation();
    const router = useRouter();

    const backButton = () => router.replace("/doctor/main/doctor_home");

    // Time state
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [pickerOpen, setPickerOpen] = useState(false);
    const [pickerMode, setPickerMode] = useState<"start" | "end">("start");

    // Calculate working hours
    const calculateWorkHours = () => {
        const diff = (endTime.getTime() - startTime.getTime()) / 1000 / 60 / 60;
        return diff > 0 ? diff.toFixed(1) : "0";
    };

    return (
        <SafeAreaView className={`${BG.default}`}>
            {/* Header */}
            <View className="flex-row items-center mb-8 px-3">
                <Pressable className="rounded-full" onPress={backButton}>
                    <FontAwesome
                        name="angle-left"
                        size={36}
                        color={colorScheme === "dark" ? "#fff" : "#000"}
                    />
                </Pressable>
            </View>

            {/* Content */}
            <View className="flex flex-col  items-center justify-center px-6">
                <Text className="text-2xl font-bold mb-6 text-black dark:text-white">
                    กำหนดระยะเวลางาน
                </Text>

                {/* Start Time */}
                <Pressable
                    className="w-full mb-4 h-12 rounded-xl bg-gray-100 dark:bg-gray-700 justify-center items-center px-4"
                    onPress={() => {
                        setPickerMode("start");
                        setPickerOpen(true);
                    }}
                >
                    <Text className="text-lg text-black dark:text-white">
                        เริ่มงาน: {startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </Text>
                </Pressable>

                {/* End Time */}
                <Pressable
                    className="w-full mb-4 h-12 rounded-xl bg-gray-100 dark:bg-gray-700 justify-center items-center px-4"
                    onPress={() => {
                        setPickerMode("end");
                        setPickerOpen(true);
                    }}
                >
                    <Text className="text-lg text-black dark:text-white">
                        เลิกงาน: {endTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </Text>
                </Pressable>

                {/* Work hours */}
                <Text className="mb-6 text-black dark:text-white">
                    จำนวนเวลาที่ทำงาน: {calculateWorkHours()} ชั่วโมง
                </Text>

                {/* Start Work Button */}
                <Pressable
                    onPress={() => {
                        console.log("Start:", startTime, "End:", endTime);
                        // เรียก API หรือ navigate ต่อ
                    }}
                    className="h-[56px] w-full rounded-[24px] bg-black items-center justify-center dark:bg-[#2196F3]"
                >
                    <Text className="text-white font-bold">{t("start_work")}</Text>
                </Pressable>
            </View>

            {/* Date Picker Modal */}
            <DatePicker
                modal
                open={pickerOpen}
                date={pickerMode === "start" ? startTime : endTime}
                mode="time"
                onConfirm={(date) => {
                    setPickerOpen(false);
                    if (pickerMode === "start") setStartTime(date);
                    else setEndTime(date);
                }}
                onCancel={() => setPickerOpen(false)}
            />
        </SafeAreaView>
    );
};

export default SearchPatient;
