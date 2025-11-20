import React from 'react';
import Layout from '@/components/layout/Layout';

const TermsOfServicePage = () => {
  return (
    <Layout>
      <div className="max-w-[900px] mx-auto px-4 sm:px-8 py-20 lg:py-25">
        <h1 className="text-4xl font-bold text-foreground border-b-2 border-destructive pb-4 mb-8">
          Terms of Service
        </h1>
        <p className="text-muted-foreground mb-8">
          <strong>Effective Date:</strong> November 20, 2025
        </p>

        <div className="bg-destructive/10 p-6 rounded-lg border-l-4 border-destructive mb-8">
          <p className="font-semibold text-destructive mb-2">
            ⚠️ CRITICAL NOTICE: RECORDING CONSENT LIABILITY
          </p>
          <p className="text-sm leading-relaxed text-destructive/90">
            YOU ARE SOLELY RESPONSIBLE FOR OBTAINING ALL NECESSARY CONSENTS FROM MEETING PARTICIPANTS BEFORE RECORDING. 
            SALESGENIUS DISCLAIMS ALL LIABILITY FOR ILLEGAL RECORDINGS.
          </p>
        </div>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-foreground mb-4 mt-8">1. Acceptance of Terms</h2>
          <p className="leading-relaxed text-muted-foreground">
            By installing or using SalesGenius ("Service"), provided by <strong className="text-foreground">Michele Baroni</strong> (License No. 105536, Dubai, UAE), 
            you agree to these Terms. If you do not agree, do not use the Service.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-foreground mb-4 mt-8">2. Recording Compliance & User Responsibility</h2>
          <p className="leading-relaxed text-muted-foreground mb-4">
            SalesGenius records audio from your browser tabs. Laws regarding audio recording vary by jurisdiction 
            (e.g., GDPR in Europe, Two-Party Consent states in the US like California). You agree that:
          </p>
          <ol className="list-decimal pl-6 space-y-2 text-muted-foreground leading-relaxed">
            <li>You are responsible for knowing and following the laws in your jurisdiction and the jurisdiction of other participants.</li>
            <li>You will inform all meeting participants that the call is being recorded and analyzed by AI.</li>
            <li>You will obtain explicit consent where required by law.</li>
          </ol>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-foreground mb-4 mt-8">3. Indemnification (Hold Harmless)</h2>
          <p className="leading-relaxed text-muted-foreground mb-4">
            You agree to <strong className="text-foreground">indemnify, defend, and hold harmless</strong> Michele Baroni 
            and SalesGenius from any claims, damages, legal fees, or liabilities arising out of:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
            <li>Your failure to obtain consent from meeting participants.</li>
            <li>Your violation of any wiretapping, privacy, or eavesdropping laws.</li>
            <li>Your use of the Service in violation of these Terms.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-foreground mb-4 mt-8">4. License & Data Usage</h2>
          <p className="leading-relaxed text-muted-foreground">
            You grant us a license to use, process, and retain your audio recordings and transcripts to provide the Service 
            and to train/improve our AI models, as described in our Privacy Policy.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-foreground mb-4 mt-8">5. Disclaimer of Warranties</h2>
          <p className="leading-relaxed text-muted-foreground">
            The Service is provided "AS IS" without warranties of any kind. We do not guarantee that the sales suggestions 
            provided by the AI will result in successful sales outcomes.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-foreground mb-4 mt-8">6. Governing Law</h2>
          <p className="leading-relaxed text-muted-foreground">
            These Terms are governed by the laws of the <strong className="text-foreground">Dubai International Financial Centre (DIFC), 
            United Arab Emirates</strong>. Any disputes shall be resolved exclusively in the courts of Dubai.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-foreground mb-4 mt-8">7. Contact</h2>
          <p className="leading-relaxed text-muted-foreground">
            For legal inquiries:{' '}
            <a href="mailto:info@getsalesgenius.com" className="text-primary hover:underline">
              info@getsalesgenius.com
            </a>
            <br />
            Address: Dubai Knowledge Park, Building 9, Ground Floor, Dubai, UAE.
          </p>
        </section>
      </div>
    </Layout>
  );
};

export default TermsOfServicePage;
