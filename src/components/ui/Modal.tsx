import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import {
  Modal as RNModal,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  title: string;
  maxWidth?: number;
  children: React.ReactNode;
};

export default function Modal({ visible, onClose, title, maxWidth = 640, children }: Props) {
  const { colors } = useTheme();

  return (
    <RNModal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.55)",
          justifyContent: "center",
          alignItems: "center",
          padding: 16,
        }}
        onPress={onClose}
      >
        <Pressable
          style={{
            width: "100%",
            maxWidth,
            maxHeight: "90%",
            backgroundColor: colors.surface,
            borderRadius: 16,
            overflow: "hidden",
            borderWidth: 1,
            borderColor: colors.border,
          }}
          onPress={() => {}}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 20,
              paddingVertical: 14,
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
              backgroundColor: colors.surfaceElevated,
            }}
          >
            <Text
              style={{ color: colors.ink, fontSize: 15, fontWeight: "700", flex: 1, marginRight: 12 }}
              numberOfLines={1}
            >
              {title}
            </Text>
            <Pressable
              onPress={onClose}
              style={({ pressed }: { pressed: boolean }) => ({
                width: 32,
                height: 32,
                borderRadius: 8,
                backgroundColor: pressed ? colors.surfaceMuted : "transparent",
                alignItems: "center",
                justifyContent: "center",
              })}
            >
              <Ionicons name="close" size={20} color={colors.inkMuted} />
            </Pressable>
          </View>

          <ScrollView contentContainerStyle={{ padding: 24 }}>
            {children}
          </ScrollView>
        </Pressable>
      </Pressable>
    </RNModal>
  );
}
