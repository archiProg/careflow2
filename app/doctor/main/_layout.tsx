import { FontAwesome } from '@expo/vector-icons';
import { Icon, Label, NativeTabs, VectorIcon } from 'expo-router/unstable-native-tabs';
import { useTranslation } from 'react-i18next';

const TabLayout = () => {
  const { t } = useTranslation();
  return (
    <NativeTabs >
      <NativeTabs.Trigger name="doctor_home">
        <Label>{t("home")}</Label>
        <Icon src={<VectorIcon family={FontAwesome} name="home" />} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="doctor_history">
        <Label>{t("history")}</Label>
        <Icon src={<VectorIcon family={FontAwesome} name="history" />} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="setting">
        <Label>{t("setting")}</Label>
        <Icon src={<VectorIcon family={FontAwesome} name="gear" />} />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}

export default TabLayout;