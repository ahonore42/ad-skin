import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ad Skin - Human Identity in Digital Consumerism",
  description:
    "An interactive artwork exploring how digital advertising becomes literal skin on human forms, critiquing surveillance capitalism and digital identity commodification.",
  keywords: [
    "digital art",
    "consumerism",
    "advertising",
    "3D visualization",
    "interactive art",
    "surveillance capitalism",
  ],
  authors: [{ name: "Ad Skin Project" }],
  openGraph: {
    title: "Ad Skin - Digital Consumerism Critique",
    description:
      "Interactive 3D artwork showing advertisements as literal human skin",
    type: "website",
    images: [
      {
        url: "/preview.jpg", // You could add a preview image later
        width: 1200,
        height: 630,
        alt: "Ad Skin - Human head covered in moving advertisements",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
