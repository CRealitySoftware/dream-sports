import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { supabase } from "@/lib/supabase";

type Stats = {
  total: number;
  pending: number;
  approved: number;
  paid: number;
};

type StatCard = {
  label: string;
  value: number;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  iconBg: string;
  iconColor: string;
};

export default function DashboardPage() {
  const { colors } = useTheme();
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    const { data, error } = await supabase
      .from("users")
      .select("status, is_paid")
      .eq("role", "client") as unknown as {
        data: { status: string; is_paid: boolean }[] | null;
        error: unknown;
      };

    if (error || !data) {
      setLoading(false);
      return;
    }

    setStats({
      total: data.length,
      pending: data.filter((u) => u.status === "pending").length,
      approved: data.filter((u) => u.status === "approved").length,
      paid: data.filter((u) => u.is_paid).length,
    });
    setLoading(false);
  }

  const s = {
    root: {
      flex: 1,
      padding: 32,
    },
    greeting: {
      color: colors.inkMuted,
      fontSize: 14,
      marginBottom: 4,
    },
    title: {
      color: colors.ink,
      fontSize: 24,
      fontWeight: "800" as const,
      letterSpacing: -0.4,
      marginBottom: 32,
    },
    grid: {
      flexDirection: "row" as const,
      flexWrap: "wrap" as const,
      gap: 16,
      marginBottom: 32,
    },
    card: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 24,
      borderWidth: 1,
      borderColor: colors.border,
      minWidth: 180,
      flex: 1,
      gap: 12,
    },
    cardIcon: {
      width: 40,
      height: 40,
      borderRadius: 10,
      alignItems: "center" as const,
      justifyContent: "center" as const,
    },
    cardValue: {
      color: colors.ink,
      fontSize: 32,
      fontWeight: "800" as const,
      letterSpacing: -1,
    },
    cardLabel: {
      color: colors.inkMuted,
      fontSize: 13,
      fontWeight: "500" as const,
    },
  };

  const statCards: StatCard[] = [
    { label: "Inscritos totales", value: stats?.total ?? 0, icon: "people", iconBg: colors.brandTint, iconColor: colors.brand },
    { label: "Pendientes", value: stats?.pending ?? 0, icon: "time-outline", iconBg: colors.goldTint, iconColor: colors.gold },
    { label: "Aprobados", value: stats?.approved ?? 0, icon: "checkmark-circle-outline", iconBg: "rgba(40,180,90,0.10)", iconColor: "rgba(30,160,70,1)" },
    { label: "Pagos confirmados", value: stats?.paid ?? 0, icon: "card-outline", iconBg: colors.brandTint, iconColor: colors.brand },
  ];

  return (
    <ScrollView style={s.root} contentContainerStyle={{ paddingBottom: 48 }}>
      <Text style={s.greeting}>Bienvenido, {user?.email}</Text>
      <Text style={s.title}>Dashboard</Text>

      {loading ? (
        <ActivityIndicator size="large" color={colors.brand} />
      ) : (
        <View style={s.grid}>
          {statCards.map((card) => (
            <View key={card.label} style={s.card}>
              <View style={[s.cardIcon, { backgroundColor: card.iconBg }]}>
                <Ionicons name={card.icon} size={20} color={card.iconColor} />
              </View>
              <Text style={s.cardValue}>{card.value}</Text>
              <Text style={s.cardLabel}>{card.label}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
