import { Platform } from "react-native";

export function scrollToSection(id: string) {
    if (Platform.OS === "web") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    }
}