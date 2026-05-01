import DocumentViewer from "@/components/ui/DocumentViewer";
import Modal from "@/components/ui/Modal";
import StatusBadge from "@/components/ui/StatusBadge";
import { useTheme } from "@/hooks/useTheme";
import { DISCIPLINE_LABELS, STATUS_CONFIG, sendPaymentConfirmation, sendRegistrationConfirmation, type UserRow, type UserStatus } from "@/lib/users";
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
  disciplineApprovedCount: number;
  disciplineCap: number;
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

const GENDER_LABELS: Record<string, string> = {
  male: "Masculino",
  female: "Femenino",
  prefer_not_to_say: "Prefiero no decirlo",
}

function formatBirthDate(dateStr: string | null): string | null {
  if (!dateStr) return null
  const [y, m, d] = dateStr.split("-")
  return `${d}/${m}/${y}`
}

function calcAge(dateStr: string | null): string | null {
  if (!dateStr) return null
  const today = new Date()
  const birth = new Date(dateStr)
  let age = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
  return `${age} años`
}

const STATUS_ACTIONS: { status: UserStatus; label: string; setPaid?: boolean }[] = [
  { status: "approved",  label: "Aprobar",    setPaid: true  },
  { status: "rejected",  label: "Rechazar",   setPaid: false },
  { status: "completed", label: "Completar"                  },
];

export default function UserDetailModal({ user, visible, onClose, onEdit, onStatusChange, onDelete, disciplineApprovedCount, disciplineCap }: Props) {
  const { colors } = useTheme();
  const [loadingStatus, setLoadingStatus] = useState<UserStatus | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [sendingRegEmail, setSendingRegEmail] = useState(false);
  const [regEmailSent, setRegEmailSent] = useState(false);
  const [regEmailError, setRegEmailError] = useState(false);

  async function handleStatus(status: UserStatus, isPaid?: boolean) {
    setLoadingStatus(status);
    await onStatusChange(status, isPaid);
    setLoadingStatus(null);
  }

  async function handleSendRegEmail() {
    setSendingRegEmail(true);
    setRegEmailError(false);
    const { error } = await sendRegistrationConfirmation(user);
    setSendingRegEmail(false);
    if (error) {
      setRegEmailError(true);
    } else {
      setRegEmailSent(true);
    }
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

        <Pressable
          onPress={handleSendRegEmail}
          disabled={sendingRegEmail || regEmailSent}
          style={({ pressed }: { pressed: boolean }) => ({
            flexDirection: "row", alignItems: "center", gap: 6,
            paddingVertical: 8, paddingHorizontal: 14, borderRadius: 8,
            backgroundColor: regEmailSent
              ? "rgba(40,180,90,0.08)"
              : pressed ? colors.surfaceMuted : colors.surfaceElevated,
            borderWidth: 1,
            borderColor: regEmailSent ? "rgba(30,160,70,0.4)" : colors.border,
            opacity: (sendingRegEmail || regEmailSent) ? 0.8 : 1,
          })}
        >
          {sendingRegEmail ? (
            <ActivityIndicator size="small" color={colors.inkMuted} />
          ) : (
            <Ionicons
              name={regEmailSent ? "checkmark-circle-outline" : "mail-unread-outline"}
              size={14}
              color={regEmailSent ? "rgba(30,160,70,1)" : colors.ink}
            />
          )}
          <Text style={{ color: regEmailSent ? "rgba(30,160,70,1)" : colors.ink, fontSize: 13, fontWeight: "600" }}>
            {regEmailSent ? "Correo enviado" : "Reenviar confirmación"}
          </Text>
        </Pressable>

        {regEmailError && (
          <Text style={{ color: "rgba(220,60,60,1)", fontSize: 12, alignSelf: "center" }}>
            Error al enviar
          </Text>
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
            const isApproveBlocked =
              status === "approved" &&
              user.status !== "approved" &&
              disciplineApprovedCount >= disciplineCap;
            const isDisabled = isActive || loadingStatus !== null || isApproveBlocked;
            return (
              <Pressable
                key={status}
                onPress={() => handleStatus(status, setPaid)}
                disabled={isDisabled}
                style={{
                  paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8,
                  backgroundColor: isActive ? cfg.bg : colors.surfaceElevated,
                  borderWidth: 1,
                  borderColor: isActive ? cfg.color : isApproveBlocked ? "rgba(220,60,60,0.3)" : colors.border,
                  opacity: isDisabled ? 0.5 : 1,
                  flexDirection: "row", alignItems: "center", gap: 6,
                }}
              >
                {loadingStatus === status ? (
                  <ActivityIndicator size="small" color={cfg.color} />
                ) : null}
                <Text style={{ color: isActive ? cfg.color : isApproveBlocked ? "rgba(220,60,60,0.7)" : colors.ink, fontSize: 13, fontWeight: isActive ? "700" : "500" }}>
                  {label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {(() => {
          const isApproveBlocked =
            user.status !== "approved" &&
            disciplineApprovedCount >= disciplineCap;
          return isApproveBlocked ? (
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginTop: 8 }}>
              <Ionicons name="lock-closed-outline" size={13} color="rgba(220,60,60,0.8)" />
              <Text style={{ color: "rgba(220,60,60,0.8)", fontSize: 12 }}>
                Cupo lleno — {disciplineApprovedCount}/{disciplineCap} aprobados en esta disciplina. Para aprobar a este atleta, primero rechaza a uno aprobado.
              </Text>
            </View>
          ) : null;
        })()}

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
        <InfoRow label="Género" value={user.gender ? (GENDER_LABELS[user.gender] ?? user.gender) : null} />
        <InfoRow label="Fecha de nacimiento" value={formatBirthDate(user.birth_date)} />
        <InfoRow label="Edad" value={calcAge(user.birth_date)} />
        <InfoRow label="Talla de camiseta" value={user.shirt_size} />
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
