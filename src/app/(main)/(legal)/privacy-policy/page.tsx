import React from "react";
import { Separator } from "@/components/ui/separator";

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Amazin</h1>
      <p className="text-sm text-gray-600 mb-8 text-center">
        Last updated: September 18, 2024
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
        <p className="mb-4">
          Welcome to Amazin ("we," "our," or "us"). We are committed to
          protecting your personal information and your right to privacy. This
          Privacy Policy explains how we collect, use, disclose, and safeguard
          your information when you visit our website or use our services.
        </p>
      </section>

      <Separator className="my-8" />

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          2. Information We Collect
        </h2>
        <p className="mb-4">
          We collect personal information that you provide to us when you
          register on our site, place an order, subscribe to our newsletter, or
          fill out a form. This may include:
        </p>
        <ul className="list-disc pl-8 mb-4">
          <li>Name</li>
          <li>Email address</li>
          <li>Mailing address</li>
          <li>Phone number</li>
          <li>Payment information</li>
        </ul>
        <p className="mb-4">
          We also automatically collect certain information when you visit, use,
          or navigate our site. This information does not reveal your specific
          identity but may include device and usage information, such as your IP
          address, browser and device characteristics, operating system, and
          referring URLs.
        </p>
      </section>

      <Separator className="my-8" />

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          3. How We Use Your Information
        </h2>
        <p className="mb-4">We use the information we collect or receive:</p>
        <ul className="list-disc pl-8 mb-4">
          <li>To fulfill and manage your orders</li>
          <li>To provide, operate, and maintain our website</li>
          <li>To improve, personalize, and expand our website</li>
          <li>
            To communicate with you about products, services, and promotions
          </li>
          <li>
            To respond to your comments, questions, and customer service
            requests
          </li>
          <li>To prevent fraud</li>
        </ul>
      </section>

      <Separator className="my-8" />

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          4. Sharing Your Information
        </h2>
        <p className="mb-4">We may share your information with:</p>
        <ul className="list-disc pl-8 mb-4">
          <li>
            Service providers and business partners who help us deliver our
            services
          </li>
          <li>
            Legal and regulatory authorities, as required by applicable laws
          </li>
          <li>
            Potential buyers in the event of a sale, merger, or acquisition of
            our company
          </li>
        </ul>
        <p className="mb-4">
          We do not sell or rent your personal information to third parties.
        </p>
      </section>

      <Separator className="my-8" />

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Your Privacy Rights</h2>
        <p className="mb-4">
          Depending on your location, you may have certain rights regarding your
          personal information, including:
        </p>
        <ul className="list-disc pl-8 mb-4">
          <li>
            The right to access and receive a copy of your personal information
          </li>
          <li>The right to rectify or update your personal information</li>
          <li>The right to delete your personal information</li>
          <li>
            The right to restrict or object to our processing of your personal
            information
          </li>
        </ul>
        <p className="mb-4">
          To exercise these rights, please contact us using the information
          provided at the end of this policy.
        </p>
      </section>

      <Separator className="my-8" />

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Data Security</h2>
        <p className="mb-4">
          We have implemented appropriate technical and organizational security
          measures designed to protect the security of any personal information
          we process. However, please note that no electronic transmission over
          the Internet or information storage technology can be guaranteed to be
          100% secure.
        </p>
      </section>

      <Separator className="my-8" />

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          7. Changes to This Privacy Policy
        </h2>
        <p className="mb-4">
          We may update this privacy policy from time to time. The updated
          version will be indicated by an updated "Last updated" date and the
          updated version will be effective as soon as it is accessible. We
          encourage you to review this privacy policy frequently to be informed
          of how we are protecting your information.
        </p>
      </section>

      <Separator className="my-8" />

      <section>
        <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
        <p className="mb-4">
          If you have questions or comments about this policy, you may contact
          us at:
        </p>
        <p className="mb-4">
          Amazin
          <br />
          1234 Main St.
          <br />
          Email: email@amazin.com
          <br />
          Phone: +1-123-456-7890
        </p>
      </section>

      <Separator className="my-8" />

      <p className="text-sm text-gray-600 text-center">
        This privacy policy was created for Amazin.
      </p>
    </div>
  );
}
