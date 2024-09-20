import { Footer, NavBar } from "@/components";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />

      {children}

      <Footer />
    </>
  );
}
