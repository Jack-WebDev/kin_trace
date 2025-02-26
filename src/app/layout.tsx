import "@/styles/globals.css";

import { Poppins } from "next/font/google";
import "@/styles/globals.css";
import { Footer, SideNav, TopNav } from "@/components";
import { ThemeContext } from "@/context/ThemeContext";

import { Toaster } from "@/packages/ui";
import { TRPCReactProvider } from "@/client/react";
import { getAuth, type AuthUserType } from "@/context";
import { UserRole, UserStatus } from "@prisma/client";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "KinTrace",
  description: "Kin trace is an application designed to trace beneficiaries",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.className}>
      <body
        style={{
          overflowY: "hidden",
          backgroundColor: "white",
          width: "100vw",
          height: "100vh'",
        }}
      >
        <ThemeContext
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Content>{children}</Content>
        </ThemeContext>
      </body>
    </html>
  );
}

async function Content({ children }: any) {
  const auth = await getAuth();

  if (!auth) {
    return (
      <TRPCReactProvider>
        <div className="relative h-full min-w-full overflow-y-auto bg-secondaryBg p-0">
          {" "}
          {children}
        </div>
      </TRPCReactProvider>
    );
  }

  return (
    <TRPCReactProvider>
      <div className="absolute left-0 top-0  flex h-screen w-screen overflow-hidden bg-secondaryBg">
        <SideNav />

        <div className=" flex h-full min-w-0 flex-1 flex-col bg-transparent  ">
          <TopNav />
          <Toaster />
          <div className="flex h-full min-w-full flex-col justify-between gap-8 overflow-y-auto bg-secondaryBg px-4 py-8 pb-0 md:px-8 ">
            {children}
            <Footer title="KinTrace" year={2024} name="NDT Digitech" />
          </div>
        </div>
      </div>
    </TRPCReactProvider>
  );
}
