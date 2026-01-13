import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Packages } from '@/components/sections/packages';

export default function DealsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow pt-24">
        <Packages isPage={true} />
      </main>
      <Footer />
    </div>
  );
}
