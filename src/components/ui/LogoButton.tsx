import Logo from "@/assets/images/logos/logo.png";
import { BLURHASH } from '@/constants/image';
import { useTheme } from '@/hooks/useTheme';
import { Image } from 'expo-image';
import { useRouter } from "expo-router";
import React from 'react';
import { Platform, Pressable, Text, View } from 'react-native';

function scrollToSection(id: string) {
    if (Platform.OS === "web") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    }
}

export default function LogoButton() {

    const { colors } = useTheme()
    const router = useRouter()

    return (
        <Pressable
            onPress={() => router.push("/")}
            style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
        >
            <Image
                style={{
                    width: 50,
                    height: 50
                }}
                source={Logo}
                placeholder={{ blurhash: BLURHASH }}
                contentFit="cover"
                transition={1000}
            />
            <View>
                <Text style={{ fontWeight: "800", letterSpacing: 1.5, fontSize: 14 }}>
                    <Text style={{ color: colors.brand }}>DREAM</Text>
                    <Text style={{ color: colors.brand }}> SPORTS</Text>
                </Text>
                <Text style={{ color: colors.inkMuted, fontSize: 8, letterSpacing: 3, fontWeight: "600" }}>
                    INTERNATIONAL
                </Text>
            </View>
        </Pressable>
    )
}