import { ContactFormValues } from "@/lib/types";

const StatCardsData: StatCardProps[] = [
  { icon: "BsShop", number: 35500, label: "Customer active in our site" },
  {
    icon: "RiMoneyDollarCircleLine",
    number: 33000,
    label: "Monthly Product Sale",
  },
  {
    icon: "MdShoppingBag",
    number: 455000,
    label: "Customer active in our site",
  },
  { icon: "CiBag1", number: 25000, label: "Annual gross sale in our site" },
];

const teamData: TeamCardProps[] = [
  {
    image: "/team/image-2.png",
    name: "Robert Chen",
    position: "Chief Executive Officer",
    socialLinks: [
      { icon: "FaLinkedin", href: "https://linkedin.com" },
      { icon: "FaXTwitter", href: "https://twitter.com" },
    ],
  },
  {
    image: "/team/image-7.png",
    name: "Sarah Kim",
    position: "Head of Operations",
    socialLinks: [{ icon: "FaLinkedin", href: "https://linkedin.com" }],
  },
  {
    image: "/team/image-3.png",
    name: "David Wong",
    position: "Chief Technology Officer",
    socialLinks: [
      { icon: "FaLinkedin", href: "https://linkedin.com" },
      { icon: "FaGithub", href: "https://github.com" },
      { icon: "FaXTwitter", href: "https://twitter.com" },
    ],
  },
  {
    image: "/team/image-9.png",
    name: "Emily Nguyen",
    position: "Client Relations Manager",
    socialLinks: [
      { icon: "FaLinkedin", href: "https://linkedin.com" },
      { icon: "FaXTwitter", href: "https://twitter.com" },
      { icon: "FaGithub", href: "https://github.com" },
    ],
  },
  {
    image: "/team/image-5.png",
    name: "Mei Zhang",
    position: "Head of Marketing",
    socialLinks: [{ icon: "FaLinkedin", href: "https://linkedin.com" }],
  },
  {
    image: "/team/image-1.png",
    name: "Daniel Park",
    position: "Senior Sales Manager",
    socialLinks: [
      { icon: "FaLinkedin", href: "https://linkedin.com" },
      { icon: "FaXTwitter", href: "https://twitter.com" },
      { icon: "FaGithub", href: "https://github.com" },
    ],
  },
  {
    image: "/team/image-6.png",
    name: "Alex Johnson",
    position: "Senior Financial Analyst",
    socialLinks: [
      { icon: "FaLinkedin", href: "https://linkedin.com" },
      { icon: "FaGithub", href: "https://github.com" },
    ],
  },
  {
    image: "/team/image-4.png",
    name: "Michael Singh",
    position: "Senior Product Developer",
    socialLinks: [{ icon: "FaGithub", href: "https://github.com" }],
  },
  {
    image: "/team/image-8.png",
    name: "Hassan Ali",
    position: "Lead Software Engineer",
    socialLinks: [
      { icon: "FaLinkedin", href: "https://linkedin.com" },
      { icon: "FaGithub", href: "https://github.com" },
    ],
  },
];

export function formatAdminMail(data: ContactFormValues) {
  return `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f0f0f0;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <h3 style="color: #555;">Message:</h3>
          <p style="background-color: #fff; padding: 10px; border-radius: 5px;">${data.body}</p>
        </div>
      `;
}

export function formatSenderMail(data: ContactFormValues) {
  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank You for Contacting Us</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td style="padding: 20px 0; text-align: center; background-color: #3498db;">
                <h1 style="color: #ffffff;">Thank You for Reaching Out!</h1>
              </td>
            </tr>
            <tr>
              <td style="padding: 40px 20px; background-color: #ffffff;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td>
                      <h2 style="color: #3498db; margin-bottom: 20px;">Hello ${data.name},</h2>
                      <p style="margin-bottom: 20px; line-height: 1.5; color: #333333;">We've received your message and want to thank you for taking the time to contact us. Our team is reviewing your inquiry and will get back to you as soon as possible.</p>
                      <h3 style="color: #3498db; margin-bottom: 10px;">Here's a summary of your message:</h3>
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="10" border="1" style="border-collapse: collapse; margin-bottom: 20px;">
                        <tr>
                          <th style="text-align: left; background-color: #f2f2f2; color: #333333;">Name</th>
                          <td style="color: #333333;">${data.name}</td>
                        </tr>
                        <tr>
                          <th style="text-align: left; background-color: #f2f2f2; color: #333333;">Email</th>
                          <td style="color: #333333;">${data.email}</td>
                        </tr>
                        <tr>
                          <th style="text-align: left; background-color: #f2f2f2; color: #333333;">Phone</th>
                          <td style="color: #333333;">${data.phone}</td>
                        </tr>
                        <tr>
                          <th style="text-align: left; background-color: #f2f2f2; color: #333333;">Message</th>
                          <td style="color: #333333;">${data.body}</td>
                        </tr>
                      </table>
                      <p style="margin-bottom: 20px; line-height: 1.5; color: #333333;">If you need to add any information to your inquiry, please don't hesitate to reply to this email.</p>
                      <p style="margin-bottom: 20px; line-height: 1.5; color: #333333;">We appreciate your interest and look forward to connecting with you soon!</p>
                      <p style="color: #333333;">Best regards,<br>Your Support Team</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding: 20px; text-align: center; background-color: #3498db; color: #ffffff;">
                <p>&copy; 2024 Your Company Name. All rights reserved.</p>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `;
}

export const noImageUrl = "no-image.png";

export { StatCardsData, teamData };
