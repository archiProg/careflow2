import { BG } from "@/constants/styles";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Setting = () => {
    return (
        <SafeAreaView className={`${BG.default} ${BG.center}`}>
            <Text className="text-lg font-medium text-gray-900 dark:text-gray-100">
                Setting Screen
            </Text>
        </SafeAreaView>
    );
};

export default Setting;
