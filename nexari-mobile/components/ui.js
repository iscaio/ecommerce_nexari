import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styled } from "nativewind";

// Estilos baseados no Shadcn UI Dark Mode
export const Card = styled(
  View,
  "bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm"
);
export const Label = styled(Text, "text-gray-300 mb-2 font-medium text-sm");
export const InputContainer = styled(
  View,
  "flex-row items-center bg-slate-950 border border-slate-800 rounded-lg px-3 h-12 mb-4 focus:border-indigo-500"
);
export const StyledInput = styled(
  TextInput,
  "flex-1 text-white ml-2 text-base"
);

export const Button = ({
  onPress,
  children,
  variant = "primary",
  disabled,
}) => {
  const bg = variant === "primary" ? "bg-indigo-600" : "bg-slate-800";
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`${bg} h-12 rounded-lg items-center justify-center flex-row active:opacity-90 ${
        disabled ? "opacity-50" : ""
      }`}
    >
      <Text className="text-white font-bold text-lg">{children}</Text>
    </TouchableOpacity>
  );
};
