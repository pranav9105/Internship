import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/sections/hero';
import { Destinations } from '@/components/sections/destinations';
import { Packages } from '@/components/sections/packages';
import { About } from '@/components/sections/about';
import { Faq } from '@/components/sections/faq';
import { Gallery } from '@/components/sections/gallery';
import { Contact } from '@/components/sections/contact';
import { Popular } from '@/components/sections/popular';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Destinations />
        <Popular />
        <Packages />
        <About />
        <Faq />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
