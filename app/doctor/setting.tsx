import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Setting = () => {
    return (
        <SafeAreaView className="flex-1 items-center justify-center bg-white dark:bg-gray-900">
            <Text className="text-lg font-medium text-gray-900 dark:text-gray-100">
                Setting Screen
            </Text>
        </SafeAreaView>
    );
};

export default Setting;
