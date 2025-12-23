import { BG } from "@/constants/styles";
import { AppDispatch, RootState } from "@/store";
import { setStartWork, setStatus, setTimesWork } from "@/store/workSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

const SearchPatient = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const startWork = useSelector((s: RootState) => s.work.startWork);

  const [pickerOpen, setPickerOpen] = useState(false);
  const [hours, setHours] = useState(1);
  const [minutes, setMinutes] = useState(0);

  const startDate = startWork ? new Date(startWork) : new Date();

  const saveWork = async () => {
    const timeStr = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;

    await AsyncStorage.setItem("start_work", startDate.toISOString());
    await AsyncStorage.setItem("times_work", timeStr);

    dispatch(setStartWork(startDate.toISOString()));
    dispatch(setTimesWork(timeStr));
    dispatch(setStatus("start_work"));

    router.back();
  };

  return (
    <SafeAreaView className={`${BG.default} flex-1`}>
      <ScrollView className="flex-1 px-6">
        {/* Header */}
        <View className="pt-4 pb-8">
          <Text className="text-3xl font-bold text-black dark:text-white">
            กำหนดเวลางาน
          </Text>
          <Text className="text-gray-500 dark:text-gray-400 mt-2">
            เลือกเวลาเริ่มต้นและระยะเวลาทำงาน
          </Text>
        </View>

        {/* Start Time Card */}
        <View className="mb-6">
          <Text className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3 ml-1">
            เวลาเริ่มงาน
          </Text>
          <Pressable
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl border-2 border-gray-200 dark:border-gray-700 shadow-sm active:scale-98"
            onPress={() => setPickerOpen(true)}
          >
            <View className="items-center">
              <Text className="text-4xl font-bold text-black dark:text-white mb-1">
                {startDate.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}
              </Text>
              <Text className="text-base text-gray-500 dark:text-gray-400">
                {startDate.toLocaleDateString('th-TH', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </Text>
            </View>
          </Pressable>
        </View>

        {/* Duration Card */}
        <View className="mb-8">
          <Text className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3 ml-1">
            ระยะเวลาทำงาน
          </Text>
          <View className="bg-white dark:bg-gray-800 p-6 rounded-2xl border-2 border-gray-200 dark:border-gray-700 shadow-sm">
            {/* Display Total Time */}
            <View className="items-center mb-6">
              <Text className="text-5xl font-bold text-black dark:text-white">
                {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}
              </Text>
              <Text className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                ชั่วโมง : นาที
              </Text>
            </View>

            {/* Hour Controls */}
            <View className="mb-4">
              <Text className="text-xs text-gray-500 dark:text-gray-400 mb-2 text-center">
                ชั่วโมง
              </Text>
              <View className="flex-row items-center justify-center gap-4">
                <Pressable
                  className="w-14 h-14 bg-gray-100 dark:bg-gray-700 rounded-full items-center justify-center active:scale-95"
                  onPress={() => setHours((h) => Math.max(0, h - 1))}
                >
                  <Text className="text-2xl font-bold text-black dark:text-white">−</Text>
                </Pressable>
                
                <View className="w-20 h-14 bg-gray-50 dark:bg-gray-900 rounded-xl items-center justify-center">
                  <Text className="text-2xl font-bold text-black dark:text-white">
                    {hours}
                  </Text>
                </View>
                
                <Pressable
                  className="w-14 h-14 bg-gray-100 dark:bg-gray-700 rounded-full items-center justify-center active:scale-95"
                  onPress={() => setHours((h) => h + 1)}
                >
                  <Text className="text-2xl font-bold text-black dark:text-white">+</Text>
                </Pressable>
              </View>
            </View>

            {/* Minute Controls */}
            <View>
              <Text className="text-xs text-gray-500 dark:text-gray-400 mb-2 text-center">
                นาที
              </Text>
              <View className="flex-row items-center justify-center gap-4">
                <Pressable
                  className="w-14 h-14 bg-gray-100 dark:bg-gray-700 rounded-full items-center justify-center active:scale-95"
                  onPress={() => setMinutes((m) => (m - 15 + 60) % 60)}
                >
                  <Text className="text-2xl font-bold text-black dark:text-white">−</Text>
                </Pressable>
                
                <View className="w-20 h-14 bg-gray-50 dark:bg-gray-900 rounded-xl items-center justify-center">
                  <Text className="text-2xl font-bold text-black dark:text-white">
                    {minutes}
                  </Text>
                </View>
                
                <Pressable
                  className="w-14 h-14 bg-gray-100 dark:bg-gray-700 rounded-full items-center justify-center active:scale-95"
                  onPress={() => setMinutes((m) => (m + 5) % 60)}
                >
                  <Text className="text-2xl font-bold text-black dark:text-white">+</Text>
                </Pressable>
              </View>
            </View>

            {/* Quick Presets */}
            <View className="flex-row gap-2 mt-6">
              <Pressable
                className="flex-1 py-2 px-3 bg-gray-100 dark:bg-gray-700 rounded-lg active:scale-95"
                onPress={() => { setHours(1); setMinutes(0); }}
              >
                <Text className="text-center text-sm font-medium text-black dark:text-white">
                  1 ชม.
                </Text>
              </Pressable>
              <Pressable
                className="flex-1 py-2 px-3 bg-gray-100 dark:bg-gray-700 rounded-lg active:scale-95"
                onPress={() => { setHours(2); setMinutes(0); }}
              >
                <Text className="text-center text-sm font-medium text-black dark:text-white">
                  2 ชม.
                </Text>
              </Pressable>
              <Pressable
                className="flex-1 py-2 px-3 bg-gray-100 dark:bg-gray-700 rounded-lg active:scale-95"
                onPress={() => { setHours(4); setMinutes(0); }}
              >
                <Text className="text-center text-sm font-medium text-black dark:text-white">
                  4 ชม.
                </Text>
              </Pressable>
              <Pressable
                className="flex-1 py-2 px-3 bg-gray-100 dark:bg-gray-700 rounded-lg active:scale-95"
                onPress={() => { setHours(8); setMinutes(0); }}
              >
                <Text className="text-center text-sm font-medium text-black dark:text-white">
                  8 ชม.
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Fixed Button */}
      <View className="px-6 pb-6 pt-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <Pressable
          onPress={saveWork}
          className="bg-black dark:bg-[#2196F3] h-14 rounded-2xl justify-center items-center active:scale-98 shadow-lg"
        >
          <Text className="text-white font-bold text-lg">เริ่มทำงาน</Text>
        </Pressable>
      </View>

      {pickerOpen && (
        <DateTimePicker
          value={startDate}
          mode="datetime"
          onChange={(_, date) => {
            setPickerOpen(false);
            if (date) dispatch(setStartWork(date.toISOString()));
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default SearchPatient;