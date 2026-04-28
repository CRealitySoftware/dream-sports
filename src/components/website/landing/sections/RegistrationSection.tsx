import { LaunchCountdown } from "@/components/ui/LaunchCountdown";
import PDFViewerModal from "@/components/ui/PDFViewerModal";
import { LAUNCH_DATE, SECTIONS_IDS } from "@/constants/landing";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "@/i18n/I18nProvider";
import { supabase, insertUser } from "@/lib/supabase";
import type { Discipline } from "@/lib/database.types";
import type { ThemeColors } from "@/providers/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ActivityIndicator, Pressable, Text, TextInput, View } from "react-native";
import { AnimatedSection } from "../../../ui/AnimatedSection";

type FormData = {
  name: string
  email: string
  phone: string
  discipline: string
  gender: string
  birthDate: string
  shirtSize: string
  fatherName: string
  fatherCedula: string
  motherName: string
  motherCedula: string
  message: string
}

type Errors = Partial<Record<keyof FormData, string>>

type ConsentErrors = {
  parentConsent: boolean
  dataConsent: boolean
  publicationConsent: boolean
}

const DISCIPLINES = ["football", "basketball", "volleyball" /* , "cycling" */] as const

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
    // cycling: t("registration.disciplineCycling"),
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

const HtmlSelect = "select" as any
const HtmlOption = "option" as any
const HtmlInput = "input" as any

function StyledSelect({
  value,
  onChange,
  placeholder,
  options,
  fieldId,
  focusedField,
  setFocusedField,
  hasError,
  colors,
  isDark,
}: {
  value: string
  onChange: (v: string) => void
  placeholder: string
  options: { value: string; label: string }[]
  fieldId: string
  focusedField: string | null
  setFocusedField: (id: string | null) => void
  hasError: boolean
  colors: ThemeColors
  isDark: boolean
}) {
  const isFocused = focusedField === fieldId
  const borderColor = hasError ? colors.gold : isFocused ? colors.brand : colors.border

  return (
    <View style={{ position: "relative" }}>
      <HtmlSelect
        value={value}
        onChange={(e: any) => onChange(e.target.value)}
        onFocus={() => setFocusedField(fieldId)}
        onBlur={() => setFocusedField(null)}
        style={{
          width: "100%",
          backgroundColor: colors.surface,
          border: `1px solid ${borderColor}`,
          borderRadius: 10,
          paddingTop: 13,
          paddingBottom: 13,
          paddingLeft: 14,
          paddingRight: 40,
          color: value ? colors.ink : colors.inkMuted,
          fontSize: 14,
          appearance: "none",
          WebkitAppearance: "none",
          MozAppearance: "none",
          cursor: "pointer",
          outline: "none",
          colorScheme: isDark ? "dark" : "light",
          transition: "border-color 0.15s",
          boxSizing: "border-box",
        }}
      >
        <HtmlOption value="" disabled style={{ color: colors.inkMuted }}>
          {placeholder}
        </HtmlOption>
        {options.map((opt) => (
          <HtmlOption
            key={opt.value}
            value={opt.value}
            style={{ backgroundColor: colors.surface, color: colors.ink }}
          >
            {opt.label}
          </HtmlOption>
        ))}
      </HtmlSelect>
      <View
        style={{
          position: "absolute",
          right: 14,
          top: 0,
          bottom: 0,
          justifyContent: "center",
          pointerEvents: "none",
        } as any}
      >
        <Ionicons name="chevron-down" size={16} color={colors.inkMuted} />
      </View>
    </View>
  )
}

function StyledDatePicker({
  value,
  onChange,
  fieldId,
  focusedField,
  setFocusedField,
  hasError,
  colors,
  isDark,
  max,
}: {
  value: string
  onChange: (v: string) => void
  fieldId: string
  focusedField: string | null
  setFocusedField: (id: string | null) => void
  hasError: boolean
  colors: ThemeColors
  isDark: boolean
  max?: string
}) {
  const isFocused = focusedField === fieldId
  const borderColor = hasError ? colors.gold : isFocused ? colors.brand : colors.border

  return (
    <HtmlInput
      type="date"
      value={value}
      onChange={(e: any) => onChange(e.target.value)}
      onFocus={() => setFocusedField(fieldId)}
      onBlur={() => setFocusedField(null)}
      max={max}
      style={{
        width: "100%",
        backgroundColor: colors.surface,
        border: `1px solid ${borderColor}`,
        borderRadius: 10,
        paddingTop: 13,
        paddingBottom: 13,
        paddingLeft: 14,
        paddingRight: 14,
        color: value ? colors.ink : colors.inkMuted,
        fontSize: 14,
        outline: "none",
        colorScheme: isDark ? "dark" : "light",
        boxSizing: "border-box",
        transition: "border-color 0.15s",
        cursor: "pointer",
      }}
    />
  )
}

function CheckboxField({
  checked,
  onToggle,
  label,
  hasError,
  errorText,
  colors,
  docLabel,
  onViewDoc,
}: {
  checked: boolean
  onToggle: () => void
  label: string
  hasError: boolean
  errorText: string
  colors: ThemeColors
  docLabel?: string
  onViewDoc?: () => void
}) {
  return (
    <View style={{ gap: 4 }}>
      <Pressable
        onPress={onToggle}
        style={{ flexDirection: "row", gap: 10, alignItems: "flex-start" }}
      >
        <View
          style={{
            width: 20,
            height: 20,
            borderRadius: 4,
            borderWidth: 1.5,
            borderColor: hasError ? colors.gold : checked ? colors.brand : colors.border,
            backgroundColor: checked ? colors.brand : "transparent",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 1,
            flexShrink: 0,
          }}
        >
          {checked && <Ionicons name="checkmark" size={13} color="rgba(255,255,255,1)" />}
        </View>
        <Text style={{ color: colors.inkMuted, fontSize: 13, lineHeight: 20, flex: 1 }}>
          {label}
        </Text>
      </Pressable>
      {docLabel && onViewDoc && (
        <Pressable
          onPress={onViewDoc}
          style={({ pressed }: any) => ({
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
            marginLeft: 30,
            opacity: pressed ? 0.6 : 1,
          })}
        >
          <Ionicons name="document-text-outline" size={13} color={colors.brand} />
          <Text style={{ color: colors.brand, fontSize: 12, fontWeight: "600" }}>
            {docLabel}
          </Text>
        </Pressable>
      )}
      {hasError && (
        <Text style={{ fontSize: 11, marginLeft: 30, color: "rgba(201,162,39,1)" }}>
          {errorText}
        </Text>
      )}
    </View>
  )
}

function SectionDivider({ title, colors }: { title: string; colors: ThemeColors }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginTop: 8 }}>
      <View style={{ flex: 1, height: 1, backgroundColor: colors.border }} />
      <Text
        style={{
          color: colors.gold,
          fontSize: 10,
          fontWeight: "700",
          letterSpacing: 1.5,
          textTransform: "uppercase",
        }}
      >
        {title}
      </Text>
      <View style={{ flex: 1, height: 1, backgroundColor: colors.border }} />
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
  const { colors, isDark } = useTheme()

  const isLaunched = Date.now() >= LAUNCH_DATE.getTime()

  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    discipline: "",
    gender: "",
    birthDate: "",
    shirtSize: "",
    fatherName: "",
    fatherCedula: "",
    motherName: "",
    motherCedula: "",
    message: "",
  })
  const [errors, setErrors] = useState<Errors>({})
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const [parentConsent, setParentConsent] = useState(false)
  const [dataConsent, setDataConsent] = useState(false)
  const [publicationConsent, setPublicationConsent] = useState(false)
  const [consentErrors, setConsentErrors] = useState<ConsentErrors>({
    parentConsent: false,
    dataConsent: false,
    publicationConsent: false,
  })

  const [pdfModal, setPdfModal] = useState<{ url: string; title: string } | null>(null)

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
    if (!form.gender) e.gender = t("registration.genderRequired")
    if (!form.birthDate) e.birthDate = t("registration.birthDateRequired")
    if (!form.shirtSize) e.shirtSize = t("registration.shirtSizeRequired")
    if (!form.fatherName.trim()) e.fatherName = t("registration.fieldRequired")
    if (!form.fatherCedula.trim()) e.fatherCedula = t("registration.fieldRequired")
    if (!form.motherName.trim()) e.motherName = t("registration.fieldRequired")
    if (!form.motherCedula.trim()) e.motherCedula = t("registration.fieldRequired")
    return e
  }

  async function handleSubmit() {
    const e = validate()
    const cErrors: ConsentErrors = {
      parentConsent: !parentConsent,
      dataConsent: !dataConsent,
      publicationConsent: !publicationConsent,
    }
    if (Object.keys(e).length > 0 || Object.values(cErrors).some(Boolean)) {
      setErrors(e)
      setConsentErrors(cErrors)
      return
    }

    setLoading(true)
    setSubmitError(null)

    const userId = crypto.randomUUID()

    const { error } = await insertUser({
      id: userId,
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim() || null,
      discipline: form.discipline as Discipline,
      gender: form.gender,
      birth_date: form.birthDate,
      shirt_size: form.shirtSize,
      father_name: form.fatherName.trim(),
      father_cedula: form.fatherCedula.trim(),
      mother_name: form.motherName.trim(),
      mother_cedula: form.motherCedula.trim(),
      message: form.message.trim() || null,
      parent_consent: parentConsent,
      data_consent: dataConsent,
      publication_consent: publicationConsent,
    })

    setLoading(false)

    if (error) {
      if (error.code === "23505") {
        setSubmitError(t("registration.errorDuplicate"))
      } else {
        setSubmitError(t("registration.errorBody"))
      }
      return
    }

    // Envío del correo de confirmación — no bloqueante
    supabase.functions
      .invoke("send-confirmation-email", {
        body: {
          userId,
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          discipline: form.discipline,
        },
      })
      .catch(console.error)

    setSubmitted(true)
  }

  const DATA_POLICY_URL = "/documents/Politica_Datos_DreamSports.pdf"
  const AUTHORIZATION_URL = "/documents/Autorizacion_Menores_DreamSports_DoblePadre.pdf"

  return (
    <View
      nativeID={SECTIONS_IDS.registration.toString()}
      style={{
        backgroundColor: colors.surfaceElevated,
        borderTopWidth: 2,
        borderTopColor: colors.gold,
      }}
    >
      {pdfModal && (
        <PDFViewerModal
          visible
          url={pdfModal.url}
          title={pdfModal.title}
          onClose={() => setPdfModal(null)}
        />
      )}
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
                marginBottom: 32,
              }}
            >
              {t("registration.sectionSubtitle")}
            </Text>
          </View>

          {!isLaunched ? (
            <LaunchCountdown size="md" />
          ) : submitted ? (
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

              <View className="flex-col md:flex-row" style={{ gap: 12 }}>
                <FieldWrapper error={errors.gender}>
                  <StyledSelect
                    fieldId="gender"
                    value={form.gender}
                    onChange={(g) => {
                      setField("gender")(g)
                      if (errors.gender) setErrors((prev) => ({ ...prev, gender: undefined }))
                    }}
                    placeholder={t("registration.genderLabel")}
                    options={[
                      { value: "male", label: t("registration.genderMale") },
                      { value: "female", label: t("registration.genderFemale") },
                      { value: "prefer_not_to_say", label: t("registration.genderPreferNotToSay") },
                    ]}
                    focusedField={focusedField}
                    setFocusedField={setFocusedField}
                    hasError={!!errors.gender}
                    colors={colors}
                    isDark={isDark}
                  />
                </FieldWrapper>
                <FieldWrapper error={errors.birthDate}>
                  <StyledDatePicker
                    fieldId="birthDate"
                    value={form.birthDate}
                    onChange={setField("birthDate")}
                    focusedField={focusedField}
                    setFocusedField={setFocusedField}
                    hasError={!!errors.birthDate}
                    colors={colors}
                    isDark={isDark}
                    max={new Date().toISOString().split("T")[0]}
                  />
                </FieldWrapper>
              </View>

              <FieldWrapper error={errors.shirtSize}>
                <StyledSelect
                  fieldId="shirtSize"
                  value={form.shirtSize}
                  onChange={(s) => {
                    setField("shirtSize")(s)
                    if (errors.shirtSize) setErrors((prev) => ({ ...prev, shirtSize: undefined }))
                  }}
                  placeholder={t("registration.shirtSizeLabel")}
                  options={["XS", "S", "M", "L", "XL", "XXL"].map((s) => ({ value: s, label: s }))}
                  focusedField={focusedField}
                  setFocusedField={setFocusedField}
                  hasError={!!errors.shirtSize}
                  colors={colors}
                  isDark={isDark}
                />
              </FieldWrapper>

              <SectionDivider title={t("registration.guardianSectionTitle")} colors={colors} />

              <View className="flex-col md:flex-row" style={{ gap: 12 }}>
                <FieldWrapper error={errors.fatherName}>
                  <StyledInput
                    fieldId="fatherName"
                    value={form.fatherName}
                    onChangeText={setField("fatherName")}
                    placeholder={t("registration.fatherNamePlaceholder")}
                    focusedField={focusedField}
                    setFocusedField={setFocusedField}
                    hasError={!!errors.fatherName}
                    colors={colors}
                  />
                </FieldWrapper>
                <FieldWrapper error={errors.fatherCedula}>
                  <StyledInput
                    fieldId="fatherCedula"
                    value={form.fatherCedula}
                    onChangeText={setField("fatherCedula")}
                    placeholder={t("registration.fatherCedulaPlaceholder")}
                    focusedField={focusedField}
                    setFocusedField={setFocusedField}
                    hasError={!!errors.fatherCedula}
                    colors={colors}
                    keyboardType="phone-pad"
                  />
                </FieldWrapper>
              </View>

              <View className="flex-col md:flex-row" style={{ gap: 12 }}>
                <FieldWrapper error={errors.motherName}>
                  <StyledInput
                    fieldId="motherName"
                    value={form.motherName}
                    onChangeText={setField("motherName")}
                    placeholder={t("registration.motherNamePlaceholder")}
                    focusedField={focusedField}
                    setFocusedField={setFocusedField}
                    hasError={!!errors.motherName}
                    colors={colors}
                  />
                </FieldWrapper>
                <FieldWrapper error={errors.motherCedula}>
                  <StyledInput
                    fieldId="motherCedula"
                    value={form.motherCedula}
                    onChangeText={setField("motherCedula")}
                    placeholder={t("registration.motherCedulaPlaceholder")}
                    focusedField={focusedField}
                    setFocusedField={setFocusedField}
                    hasError={!!errors.motherCedula}
                    colors={colors}
                    keyboardType="phone-pad"
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
                  padding: 16,
                  gap: 14,
                  marginTop: 4,
                }}
              >
                <CheckboxField
                  checked={parentConsent}
                  onToggle={() => {
                    setParentConsent((v) => !v)
                    if (consentErrors.parentConsent) setConsentErrors((prev) => ({ ...prev, parentConsent: false }))
                  }}
                  label={t("registration.parentConsentLabel")}
                  hasError={consentErrors.parentConsent}
                  errorText={t("registration.consentRequired")}
                  colors={colors}
                  docLabel={t("registration.viewAuthorizationDoc")}
                  onViewDoc={() => setPdfModal({ url: AUTHORIZATION_URL, title: t("registration.docAuthorizationTitle") })}
                />
                <CheckboxField
                  checked={dataConsent}
                  onToggle={() => {
                    setDataConsent((v) => !v)
                    if (consentErrors.dataConsent) setConsentErrors((prev) => ({ ...prev, dataConsent: false }))
                  }}
                  label={t("registration.dataConsentLabel")}
                  hasError={consentErrors.dataConsent}
                  errorText={t("registration.consentRequired")}
                  colors={colors}
                  docLabel={t("registration.viewDataPolicy")}
                  onViewDoc={() => setPdfModal({ url: DATA_POLICY_URL, title: t("registration.docDataPolicyTitle") })}
                />
                <CheckboxField
                  checked={publicationConsent}
                  onToggle={() => {
                    setPublicationConsent((v) => !v)
                    if (consentErrors.publicationConsent) setConsentErrors((prev) => ({ ...prev, publicationConsent: false }))
                  }}
                  label={t("registration.publicationConsentLabel")}
                  hasError={consentErrors.publicationConsent}
                  errorText={t("registration.consentRequired")}
                  colors={colors}
                  docLabel={t("registration.viewAuthorizationDoc")}
                  onViewDoc={() => setPdfModal({ url: AUTHORIZATION_URL, title: t("registration.docAuthorizationTitle") })}
                />
              </View>

              {submitError && (
                <Text style={{ color: colors.gold, fontSize: 13, textAlign: "center" }}>
                  {submitError}
                </Text>
              )}

              <Pressable
                onPress={handleSubmit}
                disabled={loading}
                style={({ pressed }: any) => ({
                  backgroundColor: pressed ? colors.gold : colors.cta,
                  borderWidth: 1.5,
                  borderColor: colors.gold,
                  borderRadius: 40,
                  paddingVertical: 18,
                  alignItems: "center",
                  marginTop: 4,
                  opacity: loading ? 0.6 : pressed ? 0.9 : 1,
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 8,
                })}
              >
                {loading && <ActivityIndicator size="small" color={colors.ctaText} />}
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
