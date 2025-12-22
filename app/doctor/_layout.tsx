import { FontAwesome } from '@expo/vector-icons';
import { Label, NativeTabs } from 'expo-router/unstable-native-tabs';
import { useColorScheme } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <NativeTabs>
      <NativeTabs.Trigger name="doctor_home">
        <Label>Home</Label>
        <FontAwesome name="angle-left" size={24} color={colorScheme === "dark" ? "#fff" : "#444"} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="doctor_history">
        <Label>History</Label>
        <FontAwesome name="angle-left" size={24} color={colorScheme === "dark" ? "#fff" : "#444"} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="setting">
        <FontAwesome name="angle-left" size={24} color={colorScheme === "dark" ? "#fff" : "#444"} />
        <Label>Settings</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}