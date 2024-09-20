"use client";

import React, { ReactNode } from "react";
import { FaPhone } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { CustomForm, CustomFormField, FormColumn, FormRow } from "@/components";
import { handleSubmitContactMail } from "@/lib/actions";
import { contactFormSchema } from "@/lib/types";

export default function ContactPage() {
  const defaultValues = {
    name: "",
    email: "",
    phone: "",
    body: "",
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Contact Us
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <ContactCard
              icon={<FaPhone className="text-white" size={24} />}
              title="Call To Us"
              content={[
                "We are available 24/7, 7 days a week.",
                "Phone: +8801611112222",
              ]}
            />
            <ContactCard
              icon={<IoIosMail className="text-white" size={24} />}
              title="Write To Us"
              content={[
                "Fill out our form and we will contact you within 24 hours.",
                "Email: customer@exclusive.com",
                "Email: support@exclusive.com",
              ]}
            />
          </div>
          <div className="lg:col-span-2">
            <Card className="shadow-xl">
              <CardContent className="p-6">
                <CustomForm
                  schema={contactFormSchema}
                  action={handleSubmitContactMail}
                  defaultValues={defaultValues}
                  submitLabel="Send Message"
                  className="space-y-6"
                >
                  <FormRow>
                    <FormColumn>
                      <CustomFormField
                        label="Name"
                        name="name"
                        placeholder="Your name"
                      />
                    </FormColumn>
                    <FormColumn>
                      <CustomFormField
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                      />
                    </FormColumn>
                  </FormRow>
                  <FormRow>
                    <FormColumn>
                      <CustomFormField
                        label="Phone Number"
                        name="phone"
                        placeholder="+1 (555) 000-0000"
                      />
                    </FormColumn>
                  </FormRow>
                  <FormRow>
                    <FormColumn>
                      <CustomFormField
                        label="Message"
                        name="body"
                        type="textarea"
                        placeholder="How can we help you?"
                        className="h-40 resize-none"
                      />
                    </FormColumn>
                  </FormRow>
                </CustomForm>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ContactCardProps {
  icon: ReactNode;
  title: string;
  content: string[];
}

function ContactCard({ icon, title, content }: ContactCardProps) {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="bg-orange-600 p-3 rounded-full">{icon}</div>
          <CardTitle className="text-xl font-semibold text-gray-900">
            {title}
          </CardTitle>
        </div>
        <div className="space-y-2">
          {content.map((text, index) => (
            <p key={index} className="text-gray-600">
              {text}
            </p>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
