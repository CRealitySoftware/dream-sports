import { BLURHASH, SPORTS_IMAGES } from "@/constants/image";
import { SECTIONS_IDS } from "@/constants/landing";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "@/i18n/I18nProvider";
import type { ThemeColors } from "@/providers/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { AnimatedSection } from "../../../ui/AnimatedSection";

const DISCIPLINES = ["football", "basketball", "volleyball" /* , "cycling" */] as const
type Discipline = (typeof DISCIPLINES)[number]

function PhotoPlaceholder({ colors, discipline }: { colors: ThemeColors, discipline: Discipline }) {
  return (
    <View
      style={{
        width: "100%",
        aspectRatio: 16 / 9,
        backgroundColor: colors.surfaceMuted,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        style={{
          width: "100%",
          height: "100%"
        }}
        source={SPORTS_IMAGES[discipline]}
        placeholder={{ blurhash: BLURHASH }}
        contentFit="cover"
        transition={1000}
      />
    </View>
  )
}

function DisciplineCard({
  discipline,
  colors,
  t,
  fixedWidth,
  onPress
}: {
  discipline: Discipline
  colors: ThemeColors
  t: (k: string) => string
  fixedWidth?: number
  onPress?(): void
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ hovered }: any) => ({
        flex: fixedWidth ? undefined : 1,
        width: fixedWidth,
        backgroundColor: hovered ? colors.surfaceMuted : colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 12,
        overflow: "hidden",
      })}
    >
      <PhotoPlaceholder colors={colors} discipline={discipline} />
      <View style={{ padding: 16, flex: 1 }}>
        <Text
          style={{
            color: colors.ink,
            fontSize: 17,
            fontWeight: "800",
            marginBottom: 8,
            letterSpacing: -0.3,
          }}
        >
          {t(`disciplines.${discipline}.name`)}
        </Text>

        <Text
          numberOfLines={3}
          style={{
            color: colors.inkMuted,
            fontSize: 13,
            lineHeight: 20,
            marginBottom: 14,
            flex: 1,
          }}
        >
          {t(`disciplines.${discipline}.summary`)}
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            marginBottom: 14,
          }}
        >
          <Ionicons name="calendar-outline" size={12} color={colors.gold} />
          <Text
            style={{
              color: colors.gold,
              fontSize: 11,
              fontWeight: "600",
              letterSpacing: 0.2,
            }}
          >
            {t(`disciplines.${discipline}.selectionDate`)}
          </Text>
        </View>
        {/* <Pressable
          onPress={() => console.log(discipline)}
          style={({ pressed }: any) => ({
            borderWidth: 1.5,
            borderColor: colors.brand,
            borderRadius: 8,
            paddingVertical: 9,
            alignItems: "center",
            backgroundColor: pressed ? colors.brandTint : "transparent",
          })}
        >
          <Text
            style={{
              color: colors.brand,
              fontSize: 13,
              fontWeight: "700",
              letterSpacing: 0.3,
            }}
          >
            {t(`disciplines.${discipline}.videoLabel`)}
          </Text>
        </Pressable> */}
      </View>
    </Pressable>
  )
}

export default function DisciplinesSection() {
  const { t } = useTranslation()
  const { colors } = useTheme()
  const { push } = useRouter()

  return (
    <View
      nativeID={SECTIONS_IDS.sports.toString()}
      style={{
        backgroundColor: colors.surfaceMuted,
        borderTopWidth: 1,
        borderTopColor: colors.border,
      }}
    >
      <AnimatedSection variant="fadeUp">
        <View
          className="py-20 md:py-24"
          style={{ maxWidth: 1120, alignSelf: "center", width: "100%" }}
        >
          <View style={{ alignItems: "center", marginBottom: 40, paddingHorizontal: 24 }}>
            <View
              style={{
                backgroundColor: colors.brandTint,
                borderRadius: 20,
                paddingHorizontal: 14,
                paddingVertical: 6,
                marginBottom: 16,
              }}
            >
              <Text
                style={{
                  color: colors.brand,
                  fontSize: 11,
                  fontWeight: "700",
                  letterSpacing: 2,
                  textTransform: "uppercase",
                }}
              >
                {t("disciplines.sectionTag")}
              </Text>
            </View>
            <Text
              style={{
                color: colors.ink,
                fontSize: 36,
                fontWeight: "800",
                letterSpacing: -0.8,
                textAlign: "center",
              }}
            >
              {t("disciplines.sectionTitle")}
            </Text>
          </View>

          <View className="hidden md:flex flex-row px-6" style={{ gap: 16 }}>
            {DISCIPLINES.map((d) => (
              <DisciplineCard key={d} discipline={d} colors={colors} t={t} onPress={() => push(`/(web)/sports/${d}`)} />
            ))}
          </View>
          <ScrollView
            className="flex md:hidden"
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24, gap: 16 }}
          >
            {DISCIPLINES.map((d) => (
              <DisciplineCard key={d} discipline={d} colors={colors} t={t} fixedWidth={280} onPress={() => push(`/(web)/sports/${d}`)} />
            ))}
          </ScrollView>
        </View>
      </AnimatedSection>
    </View>
  )
}
