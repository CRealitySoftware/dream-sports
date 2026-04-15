import FooterSection from '@/components/website/landing/sections/FooterSection';
import RegistrationSection from '@/components/website/landing/sections/RegistrationSection';
import React from 'react';
import { ScrollView } from 'react-native';

export default function Page() {
    return (
        <ScrollView>
            <RegistrationSection />
            <FooterSection />
        </ScrollView>
    )
}