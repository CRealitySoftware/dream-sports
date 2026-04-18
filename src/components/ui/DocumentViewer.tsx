import { getDocumentSignedUrl } from "@/lib/users";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { createElement, useEffect, useState } from "react";
import { ActivityIndicator, Platform, Pressable, Text, View } from "react-native";

function InlineFrame({ url, isImage }: { url: string; isImage: boolean }) {
  if (Platform.OS !== "web") return null;
  if (isImage) {
    return createElement("img", {
      src: url,
      style: { width: "100%", display: "block", borderRadius: 8 },
    });
  }
  return createElement("iframe", {
    src: url,
    style: { width: "100%", height: "100%", border: "none" },
  });
}

type Props = {
  path: string | null;
};

export default function DocumentViewer({ path }: Props) {
  const { colors } = useTheme();
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  const isImage = !!path && /\.(jpg|jpeg|png|webp)$/i.test(path);

  useEffect(() => {
    if (!path) return;
    setLoading(true);
    setFetchError(false);
    getDocumentSignedUrl(path).then((signed) => {
      setUrl(signed);
      if (!signed) setFetchError(true);
      setLoading(false);
    });
  }, [path]);

  if (!path) {
    return (
      <View
        style={{
          padding: 20,
          alignItems: "center",
          gap: 8,
          backgroundColor: colors.surfaceMuted,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: colors.border,
        }}
      >
        <Ionicons name="document-outline" size={28} color={colors.inkMuted} />
        <Text style={{ color: colors.inkMuted, fontSize: 13 }}>Sin comprobante adjunto</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={{ padding: 20, alignItems: "center" }}>
        <ActivityIndicator color={colors.brand} />
      </View>
    );
  }

  if (fetchError || !url) {
    return (
      <View style={{ padding: 20, alignItems: "center" }}>
        <Text style={{ color: colors.inkMuted, fontSize: 13 }}>Error al cargar el documento</Text>
      </View>
    );
  }

  return (
    <View style={{ gap: 12 }}>
      <View
        style={{
          borderRadius: 12,
          overflow: "hidden",
          borderWidth: 1,
          borderColor: colors.border,
          height: isImage ? undefined : 420,
          minHeight: isImage ? 120 : 420,
        }}
      >
        <InlineFrame url={url} isImage={isImage} />
      </View>

      <Pressable
        onPress={() => {
          if (Platform.OS === "web") window.open(url, "_blank");
        }}
        style={({ pressed }: { pressed: boolean }) => ({
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          paddingVertical: 9,
          paddingHorizontal: 14,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: pressed ? colors.surfaceMuted : colors.surface,
          alignSelf: "flex-start",
        })}
      >
        <Ionicons name="open-outline" size={15} color={colors.brand} />
        <Text style={{ color: colors.brand, fontSize: 13, fontWeight: "600" }}>
          Abrir en nueva pestaña
        </Text>
      </Pressable>
    </View>
  );
}
