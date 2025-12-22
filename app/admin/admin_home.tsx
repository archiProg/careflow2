import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const AdminHome = () => {
    return (
        <SafeAreaView className="flex-1 items-start justify-start bg-white dark:bg-gray-900 p-4">
            <View>
                <Text>Admin Home</Text>
            </View>
        </SafeAreaView>
    );
};

export default AdminHome;