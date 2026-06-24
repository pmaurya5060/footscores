import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "FootScores",
  description: "Live Football Scores, Fixtures, and Results",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
