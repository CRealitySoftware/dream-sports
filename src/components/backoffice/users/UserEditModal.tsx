import Modal from "@/components/ui/Modal";
import { useTheme } from "@/hooks/useTheme";
import { DISCIPLINE_LABELS, type EditableUserFields, type UserRow } from "@/lib/users";
import { ActivityIndicator, Pressable, Text, TextInput, View } from "react-native";
import { useState } from "react";

type Props = {
  user: UserRow;
  visible: boolean;
  onClose: () => void;
  onSave: (fields: Partial<EditableUserFields>) => Promise<void>;
};

type Discipline = "football" | "basketball" | "volleyball" /* | "cycling" */;
const DISCIPLINES = Object.keys(DISCIPLINE_LABELS) as Discipline[];

function Field({
  label,
  value,
  onChange,
  placeholder,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  multiline?: boolean;
}) {
  const { colors } = useTheme();
  return (
    <View style={{ gap: 6, marginBottom: 16 }}>
      <Text style={{ color: colors.inkMuted, fontSize: 12, fontWeight: "600", textTransform: "uppercase", letterSpacing: 0.6 }}>
        {label}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={colors.inkMuted}
        multiline={multiline}
        style={{
          backgroundColor: colors.surfaceMuted,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 8,
          paddingVertical: 10,
          paddingHorizontal: 12,
          fontSize: 14,
          color: colors.ink,
          minHeight: multiline ? 80 : undefined,
          outlineStyle: "none" as never,
        }}
      />
    </View>
  );
}

function DisciplinePicker({ value, onChange }: { value: Discipline; onChange: (d: Discipline) => void }) {
  const { colors } = useTheme();
  return (
    <View style={{ gap: 6, marginBottom: 16 }}>
      <Text style={{ color: colors.inkMuted, fontSize: 12, fontWeight: "600", textTransform: "uppercase", letterSpacing: 0.6 }}>
        Disciplina
      </Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
        {DISCIPLINES.map((d) => {
          const active = value === d;
          return (
            <Pressable
              key={d}
              onPress={() => onChange(d)}
              style={{
                paddingVertical: 8,
                paddingHorizontal: 14,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: active ? colors.brand : colors.border,
                backgroundColor: active ? colors.brandTint : colors.surfaceElevated,
              }}
            >
              <Text style={{ color: active ? colors.brand : colors.inkMuted, fontSize: 13, fontWeight: active ? "700" : "500" }}>
                {DISCIPLINE_LABELS[d]}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export default function UserEditModal({ user, visible, onClose, onSave }: Props) {
  const { colors } = useTheme();
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState<EditableUserFields>({
    name: user.name,
    email: user.email,
    phone: user.phone ?? "",
    discipline: user.discipline,
    father_name: user.father_name,
    father_cedula: user.father_cedula,
    mother_name: user.mother_name,
    mother_cedula: user.mother_cedula,
    message: user.message ?? "",
  });

  function set<K extends keyof EditableUserFields>(key: K, value: EditableUserFields[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    setSaving(true);
    const fields: Partial<EditableUserFields> = {
      ...form,
      phone: form.phone?.trim() || null,
      message: form.message?.trim() || null,
    };
    await onSave(fields);
    setSaving(false);
  }

  return (
    <Modal visible={visible} onClose={onClose} title={`Editar — ${user.name}`} maxWidth={600}>

      <Field label="Nombre completo" value={form.name} onChange={(v) => set("name", v)} />
      <Field label="Email" value={form.email} onChange={(v) => set("email", v)} />
      <Field label="Teléfono" value={form.phone ?? ""} onChange={(v) => set("phone", v)} placeholder="Opcional" />

      <DisciplinePicker value={form.discipline} onChange={(d) => set("discipline", d)} />

      <View style={{ height: 1, backgroundColor: colors.border, marginVertical: 8 }} />

      <Field label="Nombre padre" value={form.father_name} onChange={(v) => set("father_name", v)} />
      <Field label="Cédula padre" value={form.father_cedula} onChange={(v) => set("father_cedula", v)} />
      <Field label="Nombre madre" value={form.mother_name} onChange={(v) => set("mother_name", v)} />
      <Field label="Cédula madre" value={form.mother_cedula} onChange={(v) => set("mother_cedula", v)} />

      <View style={{ height: 1, backgroundColor: colors.border, marginVertical: 8 }} />

      <Field label="Mensaje" value={form.message ?? ""} onChange={(v) => set("message", v)} placeholder="Opcional" multiline />

      <Pressable
        onPress={handleSave}
        disabled={saving}
        style={{
          backgroundColor: colors.brand,
          borderRadius: 10,
          paddingVertical: 14,
          alignItems: "center",
          marginTop: 8,
          opacity: saving ? 0.6 : 1,
        }}
      >
        {saving ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text style={{ color: "#ffffff", fontSize: 14, fontWeight: "700" }}>Guardar cambios</Text>
        )}
      </Pressable>
    </Modal>
  );
}
