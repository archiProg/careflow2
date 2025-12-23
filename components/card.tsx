import { FontAwesome5 } from "@expo/vector-icons";
import { Href, useRouter } from "expo-router";
import React, { ReactNode } from "react";
import { Text, TouchableOpacity, View, ViewStyle } from "react-native";

interface CardAction {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger" | "success" | "warning";
  icon?: string;
  disabled?: boolean;
}

interface CardProps {
  // Styling
  className?: string;
  style?: ViewStyle;
  variant?: "default" | "gradient" | "outlined" | "flat";
  
  // Content
  title: string;
  subtitle?: string;
  description?: string;
  icon?: string;
  badge?: string;
  badgeColor?: string;
  children?: ReactNode;
  
  // Header options
  urldetail?: Href;
  detailLabel?: string;
  showDetailButton?: boolean;
  
  // Subtitle options
  showSubtitleIcon?: boolean;
  subtitleIcon?: string;
  
  // Actions
  actions?: CardAction[];
  actionLayout?: "horizontal" | "vertical" | "grid";
  
  // Size
  size?: "sm" | "md" | "lg";
  minHeight?: number;
}

const Card: React.FC<CardProps> = ({
  className = "",
  style,
  variant = "default",
  title,
  subtitle,
  description,
  icon,
  badge,
  badgeColor = "bg-blue-500",
  children,
  urldetail,
  detailLabel = "Detail",
  showDetailButton = true,
  showSubtitleIcon = true,
  subtitleIcon = "clock",
  actions,
  actionLayout = "horizontal",
  size = "md",
  minHeight,
}) => {
  const router = useRouter();

  // Get card variant styles
  const getCardStyle = () => {
    switch (variant) {
      case "gradient":
        return "bg-gradient-to-br from-purple-500 to-blue-600";
      case "outlined":
        return "bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600";
      case "flat":
        return "bg-gray-100 dark:bg-gray-800";
      default:
        return "";
    }
  };

   const getSizePadding = () => {
    switch (size) {
      case "sm":
        return "p-4";
      case "lg":
        return "p-8";
      default:
        return "p-6";
    }
  };

  const getMinHeight = () => {
    if (minHeight) return minHeight;
    switch (size) {
      case "sm":
        return 150;
      case "lg":
        return 250;
      default:
        return 200;
    }
  };

  // Get action button style
  const getActionStyle = (action: CardAction) => {
    if (action.disabled) {
      return "bg-gray-300 dark:bg-gray-700";
    }

    const isEndButton = action.label.toLowerCase() === "end";
    const isPauseButton = action.label.toLowerCase() === "pause";
    const isResumeButton = action.label.toLowerCase() === "resume";
    const isStartButton = action.label.toLowerCase() === "start";

    if (isEndButton) return "bg-red-500";
    if (isPauseButton) return "bg-amber-500";
    if (isResumeButton) return "bg-green-500";
    if (isStartButton) return "bg-white";

    switch (action.variant) {
      case "danger":
        return "bg-red-500";
      case "success":
        return "bg-green-500";
      case "warning":
        return "bg-orange-500";
      case "secondary":
        return "bg-gray-100 dark:bg-gray-700";
      default:
        return "bg-white";
    }
  };

  const getActionTextStyle = (action: CardAction) => {
    if (action.disabled) {
      return "text-gray-500";
    }

    const needsWhiteText = 
      action.variant === "danger" || 
      action.variant === "success" || 
      action.variant === "warning" ||
      action.label.toLowerCase() === "end" ||
      action.label.toLowerCase() === "pause" ||
      action.label.toLowerCase() === "resume";

    if (needsWhiteText) return "text-white";

    switch (action.variant) {
      case "secondary":
        return "text-gray-700 dark:text-gray-200";
      default:
        return "text-black";
    }
  };

  const getActionIcon = (action: CardAction) => {
    if (action.icon) return action.icon;

    const label = action.label.toLowerCase();
    if (label === "pause") return "pause";
    if (label === "resume" || label === "start") return "play";
    if (label === "end" || label === "stop") return "stop";
    if (label === "delete") return "trash";
    if (label === "edit") return "edit";
    if (label === "save") return "save";
    if (label === "cancel") return "times";
    return null;
  };

  return (
    <View 
      className={`${className} ${getCardStyle()} rounded-2xl shadow-lg overflow-hidden`}
      style={[{ minHeight: getMinHeight() }, style]}
    >
      {/* Header Section */}
      <View className={`${getSizePadding()} pb-4`}>
        <View className="flex-row justify-between items-start mb-2">
          <View className="flex-1 pr-4 flex-row items-center">
            {/* Icon */}
            {icon && (
              <View className="mr-3">
                <FontAwesome5 
                  name={icon} 
                  size={size === "sm" ? 18 : size === "lg" ? 28 : 24} 
                  color="white" 
                />
              </View>
            )}
            
            {/* Title */}
            <View className="flex-1">
              <Text 
                className={`text-white font-bold leading-tight ${
                  size === "sm" ? "text-lg" : size === "lg" ? "text-3xl" : "text-2xl"
                }`}
              >
                {title}
              </Text>
              
              {/* Badge */}
              {badge && (
                <View className={`${badgeColor} px-2 py-1 rounded-full self-start mt-2`}>
                  <Text className="text-white text-xs font-semibold">{badge}</Text>
                </View>
              )}
            </View>
          </View>
          
          {/* Detail Button */}
          {urldetail && showDetailButton && (
            <TouchableOpacity
              onPress={() => router.push(urldetail)}
              className="bg-white/20 px-4 py-2 rounded-full flex-row items-center active:scale-95"
              activeOpacity={0.8}
            >
              <Text className="text-white text-sm font-semibold mr-1">
                {detailLabel}
              </Text>
              <FontAwesome5 name="arrow-right" size={12} color="white" />
            </TouchableOpacity>
          )}
        </View>

        {/* Subtitle with Icon */}
        {subtitle && (
          <View className="flex-row items-center mt-3 bg-white/10 rounded-xl p-3">
            {showSubtitleIcon && (
              <FontAwesome5 
                name={subtitleIcon} 
                size={14} 
                color="rgba(255,255,255,0.8)" 
                style={{ marginRight: 8 }}
              />
            )}
            <Text className="text-white/90 text-sm font-medium flex-1">
              {subtitle}
            </Text>
          </View>
        )}

        {/* Description */}
        {description && (
          <Text className="text-white/70 text-sm mt-3 leading-5">
            {description}
          </Text>
        )}

        {/* Custom Children */}
        {children && (
          <View className="mt-3">
            {children}
          </View>
        )}
      </View>

      {/* Actions Section */}
      {actions && actions.length > 0 && (
        <View className="px-6 pb-6 pt-2">
          <View 
            className={`
              ${actionLayout === "vertical" ? "flex-col gap-2" : ""}
              ${actionLayout === "grid" ? "flex-row flex-wrap gap-2" : ""}
              ${actionLayout === "horizontal" ? `flex-row gap-3 ${actions.length === 1 ? "justify-end" : "justify-between"}` : ""}
            `}
          >
            {actions.map((action, index) => {
              const actionIcon = getActionIcon(action);
              
              return (
                <TouchableOpacity
                  key={index}
                  onPress={action.onPress}
                  disabled={action.disabled}
                  className={`
                    ${actionLayout === "horizontal" && actions.length === 1 ? "px-8" : ""}
                    ${actionLayout === "horizontal" && actions.length > 1 ? "flex-1" : ""}
                    ${actionLayout === "vertical" ? "w-full" : ""}
                    ${actionLayout === "grid" ? "flex-1 min-w-[45%]" : ""}
                    ${getActionStyle(action)}
                    rounded-xl items-center justify-center py-3.5 shadow-md 
                    ${action.disabled ? "opacity-50" : "active:scale-95"}
                  `}
                  activeOpacity={0.8}
                >
                  <View className="flex-row items-center">
                    {actionIcon && (
                      <FontAwesome5 
                        name={actionIcon} 
                        size={14} 
                        color={getActionTextStyle(action).includes("white") ? "white" : "black"}
                        style={{ marginRight: 6 }}
                      />
                    )}
                    
                    <Text className={`font-bold text-base ${getActionTextStyle(action)}`}>
                      {action.label}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      )}
    </View>
  );
};

export default Card;