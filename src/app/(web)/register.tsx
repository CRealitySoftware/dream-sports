import SeoHead from '@/components/seo/SeoHead';
import FooterSection from '@/components/website/landing/sections/FooterSection';
import RegistrationSection from '@/components/website/landing/sections/RegistrationSection';
import React from 'react';
import { ScrollView } from 'react-native';

export default function Page() {
    return (
        <ScrollView>
            <SeoHead
                title="Inscripción"
                description="Reserva tu cupo en el programa Dream Sports International y da el siguiente paso hacia el ecosistema deportivo europeo."
                path="/register"
            />
            <RegistrationSection />
            <FooterSection />
        </ScrollView>
    )
}