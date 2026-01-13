import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/sections/hero';
import { Destinations } from '@/components/sections/destinations';
import { Packages } from '@/components/sections/packages';
import { About } from '@/components/sections/about';
import { Faq } from '@/components/sections/faq';
import { Gallery } from '@/components/sections/gallery';
import { Contact } from '@/components/sections/contact';
import { StaySearchForm } from '@/components/search/stay-search-form';
import { AnimateOnScroll } from '@/components/animate-on-scroll';
import { Popular } from '@/components/sections/popular';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <main className="flex-grow">
        <Hero />
        <section className="bg-background -mt-16 relative z-20 container mx-auto px-4 md:px-6">
            <AnimateOnScroll>
                <StaySearchForm />
            </AnimateOnScroll>
        </section>
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
