import './globals.css';
import { ThawProvider } from '@/lib/store';
import { Navbar } from '@/components/Navbar';

export const metadata = {
  title: 'Thaw — A gentle co-pilot for getting unstuck',
  description: 'An AI-powered adaptive planner for neurodivergent students designed to melt overwhelm with low-friction steps and guilt-free rest.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-thaw-950 text-thaw-100 selection:bg-sage-500 selection:text-thaw-950">
        <ThawProvider>
          <div className="min-h-screen flex flex-col bg-gradient-to-b from-thaw-950 via-thaw-900 to-thaw-950">
            <Navbar />
            <main className="flex-1 flex flex-col">
              {children}
            </main>
            <footer className="py-6 px-6 border-t border-thaw-800/40 text-center text-xs text-thaw-400">
              <p>Thaw — Designed for neurodivergent minds with empathy, privacy, and low friction.</p>
            </footer>
          </div>
        </ThawProvider>
      </body>
    </html>
  );
}
