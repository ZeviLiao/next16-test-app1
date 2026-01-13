import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Test App 1",
	description: "Next.js test application",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
