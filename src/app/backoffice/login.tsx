import { supabase } from "@/lib/supabase";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, Text, TextInput, View } from "react-native";

export default function LoginPage() {
  const { colors } = useTheme();
  const { session, loading } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && session) {
      router.replace("/backoffice");
    }
  }, [session, loading]);

  async function handleLogin() {
    if (!email.trim() || !password.trim()) {
      setError("Completa todos los campos.");
      return;
    }

    setSubmitting(true);
    setError(null);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    if (authError) {
      setError("Correo o contraseña incorrectos.");
      setSubmitting(false);
      return;
    }

    router.replace("/backoffice");
  }

  const s = {
    root: {
      flex: 1,
      backgroundColor: colors.bg,
      alignItems: "center" as const,
      justifyContent: "center" as const,
      padding: 24,
    },
    card: {
      width: "100%" as const,
      maxWidth: 400,
      backgroundColor: colors.surface,
      borderRadius: 20,
      padding: 40,
      borderWidth: 1,
      borderColor: colors.border,
      gap: 24,
    },
    header: {
      gap: 6,
    },
    eyebrow: {
      color: colors.gold,
      fontSize: 11,
      fontWeight: "700" as const,
      letterSpacing: 2,
      textTransform: "uppercase" as const,
    },
    title: {
      color: colors.ink,
      fontSize: 26,
      fontWeight: "800" as const,
      letterSpacing: -0.5,
    },
    label: {
      color: colors.inkMuted,
      fontSize: 13,
      fontWeight: "600" as const,
      marginBottom: 6,
    },
    inputRow: {
      flexDirection: "row" as const,
      alignItems: "center" as const,
      backgroundColor: colors.surfaceMuted,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
      paddingHorizontal: 14,
    },
    input: {
      flex: 1,
      paddingVertical: 13,
      fontSize: 15,
      color: colors.ink,
      outlineStyle: "none" as never,
    },
    error: {
      color: "#e05555",
      fontSize: 13,
      textAlign: "center" as const,
    },
    cta: {
      backgroundColor: colors.brand,
      borderRadius: 40,
      paddingVertical: 15,
      alignItems: "center" as const,
    },
    ctaText: {
      color: "#ffffff",
      fontSize: 15,
      fontWeight: "700" as const,
    },
  };

  if (loading) {
    return (
      <View style={s.root}>
        <ActivityIndicator size="large" color={colors.brand} />
      </View>
    );
  }

  return (
    <View style={s.root}>
      <View style={s.card}>
        <View style={s.header}>
          <Text style={s.eyebrow}>Backoffice</Text>
          <Text style={s.title}>Iniciar sesión</Text>
        </View>

        <View style={{ gap: 16 }}>
          <View>
            <Text style={s.label}>Correo electrónico</Text>
            <View style={s.inputRow}>
              <TextInput
                style={s.input}
                placeholder="admin@dreamsports.com"
                placeholderTextColor={colors.inkMuted}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                onSubmitEditing={handleLogin}
              />
            </View>
          </View>

          <View>
            <Text style={s.label}>Contraseña</Text>
            <View style={s.inputRow}>
              <TextInput
                style={s.input}
                placeholder="••••••••"
                placeholderTextColor={colors.inkMuted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoComplete="current-password"
                onSubmitEditing={handleLogin}
              />
              <Pressable onPress={() => setShowPassword((v) => !v)}>
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color={colors.inkMuted}
                />
              </Pressable>
            </View>
          </View>
        </View>

        {error && <Text style={s.error}>{error}</Text>}

        <Pressable
          style={[s.cta, submitting && { opacity: 0.6 }]}
          onPress={handleLogin}
          disabled={submitting}
        >
          {submitting ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={s.ctaText}>Entrar</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}
