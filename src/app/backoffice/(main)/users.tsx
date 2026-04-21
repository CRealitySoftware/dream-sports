import UserDetailModal from "@/components/backoffice/users/UserDetailModal";
import UserEditModal from "@/components/backoffice/users/UserEditModal";
import UsersTable from "@/components/backoffice/users/UsersTable";
import { useTheme } from "@/hooks/useTheme";
import {
    deleteUser,
    DISCIPLINE_LABELS,
    fetchUsers,
    updateUserInfo,
    updateUserStatus,
    type EditableUserFields,
    type UserRow,
    type UserStatus,
} from "@/lib/users";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

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

      {/* Discipline metrics */}
      {!loading && <DisciplineMetrics users={users} colors={colors} />}

      {/* Table */}
      <View style={{ flex: 1, backgroundColor: colors.surface }}>
        {loading ? (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <ActivityIndicator size="large" color={colors.brand} />
          </View>
        ) : (
          <UsersTable users={users} onView={setSelectedUser} />
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
    </View>
  );
}
