import { BG } from "@/constants/styles";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DoctorHistory = () => {
    return (
        <SafeAreaView className={`${BG.default} ${BG.center}`}>
            <Text className="text-lg font-medium text-gray-900 dark:text-gray-100">
                Doctor History Screen
            </Text>
        </SafeAreaView>
    );
};

export default DoctorHistory;