import DocumentViewer from "@/components/ui/DocumentViewer";
import Modal from "@/components/ui/Modal";
import StatusBadge from "@/components/ui/StatusBadge";
import { useTheme } from "@/hooks/useTheme";
import { DISCIPLINE_LABELS, STATUS_CONFIG, sendPaymentConfirmation, type UserRow, type UserStatus } from "@/lib/users";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

type Props = {
  user: UserRow;
  visible: boolean;
  onClose: () => void;
  onEdit: () => void;
  onStatusChange: (status: UserStatus, isPaid?: boolean) => Promise<void>;
  onDelete: () => Promise<void>;
};

function InfoRow({ label, value }: { label: string; value: string | null | boolean }) {
  const { colors } = useTheme();
  const display =
    value === null || value === undefined ? "—"
    : typeof value === "boolean" ? (value ? "Sí" : "No")
    : String(value);

  return (
    <View style={{ flexDirection: "row", gap: 8, paddingVertical: 6 }}>
      <Text style={{ color: colors.inkMuted, fontSize: 13, width: 160, flexShrink: 0 }}>{label}</Text>
      <Text style={{ color: colors.ink, fontSize: 13, flex: 1 }}>{display}</Text>
    </View>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const { colors } = useTheme();
  return (
    <View style={{ gap: 4, marginBottom: 20 }}>
      <Text style={{ color: colors.inkMuted, fontSize: 11, fontWeight: "700", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>
        {title}
      </Text>
      {children}
    </View>
  );
}

const STATUS_ACTIONS: { status: UserStatus; label: string; setPaid?: boolean }[] = [
  { status: "approved",  label: "Aprobar",    setPaid: true  },
  { status: "rejected",  label: "Rechazar",   setPaid: false },
  { status: "completed", label: "Completar"                  },
];

export default function UserDetailModal({ user, visible, onClose, onEdit, onStatusChange, onDelete }: Props) {
  const { colors } = useTheme();
  const [loadingStatus, setLoadingStatus] = useState<UserStatus | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState(false);

  async function handleStatus(status: UserStatus, isPaid?: boolean) {
    setLoadingStatus(status);
    await onStatusChange(status, isPaid);
    setLoadingStatus(null);
  }

  async function handleSendEmail() {
    setSendingEmail(true);
    setEmailError(false);
    const { error } = await sendPaymentConfirmation(user);
    setSendingEmail(false);
    if (error) {
      setEmailError(true);
    } else {
      setEmailSent(true);
    }
  }

  async function handleDelete() {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    setDeleting(true);
    await onDelete();
    setDeleting(false);
    setConfirmDelete(false);
  }

  return (
    <Modal visible={visible} onClose={onClose} title={user.name} maxWidth={720}>

      {/* Actions bar */}
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
        <Pressable
          onPress={onEdit}
          style={({ pressed }: { pressed: boolean }) => ({
            flexDirection: "row", alignItems: "center", gap: 6,
            paddingVertical: 8, paddingHorizontal: 14, borderRadius: 8,
            backgroundColor: pressed ? colors.surfaceMuted : colors.surfaceElevated,
            borderWidth: 1, borderColor: colors.border,
          })}
        >
          <Ionicons name="pencil-outline" size={14} color={colors.ink} />
          <Text style={{ color: colors.ink, fontSize: 13, fontWeight: "600" }}>Editar</Text>
        </Pressable>

        <Pressable
          onPress={handleDelete}
          disabled={deleting}
          style={({ pressed }: { pressed: boolean }) => ({
            flexDirection: "row", alignItems: "center", gap: 6,
            paddingVertical: 8, paddingHorizontal: 14, borderRadius: 8,
            backgroundColor: confirmDelete
              ? (pressed ? "rgba(220,60,60,0.2)" : "rgba(220,60,60,0.12)")
              : (pressed ? colors.surfaceMuted : colors.surfaceElevated),
            borderWidth: 1,
            borderColor: confirmDelete ? "rgba(220,60,60,0.4)" : colors.border,
          })}
        >
          {deleting ? (
            <ActivityIndicator size="small" color="rgba(220,60,60,1)" />
          ) : (
            <>
              <Ionicons name="trash-outline" size={14} color="rgba(220,60,60,1)" />
              <Text style={{ color: "rgba(220,60,60,1)", fontSize: 13, fontWeight: "600" }}>
                {confirmDelete ? "¿Confirmar?" : "Eliminar"}
              </Text>
            </>
          )}
        </Pressable>

        {confirmDelete && (
          <Pressable
            onPress={() => setConfirmDelete(false)}
            style={{ paddingVertical: 8, paddingHorizontal: 10, justifyContent: "center" }}
          >
            <Text style={{ color: colors.inkMuted, fontSize: 13 }}>Cancelar</Text>
          </Pressable>
        )}
      </View>

      {/* Status */}
      <Section title="Estado">
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <StatusBadge status={user.status} />
          <Text style={{ color: colors.inkMuted, fontSize: 13 }}>
            Pago: <Text style={{ fontWeight: "700", color: user.is_paid ? "rgba(30,160,70,1)" : colors.inkMuted }}>
              {user.is_paid ? "Confirmado" : "Pendiente"}
            </Text>
          </Text>
        </View>

        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
          {STATUS_ACTIONS.map(({ status, label, setPaid }) => {
            const isActive = user.status === status;
            const cfg = STATUS_CONFIG[status];
            return (
              <Pressable
                key={status}
                onPress={() => handleStatus(status, setPaid)}
                disabled={isActive || loadingStatus !== null}
                style={{
                  paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8,
                  backgroundColor: isActive ? cfg.bg : colors.surfaceElevated,
                  borderWidth: 1,
                  borderColor: isActive ? cfg.color : colors.border,
                  opacity: (isActive || loadingStatus !== null) ? 0.7 : 1,
                  flexDirection: "row", alignItems: "center", gap: 6,
                }}
              >
                {loadingStatus === status ? (
                  <ActivityIndicator size="small" color={cfg.color} />
                ) : null}
                <Text style={{ color: isActive ? cfg.color : colors.ink, fontSize: 13, fontWeight: isActive ? "700" : "500" }}>
                  {label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {user.status === "approved" && (
          <View style={{ marginTop: 16, flexDirection: "row", alignItems: "center", gap: 12 }}>
            <Pressable
              onPress={handleSendEmail}
              disabled={sendingEmail || emailSent}
              style={({ pressed }: { pressed: boolean }) => ({
                flexDirection: "row", alignItems: "center", gap: 8,
                paddingVertical: 10, paddingHorizontal: 18, borderRadius: 8,
                backgroundColor: emailSent
                  ? "rgba(40,180,90,0.12)"
                  : pressed ? "rgba(8,61,145,0.15)" : "rgba(8,61,145,0.08)",
                borderWidth: 1,
                borderColor: emailSent ? "rgba(30,160,70,0.5)" : "rgba(8,61,145,0.3)",
                opacity: (sendingEmail || emailSent) ? 0.8 : 1,
              })}
            >
              {sendingEmail ? (
                <ActivityIndicator size="small" color="rgba(8,61,145,1)" />
              ) : (
                <Ionicons
                  name={emailSent ? "checkmark-circle-outline" : "mail-outline"}
                  size={15}
                  color={emailSent ? "rgba(30,160,70,1)" : "rgba(8,61,145,1)"}
                />
              )}
              <Text style={{
                fontSize: 13, fontWeight: "600",
                color: emailSent ? "rgba(30,160,70,1)" : "rgba(8,61,145,1)",
              }}>
                {emailSent ? "Correo enviado" : "Enviar correo de confirmación"}
              </Text>
            </Pressable>
            {emailError && (
              <Text style={{ color: "rgba(220,60,60,1)", fontSize: 12 }}>
                Error al enviar, intenta de nuevo
              </Text>
            )}
          </View>
        )}
      </Section>

      {/* Personal */}
      <Section title="Datos personales">
        <InfoRow label="Nombre completo" value={user.name} />
        <InfoRow label="Email" value={user.email} />
        <InfoRow label="Teléfono" value={user.phone} />
        <InfoRow label="Disciplina" value={DISCIPLINE_LABELS[user.discipline] ?? user.discipline} />
        <InfoRow label="Mensaje" value={user.message} />
        <InfoRow label="Inscrito el" value={new Date(user.created_at).toLocaleString("es-CO")} />
      </Section>

      {/* Guardian */}
      <Section title="Acudiente — Padre">
        <InfoRow label="Nombre" value={user.father_name} />
        <InfoRow label="Cédula" value={user.father_cedula} />
      </Section>

      <Section title="Acudiente — Madre">
        <InfoRow label="Nombre" value={user.mother_name} />
        <InfoRow label="Cédula" value={user.mother_cedula} />
      </Section>

      {/* Consents */}
      <Section title="Autorizaciones">
        <InfoRow label="Autorización acudiente" value={user.parent_consent} />
        <InfoRow label="Manejo de datos" value={user.data_consent} />
        <InfoRow label="Publicación" value={user.publication_consent} />
      </Section>

      {/* Document */}
      <Section title="Comprobante de pago">
        <DocumentViewer path={user.invoice_path} />
      </Section>

    </Modal>
  );
}
