import { BG } from "@/constants/styles";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, Text, useColorScheme, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

const SearchPatient = () => {
    const colorScheme = useColorScheme();

    const router = useRouter();
    const backButton = () => {
        router.replace("/doctor/main/doctor_home");
    };

    return (
        <SafeAreaView className={`${BG.default} ${BG.center}`}>
            <View className="flex-row items-center mb-8">
                <View className="flex items-start">
                    <Pressable className="px-3 rounded-full" onPress={backButton}>
                        <FontAwesome
                            name="angle-left"
                            size={36}
                            className="text-black dark:text-white"
                            color={colorScheme === "dark" ? "#fff" : "#000"}
                        />
                    </Pressable>
                </View>

                <View>
                    <Text className="text-2xl font-bold">SearchPatient</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default SearchPatient;