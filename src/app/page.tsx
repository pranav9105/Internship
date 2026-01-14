import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/sections/hero';
import { Packages } from '@/components/sections/packages';
import { About } from '@/components/sections/about';
import { Faq } from '@/components/sections/faq';
import { Gallery } from '@/components/sections/gallery';
import { Contact } from '@/components/sections/contact';
import { Popular } from '@/components/sections/popular';
import { Header } from '@/components/layout/header';
import { BrowseByPropertyType } from '@/components/sections/browse-by-property-type';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-background">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Popular />
        <BrowseByPropertyType />
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
