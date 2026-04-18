import StatusBadge from "@/components/ui/StatusBadge";
import { useTheme } from "@/hooks/useTheme";
import type { UserRow } from "@/lib/users";
import { DISCIPLINE_LABELS } from "@/lib/users";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, Text, View } from "react-native";

const COLUMNS = ["Nombre", "Email", "Disciplina", "Estado", "Comprobante", "Inscrito", ""]

// Relative flex weights — adjust here to change proportions
const COL_FLEX = [2, 3, 1.5, 1.5, 1.5, 1.5, 0.8]

type Props = {
  users: UserRow[]
  onView: (user: UserRow) => void
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

export default function UsersTable({ users, onView }: Props) {
  const { colors } = useTheme()

  const s = {
    header: {
      flexDirection: "row" as const,
      backgroundColor: colors.surfaceElevated,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      paddingVertical: 10,
      paddingHorizontal: 16,
    },
    headerCell: {
      color: colors.inkMuted,
      fontSize: 11,
      fontWeight: "700" as const,
      textTransform: "uppercase" as const,
      letterSpacing: 0.8,
    },
    row: (even: boolean) => ({
      flexDirection: "row" as const,
      alignItems: "center" as const,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      backgroundColor: even ? colors.surfaceMuted : colors.surface,
    }),
    cell: {
      color: colors.ink,
      fontSize: 13,
    },
    muted: {
      color: colors.inkMuted,
      fontSize: 13,
    },
  }

  if (users.length === 0) {
    return (
      <View style={{ padding: 48, alignItems: "center", gap: 8 }}>
        <Ionicons name="people-outline" size={36} color={colors.inkMuted} />
        <Text style={{ color: colors.inkMuted, fontSize: 14 }}>No hay usuarios registrados</Text>
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={s.header}>
        {COLUMNS.map((col, i) => (
          <View key={col || `col-${i}`} style={{ flex: COL_FLEX[i] }}>
            <Text style={s.headerCell}>{col}</Text>
          </View>
        ))}
      </View>

      {/* Rows */}
      <ScrollView>
        {users.map((user, index) => (
          <View key={user.id} style={s.row(index % 2 === 0)}>
            <View style={{ flex: COL_FLEX[0] }}>
              <Text style={[s.cell, { fontWeight: "600" }]} numberOfLines={1}>{user.name}</Text>
            </View>

            <View style={{ flex: COL_FLEX[1] }}>
              <Text style={s.muted} numberOfLines={1}>{user.email}</Text>
            </View>

            <View style={{ flex: COL_FLEX[2] }}>
              <Text style={s.muted}>{DISCIPLINE_LABELS[user.discipline] ?? user.discipline}</Text>
            </View>

            <View style={{ flex: COL_FLEX[3] }}>
              <StatusBadge status={user.status} />
            </View>

            <View style={{ flex: COL_FLEX[4], flexDirection: "row", alignItems: "center", gap: 6 }}>
              <Ionicons
                name={user.invoice_path ? "document-attach" : "document-outline"}
                size={16}
                color={user.invoice_path ? colors.brand : colors.inkMuted}
              />
              <Text style={user.invoice_path ? { color: colors.brand, fontSize: 13 } : s.muted}>
                {user.invoice_path ? "Enviado" : "Pendiente"}
              </Text>
            </View>

            <View style={{ flex: COL_FLEX[5] }}>
              <Text style={s.muted}>{formatDate(user.created_at)}</Text>
            </View>

            <View style={{ flex: COL_FLEX[6], alignItems: "flex-end" }}>
              <Pressable
                onPress={() => onView(user)}
                style={({ pressed }: { pressed: boolean }) => ({
                  paddingVertical: 6,
                  paddingHorizontal: 12,
                  borderRadius: 8,
                  backgroundColor: pressed ? colors.brandTint : colors.surfaceElevated,
                  borderWidth: 1,
                  borderColor: colors.border,
                })}
              >
                <Text style={{ color: colors.brand, fontSize: 12, fontWeight: "700" }}>Ver</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}
