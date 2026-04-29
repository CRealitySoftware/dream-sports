import { FontAwesome5 } from "@expo/vector-icons";
import { Linking, Pressable } from "react-native";

const WA_NUMBER = "573167526055";
const WA_URL = `https://wa.me/${WA_NUMBER}`;

export default function WhatsAppButton() {
  return (
    <Pressable
      onPress={() => Linking.openURL(WA_URL)}
      style={({ pressed }) => ({
        position: "fixed" as any,
        bottom: 28,
        right: 28,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: "#25D366",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        opacity: pressed ? 0.85 : 1,
        zIndex: 9999,
      })}
      accessibilityLabel="Contactar por WhatsApp"
      accessibilityRole="link"
    >
      <FontAwesome5 name="whatsapp" size={28} color="#fff" />
    </Pressable>
  );
}
