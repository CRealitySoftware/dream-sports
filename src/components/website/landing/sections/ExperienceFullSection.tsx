import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "@/i18n/I18nProvider";
import type { ThemeColors } from "@/providers/ThemeProvider";
import { Image } from "expo-image";
import { Text, View } from "react-native";

function SectionTag({ label, colors }: { label: string; colors: ThemeColors }) {
  return (
    <View
      style={{
        backgroundColor: colors.brandTint,
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 6,
        alignSelf: "flex-start",
        marginBottom: 12,
      }}
    >
      <Text style={{ color: colors.brand, fontSize: 11, fontWeight: "700", letterSpacing: 2, textTransform: "uppercase" }}>
        {label}
      </Text>
    </View>
  );
}

function PhaseTag({ label, colors, gold }: { label: string; colors: ThemeColors; gold?: boolean }) {
  return (
    <View
      style={{
        backgroundColor: gold ? colors.goldTint : colors.brandTint,
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 6,
        alignSelf: "flex-start",
        marginBottom: 12,
      }}
    >
      <Text style={{ color: gold ? colors.gold : colors.brand, fontSize: 11, fontWeight: "700", letterSpacing: 2, textTransform: "uppercase" }}>
        {label}
      </Text>
    </View>
  );
}

function LogoPlaceholder({ label, size, uri, colors }: { label: string; size?: number; uri?: string | number; colors: ThemeColors }) {
  const s = size ?? 80;
  if (uri) {
    return (
      <Image
        source={uri}
        style={{ width: s, height: s, borderRadius: 12 }}
        contentFit="contain"
      />
    );
  }
  return (
    <View
      style={{
        width: s,
        height: s,
        borderRadius: 12,
        backgroundColor: colors.brandTint,
        borderWidth: 1.5,
        borderColor: colors.brand,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: colors.brand, fontSize: 10, fontWeight: "700", letterSpacing: 1, textTransform: "uppercase", textAlign: "center", paddingHorizontal: 4 }}>
        {label}
      </Text>
    </View>
  );
}

function ImagePlaceholder({ label, width, height, uri, colors }: { label: string; width: number | string; height: number; uri?: string | number; colors: ThemeColors }) {
  if (uri) {
    return <Image source={uri} style={{ width: width as any, height, borderRadius: 16 }} contentFit="cover" />;
  }
  return (
    <View
      style={{
        width: width as number,
        height,
        borderRadius: 16,
        backgroundColor: colors.surfaceElevated,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
      }}
    >
      <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.brandTint, alignItems: "center", justifyContent: "center" }}>
        <View style={{ width: 20, height: 16, borderRadius: 3, backgroundColor: colors.brand, opacity: 0.5 }} />
      </View>
      <Text style={{ color: colors.inkMuted, fontSize: 11, fontWeight: "600", letterSpacing: 0.5, textTransform: "uppercase" }}>
        {label}
      </Text>
    </View>
  );
}

function Divider({ colors }: { colors: ThemeColors }) {
  return <View style={{ height: 1, backgroundColor: colors.border }} />;
}

function IntroBlock({ t, colors }: { t: (k: string) => string; colors: ThemeColors }) {
  return (
    <View style={{ backgroundColor: colors.bg, paddingVertical: 80, paddingHorizontal: 24 }}>
      <View style={{ maxWidth: 1120, alignSelf: "center", width: "100%" }}>
        <AnimatedSection variant="fadeUp">
          <View className="flex-col md:flex-row" style={{ alignItems: "center", gap: 48 }}>
            <View style={{ flex: 1 }}>
              <SectionTag label={t("experienceFull.introTag")} colors={colors} />
              <Text
                style={{
                  color: colors.ink,
                  fontSize: 18,
                  lineHeight: 30,
                  fontWeight: "400",
                }}
              >
                {t("experienceFull.introBody")}
              </Text>
            </View>
            <View className="hidden md:flex" style={{ alignItems: "center", justifyContent: "center" }}>
              <LogoPlaceholder label="DSI Elite Athlete Group" size={200} colors={colors} uri={require("@/assets/images/logos/logo-variant.png")} />
            </View>
          </View>
        </AnimatedSection>
      </View>
    </View>
  );
}

function Phase1Block({ t, colors }: { t: (k: string) => string; colors: ThemeColors }) {
  const disciplines = [
    { label: t("experienceFull.phase1Basketball"), date: t("experienceFull.phase1BasketballDate") },
    { label: t("experienceFull.phase1Volleyball"), date: t("experienceFull.phase1VolleyballDate") },
    { label: t("experienceFull.phase1Football"), date: t("experienceFull.phase1FootballDate") },
  ];

  return (
    <View style={{ backgroundColor: colors.surfaceMuted, borderTopWidth: 1, borderTopColor: colors.border, paddingVertical: 80, paddingHorizontal: 24 }}>
      <View style={{ maxWidth: 1120, alignSelf: "center", width: "100%" }}>
        <AnimatedSection variant="fadeUp">
          <PhaseTag label={t("experienceFull.phase1Tag")} colors={colors} />
          <Text style={{ color: colors.ink, fontSize: 36, fontWeight: "800", letterSpacing: -0.8, marginBottom: 6 }}>
            {t("experienceFull.phase1Title")}
          </Text>
          <Text style={{ color: colors.gold, fontSize: 14, fontWeight: "600", letterSpacing: 0.5, marginBottom: 32 }}>
            {t("experienceFull.phase1Location")}
          </Text>

          <View className="flex-col md:flex-row" style={{ gap: 48, alignItems: "flex-start" }}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: colors.inkMuted, fontSize: 16, lineHeight: 26, marginBottom: 32 }}>
                {t("experienceFull.phase1Body")}
              </Text>
              <ImagePlaceholder label="Campus Colombia" width="100%" height={300} colors={colors} uri={require("@/assets/images/horizontal/1.png")} />
            </View>

            <View
              style={{
                flex: 1,
                backgroundColor: colors.surface,
                borderRadius: 16,
                borderWidth: 1,
                borderColor: colors.border,
                padding: 28,
              }}
            >
              <Text style={{ color: colors.brand, fontSize: 13, fontWeight: "700", letterSpacing: 1, textTransform: "uppercase", marginBottom: 20 }}>
                {t("experienceFull.phase1DatesTitle")}
              </Text>
              {disciplines.map((d, i) => (
                <View key={i} style={{ marginBottom: i < disciplines.length - 1 ? 20 : 0 }}>
                  <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 8 }}>
                    <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: colors.gold, marginTop: 8 }} />
                    <View style={{ flex: 1 }}>
                      <Text style={{ color: colors.ink, fontSize: 15, fontWeight: "700", marginBottom: 2 }}>
                        {d.label}
                      </Text>
                      <Text style={{ color: colors.gold, fontSize: 14, fontWeight: "600" }}>
                        {d.date}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </AnimatedSection>
      </View>
    </View>
  );
}

function IncludesBlock({ t, colors }: { t: (k: string) => string; colors: ThemeColors }) {
  const items = [
    { label: t("experienceFull.includesKitLabel"), body: t("experienceFull.includesKitBody"), n: "01" },
    { label: t("experienceFull.includesServicesLabel"), body: t("experienceFull.includesServicesBody"), n: "02" },
    { label: t("experienceFull.includesTrainingLabel"), body: t("experienceFull.includesTrainingBody"), n: "03" },
    { label: t("experienceFull.includesRecognitionLabel"), body: t("experienceFull.includesRecognitionBody"), n: "04" },
  ];

  return (
    <View style={{ backgroundColor: colors.surfaceElevated, borderTopWidth: 1, borderTopColor: colors.border, paddingVertical: 80, paddingHorizontal: 24 }}>
      <View style={{ maxWidth: 1120, alignSelf: "center", width: "100%" }}>
        <AnimatedSection variant="fadeUp">
          <Text style={{ color: colors.ink, fontSize: 32, fontWeight: "800", letterSpacing: -0.6, textAlign: "center", marginBottom: 48 }}>
            {t("experienceFull.includesTitle")}
          </Text>
        </AnimatedSection>

        <View className="flex-col md:flex-row" style={{ gap: 20, flexWrap: "wrap" }}>
          {items.map((item, i) => (
            <AnimatedSection key={item.n} variant="fadeUp" delay={i * 70} style={{ flex: 1, minWidth: 220 }}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: colors.surface,
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 16,
                  padding: 24,
                }}
              >
                <Text style={{ color: colors.gold, fontSize: 28, fontWeight: "900", letterSpacing: -1, marginBottom: 12 }}>
                  {item.n}
                </Text>
                <Text style={{ color: colors.ink, fontSize: 15, fontWeight: "800", marginBottom: 8 }}>
                  {item.label}
                </Text>
                <Text style={{ color: colors.inkMuted, fontSize: 13, lineHeight: 21 }}>
                  {item.body}
                </Text>
              </View>
            </AnimatedSection>
          ))}
        </View>
      </View>
    </View>
  );
}

function Phase2Block({ t, colors }: { t: (k: string) => string; colors: ThemeColors }) {
  return (
    <View style={{ backgroundColor: colors.brand, borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.1)", paddingVertical: 80, paddingHorizontal: 24 }}>
      <View style={{ maxWidth: 1120, alignSelf: "center", width: "100%" }}>
        <AnimatedSection variant="fadeUp">
          <View className="flex-col md:flex-row" style={{ alignItems: "center", gap: 48 }}>
            <View style={{ flex: 1 }}>
              <View
                style={{
                  backgroundColor: "rgba(255,255,255,0.12)",
                  borderRadius: 20,
                  paddingHorizontal: 14,
                  paddingVertical: 6,
                  alignSelf: "flex-start",
                  marginBottom: 12,
                }}
              >
                <Text style={{ color: colors.gold, fontSize: 11, fontWeight: "700", letterSpacing: 2, textTransform: "uppercase" }}>
                  {t("experienceFull.phase2Tag")}
                </Text>
              </View>
              <Text style={{ color: "rgba(255,255,255,1)", fontSize: 36, fontWeight: "800", letterSpacing: -0.8, marginBottom: 6 }}>
                {t("experienceFull.phase2Title")}
              </Text>
              <Text style={{ color: colors.gold, fontSize: 14, fontWeight: "600", letterSpacing: 0.5, marginBottom: 28 }}>
                {t("experienceFull.phase2Location")}
              </Text>
              <Text style={{ color: "rgba(255,255,255,0.85)", fontSize: 16, lineHeight: 26, marginBottom: 20 }}>
                {t("experienceFull.phase2Body")}
              </Text>
              <View
                style={{
                  backgroundColor: "rgba(255,255,255,0.08)",
                  borderRadius: 12,
                  padding: 20,
                  borderWidth: 1,
                  borderColor: "rgba(255,255,255,0.12)",
                }}
              >
                <Text style={{ color: "rgba(255,255,255,0.9)", fontSize: 14, lineHeight: 24 }}>
                  {t("experienceFull.phase2CycleInfo")}
                </Text>
              </View>
            </View>
            <View className="hidden md:flex">
              <ImagePlaceholder
                label="Roma, Italia"
                width={500}
                height={280}
                colors={{ ...colors, surfaceElevated: "rgba(255,255,255,0.08)", border: "rgba(255,255,255,0.15)", inkMuted: "rgba(255,255,255,0.5)" }}
                uri={require("@/assets/images/horizontal/3.png")}
              />
            </View>
          </View>
        </AnimatedSection>
      </View>
    </View>
  );
}

function ScheduleBlock({ t, colors }: { t: (k: string) => string; colors: ThemeColors }) {
  const months = [
    { label: t("experienceFull.scheduleMonth1Label"), body: t("experienceFull.scheduleMonth1Body"), n: "01" },
    { label: t("experienceFull.scheduleMonths23Label"), body: t("experienceFull.scheduleMonths23Body"), n: "02-03" },
    { label: t("experienceFull.scheduleCulturalLabel"), body: t("experienceFull.scheduleCulturalBody"), n: "+" },
  ];

  return (
    <View style={{ backgroundColor: colors.surfaceMuted, borderTopWidth: 1, borderTopColor: colors.border, paddingVertical: 80, paddingHorizontal: 24 }}>
      <View style={{ maxWidth: 1120, alignSelf: "center", width: "100%" }}>
        <AnimatedSection variant="fadeUp">
          <Text style={{ color: colors.ink, fontSize: 32, fontWeight: "800", letterSpacing: -0.6, textAlign: "center", marginBottom: 48 }}>
            {t("experienceFull.scheduleTitle")}
          </Text>
        </AnimatedSection>

        <View className="flex-col md:flex-row" style={{ gap: 24 }}>
          {months.map((m, i) => (
            <AnimatedSection key={m.n} variant="fadeUp" delay={i * 80} style={{ flex: 1 }}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: colors.surface,
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 16,
                  padding: 28,
                  borderTopWidth: 3,
                  borderTopColor: colors.gold,
                }}
              >
                <Text style={{ color: colors.gold, fontSize: 11, fontWeight: "700", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>
                  {m.n}
                </Text>
                <Text style={{ color: colors.ink, fontSize: 17, fontWeight: "800", marginBottom: 12 }}>
                  {m.label}
                </Text>
                <Text style={{ color: colors.inkMuted, fontSize: 14, lineHeight: 22 }}>
                  {m.body}
                </Text>
              </View>
            </AnimatedSection>
          ))}
        </View>
      </View>
    </View>
  );
}

function VillaBlock({ t, colors }: { t: (k: string) => string; colors: ThemeColors }) {
  return (
    <View style={{ backgroundColor: colors.bg, borderTopWidth: 1, borderTopColor: colors.border, paddingVertical: 80, paddingHorizontal: 24 }}>
      <View style={{ maxWidth: 1120, alignSelf: "center", width: "100%" }}>
        <AnimatedSection variant="fadeUp">
          <View className="flex-col md:flex-row" style={{ gap: 48, alignItems: "center" }}>
            <View className="hidden md:flex" style={{ flex: 1 }}>
              <ImagePlaceholder label="Villa Deportiva" width="100%" height={300} colors={colors} uri={require("@/assets/images/horizontal/4.png")}/>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: colors.ink, fontSize: 32, fontWeight: "800", letterSpacing: -0.6, marginBottom: 6 }}>
                {t("experienceFull.villaTitle")}
              </Text>
              <Text style={{ color: colors.gold, fontSize: 13, fontWeight: "600", letterSpacing: 0.5, marginBottom: 20 }}>
                {t("experienceFull.villaAddress")}
              </Text>
              <Text style={{ color: colors.inkMuted, fontSize: 16, lineHeight: 26 }}>
                {t("experienceFull.villaBody")}
              </Text>
            </View>
            <View className="flex md:hidden" style={{ width: "100%" }}>
              <ImagePlaceholder label="Villa Deportiva" width="100%" height={220} colors={colors} uri={require("@/assets/images/horizontal/4.png")} />
            </View>
          </View>
        </AnimatedSection>
      </View>
    </View>
  );
}

function ProjectionBlock({ t, colors }: { t: (k: string) => string; colors: ThemeColors }) {
  const protocols = [
    { label: t("experienceFull.projectionDirectLabel"), body: t("experienceFull.projectionDirectBody"), n: "01" },
    { label: t("experienceFull.projectionReturnLabel"), body: t("experienceFull.projectionReturnBody"), n: "02" },
    { label: t("experienceFull.projectionLegalLabel"), body: t("experienceFull.projectionLegalBody"), n: "03" },
  ];

  return (
    <View style={{ backgroundColor: colors.surfaceElevated, borderTopWidth: 1, borderTopColor: colors.border, paddingVertical: 80, paddingHorizontal: 24 }}>
      <View style={{ maxWidth: 1120, alignSelf: "center", width: "100%" }}>
        <AnimatedSection variant="fadeUp">
          <Text style={{ color: colors.ink, fontSize: 28, fontWeight: "800", letterSpacing: -0.5, textAlign: "center", marginBottom: 16 }}>
            {t("experienceFull.projectionTitle")}
          </Text>
          <Text style={{ color: colors.inkMuted, fontSize: 15, lineHeight: 25, textAlign: "center", maxWidth: 680, alignSelf: "center", marginBottom: 48 }}>
            {t("experienceFull.projectionIntro")}
          </Text>
        </AnimatedSection>

        <View className="flex-col md:flex-row" style={{ gap: 20 }}>
          {protocols.map((p, i) => (
            <AnimatedSection key={p.n} variant="fadeUp" delay={i * 80} style={{ flex: 1 }}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: colors.surface,
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 16,
                  padding: 28,
                }}
              >
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    backgroundColor: colors.brandTint,
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                  }}
                >
                  <Text style={{ color: colors.brand, fontSize: 12, fontWeight: "800" }}>{p.n}</Text>
                </View>
                <Text style={{ color: colors.ink, fontSize: 15, fontWeight: "800", marginBottom: 10 }}>
                  {p.label}
                </Text>
                <Text style={{ color: colors.inkMuted, fontSize: 14, lineHeight: 22 }}>
                  {p.body}
                </Text>
              </View>
            </AnimatedSection>
          ))}
        </View>
      </View>
    </View>
  );
}

export default function ExperienceFullSection() {
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <View>
      <IntroBlock t={t} colors={colors} />
      <Divider colors={colors} />
      <Phase1Block t={t} colors={colors} />
      <IncludesBlock t={t} colors={colors} />
      <Phase2Block t={t} colors={colors} />
      <ScheduleBlock t={t} colors={colors} />
      <VillaBlock t={t} colors={colors} />
      <ProjectionBlock t={t} colors={colors} />
    </View>
  );
}
