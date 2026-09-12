import "./globals.css";
import PageTransition from "@/components/PageTransition";

export const metadata = {
  title: "Nayizameen - Pakistan's Trusted Property Portal",
  description:
    "Explore thousands of verified properties for sale, rent and investment across Pakistan.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-white text-gray-800">
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
