
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Phone, Mail, MessageSquare, LifeBuoy } from 'lucide-react';
import { AnimateOnScroll } from '@/components/animate-on-scroll';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Link from 'next/link';

const faqs = [
  {
    question: 'What is the best way to book a trip?',
    answer: 'The best way to book is through our "Deals" section. If you have specific needs, you can also contact us through the form at the bottom of the page, and our travel experts will help you craft the perfect itinerary.',
  },
  {
    question: 'Can I customize a travel package?',
    answer: 'Absolutely! While our packages are curated to offer the best experiences, we understand that every traveler is unique. Contact us to discuss your preferences, and we can tailor any package to your needs.',
  },
  {
    question: 'What is your cancellation policy?',
    answer: 'Our cancellation policy varies depending on the package and the time of cancellation. Generally, we offer a full refund for cancellations made at least 30 days before the trip. Please refer to the specific terms and conditions for each package.',
  },
];

export default function HelpPage() {
  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-12 md:px-6">
          <AnimateOnScroll>
            <div className="text-center mb-12">
              <h1 className="font-headline text-5xl font-bold">Help & Support</h1>
              <p className="mt-4 text-lg text-muted-foreground">We're here to help you with anything you need.</p>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <AnimateOnScroll delay={100}>
              <Card className="h-full text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 text-primary p-4 rounded-full w-fit">
                    <Phone className="h-8 w-8" />
                  </div>
                  <CardTitle className="mt-4">24/7 Helpline</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">For urgent matters, call us anytime.</p>
                  <p className="text-2xl font-bold mt-2 text-primary">+91-800-555-ROAM</p>
                </CardContent>
              </Card>
            </AnimateOnScroll>
            <AnimateOnScroll delay={200}>
              <Card className="h-full text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                    <div className="mx-auto bg-primary/10 text-primary p-4 rounded-full w-fit">
                        <Mail className="h-8 w-8" />
                    </div>
                  <CardTitle className="mt-4">Email Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Get in touch via email for non-urgent inquiries.</p>
                  <p className="text-lg font-semibold mt-2 text-primary">support@roamready.com</p>
                </CardContent>
              </Card>
            </AnimateOnScroll>
            <AnimateOnScroll delay={300}>
              <Card className="h-full text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                    <div className="mx-auto bg-primary/10 text-primary p-4 rounded-full w-fit">
                        <MessageSquare className="h-8 w-8" />
                    </div>
                  <CardTitle className="mt-4">Live Chat</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Chat with a support agent right now.</p>
                  <p className="text-lg font-semibold mt-2 text-primary">Available 9am - 7pm IST</p>
                </CardContent>
              </Card>
            </AnimateOnScroll>
          </div>

          <AnimateOnScroll delay={400}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LifeBuoy className="h-6 w-6 text-accent" />
                  Frequently Asked Questions
                </CardTitle>
                <CardDescription>
                  Find quick answers to common questions. For more, visit our full <Link href="/#faq" className="text-primary underline">FAQ section</Link>.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left font-bold text-lg hover:no-underline">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-base">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </AnimateOnScroll>
        </div>
      </main>
      <Footer />
    </div>
  );
}
