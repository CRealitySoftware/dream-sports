import StatusBadge from "@/components/ui/StatusBadge";
import { useTheme } from "@/hooks/useTheme";
import type { UserRow } from "@/lib/users";
import { DISCIPLINE_LABELS } from "@/lib/users";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, Text, useWindowDimensions, View } from "react-native";

const COLUMNS = ["", "Nombre", "Email", "Disciplina", "Estado", "Comprobante", "Inscrito", ""]
const COL_FLEX = [0.35, 2, 2.8, 1.5, 1.5, 1.5, 1.5, 0.8]

type Props = {
  users: UserRow[]
  onView: (user: UserRow) => void
  onSendReminder: (users: UserRow[]) => Promise<void>
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

function Checkbox({ checked, onPress, disabled }: { checked: boolean; onPress: () => void; disabled?: boolean }) {
  const { colors } = useTheme()
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={{
        width: 18,
        height: 18,
        borderRadius: 4,
        borderWidth: 1.5,
        borderColor: checked ? "rgba(8,61,145,1)" : disabled ? colors.border : colors.inkMuted,
        backgroundColor: checked ? "rgba(8,61,145,1)" : "transparent",
        alignItems: "center",
        justifyContent: "center",
        opacity: disabled ? 0.3 : 1,
      }}
    >
      {checked && <Ionicons name="checkmark" size={11} color="#FFFFFF" />}
    </Pressable>
  )
}

function BulkBar({
  selectedCount,
  sentCount,
  sending,
  onSend,
  onCancel,
}: {
  selectedCount: number
  sentCount: number | null
  sending: boolean
  onSend: () => void
  onCancel: () => void
}) {
  const { colors } = useTheme()

  if (selectedCount === 0 && sentCount === null) return null

  return (
    <View style={{
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      paddingHorizontal: 16,
      paddingVertical: 10,
      backgroundColor: sentCount !== null ? "rgba(40,180,90,0.08)" : "rgba(8,61,145,0.06)",
      borderBottomWidth: 1,
      borderBottomColor: sentCount !== null ? "rgba(30,160,70,0.25)" : "rgba(8,61,145,0.2)",
    }}>
      {sentCount !== null ? (
        <>
          <Ionicons name="checkmark-circle-outline" size={16} color="rgba(30,160,70,1)" />
          <Text style={{ color: "rgba(30,160,70,1)", fontSize: 13, fontWeight: "600", flex: 1 }}>
            {sentCount} recordatorio{sentCount !== 1 ? "s" : ""} enviado{sentCount !== 1 ? "s" : ""}
          </Text>
        </>
      ) : (
        <>
          <Text style={{ color: "rgba(8,61,145,1)", fontSize: 13, fontWeight: "600", flex: 1 }}>
            {selectedCount} seleccionado{selectedCount !== 1 ? "s" : ""}
          </Text>

          <Pressable
            onPress={onSend}
            disabled={sending}
            style={({ pressed }: { pressed: boolean }) => ({
              flexDirection: "row", alignItems: "center", gap: 6,
              paddingVertical: 7, paddingHorizontal: 14, borderRadius: 8,
              backgroundColor: pressed ? "rgba(201,162,39,0.2)" : "rgba(201,162,39,0.12)",
              borderWidth: 1, borderColor: "rgba(201,162,39,0.4)",
              opacity: sending ? 0.7 : 1,
            })}
          >
            {sending ? (
              <ActivityIndicator size="small" color="rgba(201,162,39,1)" />
            ) : (
              <Ionicons name="notifications-outline" size={14} color="rgba(201,162,39,1)" />
            )}
            <Text style={{ color: "rgba(201,162,39,1)", fontSize: 13, fontWeight: "700" }}>
              {sending ? "Enviando..." : "Enviar recordatorio"}
            </Text>
          </Pressable>

          <Pressable onPress={onCancel} style={{ paddingVertical: 7, paddingHorizontal: 10 }}>
            <Text style={{ color: colors.inkMuted, fontSize: 13 }}>Cancelar</Text>
          </Pressable>
        </>
      )}
    </View>
  )
}

export default function UsersTable({ users, onView, onSendReminder }: Props) {
  const { colors } = useTheme()
  const { width } = useWindowDimensions()
  const isMobile = width < 768

  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [sending, setSending] = useState(false)
  const [sentCount, setSentCount] = useState<number | null>(null)

  const pendingUsers = users.filter((u) => u.status === "pending")
  const pendingSelected = users.filter((u) => selected.has(u.id))
  const allPendingSelected = pendingUsers.length > 0 && pendingUsers.every((u) => selected.has(u.id))

  function toggleAll() {
    if (allPendingSelected) {
      setSelected(new Set())
    } else {
      setSelected(new Set(pendingUsers.map((u) => u.id)))
    }
  }

  function toggleRow(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  async function handleSendReminder() {
    setSending(true)
    await onSendReminder(pendingSelected)
    setSending(false)
    setSentCount(pendingSelected.length)
    setSelected(new Set())
    setTimeout(() => setSentCount(null), 5000)
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
      <BulkBar
        selectedCount={selected.size}
        sentCount={sentCount}
        sending={sending}
        onSend={handleSendReminder}
        onCancel={() => setSelected(new Set())}
      />

      {isMobile ? (
        <MobileList
          users={users}
          selected={selected}
          allPendingSelected={allPendingSelected}
          pendingUsers={pendingUsers}
          onToggleAll={toggleAll}
          onToggleRow={toggleRow}
          onView={onView}
          colors={colors}
        />
      ) : (
        <DesktopTable
          users={users}
          selected={selected}
          allPendingSelected={allPendingSelected}
          pendingUsers={pendingUsers}
          onToggleAll={toggleAll}
          onToggleRow={toggleRow}
          onView={onView}
          colors={colors}
        />
      )}
    </View>
  )
}

type TableProps = {
  users: UserRow[]
  selected: Set<string>
  allPendingSelected: boolean
  pendingUsers: UserRow[]
  onToggleAll: () => void
  onToggleRow: (id: string) => void
  onView: (user: UserRow) => void
  colors: ReturnType<typeof useTheme>["colors"]
}

function DesktopTable({ users, selected, allPendingSelected, pendingUsers, onToggleAll, onToggleRow, onView, colors }: TableProps) {
  const s = {
    header: {
      flexDirection: "row" as const,
      backgroundColor: colors.surfaceElevated,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      paddingVertical: 10,
      paddingHorizontal: 16,
      alignItems: "center" as const,
    },
    headerCell: {
      color: colors.inkMuted,
      fontSize: 11,
      fontWeight: "700" as const,
      textTransform: "uppercase" as const,
      letterSpacing: 0.8,
    },
    row: (even: boolean, selected: boolean) => ({
      flexDirection: "row" as const,
      alignItems: "center" as const,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      backgroundColor: selected
        ? "rgba(8,61,145,0.05)"
        : even ? colors.surfaceMuted : colors.surface,
    }),
    cell: { color: colors.ink, fontSize: 13 },
    muted: { color: colors.inkMuted, fontSize: 13 },
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={s.header}>
        <View style={{ flex: COL_FLEX[0], alignItems: "center" }}>
          <Checkbox
            checked={allPendingSelected}
            onPress={onToggleAll}
            disabled={pendingUsers.length === 0}
          />
        </View>
        {COLUMNS.slice(1).map((col, i) => (
          <View key={col || `col-${i}`} style={{ flex: COL_FLEX[i + 1] }}>
            <Text style={s.headerCell}>{col}</Text>
          </View>
        ))}
      </View>

      <ScrollView>
        {users.map((user, index) => {
          const isPending = user.status === "pending"
          const isSelected = selected.has(user.id)
          return (
            <View key={user.id} style={s.row(index % 2 === 0, isSelected)}>
              <View style={{ flex: COL_FLEX[0], alignItems: "center" }}>
                <Checkbox checked={isSelected} onPress={() => onToggleRow(user.id)} disabled={!isPending} />
              </View>
              <View style={{ flex: COL_FLEX[1] }}>
                <Text style={[s.cell, { fontWeight: "600" }]} numberOfLines={1}>{user.name}</Text>
              </View>
              <View style={{ flex: COL_FLEX[2] }}>
                <Text style={s.muted} numberOfLines={1}>{user.email}</Text>
              </View>
              <View style={{ flex: COL_FLEX[3] }}>
                <Text style={s.muted}>{DISCIPLINE_LABELS[user.discipline] ?? user.discipline}</Text>
              </View>
              <View style={{ flex: COL_FLEX[4] }}>
                <StatusBadge status={user.status} />
              </View>
              <View style={{ flex: COL_FLEX[5], flexDirection: "row", alignItems: "center", gap: 6 }}>
                <Ionicons
                  name={user.invoice_path ? "document-attach" : "document-outline"}
                  size={16}
                  color={user.invoice_path ? colors.brand : colors.inkMuted}
                />
                <Text style={user.invoice_path ? { color: colors.brand, fontSize: 13 } : s.muted}>
                  {user.invoice_path ? "Enviado" : "Pendiente"}
                </Text>
              </View>
              <View style={{ flex: COL_FLEX[6] }}>
                <Text style={s.muted}>{formatDate(user.created_at)}</Text>
              </View>
              <View style={{ flex: COL_FLEX[7], alignItems: "flex-end" }}>
                <Pressable
                  onPress={() => onView(user)}
                  style={({ pressed }: { pressed: boolean }) => ({
                    paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8,
                    backgroundColor: pressed ? colors.brandTint : colors.surfaceElevated,
                    borderWidth: 1, borderColor: colors.border,
                  })}
                >
                  <Text style={{ color: colors.brand, fontSize: 12, fontWeight: "700" }}>Ver</Text>
                </Pressable>
              </View>
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}

function MobileList({ users, selected, allPendingSelected, pendingUsers, onToggleAll, onToggleRow, onView, colors }: TableProps) {
  return (
    <View style={{ flex: 1 }}>
      {/* Select all bar */}
      {pendingUsers.length > 0 && (
        <Pressable
          onPress={onToggleAll}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            paddingHorizontal: 16,
            paddingVertical: 10,
            backgroundColor: colors.surfaceElevated,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
          }}
        >
          <Checkbox checked={allPendingSelected} onPress={onToggleAll} />
          <Text style={{ color: colors.inkMuted, fontSize: 12, fontWeight: "600", textTransform: "uppercase", letterSpacing: 0.6 }}>
            Seleccionar todos los pendientes
          </Text>
        </Pressable>
      )}

      <ScrollView>
        {users.map((user, index) => {
          const isPending = user.status === "pending"
          const isSelected = selected.has(user.id)
          return (
            <View
              key={user.id}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 14,
                paddingHorizontal: 16,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
                backgroundColor: isSelected
                  ? "rgba(8,61,145,0.05)"
                  : index % 2 === 0 ? colors.surfaceMuted : colors.surface,
                gap: 12,
              }}
            >
              <Checkbox checked={isSelected} onPress={() => onToggleRow(user.id)} disabled={!isPending} />

              <View style={{ flex: 1, gap: 4 }}>
                <Text style={{ color: colors.ink, fontSize: 14, fontWeight: "700" }} numberOfLines={1}>
                  {user.name}
                </Text>
                <Text style={{ color: colors.inkMuted, fontSize: 12 }} numberOfLines={1}>
                  {user.email}
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginTop: 2 }}>
                  <View style={{
                    backgroundColor: colors.surfaceElevated,
                    borderRadius: 6,
                    paddingHorizontal: 7,
                    paddingVertical: 2,
                    borderWidth: 1,
                    borderColor: colors.border,
                  }}>
                    <Text style={{ color: colors.inkMuted, fontSize: 11, fontWeight: "600" }}>
                      {DISCIPLINE_LABELS[user.discipline] ?? user.discipline}
                    </Text>
                  </View>
                  <StatusBadge status={user.status} />
                  {user.invoice_path && (
                    <Ionicons name="document-attach" size={14} color={colors.brand} />
                  )}
                </View>
                <Text style={{ color: colors.inkMuted, fontSize: 11, marginTop: 2 }}>
                  {formatDate(user.created_at)}
                </Text>
              </View>

              <Pressable
                onPress={() => onView(user)}
                style={({ pressed }: { pressed: boolean }) => ({
                  paddingVertical: 8, paddingHorizontal: 14, borderRadius: 8,
                  backgroundColor: pressed ? colors.brandTint : colors.surfaceElevated,
                  borderWidth: 1, borderColor: colors.border,
                })}
              >
                <Text style={{ color: colors.brand, fontSize: 12, fontWeight: "700" }}>Ver</Text>
              </Pressable>
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}
