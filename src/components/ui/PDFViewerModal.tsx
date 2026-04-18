import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { createElement } from "react";
import { Modal, Platform, Pressable, Text, View } from "react-native";

function PDFFrame({ url }: { url: string }) {
  if (Platform.OS !== "web") return null;
  return createElement("iframe", {
    src: url,
    style: {
      width: "100%",
      height: "100%",
      border: "none",
      borderRadius: 0,
    },
  });
}

export default function PDFViewerModal({
  visible,
  url,
  title,
  onClose,
}: {
  visible: boolean;
  url: string;
  title: string;
  onClose: () => void;
}) {
  const { colors } = useTheme();

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.75)",
          justifyContent: "center",
          alignItems: "center",
          padding: 16,
        }}
      >
        <View
          style={{
            width: "100%",
            maxWidth: 860,
            height: "90%",
            backgroundColor: colors.surface,
            borderRadius: 16,
            overflow: "hidden",
            borderWidth: 1,
            borderColor: colors.border,
          }}
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
              style={{
                color: colors.ink,
                fontSize: 14,
                fontWeight: "700",
                flex: 1,
                marginRight: 12,
              }}
              numberOfLines={1}
            >
              {title}
            </Text>
            <Pressable
              onPress={onClose}
              style={({ pressed }: any) => ({
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

          <View style={{ flex: 1 }}>
            <PDFFrame url={url} />
          </View>
        </View>
      </View>
    </Modal>
  );
}
