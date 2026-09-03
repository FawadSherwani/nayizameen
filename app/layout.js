import "./globals.css";

export const metadata = {
  title: "Naya Zameen - Pakistan's Trusted Property Portal",
  description:
    "Explore thousands of verified properties for sale, rent and investment across Pakistan.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-white text-gray-800">
        {children}
      </body>
    </html>
  );
}
