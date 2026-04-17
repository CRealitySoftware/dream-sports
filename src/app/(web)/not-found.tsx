import FooterSection from '@/components/website/landing/sections/FooterSection';
import { useTranslation } from '@/i18n/I18nProvider';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, Text, useWindowDimensions, View } from 'react-native';

export default function NotFoundPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const { height } = useWindowDimensions()

  return (
    <ScrollView>
      <View
        style={{
          minHeight: height * 0.85,
          backgroundColor: '#020D38',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 24,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <View
          style={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: 200,
            backgroundColor: 'rgba(8,61,145,0.35)',
          }}
        />
        <View
          style={{
            position: 'absolute',
            bottom: -80,
            left: -80,
            width: 320,
            height: 320,
            borderRadius: 160,
            backgroundColor: 'rgba(201,162,39,0.12)',
          }}
        />

        <Text
          style={{
            color: '#C9A227',
            fontSize: 128,
            fontWeight: '900',
            lineHeight: 128,
            letterSpacing: -4,
          }}
        >
          {t('notFound.code')}
        </Text>

        <Text
          style={{
            color: '#ffffff',
            fontSize: 28,
            fontWeight: '800',
            textAlign: 'center',
            marginTop: 8,
            marginBottom: 16,
            letterSpacing: -0.5,
          }}
        >
          {t('notFound.headline')}
        </Text>

        <Text
          style={{
            color: 'rgba(255,255,230,0.75)',
            fontSize: 16,
            textAlign: 'center',
            lineHeight: 26,
            maxWidth: 420,
            marginBottom: 40,
          }}
        >
          {t('notFound.subheadline')}
        </Text>

        <Pressable
          onPress={() => router.replace('/(web)')}
          style={({ pressed }: any) => ({
            backgroundColor: pressed ? '#a88820' : '#C9A227',
            paddingHorizontal: 32,
            paddingVertical: 16,
            borderRadius: 40,
          })}
        >
          <Text style={{ color: 'white', fontWeight: '800', fontSize: 15, letterSpacing: 0.3 }}>
            {t('notFound.cta')}
          </Text>
        </Pressable>
      </View>
      <FooterSection />
    </ScrollView>
  )
}
