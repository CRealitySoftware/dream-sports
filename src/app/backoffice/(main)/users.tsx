import UserDetailModal from "@/components/backoffice/users/UserDetailModal";
import UserEditModal from "@/components/backoffice/users/UserEditModal";
import UsersTable from "@/components/backoffice/users/UsersTable";
import { useTheme } from "@/hooks/useTheme";
import {
    deleteUser,
    DISCIPLINE_LABELS,
    fetchUsers,
    sendPaymentReminder,
    sendWelcomePayment,
    updateUserInfo,
    updateUserStatus,
    type EditableUserFields,
    type UserRow,
    type UserStatus,
} from "@/lib/users";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ActivityIndicator, Modal, Pressable, Text, TextInput, View } from "react-native";

const DISCIPLINE_CAP = 100;
const ACTIVE_DISCIPLINES = Object.keys(DISCIPLINE_LABELS) as string[];

function DisciplineMetrics({ users, colors }: { users: UserRow[]; colors: ReturnType<typeof useTheme>["colors"] }) {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 12,
        paddingHorizontal: 24,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        backgroundColor: colors.surfaceMuted,
        flexWrap: "wrap",
      }}
    >
      {ACTIVE_DISCIPLINES.map((d) => {
        const subset = users.filter((u) => u.discipline === d);
        const approved = subset.filter((u) => u.status === "approved" || u.status === "completed").length;
        const pending = subset.filter((u) => u.status === "pending").length;
        const rejected = subset.filter((u) => u.status === "rejected").length;
        const atCap = approved >= DISCIPLINE_CAP;
        const progress = Math.min(approved / DISCIPLINE_CAP, 1);

        return (
          <View
            key={d}
            style={{
              flex: 1,
              minWidth: 180,
              backgroundColor: colors.surface,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: atCap ? "rgba(220,60,60,0.35)" : colors.border,
              padding: 14,
              gap: 8,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <Text style={{ color: colors.ink, fontSize: 13, fontWeight: "700" }}>
                {DISCIPLINE_LABELS[d]}
              </Text>
              {atCap && (
                <View style={{ backgroundColor: "rgba(220,60,60,0.12)", borderRadius: 6, paddingHorizontal: 7, paddingVertical: 2 }}>
                  <Text style={{ color: "rgba(220,60,60,1)", fontSize: 10, fontWeight: "700" }}>LLENO</Text>
                </View>
              )}
            </View>

            {/* Progress bar */}
            <View style={{ height: 4, backgroundColor: colors.border, borderRadius: 2, overflow: "hidden" }}>
              <View
                style={{
                  height: "100%",
                  width: `${progress * 100}%`,
                  backgroundColor: atCap ? "rgba(220,60,60,1)" : "rgba(30,160,70,1)",
                  borderRadius: 2,
                }}
              />
            </View>

            <View style={{ flexDirection: "row", gap: 12 }}>
              <Text style={{ color: "rgba(30,160,70,1)", fontSize: 12, fontWeight: "600" }}>
                {approved}/{DISCIPLINE_CAP} aprobados
              </Text>
              <Text style={{ color: colors.inkMuted, fontSize: 12 }}>
                {pending} pend.
              </Text>
              <Text style={{ color: colors.inkMuted, fontSize: 12 }}>
                {rejected} rech.
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

export default function UsersPage() {
  const { colors } = useTheme();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserRow | null>(null);
  const [editingUser, setEditingUser] = useState<UserRow | null>(null);

  const [freeModal, setFreeModal] = useState(false);
  const [freeEmail, setFreeEmail] = useState("");
  const [sendingFree, setSendingFree] = useState(false);
  const [freeSent, setFreeSent] = useState(false);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    const data = await fetchUsers();
    setUsers(data);
    setLoading(false);
  }

  function updateLocal(id: string, patch: Partial<UserRow>) {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...patch } : u)));
    setSelectedUser((prev) => (prev?.id === id ? { ...prev, ...patch } : prev));
    setEditingUser((prev) => (prev?.id === id ? { ...prev, ...patch } : prev));
  }

  async function handleStatusChange(status: UserStatus, isPaid?: boolean) {
    if (!selectedUser) return;
    const { error } = await updateUserStatus(selectedUser.id, status, isPaid);
    if (!error) updateLocal(selectedUser.id, { status, ...(isPaid !== undefined && { is_paid: isPaid }) });
  }

  async function handleSaveEdit(fields: Partial<EditableUserFields>) {
    if (!editingUser) return;
    const { error } = await updateUserInfo(editingUser.id, fields);
    if (!error) {
      updateLocal(editingUser.id, fields as Partial<UserRow>);
      setEditingUser(null);
    }
  }

  async function handleSendReminder(users: UserRow[]) {
    await Promise.allSettled(users.map((u) => sendPaymentReminder(u)));
  }

  async function handleSendWelcome(user: UserRow, toEmail: string) {
    await sendWelcomePayment(user, toEmail);
  }

  function openFreeModal() {
    setFreeEmail("");
    setFreeSent(false);
    setFreeModal(true);
  }

  async function handleSendFreeWelcome() {
    if (!freeEmail.trim()) return;
    setSendingFree(true);
    await sendWelcomePayment(
      { name: "", email: freeEmail.trim(), discipline: "" },
      freeEmail.trim(),
    );
    setSendingFree(false);
    setFreeSent(true);
    setTimeout(() => setFreeModal(false), 2000);
  }

  async function handleDelete() {
    if (!selectedUser) return;
    const { error } = await deleteUser(selectedUser.id);
    if (!error) {
      setUsers((prev) => prev.filter((u) => u.id !== selectedUser.id));
      setSelectedUser(null);
    }
  }

  function approvedCountForDiscipline(discipline: string) {
    return users.filter(
      (u) => u.discipline === discipline && (u.status === "approved" || u.status === "completed")
    ).length;
  }

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 24,
          paddingVertical: 16,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          backgroundColor: colors.surface,
        }}
      >
        <Text style={{ color: colors.inkMuted, fontSize: 13 }}>
          <Text style={{ color: colors.ink, fontWeight: "700" }}>{users.length}</Text> inscritos
        </Text>

        <View style={{ flexDirection: "row", gap: 8 }}>
          <Pressable
            onPress={openFreeModal}
            style={({ pressed }: { pressed: boolean }) => ({
              flexDirection: "row", alignItems: "center", gap: 6,
              paddingVertical: 7, paddingHorizontal: 12, borderRadius: 8,
              backgroundColor: pressed ? "rgba(8,61,145,0.12)" : "rgba(8,61,145,0.06)",
              borderWidth: 1, borderColor: "rgba(8,61,145,0.25)",
            })}
          >
            <Ionicons name="mail-outline" size={15} color="rgba(8,61,145,1)" />
            <Text style={{ color: "rgba(8,61,145,1)", fontSize: 13, fontWeight: "600" }}>Enviar bienvenida</Text>
          </Pressable>

          <Pressable
            onPress={load}
            style={({ pressed }: { pressed: boolean }) => ({
              flexDirection: "row", alignItems: "center", gap: 6,
              paddingVertical: 7, paddingHorizontal: 12, borderRadius: 8,
              backgroundColor: pressed ? colors.surfaceMuted : colors.surfaceElevated,
              borderWidth: 1, borderColor: colors.border,
            })}
          >
            <Ionicons name="refresh-outline" size={15} color={colors.inkMuted} />
            <Text style={{ color: colors.inkMuted, fontSize: 13 }}>Actualizar</Text>
          </Pressable>
        </View>
      </View>

      {/* Discipline metrics */}
      {!loading && <DisciplineMetrics users={users} colors={colors} />}

      {/* Table */}
      <View style={{ flex: 1, backgroundColor: colors.surface }}>
        {loading ? (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <ActivityIndicator size="large" color={colors.brand} />
          </View>
        ) : (
          <UsersTable users={users} onView={setSelectedUser} onSendReminder={handleSendReminder} onSendWelcome={handleSendWelcome} />
        )}
      </View>

      {/* Detail modal */}
      {selectedUser && (
        <UserDetailModal
          user={selectedUser}
          visible={!!selectedUser}
          onClose={() => setSelectedUser(null)}
          onEdit={() => {
            setEditingUser(selectedUser);
            setSelectedUser(null);
          }}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
          disciplineApprovedCount={approvedCountForDiscipline(selectedUser.discipline)}
          disciplineCap={DISCIPLINE_CAP}
        />
      )}

      {/* Edit modal */}
      {editingUser && (
        <UserEditModal
          user={editingUser}
          visible={!!editingUser}
          onClose={() => setEditingUser(null)}
          onSave={handleSaveEdit}
        />
      )}

      {/* Free welcome email modal */}
      <Modal
        visible={freeModal}
        transparent
        animationType="fade"
        onRequestClose={() => !sendingFree && setFreeModal(false)}
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
            {freeSent ? (
              <View style={{ alignItems: "center", gap: 12, paddingVertical: 12 }}>
                <Ionicons name="checkmark-circle" size={40} color="rgba(30,160,70,1)" />
                <Text style={{ color: colors.ink, fontSize: 15, fontWeight: "700", textAlign: "center" }}>
                  Correo enviado
                </Text>
                <Text style={{ color: colors.inkMuted, fontSize: 13, textAlign: "center" }}>
                  {freeEmail}
                </Text>
              </View>
            ) : (
              <>
                <View style={{ gap: 4 }}>
                  <Text style={{ color: colors.ink, fontSize: 16, fontWeight: "800" }}>
                    Enviar bienvenida
                  </Text>
                  <Text style={{ color: colors.inkMuted, fontSize: 13 }}>
                    Confirmacion de pago manual
                  </Text>
                </View>

                <TextInput
                  value={freeEmail}
                  onChangeText={setFreeEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="correo@ejemplo.com"
                  placeholderTextColor={colors.inkMuted}
                  style={{
                    borderWidth: 1, borderColor: colors.border, borderRadius: 8,
                    paddingHorizontal: 14, paddingVertical: 10,
                    fontSize: 14, color: colors.ink, backgroundColor: colors.surfaceElevated,
                  }}
                />

                <View style={{ flexDirection: "row", gap: 10, justifyContent: "flex-end" }}>
                  <Pressable
                    onPress={() => setFreeModal(false)}
                    disabled={sendingFree}
                    style={({ pressed }: { pressed: boolean }) => ({
                      paddingVertical: 9, paddingHorizontal: 16, borderRadius: 8,
                      backgroundColor: pressed ? colors.surfaceMuted : colors.surfaceElevated,
                      borderWidth: 1, borderColor: colors.border,
                      opacity: sendingFree ? 0.5 : 1,
                    })}
                  >
                    <Text style={{ color: colors.inkMuted, fontSize: 13, fontWeight: "600" }}>Cancelar</Text>
                  </Pressable>

                  <Pressable
                    onPress={handleSendFreeWelcome}
                    disabled={sendingFree || !freeEmail.trim()}
                    style={({ pressed }: { pressed: boolean }) => ({
                      flexDirection: "row", alignItems: "center", gap: 7,
                      paddingVertical: 9, paddingHorizontal: 16, borderRadius: 8,
                      backgroundColor: pressed ? "rgba(8,61,145,0.85)" : "rgba(8,61,145,1)",
                      opacity: (sendingFree || !freeEmail.trim()) ? 0.5 : 1,
                    })}
                  >
                    {sendingFree
                      ? <ActivityIndicator size="small" color="#FFFFFF" />
                      : <Ionicons name="mail" size={14} color="#FFFFFF" />
                    }
                    <Text style={{ color: "#FFFFFF", fontSize: 13, fontWeight: "700" }}>
                      {sendingFree ? "Enviando..." : "Enviar"}
                    </Text>
                  </Pressable>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}
