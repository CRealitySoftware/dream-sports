import { supabase } from "@/lib/supabase";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

type UserInfo = { name: string; discipline: string; invoice_path: string | null };

type PageState = "loading" | "ready" | "uploading" | "done" | "already_uploaded" | "not_found" | "error";

const DISCIPLINE_LABELS: Record<string, string> = {
  football: "Fútbol",
  basketball: "Baloncesto",
  volleyball: "Voleibol",
  cycling: "Ciclismo",
};

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
const MAX_SIZE_BYTES = 2 * 1024 * 1024; // 2 MB

export default function ConfirmPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors } = useTheme();

  const [pageState, setPageState] = useState<PageState>("loading");
  const [user, setUser] = useState<UserInfo | null>(null);
  const [selectedFile, setSelectedFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setPageState("not_found");
      return;
    }
    loadUser();
  }, [id]);

  async function loadUser() {
    const { data, error } = await supabase
      .from("users")
      .select("name, discipline, invoice_path")
      .eq("id", id)
      .single() as unknown as { data: UserInfo | null; error: unknown };

    if (error || !data) {
      setPageState("not_found");
      return;
    }

    setUser(data);
    setPageState(data.invoice_path ? "already_uploaded" : "ready");
  }

  async function pickFile() {
    setUploadError(null);
    const result = await DocumentPicker.getDocumentAsync({
      type: ACCEPTED_TYPES,
      copyToCacheDirectory: true,
    });

    if (result.canceled || !result.assets?.[0]) return;

    const asset = result.assets[0];

    if (asset.size && asset.size > MAX_SIZE_BYTES) {
      setUploadError("El archivo no puede superar los 2 MB.");
      return;
    }

    setSelectedFile(asset);
  }

  async function uploadInvoice() {
    if (!selectedFile || !id) return;

    setPageState("uploading");
    setUploadError(null);

    const ext = selectedFile.name.split(".").pop() ?? "pdf";

    const fileResponse = await fetch(selectedFile.uri);
    const blob = await fileResponse.blob();

    const formData = new FormData();
    formData.append("file", blob, selectedFile.name);
    formData.append("userId", id);
    formData.append("ext", ext);

    const { data, error } = await supabase.functions.invoke("submit-invoice", {
      body: formData,
    });

    if (error || !data?.ok) {
      if (data?.error === "Invoice already submitted") {
        setPageState("already_uploaded");
        return;
      }
      setUploadError("Error al subir el archivo. Intenta de nuevo.");
      setPageState("ready");
      return;
    }

    setPageState("done");
  }

  const s = {
    container: {
      flex: 1,
      backgroundColor: colors.bg,
      alignItems: "center" as const,
      justifyContent: "center" as const,
      padding: 24,
    },
    card: {
      width: "100%" as const,
      maxWidth: 520,
      backgroundColor: colors.surface,
      borderRadius: 20,
      padding: 40,
      borderWidth: 1,
      borderColor: colors.border,
      gap: 24,
    },
    tag: {
      alignSelf: "flex-start" as const,
      backgroundColor: colors.goldTint,
      borderRadius: 20,
      paddingHorizontal: 12,
      paddingVertical: 4,
    },
    tagText: {
      color: colors.gold,
      fontSize: 10,
      fontWeight: "700" as const,
      letterSpacing: 1.5,
      textTransform: "uppercase" as const,
    },
    title: {
      color: colors.ink,
      fontSize: 26,
      fontWeight: "800" as const,
      letterSpacing: -0.5,
      lineHeight: 34,
    },
    body: {
      color: colors.inkMuted,
      fontSize: 14,
      lineHeight: 22,
    },
    dropzone: (hasFile: boolean) => ({
      borderWidth: 2,
      borderColor: hasFile ? colors.brand : colors.border,
      borderStyle: "dashed" as const,
      borderRadius: 12,
      padding: 28,
      alignItems: "center" as const,
      gap: 10,
      backgroundColor: hasFile ? colors.brandTint : colors.surfaceMuted,
    }),
    cta: {
      backgroundColor: colors.cta,
      borderRadius: 40,
      paddingVertical: 16,
      alignItems: "center" as const,
      borderWidth: 1.5,
      borderColor: colors.gold,
    },
    ctaText: {
      color: colors.ctaText,
      fontSize: 15,
      fontWeight: "800" as const,
    },
  };

  if (pageState === "loading") {
    return (
      <View style={s.container}>
        <ActivityIndicator size="large" color={colors.brand} />
      </View>
    );
  }

  if (pageState === "not_found") {
    return (
      <View style={s.container}>
        <View style={s.card}>
          <Ionicons name="alert-circle-outline" size={48} color={colors.gold} />
          <Text style={s.title}>Enlace no válido</Text>
          <Text style={s.body}>
            Este enlace no corresponde a ninguna inscripción. Verifica el correo que recibiste.
          </Text>
        </View>
      </View>
    );
  }

  if (pageState === "already_uploaded") {
    return (
      <View style={s.container}>
        <View style={[s.card, { gap: 16 }]}>
          <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: colors.goldTint, alignItems: "center", justifyContent: "center" }}>
            <Ionicons name="checkmark-circle" size={36} color={colors.gold} />
          </View>
          <Text style={s.title}>Comprobante ya recibido</Text>
          <Text style={s.body}>
            Ya hemos recibido tu comprobante de pago, {user?.name?.split(" ")[0]}. Nuestro equipo lo está revisando y te notificará pronto.
          </Text>
        </View>
      </View>
    );
  }

  if (pageState === "done") {
    return (
      <View style={s.container}>
        <View style={[s.card, { gap: 16 }]}>
          <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: colors.goldTint, alignItems: "center", justifyContent: "center" }}>
            <Ionicons name="checkmark-circle" size={36} color={colors.gold} />
          </View>
          <Text style={s.title}>¡Comprobante enviado!</Text>
          <Text style={s.body}>
            Hemos recibido tu comprobante de pago. Nuestro equipo lo revisará y te confirmará tu inscripción en las próximas 48 horas.
          </Text>
          <Text style={{ color: colors.inkMuted, fontSize: 13, lineHeight: 20 }}>
            ¿Preguntas? Escríbenos a{" "}
            <Text style={{ color: colors.brand, fontWeight: "700" }}>dreamsports26@gmail.com</Text>
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={s.container}>
      <View style={s.card}>
        <View style={{ gap: 8 }}>
          <View style={s.tag}>
            <Text style={s.tagText}>DreamSports International</Text>
          </View>
          <Text style={s.title}>Sube tu comprobante de pago</Text>
          <Text style={s.body}>
            Hola <Text style={{ fontWeight: "700", color: colors.ink }}>{user?.name?.split(" ")[0]}</Text>
            {user?.discipline ? ` · ${DISCIPLINE_LABELS[user.discipline] ?? user.discipline}` : ""}
            {"\n"}Adjunta la imagen o PDF de tu comprobante para confirmar tu inscripción.
          </Text>
        </View>

        <Pressable onPress={pickFile} style={s.dropzone(!!selectedFile)}>
          <Ionicons
            name={selectedFile ? "document-attach" : "cloud-upload-outline"}
            size={36}
            color={selectedFile ? colors.brand : colors.inkMuted}
          />
          {selectedFile ? (
            <>
              <Text style={{ color: colors.brand, fontSize: 14, fontWeight: "700", textAlign: "center" }}>
                {selectedFile.name}
              </Text>
              <Text style={{ color: colors.inkMuted, fontSize: 12 }}>
                {((selectedFile.size ?? 0) / 1024 / 1024).toFixed(2)} MB · Toca para cambiar
              </Text>
            </>
          ) : (
            <>
              <Text style={{ color: colors.inkMuted, fontSize: 14, fontWeight: "600" }}>
                Toca para seleccionar archivo
              </Text>
              <Text style={{ color: colors.inkMuted, fontSize: 12, textAlign: "center" }}>
                JPG, PNG, WEBP o PDF · Máx. 2 MB
              </Text>
            </>
          )}
        </Pressable>

        {uploadError && (
          <Text style={{ color: colors.gold, fontSize: 13, textAlign: "center" }}>
            {uploadError}
          </Text>
        )}

        <Pressable
          onPress={uploadInvoice}
          disabled={!selectedFile || pageState === "uploading"}
          style={[s.cta, (!selectedFile || pageState === "uploading") && { opacity: 0.5 }]}
        >
          {pageState === "uploading" ? (
            <ActivityIndicator size="small" color={colors.ctaText} />
          ) : (
            <Text style={s.ctaText}>Enviar comprobante</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}
