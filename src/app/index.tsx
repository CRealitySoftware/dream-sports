import OrganizationJsonLd from '@/components/seo/OrganizationJsonLd';
import SeoHead from '@/components/seo/SeoHead';
import { Redirect } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

export default function index() {
  if (Platform.OS == "web") {
    return (
      <>
        <SeoHead
          title="Programa Internacional Roma 2026"
          description="Inmersión deportiva y reclutamiento en Europa. Conectamos talento colombiano en fútbol, baloncesto y voleibol con el ecosistema profesional italiano."
          path="/"
        />
        <OrganizationJsonLd />
        <Redirect href={"/(web)"} />
      </>
    )
  }

  return <Redirect href={"/(native)"} />
}