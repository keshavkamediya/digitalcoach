import Script from "next/script";
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";

export const metadata = {
  title: "CryptoCoach4u",
};

export default function RootLayout({ children }) {
  return (
    <section lang="en">
      <Navbar />
      {children}
      <Footer />
    </section>
  );
}
