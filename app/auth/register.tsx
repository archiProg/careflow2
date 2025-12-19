import { CheckEmail } from "@/hooks/CheckEmail";
import { RequestApi } from "@/services/RequestApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Button, Image, Platform, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from "../../components/loading";

const RegisterPage = () => {
    const router = useRouter();
    const { email_param } = useLocalSearchParams<{ email_param?: string }>();
    const { t } = useTranslation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [name, setName] = useState("");
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [gender, setGender] = useState<number>(0);
    const [statusRegistor, setStatusRegistor] = useState<number>(1);
    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState<string | null>(null);
    const [iDCard, setIDCard] = useState<string>("");

    const handleRegister = async () => {
        if (statusRegistor == 1) {

            if (!name) {
                Alert.alert("Notification", "Please enter name");
                return;
            }

            if (!email) {
                Alert.alert("Notification", "Please enter email");
                return;
            }

            const checkEmail = await CheckEmail(email);
            if (checkEmail.status !== 0) {
                Alert.alert("Notification", checkEmail.message);
                return;
            }

            if (!date) {
                Alert.alert("Notification", "Please select date");
                return;
            }

            if (!gender || gender === 0) {
                Alert.alert("Notification", "Please select gender");
                return;
            }

            if (!password) {
                Alert.alert("Notification", "Please enter password");
                return;
            }

            if (!passwordConfirm) {
                Alert.alert("Notification", "Please enter password confirm");
                return;
            }

            if (password !== passwordConfirm) {
                Alert.alert("Notification", "Password not match");
                return;
            }

            setStatusRegistor(2);


        }
        if (statusRegistor == 2) {

            if (!image) {
                Alert.alert("Notification", "Please select image");
                return;
            }
            if (!iDCard) {
                Alert.alert("Notification", "Please enter ID card");
                return;
            }



            try {

                const api = new RequestApi();

                const head: Record<string, string> = {
                    password: password,
                    birthday: date.toISOString().split("T")[0],
                    sex: gender.toString(),
                    id_card: iDCard,
                    name: name,
                    email: email,
                };

                const file: Record<string, string> = {};
                if (image) {
                    file['image'] = image;
                }

                const response = await api.postApi("/register", "", head, file);

                if (response.success) {
                    await AsyncStorage.setItem("email", email);
                    await AsyncStorage.setItem("password", password);
                } else {
                    Alert.alert('Notice', response.response, [{ text: 'OK' }]);
                }
            } catch (ex: any) {
                Alert.alert('Notice', ex.message || 'Unknown error', [{ text: 'OK' }]);
            } finally {
                Alert.alert('Notice', 'Register success', [{ text: 'OK' }]);
                router.replace("/");
            }
        }
    }



    const pickFromGallery = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission denied', 'Cannot access gallery');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'images',
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const pickFromCamera = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission denied', 'Cannot access camera');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: 'images',
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const pickImage = () => {
        Alert.alert(
            'Select Image',
            'Choose from camera or gallery',
            [
                { text: 'Camera', onPress: pickFromCamera },
                { text: 'Gallery', onPress: pickFromGallery },
                { text: 'Cancel', style: 'cancel' },
            ],
            { cancelable: true }
        );
    };


    const handleApi = async (action: string) => {
        setIsLoading(true);
        if (action == "Register") {
            await handleRegister();
        }
        setIsLoading(false);
    }

    useEffect(() => {
        setEmail(email_param || "");
    }, [email_param]);




    const backButton = () => {
        if (statusRegistor == 1) {
            router.replace("/auth/login");
        }
        else {
            setStatusRegistor(1);
        }
    }


    return (
        <>
            <SafeAreaView className="h-full p-4 bg-white dark:bg-gray-900">
                <Text>{statusRegistor}/2</Text>
                <Button title="Back" onPress={() => backButton()} />
                <Text>Register</Text>
                {
                    statusRegistor == 1 ? (
                        <>
                            <TextInput
                                placeholder={t("placeholder_name")}
                                keyboardType="default"
                                autoCapitalize="none"
                                value={name}
                                onChangeText={setName}
                            />
                            <TextInput
                                placeholder={t("placeholder_email")}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={email}
                                onChangeText={setEmail}
                            />
                            <View className="w-full flex-row gap-4">
                                <View className="flex-1">
                                    <Text className="mb-2">Date of birth</Text>

                                    <Pressable onPress={() => setShow(true)}>
                                        <Text className="p-3 border rounded">
                                            {date.toDateString()}
                                        </Text>
                                    </Pressable>

                                    {show && (
                                        <DateTimePicker
                                            value={date}
                                            mode="date"
                                            display={Platform.OS === "android" ? "calendar" : "default"}
                                            onChange={(event, selectedDate) => {
                                                setShow(false);
                                                if (selectedDate) setDate(selectedDate);
                                            }}
                                        />
                                    )}
                                </View>

                                <View className="flex-1">
                                    <Text className="mb-2">Gender</Text>

                                    <Picker
                                        selectedValue={gender}
                                        onValueChange={(itemValue) => setGender(itemValue)}
                                    >
                                        {gender === 0 && <Picker.Item label="Select Gender" value={0} />}
                                        <Picker.Item label="Male" value={1} />
                                        <Picker.Item label="Female" value={2} />
                                    </Picker>

                                </View>
                            </View>

                            <TextInput
                                placeholder={t("placeholder_password")}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />

                            <TextInput
                                placeholder={t("placeholder_password_confirm")}
                                value={passwordConfirm}
                                onChangeText={setPasswordConfirm}
                                secureTextEntry
                            />
                        </>
                    ) : (
                        <>
                            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                                <Button title="Pick Image" onPress={pickImage} />
                                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginTop: 10 }} />}
                            </View>
                            <Text>ID Card</Text>
                            <TextInput
                                placeholder={t("placeholder_id_card")}
                                value={iDCard}
                                onChangeText={setIDCard}
                            />
                        </>
                    )
                }
                <Button title={statusRegistor === 1 ? t("continue") : t("register")} onPress={() => handleApi("Register")} />

            </SafeAreaView>

            {
                isLoading && <SafeAreaView className="absolute w-full h-full flex items-center justify-center bg-black/50">
                    <View className="w-48 h-48 rounded-xl bg-white overflow-hidden justify-center items-center dark:bg-gray-900">
                        <Loading />
                    </View>
                </SafeAreaView>
            }
        </>
    );
};

export default RegisterPage;
