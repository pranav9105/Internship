import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { AnimateOnScroll } from '../animate-on-scroll';

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
  {
    question: 'Do you offer travel insurance?',
    answer: 'We highly recommend purchasing travel insurance for your trip. While we do not sell insurance directly, we can recommend several trusted partners that offer comprehensive coverage.',
  },
  {
    question: 'What measures are you taking for safe travel during COVID-19?',
    answer: 'Your safety is our top priority. We work with partners who adhere to strict hygiene and safety protocols. We also provide up-to-date information on travel advisories and entry requirements for all our destinations.',
  },
];

export function Faq() {
  return (
    <section id="faq" className="py-20 md:py-32 bg-muted/50">
      <div className="container mx-auto px-4 md:px-6">
        <AnimateOnScroll>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-headline text-4xl font-bold md:text-5xl">Frequently Asked Questions</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Have questions? We've got answers. Here are some of the most common inquiries we receive.
            </p>
          </div>
        </AnimateOnScroll>
        <AnimateOnScroll delay={200}>
            <div className="mt-12 max-w-3xl mx-auto">
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
            </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
