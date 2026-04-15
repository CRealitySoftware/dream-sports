import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "@/i18n/I18nProvider";
import type { ThemeColors } from "@/providers/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { AnimatedSection } from "../../../ui/AnimatedSection";

type FormData = {
  name: string
  email: string
  phone: string
  discipline: string
  message: string
}

type Errors = Partial<Record<keyof FormData, string>>

const DISCIPLINES = ["football", "basketball", "volleyball", "cycling"] as const

function FieldWrapper({
  error,
  children,
}: {
  error?: string
  children: React.ReactNode
}) {
  return (
    <View style={{ flex: 1 }}>
      {children}
      {error ? (
        <Text style={{ fontSize: 11, marginTop: 4, marginLeft: 2, color: "rgba(201,162,39,1)" }}>
          {error}
        </Text>
      ) : null}
    </View>
  )
}

function StyledInput({
  value,
  onChangeText,
  placeholder,
  fieldId,
  focusedField,
  setFocusedField,
  hasError,
  colors,
  multiline,
  numberOfLines,
  keyboardType,
}: {
  value: string
  onChangeText: (v: string) => void
  placeholder: string
  fieldId: string
  focusedField: string | null
  setFocusedField: (id: string | null) => void
  hasError: boolean
  colors: ThemeColors
  multiline?: boolean
  numberOfLines?: number
  keyboardType?: "default" | "email-address" | "phone-pad"
}) {
  const isFocused = focusedField === fieldId
  const borderColor = hasError ? colors.gold : isFocused ? colors.brand : colors.border

  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={colors.inkMuted}
      onFocus={() => setFocusedField(fieldId)}
      onBlur={() => setFocusedField(null)}
      multiline={multiline}
      numberOfLines={numberOfLines}
      keyboardType={keyboardType ?? "default"}
      style={{
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor,
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 13,
        color: colors.ink,
        fontSize: 14,
        minHeight: multiline ? numberOfLines ? numberOfLines * 24 + 26 : 80 : undefined,
        textAlignVertical: multiline ? "top" : "center",
      }}
    />
  )
}

function DisciplinePills({
  selected,
  onSelect,
  hasError,
  colors,
  t,
}: {
  selected: string
  onSelect: (d: string) => void
  hasError: boolean
  colors: ThemeColors
  t: (k: string) => string
}) {
  const labels: Record<string, string> = {
    football: t("registration.disciplineFootball"),
    basketball: t("registration.disciplineBasketball"),
    volleyball: t("registration.disciplineVolleyball"),
    cycling: t("registration.disciplineCycling"),
  }

  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        padding: 10,
        borderWidth: 1,
        borderColor: hasError ? colors.gold : colors.border,
        borderRadius: 10,
        backgroundColor: colors.surface,
        minHeight: 50,
        alignItems: "center",
      }}
    >
      {DISCIPLINES.map((d) => {
        const isSelected = selected === d
        return (
          <Pressable
            key={d}
            onPress={() => onSelect(d)}
            style={{
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: isSelected ? colors.brand : colors.border,
              backgroundColor: isSelected ? colors.brand : "transparent",
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "700",
                color: isSelected ? "rgba(255,255,255,1)" : colors.inkMuted,
              }}
            >
              {labels[d]}
            </Text>
          </Pressable>
        )
      })}
    </View>
  )
}

function SuccessBlock({ colors, t }: { colors: ThemeColors; t: (k: string) => string }) {
  return (
    <View style={{ alignItems: "center", paddingVertical: 48, gap: 16 }}>
      <View
        style={{
          width: 72,
          height: 72,
          borderRadius: 36,
          backgroundColor: colors.goldTint,
          borderWidth: 2,
          borderColor: colors.gold,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons name="checkmark" size={36} color={colors.gold} />
      </View>
      <Text style={{ color: colors.ink, fontSize: 22, fontWeight: "800", textAlign: "center" }}>
        {t("registration.successTitle")}
      </Text>
      <Text
        style={{
          color: colors.inkMuted,
          fontSize: 15,
          lineHeight: 24,
          textAlign: "center",
          maxWidth: 400,
        }}
      >
        {t("registration.successBody")}
      </Text>
    </View>
  )
}

export default function RegistrationSection() {
  const { t } = useTranslation()
  const { colors } = useTheme()

  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    discipline: "",
    message: "",
  })
  const [errors, setErrors] = useState<Errors>({})
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  function setField(key: keyof FormData) {
    return (value: string) => {
      setForm((prev) => ({ ...prev, [key]: value }))
      if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
    }
  }

  function validate(): Errors {
    const e: Errors = {}
    if (!form.name.trim()) e.name = t("registration.fieldRequired")
    if (!form.email.trim()) e.email = t("registration.fieldRequired")
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = t("registration.emailInvalid")
    if (!form.discipline) e.discipline = t("registration.disciplineRequired")
    return e
  }

  function handleSubmit() {
    const e = validate()
    if (Object.keys(e).length > 0) {
      setErrors(e)
      return
    }
    setSubmitError(false)
    // TODO: send registration data to backend or email service (Resend)
    console.log("Registration submitted:", form)
    setSubmitted(true)
  }

  return (
    <View
      nativeID="inscripcion"
      style={{
        backgroundColor: colors.surfaceElevated,
        borderTopWidth: 2,
        borderTopColor: colors.gold,
      }}
    >
      <AnimatedSection variant="fadeUp">
        <View
          className="py-20 md:py-16 px-6"
          style={{ maxWidth: 640, alignSelf: "center", width: "100%" }}
        >
          <View style={{ alignItems: "center", marginBottom: 40 }}>
            <View
              style={{
                backgroundColor: colors.gold,
                borderRadius: 20,
                paddingHorizontal: 14,
                paddingVertical: 6,
                marginBottom: 16,
              }}
            >
              <Text
                style={{
                  color: colors.ctaText,
                  fontSize: 11,
                  fontWeight: "700",
                  letterSpacing: 2,
                  textTransform: "uppercase",
                }}
              >
                {t("registration.sectionTag")}
              </Text>
            </View>
            <Text
              style={{
                color: colors.ink,
                fontSize: 36,
                fontWeight: "800",
                letterSpacing: -0.8,
                textAlign: "center",
                marginBottom: 12,
              }}
            >
              {t("registration.sectionTitle")}
            </Text>
            <Text
              style={{
                color: colors.inkMuted,
                fontSize: 15,
                lineHeight: 24,
                textAlign: "center",
              }}
            >
              {t("registration.sectionSubtitle")}
            </Text>
          </View>

          {submitted ? (
            <SuccessBlock colors={colors} t={t} />
          ) : (
            <View style={{ gap: 12 }}>
              <View className="flex-col md:flex-row" style={{ gap: 12 }}>
                <FieldWrapper error={errors.name}>
                  <StyledInput
                    fieldId="name"
                    value={form.name}
                    onChangeText={setField("name")}
                    placeholder={t("registration.namePlaceholder")}
                    focusedField={focusedField}
                    setFocusedField={setFocusedField}
                    hasError={!!errors.name}
                    colors={colors}
                  />
                </FieldWrapper>
                <FieldWrapper error={errors.email}>
                  <StyledInput
                    fieldId="email"
                    value={form.email}
                    onChangeText={setField("email")}
                    placeholder={t("registration.emailPlaceholder")}
                    focusedField={focusedField}
                    setFocusedField={setFocusedField}
                    hasError={!!errors.email}
                    colors={colors}
                    keyboardType="email-address"
                  />
                </FieldWrapper>
              </View>

              <View className="flex-col md:flex-row" style={{ gap: 12 }}>
                <FieldWrapper error={undefined}>
                  <StyledInput
                    fieldId="phone"
                    value={form.phone}
                    onChangeText={setField("phone")}
                    placeholder={t("registration.phonePlaceholder")}
                    focusedField={focusedField}
                    setFocusedField={setFocusedField}
                    hasError={false}
                    colors={colors}
                    keyboardType="phone-pad"
                  />
                </FieldWrapper>
                <FieldWrapper error={errors.discipline}>
                  <DisciplinePills
                    selected={form.discipline}
                    onSelect={(d) => {
                      setField("discipline")(d)
                      if (errors.discipline) setErrors((prev) => ({ ...prev, discipline: undefined }))
                    }}
                    hasError={!!errors.discipline}
                    colors={colors}
                    t={t}
                  />
                </FieldWrapper>
              </View>

              <FieldWrapper error={undefined}>
                <StyledInput
                  fieldId="message"
                  value={form.message}
                  onChangeText={setField("message")}
                  placeholder={t("registration.messagePlaceholder")}
                  focusedField={focusedField}
                  setFocusedField={setFocusedField}
                  hasError={false}
                  colors={colors}
                  multiline
                  numberOfLines={4}
                />
              </FieldWrapper>

              <View
                style={{
                  backgroundColor: colors.surfaceMuted,
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 12,
                  padding: 20,
                  gap: 8,
                  marginTop: 4,
                }}
              >
                <Text style={{ color: colors.ink, fontSize: 15, fontWeight: "800" }}>
                  {t("registration.paymentTitle")}
                </Text>
                <Text style={{ color: colors.inkMuted, fontSize: 12, lineHeight: 18 }}>
                  {t("registration.paymentSubtitle")}
                </Text>
                <View
                  style={{
                    marginTop: 8,
                    padding: 16,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: colors.border,
                    borderStyle: "dashed",
                    alignItems: "center",
                  }}
                >
                  {/* TODO: integrate Wompi payment widget — requires EXPO_PUBLIC_WOMPI_PUBLIC_KEY from client */}
                  <Text style={{ color: colors.inkMuted, fontSize: 13, textAlign: "center" }}>
                    {t("registration.paymentPending")}
                  </Text>
                </View>
              </View>

              {submitError && (
                <Text style={{ color: colors.gold, fontSize: 13, textAlign: "center" }}>
                  {t("registration.errorBody")}
                </Text>
              )}

              <Pressable
                onPress={handleSubmit}
                style={({ pressed }: any) => ({
                  backgroundColor: pressed ? colors.gold : colors.cta,
                  borderWidth: 1.5,
                  borderColor: colors.gold,
                  borderRadius: 40,
                  paddingVertical: 18,
                  alignItems: "center",
                  marginTop: 4,
                  opacity: pressed ? 0.9 : 1,
                })}
              >
                <Text
                  style={{
                    color: colors.ctaText,
                    fontSize: 16,
                    fontWeight: "800",
                    letterSpacing: 0.3,
                  }}
                >
                  {t("registration.cta")}
                </Text>
              </Pressable>

              <Text
                style={{
                  color: colors.inkMuted,
                  fontSize: 11,
                  textAlign: "center",
                  lineHeight: 16,
                  marginTop: 2,
                }}
              >
                {t("registration.ctaNote")}
              </Text>
            </View>
          )}
        </View>
      </AnimatedSection>
    </View>
  )
}
