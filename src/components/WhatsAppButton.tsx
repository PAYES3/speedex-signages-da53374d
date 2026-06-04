import { MessageCircle } from 'lucide-react';
import { COMPANY } from '@/lib/site-data';

export function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${COMPANY.whatsapp}?text=Hi%20Speedex%2C%20I%27d%20like%20a%20quote.`}
      target="_blank"
      rel="noopener"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-24 right-5 z-40 w-14 h-14 rounded-full bg-[#25D366] grid place-items-center shadow-lg hover:scale-110 transition-transform"
    >
      <MessageCircle className="w-7 h-7 text-white" />
      <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping" />
    </a>
  );
}