import React from "react";
import { Separator } from "@/components/ui/separator";

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Terms of Service</h1>
      <p className="text-sm text-gray-600 mb-8 text-center">
        Last updated: September 17, 2024
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
        <p className="mb-4">
          Welcome to Amazin ("we," "our," or "us"). By accessing or using our
          website, mobile application, or any of our services, you agree to be
          bound by these Terms of Service ("Terms"). If you do not agree to
          these Terms, please do not use our services.
        </p>
      </section>

      <Separator className="my-8" />

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Use of Services</h2>
        <p className="mb-4">
          You must be at least 18 years old to use our services. By using our
          services, you represent and warrant that you are at least 18 years old
          and that you have the right, authority, and capacity to enter into
          these Terms.
        </p>
        <p className="mb-4">
          You agree to use our services only for lawful purposes and in
          accordance with these Terms. You agree not to use our services:
        </p>
        <ul className="list-disc pl-8 mb-4">
          <li>
            In any way that violates any applicable federal, state, local, or
            international law or regulation
          </li>
          <li>
            To transmit, or procure the sending of, any advertising or
            promotional material, including any "junk mail," "chain letter,"
            "spam," or any other similar solicitation
          </li>
          <li>
            To impersonate or attempt to impersonate Amazin, an Amazin employee,
            another user, or any other person or entity
          </li>
        </ul>
      </section>

      <Separator className="my-8" />

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
        <p className="mb-4">
          When you create an account with us, you must provide accurate,
          complete, and current information. Failure to do so constitutes a
          breach of the Terms, which may result in immediate termination of your
          account on our service.
        </p>
        <p className="mb-4">
          You are responsible for safeguarding the password that you use to
          access the service and for any activities or actions under your
          password. You agree not to disclose your password to any third party.
          You must notify us immediately upon becoming aware of any breach of
          security or unauthorized use of your account.
        </p>
      </section>

      <Separator className="my-8" />

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          4. Intellectual Property
        </h2>
        <p className="mb-4">
          The service and its original content, features, and functionality are
          and will remain the exclusive property of Amazin and its licensors.
          The service is protected by copyright, trademark, and other laws of
          both the United States and foreign countries. Our trademarks and trade
          dress may not be used in connection with any product or service
          without the prior written consent of Amazin.
        </p>
      </section>

      <Separator className="my-8" />

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Termination</h2>
        <p className="mb-4">
          We may terminate or suspend your account immediately, without prior
          notice or liability, for any reason whatsoever, including without
          limitation if you breach the Terms. Upon termination, your right to
          use the service will immediately cease.
        </p>
      </section>

      <Separator className="my-8" />

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          6. Limitation of Liability
        </h2>
        <p className="mb-4">
          In no event shall Amazin, nor its directors, employees, partners,
          agents, suppliers, or affiliates, be liable for any indirect,
          incidental, special, consequential or punitive damages, including
          without limitation, loss of profits, data, use, goodwill, or other
          intangible losses, resulting from your access to or use of or
          inability to access or use the service.
        </p>
      </section>

      <Separator className="my-8" />

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. Governing Law</h2>
        <p className="mb-4">
          These Terms shall be governed and construed in accordance with the
          laws of the United States, without regard to its conflict of law
          provisions. Our failure to enforce any right or provision of these
          Terms will not be considered a waiver of those rights.
        </p>
      </section>

      <Separator className="my-8" />

      <section>
        <h2 className="text-2xl font-semibold mb-4">8. Changes to Terms</h2>
        <p className="mb-4">
          We reserve the right, at our sole discretion, to modify or replace
          these Terms at any time. If a revision is material we will try to
          provide at least 30 days' notice prior to any new terms taking effect.
          What constitutes a material change will be determined at our sole
          discretion.
        </p>
        <p>
          By continuing to access or use our service after those revisions
          become effective, you agree to be bound by the revised terms. If you
          do not agree to the new terms, please stop using the service.
        </p>
      </section>

      <Separator className="my-8" />

      <p className="text-sm text-gray-600 text-center">
        If you have any questions about these Terms, please contact us at
        email@amazin.com
      </p>
    </div>
  );
}
