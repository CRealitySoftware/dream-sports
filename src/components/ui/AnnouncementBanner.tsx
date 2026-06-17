
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "@/i18n/I18nProvider";
import { useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";

export default function AnnouncementBanner() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <View style={{ backgroundColor: "#7A3A00", paddingVertical: 10, paddingHorizontal: 16 }}>
        <View style={{ maxWidth: 900, marginHorizontal: "auto", flexDirection: "row", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          {/* Badge */}
          <View style={{ backgroundColor: colors.gold, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 2 }}>
            <Text style={{ color: "#1A1A00", fontSize: 10, fontWeight: "800", letterSpacing: 1.2, textTransform: "uppercase" }}>
              {t("announcement.label")}
            </Text>
          </View>

          {/* Text */}
          <Text style={{ color: "#FFF8E7", fontSize: 13, fontWeight: "600", flex: 1, minWidth: 200 }}>
            {t("announcement.title")} —{" "}
            <Text style={{ color: colors.gold, fontWeight: "700" }}>
              {t("announcement.basketball")} {t("announcement.basketballDates")}
            </Text>
            {"  ·  "}
            <Text style={{ color: colors.gold, fontWeight: "700" }}>
              {t("announcement.volleyballFootball")} {t("announcement.volleyballFootballDates")}
            </Text>
          </Text>

          {/* Actions */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Pressable
              onPress={() => setModalOpen(true)}
              style={{ borderWidth: 1, borderColor: colors.gold, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5 }}
            >
              <Text style={{ color: colors.gold, fontSize: 12, fontWeight: "700" }}>
                {t("announcement.cta")}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>

      <Modal visible={modalOpen} transparent animationType="fade" onRequestClose={() => setModalOpen(false)}>
        <Pressable
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "center", alignItems: "center", padding: 16 }}
          onPress={() => setModalOpen(false)}
        >
          <Pressable
            style={{
              backgroundColor: colors.bg,
              borderRadius: 16,
              maxWidth: 620,
              width: "100%",
              maxHeight: "85%",
              overflow: "hidden",
              shadowColor: "#000",
              shadowOpacity: 0.3,
              shadowRadius: 20,
              elevation: 20,
            }}
            onPress={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <View style={{ backgroundColor: colors.brand, padding: 24, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <View style={{ flex: 1 }}>
                <View style={{ backgroundColor: colors.gold, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 2, alignSelf: "flex-start", marginBottom: 8 }}>
                  <Text style={{ color: "#1A1A00", fontSize: 10, fontWeight: "800", letterSpacing: 1.2, textTransform: "uppercase" }}>
                    COMUNICADO OFICIAL
                  </Text>
                </View>
                <Text style={{ color: "#FFFFFF", fontSize: 18, fontWeight: "800", lineHeight: 24 }}>
                  Dream Sports International
                </Text>
              </View>
              <Pressable onPress={() => setModalOpen(false)} hitSlop={12}>
                <Text style={{ color: "rgba(255,255,255,0.7)", fontSize: 22 }}>✕</Text>
              </Pressable>
            </View>

            {/* Modal body */}
            <ScrollView style={{ padding: 28 }} showsVerticalScrollIndicator={false}>
              <Text style={{ color: colors.ink, fontSize: 14, lineHeight: 22, marginBottom: 16 }}>
                Dream Sports International informa a todos los deportistas, padres de familia, entrenadores, clubes aliados y entidades colaboradoras que, luego de analizar las diferentes solicitudes recibidas y de realizar una evaluación preventiva de las condiciones logísticas y de movilidad, hemos tomado la decisión de <Text style={{ fontWeight: "700" }}>aplazar el inicio de nuestro Campamento Internacional 2026.</Text>
              </Text>
              <Text style={{ color: colors.ink, fontSize: 14, lineHeight: 22, marginBottom: 16 }}>
                Esta determinación se adopta exclusivamente con el propósito de proteger la integridad, seguridad y bienestar de nuestros deportistas, sus familias y el equipo técnico nacional e internacional que participa en el programa.
              </Text>
              <Text style={{ color: colors.ink, fontSize: 14, lineHeight: 22, marginBottom: 16 }}>
                El análisis evidencia la posibilidad de que se presenten situaciones relacionadas con la jornada electoral presidencial que puedan afectar la movilidad y el transporte terrestre y aéreo desde diferentes regiones del país.
              </Text>
              <Text style={{ color: colors.ink, fontSize: 14, lineHeight: 22, marginBottom: 20 }}>
                Dream Sports International mantiene una posición completamente neutral e independiente frente a cualquier corriente, partido o postura política. Esta decisión responde exclusivamente a nuestro compromiso con la seguridad y la adecuada organización de todas las actividades.
              </Text>

              {/* Fechas */}
              <View style={{ backgroundColor: colors.surfaceElevated, borderLeftWidth: 4, borderLeftColor: colors.gold, borderRadius: 10, padding: 20, marginBottom: 20 }}>
                <Text style={{ color: colors.gold, fontSize: 11, fontWeight: "800", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>
                  NUEVAS FECHAS — CAMPAMENTO INTERNACIONAL 2026
                </Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                  <View style={{ flex: 1, minWidth: 140, backgroundColor: colors.brand, borderRadius: 8, padding: 14 }}>
                    <Text style={{ color: colors.gold, fontSize: 11, fontWeight: "700", marginBottom: 4 }}>BALONCESTO</Text>
                    <Text style={{ color: "#FFFFFF", fontSize: 15, fontWeight: "800" }}>1 – 7 de julio</Text>
                  </View>
                  <View style={{ flex: 1, minWidth: 140, backgroundColor: colors.brand, borderRadius: 8, padding: 14 }}>
                    <Text style={{ color: colors.gold, fontSize: 11, fontWeight: "700", marginBottom: 4 }}>VOLEIBOL · FÚTBOL</Text>
                    <Text style={{ color: "#FFFFFF", fontSize: 15, fontWeight: "800" }}>8 – 14 de julio</Text>
                  </View>
                </View>
              </View>

              <Text style={{ color: colors.ink, fontSize: 14, lineHeight: 22, marginBottom: 16 }}>
                Agradecemos profundamente la comprensión, confianza y respaldo de todos quienes hacen parte de este proyecto. Estamos convencidos de que esta decisión responsable permitirá desarrollar el campamento en las mejores condiciones posibles.
              </Text>
              <Text style={{ color: colors.inkMuted, fontSize: 13, lineHeight: 20, marginBottom: 8 }}>
                Reiteramos nuestro compromiso con la formación deportiva, el desarrollo integral de los jóvenes y la creación de oportunidades internacionales para los talentos colombianos.
              </Text>

              <View style={{ borderTopWidth: 1, borderTopColor: colors.border, marginTop: 20, paddingTop: 16, marginBottom: 8 }}>
                <Text style={{ color: colors.inkMuted, fontSize: 12, fontWeight: "700" }}>DREAM SPORTS INTERNATIONAL</Text>
                <Text style={{ color: colors.inkMuted, fontSize: 12 }}>Dirección General · Colombia – Italia</Text>
                <Text style={{ color: colors.inkMuted, fontSize: 11, marginTop: 4 }}>
                  Via della Marcigliana 532, Roma · dreamsports26@gmail.com · P.I. 18488001001
                </Text>
              </View>
            </ScrollView>

            {/* Modal footer */}
            <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: colors.border }}>
              <Pressable
                onPress={() => setModalOpen(false)}
                style={{ backgroundColor: colors.brand, borderRadius: 40, paddingVertical: 13, alignItems: "center" }}
              >
                <Text style={{ color: "#FFFFFF", fontSize: 14, fontWeight: "700" }}>
                  {t("announcement.dismiss")}
                </Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}
