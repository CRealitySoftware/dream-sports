import StatusBadge from "@/components/ui/StatusBadge";
import { useTheme } from "@/hooks/useTheme";
import type { UserRow } from "@/lib/users";
import { DISCIPLINE_LABELS } from "@/lib/users";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { ActivityIndicator, Modal, Pressable, ScrollView, Text, TextInput, useWindowDimensions, View } from "react-native";

const COLUMNS = ["", "Nombre", "Email", "Disciplina", "Estado", "Comprobante", "Inscrito", ""]
const COL_FLEX = [0.35, 2, 2.8, 1.5, 1.5, 1.5, 1.5, 1.4]

type Props = {
  users: UserRow[]
  onView: (user: UserRow) => void
  onSendReminder: (users: UserRow[]) => Promise<void>
  onSendWelcome: (user: UserRow, toEmail: string) => Promise<void>
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

export default function UsersTable({ users, onView, onSendReminder, onSendWelcome }: Props) {
  const { colors } = useTheme()
  const { width } = useWindowDimensions()
  const isMobile = width < 768

  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [sending, setSending] = useState(false)
  const [sentCount, setSentCount] = useState<number | null>(null)

  const [emailModal, setEmailModal] = useState<{ user: UserRow; email: string } | null>(null)
  const [sendingWelcome, setSendingWelcome] = useState(false)
  const [welcomeSentId, setWelcomeSentId] = useState<string | null>(null)

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

  function openEmailModal(user: UserRow) {
    setWelcomeSentId(null)
    setEmailModal({ user, email: user.email })
  }

  async function handleSendWelcome() {
    if (!emailModal) return
    setSendingWelcome(true)
    await onSendWelcome(emailModal.user, emailModal.email)
    setSendingWelcome(false)
    setWelcomeSentId(emailModal.user.id)
    setTimeout(() => {
      setEmailModal(null)
      setWelcomeSentId(null)
    }, 2000)
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
          onOpenEmail={openEmailModal}
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
          onOpenEmail={openEmailModal}
          colors={colors}
        />
      )}

      <Modal
        visible={!!emailModal}
        transparent
        animationType="fade"
        onRequestClose={() => !sendingWelcome && setEmailModal(null)}
      >
        <View style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.45)",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
        }}>
          <View style={{
            backgroundColor: colors.surface,
            borderRadius: 14,
            padding: 28,
            width: "100%",
            maxWidth: 440,
            borderWidth: 1,
            borderColor: colors.border,
            gap: 20,
          }}>
            {welcomeSentId ? (
              <View style={{ alignItems: "center", gap: 12, paddingVertical: 12 }}>
                <Ionicons name="checkmark-circle" size={40} color="rgba(30,160,70,1)" />
                <Text style={{ color: colors.ink, fontSize: 15, fontWeight: "700", textAlign: "center" }}>
                  Correo enviado
                </Text>
                <Text style={{ color: colors.inkMuted, fontSize: 13, textAlign: "center" }}>
                  Enviado a {emailModal?.email}
                </Text>
              </View>
            ) : (
              <>
                <View style={{ gap: 4 }}>
                  <Text style={{ color: colors.ink, fontSize: 16, fontWeight: "800" }}>
                    Enviar correo de bienvenida
                  </Text>
                  <Text style={{ color: colors.inkMuted, fontSize: 13 }}>
                    {emailModal?.user.name} · {DISCIPLINE_LABELS[emailModal?.user.discipline ?? ""] ?? emailModal?.user.discipline}
                  </Text>
                </View>

                <View style={{ gap: 6 }}>
                  <Text style={{ color: colors.inkMuted, fontSize: 12, fontWeight: "600", textTransform: "uppercase", letterSpacing: 0.6 }}>
                    Correo destino
                  </Text>
                  <TextInput
                    value={emailModal?.email ?? ""}
                    onChangeText={(text) => setEmailModal((prev) => prev ? { ...prev, email: text } : prev)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="correo@ejemplo.com"
                    placeholderTextColor={colors.inkMuted}
                    style={{
                      borderWidth: 1,
                      borderColor: colors.border,
                      borderRadius: 8,
                      paddingHorizontal: 14,
                      paddingVertical: 10,
                      fontSize: 14,
                      color: colors.ink,
                      backgroundColor: colors.surfaceElevated,
                    }}
                  />
                </View>

                <View style={{ flexDirection: "row", gap: 10, justifyContent: "flex-end" }}>
                  <Pressable
                    onPress={() => setEmailModal(null)}
                    disabled={sendingWelcome}
                    style={({ pressed }: { pressed: boolean }) => ({
                      paddingVertical: 9, paddingHorizontal: 16, borderRadius: 8,
                      backgroundColor: pressed ? colors.surfaceMuted : colors.surfaceElevated,
                      borderWidth: 1, borderColor: colors.border,
                      opacity: sendingWelcome ? 0.5 : 1,
                    })}
                  >
                    <Text style={{ color: colors.inkMuted, fontSize: 13, fontWeight: "600" }}>Cancelar</Text>
                  </Pressable>

                  <Pressable
                    onPress={handleSendWelcome}
                    disabled={sendingWelcome || !emailModal?.email.trim()}
                    style={({ pressed }: { pressed: boolean }) => ({
                      flexDirection: "row", alignItems: "center", gap: 7,
                      paddingVertical: 9, paddingHorizontal: 16, borderRadius: 8,
                      backgroundColor: pressed ? "rgba(8,61,145,0.85)" : "rgba(8,61,145,1)",
                      opacity: (sendingWelcome || !emailModal?.email.trim()) ? 0.6 : 1,
                    })}
                  >
                    {sendingWelcome
                      ? <ActivityIndicator size="small" color="#FFFFFF" />
                      : <Ionicons name="mail" size={14} color="#FFFFFF" />
                    }
                    <Text style={{ color: "#FFFFFF", fontSize: 13, fontWeight: "700" }}>
                      {sendingWelcome ? "Enviando..." : "Enviar bienvenida"}
                    </Text>
                  </Pressable>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
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
  onOpenEmail: (user: UserRow) => void
  colors: ReturnType<typeof useTheme>["colors"]
}

function DesktopTable({ users, selected, allPendingSelected, pendingUsers, onToggleAll, onToggleRow, onView, onOpenEmail, colors }: TableProps) {
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
              <View style={{ flex: COL_FLEX[7], flexDirection: "row", alignItems: "center", justifyContent: "flex-end", gap: 6 }}>
                <Pressable
                  onPress={() => onOpenEmail(user)}
                  style={({ pressed }: { pressed: boolean }) => ({
                    paddingVertical: 6, paddingHorizontal: 8, borderRadius: 8,
                    backgroundColor: pressed ? "rgba(8,61,145,0.12)" : "rgba(8,61,145,0.06)",
                    borderWidth: 1, borderColor: "rgba(8,61,145,0.2)",
                  })}
                >
                  <Ionicons name="mail-outline" size={14} color="rgba(8,61,145,1)" />
                </Pressable>
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

function MobileList({ users, selected, allPendingSelected, pendingUsers, onToggleAll, onToggleRow, onView, onOpenEmail, colors }: TableProps) {
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

              <View style={{ gap: 6, alignItems: "center" }}>
                <Pressable
                  onPress={() => onOpenEmail(user)}
                  style={({ pressed }: { pressed: boolean }) => ({
                    paddingVertical: 8, paddingHorizontal: 10, borderRadius: 8,
                    backgroundColor: pressed ? "rgba(8,61,145,0.12)" : "rgba(8,61,145,0.06)",
                    borderWidth: 1, borderColor: "rgba(8,61,145,0.2)",
                  })}
                >
                  <Ionicons name="mail-outline" size={15} color="rgba(8,61,145,1)" />
                </Pressable>
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
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}
