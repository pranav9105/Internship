import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/sections/hero';
import { Destinations } from '@/components/sections/destinations';
import { Packages } from '@/components/sections/packages';
import { Gallery } from '@/components/sections/gallery';
import { Contact } from '@/components/sections/contact';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Destinations />
        <Packages />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
