import { FontAwesome } from '@expo/vector-icons';
import { Icon, Label, NativeTabs, VectorIcon } from 'expo-router/unstable-native-tabs';

export default function TabLayout() {
  return (
    <NativeTabs >
      <NativeTabs.Trigger name="doctor_home">
        <Label>Home</Label>
        <Icon src={<VectorIcon family={FontAwesome} name="home" />} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="doctor_history">
        <Label>History</Label>
        <Icon src={<VectorIcon family={FontAwesome} name="history" />} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="setting">
        <Label>Settings</Label>
        <Icon src={<VectorIcon family={FontAwesome} name="gear" />} />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}