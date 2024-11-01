import "@/app/_styles/globals.css";
import { Josefin_Sans } from "next/font/google";
import Header from "./_components/Header";
import { ReservationProvider } from "./_context/ReservationContext";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s / The Wild Oasis",
    default: "Welcome / The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel located in the heart of oirase keiryu, surrounded by beautiful mountains and forests.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`
          ${josefin.className}
          antialiased
          bg-primary-950
          text-primary-100
          min-h-screen flex flex-col relative`}
      >
        <Header />
        <div className="grid flex-1 px-6 py-10">
          <ReservationProvider>
            <main className="max-w-6xl mx-auto w-full">{children}</main>
          </ReservationProvider>
        </div>
      </body>
    </html>
  );
}
