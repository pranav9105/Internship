
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { AnimateOnScroll } from '@/components/animate-on-scroll';

export default function BlogPage() {
  const videoUrl = "https://video.pictory.ai/20260115105102621d4a61cce6a274e349fb232fe6e234a89/20260115105724321u85cE1iVjSZjr6h";

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-12 md:px-6">
          <AnimateOnScroll>
            <div className="text-center mb-12">
              <h1 className="font-headline text-5xl font-bold">Our Blog</h1>
              <p className="mt-4 text-lg text-muted-foreground">Travel stories and inspiration.</p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={200}>
            <div className="max-w-4xl mx-auto">
              <div className="aspect-video overflow-hidden rounded-lg shadow-2xl">
                <video
                  src={videoUrl}
                  controls
                  className="w-full h-full object-cover"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </main>
      <Footer />
    </div>
  );
}
