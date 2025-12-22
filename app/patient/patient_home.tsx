import { BG } from "@/constants/styles";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const PatientHome = () => {
    return (
        <SafeAreaView className={`${BG.default} ${BG.center}`}>
            <Text>PatientHome</Text>
        </SafeAreaView>
    );
};

export default PatientHome;
