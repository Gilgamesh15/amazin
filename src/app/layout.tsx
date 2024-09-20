import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { Inter, Poppins } from "next/font/google";
import { AuthProvider } from "@/components";
import { auth } from "@/lib/auth";

const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={`${inter.className} ${poppins.variable} antialiased`}>
        <AuthProvider session={session}>
          {children}

          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
