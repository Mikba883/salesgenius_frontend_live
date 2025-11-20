import React from 'react';
import Layout from '@/components/layout/Layout';

const PrivacyPolicyPage = () => {
  return (
    <Layout>
      <div className="max-w-[900px] mx-auto px-4 sm:px-8 py-20 lg:py-25">
        <h1 className="text-4xl font-bold text-foreground border-b-2 border-primary pb-4 mb-8">
          Privacy Policy
        </h1>
        <p className="text-muted-foreground mb-8">
          <strong>Last Updated:</strong> November 20, 2025
        </p>

        <div className="bg-muted/50 p-6 rounded-lg border-l-4 border-primary mb-8">
          <p className="font-semibold text-foreground mb-2">
            ⚠️ TRANSPARENCY NOTICE: AUDIO RECORDING & AI TRAINING
          </p>
          <p className="text-sm leading-relaxed">
            SalesGenius records and processes audio from your microphone and browser tabs for real-time AI analysis. 
            By using this extension, you acknowledge that audio data and transcripts may be retained to train and improve 
            our AI models, as detailed in Section 3.2.
          </p>
        </div>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-foreground mb-4 mt-8">1. Introduction</h2>
          <p className="leading-relaxed text-muted-foreground">
            This Privacy Policy describes how SalesGenius ("we", "our", or "us") collects, uses, processes, 
            and protects your personal information when you use our Chrome Extension and related services.
          </p>
        </section>

        <div className="bg-accent/20 p-6 rounded-lg border border-accent mb-8">
          <p className="font-semibold text-foreground mb-2">Data Controller:</p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Michele Baroni (Sole Professional)<br />
            License No.: 105536 (Dubai Development Authority)<br />
            Address: Dubai Knowledge Park, Building 9, Ground Floor, Dubai, UAE<br />
            Email: <a href="mailto:info@getsalesgenius.com" className="text-primary hover:underline">
              info@getsalesgenius.com
            </a>
          </p>
        </div>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-foreground mb-4 mt-8">2. Data We Collect</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
            <li>
              <strong className="text-foreground">Audio Data (Biometric):</strong> Voice input from microphone 
              and system audio (tab capture) from meeting platforms (e.g., Google Meet, Zoom).
            </li>
            <li>
              <strong className="text-foreground">Authentication Data:</strong> User IDs and session tokens via Supabase.
            </li>
            <li>
              <strong className="text-foreground">Usage Data:</strong> Technical logs, extension performance metrics, 
              and interaction history.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-foreground mb-4 mt-8">3. How We Use Your Data</h2>
          
          <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">3.1 Service Delivery</h3>
          <p className="leading-relaxed text-muted-foreground mb-6">
            To provide real-time sales coaching, transcribe conversations, and generate contextual suggestions.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">3.2 AI Model Training (Data Retention)</h3>
          <p className="leading-relaxed text-muted-foreground mb-4">
            Unlike services that only process data in-memory, <strong className="text-foreground">we retain anonymized 
            audio recordings and transcripts</strong> to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed mb-4">
            <li>Train and fine-tune our proprietary AI algorithms.</li>
            <li>Improve the accuracy of sales suggestions.</li>
            <li>Analyze conversation patterns for product development.</li>
          </ul>
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Anonymization:</strong> We remove personally identifiable information (PII) 
            from transcripts where feasible before using data for training.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-foreground mb-4 mt-8">4. Third-Party Processors</h2>
          <p className="leading-relaxed text-muted-foreground mb-6">
            We use trusted third-party infrastructure to process your data:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted/30">
                  <th className="border border-border p-3 text-left font-semibold">Provider</th>
                  <th className="border border-border p-3 text-left font-semibold">Purpose</th>
                  <th className="border border-border p-3 text-left font-semibold">Location</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3"><strong>Deepgram</strong></td>
                  <td className="border border-border p-3">Speech-to-Text Transcription</td>
                  <td className="border border-border p-3">USA</td>
                </tr>
                <tr>
                  <td className="border border-border p-3"><strong>OpenAI / Anthropic</strong></td>
                  <td className="border border-border p-3">AI Analysis & Suggestions</td>
                  <td className="border border-border p-3">USA</td>
                </tr>
                <tr>
                  <td className="border border-border p-3"><strong>Supabase</strong></td>
                  <td className="border border-border p-3">Authentication & Database</td>
                  <td className="border border-border p-3">USA (AWS)</td>
                </tr>
                <tr>
                  <td className="border border-border p-3"><strong>Render</strong></td>
                  <td className="border border-border p-3">Backend Hosting</td>
                  <td className="border border-border p-3">USA</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-foreground mb-4 mt-8">5. Limited Use Policy (Chrome Web Store)</h2>
          <p className="leading-relaxed text-muted-foreground mb-4">
            We comply with the Chrome Web Store User Data Policy, specifically:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
            <li>We <strong className="text-foreground">DO NOT</strong> sell your data to third parties or data brokers.</li>
            <li>We <strong className="text-foreground">DO NOT</strong> use data for creditworthiness or lending decisions.</li>
            <li>Data is used exclusively to provide and improve the sales coaching functionality.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-foreground mb-4 mt-8">6. User Responsibility (Recording Consent)</h2>
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">You are solely responsible for complying with all applicable laws regarding 
            recording conversations</strong> (e.g., GDPR in Europe, Two-Party Consent laws in US states). You agree to obtain 
            necessary consent from all meeting participants before activating SalesGenius.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-foreground mb-4 mt-8">7. Your Rights</h2>
          <p className="leading-relaxed text-muted-foreground">
            Depending on your jurisdiction (GDPR, CCPA, DIFC Data Protection Law), you have the right to access, correct, 
            or delete your personal data. To request data deletion, contact us at{' '}
            <a href="mailto:info@getsalesgenius.com" className="text-primary hover:underline">
              info@getsalesgenius.com
            </a>.
          </p>
        </section>
      </div>
    </Layout>
  );
};

export default PrivacyPolicyPage;
