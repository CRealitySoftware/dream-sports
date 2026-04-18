import UserDetailModal from "@/components/backoffice/users/UserDetailModal";
import UserEditModal from "@/components/backoffice/users/UserEditModal";
import UsersTable from "@/components/backoffice/users/UsersTable";
import { useTheme } from "@/hooks/useTheme";
import {
    deleteUser,
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
