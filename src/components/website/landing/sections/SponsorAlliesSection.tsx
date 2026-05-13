import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "@/i18n/I18nProvider";
import type { ThemeColors } from "@/providers/ThemeProvider";
import { Image } from "expo-image";
import { Text, View } from "react-native";

type AllySlideData = {
  index: number;
  logoLabel: string;
  logoSource?: string | number;
  imageSource?: string | number;
  name: string;
  role: string;
  body: string;
  originTag: string;
  originColor: "brand" | "gold";
};

function ImagePlaceholder({ label, source, colors }: { label: string; source?: string | number; colors: ThemeColors }) {
  if (source) {
    return (
      <Image
        source={source}
        style={{ flex: 1, minHeight: 500 }}
        contentFit="cover"
      />
    );
  }
  return (
    <View
      style={{
        flex: 1,
        minHeight: 340,
        backgroundColor: colors.surfaceElevated,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
      }}
    >
      <View
        style={{
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: colors.brandTint,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ width: 28, height: 22, borderRadius: 4, backgroundColor: colors.brand, opacity: 0.4 }} />
      </View>
      <Text style={{ color: colors.inkMuted, fontSize: 12, fontWeight: "600", letterSpacing: 0.5, textTransform: "uppercase" }}>
        {label}
      </Text>
    </View>
  );
}

function LogoChip({ label, source, colors }: { label: string; source?: string | number; colors: ThemeColors }) {
  if (source) {
    return (
      <Image
        source={source}
        style={{ width: 100, height: 100, borderRadius: 16, marginBottom: 24 }}
        contentFit="contain"
      />
    );
  }
  return (
    <View
      style={{
        width: 72,
        height: 72,
        borderRadius: 16,
        backgroundColor: colors.brandTint,
        borderWidth: 1.5,
        borderColor: colors.brand,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 24,
      }}
    >
      <Text
        style={{
          color: colors.brand,
          fontSize: 9,
          fontWeight: "800",
          letterSpacing: 1,
          textTransform: "uppercase",
          textAlign: "center",
          paddingHorizontal: 6,
        }}
      >
        {label}
      </Text>
    </View>
  );
}

function GroupDivider({ label, colors }: { label: string; colors: ThemeColors }) {
  return (
    <View
      style={{
        backgroundColor: colors.brand,
        paddingVertical: 20,
        paddingHorizontal: 40,
        alignItems: "center",
      }}
    >
      <Text style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, fontWeight: "700", letterSpacing: 3, textTransform: "uppercase" }}>
        {label}
      </Text>
    </View>
  );
}

function AllySlide({ data, colors }: { data: AllySlideData; colors: ThemeColors }) {
  const isEven = data.index % 2 === 0;
  const bg = isEven ? colors.bg : colors.surfaceMuted;
  const accentColor = data.originColor === "gold" ? colors.gold : colors.brand;
  const accentBg = data.originColor === "gold" ? colors.goldTint : colors.brandTint;

  const textColumn = (
    <AnimatedSection variant={isEven ? "fadeRight" : "fadeLeft"} style={{ flex: 2 }}>
      <View style={{ flex: 1, paddingVertical: 72, paddingHorizontal: 48, justifyContent: "center" }}>
        <LogoChip label={data.logoLabel} source={data.logoSource} colors={colors} />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            marginBottom: 16,
            flexWrap: "wrap",
          }}
        >
          <View
            style={{
              backgroundColor: accentBg,
              borderRadius: 20,
              paddingHorizontal: 12,
              paddingVertical: 5,
            }}
          >
            <Text style={{ color: accentColor, fontSize: 11, fontWeight: "700", letterSpacing: 0.5 }}>
              {data.role}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: colors.surfaceElevated,
              borderRadius: 20,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <Text style={{ color: colors.inkMuted, fontSize: 10, fontWeight: "700", letterSpacing: 1, textTransform: "uppercase" }}>
              {data.originTag}
            </Text>
          </View>
        </View>

        <Text
          style={{
            color: colors.ink,
            fontSize: 28,
            fontWeight: "800",
            letterSpacing: -0.5,
            lineHeight: 36,
            marginBottom: 20,
          }}
        >
          {data.name}
        </Text>

        <View style={{ height: 2, width: 40, backgroundColor: accentColor, marginBottom: 20 }} />

        <Text style={{ color: colors.inkMuted, fontSize: 15, lineHeight: 26 }}>
          {data.body}
        </Text>
      </View>
    </AnimatedSection>
  );

  const imageColumn = (
    <AnimatedSection variant={isEven ? "fadeLeft" : "fadeRight"} style={{ flex: 1, minHeight: 500 }}>
      <ImagePlaceholder label={data.logoLabel} source={data.imageSource} colors={colors} />
    </AnimatedSection>
  );

  return (
    <View style={{ backgroundColor: bg, borderTopWidth: 1, borderTopColor: colors.border }}>
      <View className={`flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`} style={{ minHeight: 500 }}>
        {textColumn}
        {imageColumn}
      </View>
    </View>
  );
}

export default function SponsorAlliesSection() {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const italianAllies: AllySlideData[] = [
    {
      index: 0,
      logoLabel: "MSR",
      name: t("sponsors.msrName"),
      role: t("sponsors.msrRole"),
      body: t("sponsors.msrBody"),
      originTag: "Roma, Italia",
      originColor: "brand",
      imageSource: require("@/assets/images/vertical/6.png"),
      logoSource: require("@/assets/images/logos/12.png")
    },
    {
      index: 1,
      logoLabel: "Certosa",
      name: t("sponsors.certosaName"),
      role: t("sponsors.certosaRole"),
      body: t("sponsors.certosaBody"),
      originTag: "Roma, Italia",
      originColor: "brand",
      imageSource: require("@/assets/images/vertical/7.png"),
      logoSource: require("@/assets/images/logos/13.png")
    },
    {
      index: 2,
      logoLabel: "Rete Sport",
      name: t("sponsors.retesportName"),
      role: t("sponsors.retesportRole"),
      body: t("sponsors.retesportBody"),
      originTag: "Roma, Italia",
      originColor: "brand",
      imageSource: require("@/assets/images/vertical/8.png"),
      logoSource: require("@/assets/images/logos/14.png")
    },
  ];

  const eliteTeam: AllySlideData[] = [
    {
      index: 0,
      logoLabel: "X-Move",
      name: "X-Move Human Performance",
      role: t("experienceFull.xmoveRole"),
      body: t("experienceFull.xmoveBody"),
      originTag: "Colombia",
      originColor: "gold",
      imageSource: require("@/assets/images/vertical/1.png"),
      logoSource: require("@/assets/images/logos/8.png")
    },
    {
      index: 1,
      logoLabel: "AJ Skills",
      name: "AJ.Skills Coach",
      role: t("experienceFull.ajSkillsRole"),
      body: t("experienceFull.ajSkillsBody"),
      originTag: "Colombia",
      originColor: "gold",
      imageSource: require("@/assets/images/vertical/2.png"),
      logoSource: require("@/assets/images/logos/9.png")
    },
    {
      index: 2,
      logoLabel: "DJ FC",
      name: "Dimelo Jara FC",
      role: t("experienceFull.dimeloJaraRole"),
      body: t("experienceFull.dimeloJaraBody"),
      originTag: "Colombia",
      originColor: "gold",
      imageSource: require("@/assets/images/vertical/3.png"),
      logoSource: require("@/assets/images/logos/10.png")
    },
    {
      index: 3,
      logoLabel: "Manos Voley",
      name: "Manos Voley Club",
      role: t("experienceFull.manosVoleyRole"),
      body: t("experienceFull.manosVoleyBody"),
      originTag: "Colombia",
      originColor: "gold",
      imageSource: require("@/assets/images/vertical/4.png"),
      logoSource: require("@/assets/images/logos/11.png")
    },
  ];

  return (
    <View>
      {italianAllies.map((ally) => (
        <AllySlide key={ally.logoLabel} data={ally} colors={colors} />
      ))}

      <GroupDivider label={t("experienceFull.teamTitle")} colors={colors} />

      {eliteTeam.map((ally) => (
        <AllySlide key={ally.logoLabel} data={ally} colors={colors} />
      ))}
    </View>
  );
}
