import { COMPANY } from '@/lib/site-data';

export function WhatsAppButton() {
  const message = encodeURIComponent(
    `Hello Speedex Signages,\n\nI'd like to request a quotation for signage in the UAE.\n\nName:\nLocation:\nSignage type:\nDeadline:\n\nThank you.`
  );
  const href = `https://wa.me/${COMPANY.whatsapp}?text=${message}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
      className="fixed bottom-24 right-5 z-40 w-14 h-14 rounded-full bg-[#25D366] grid place-items-center shadow-xl hover:scale-110 transition-transform"
    >
      <svg viewBox="0 0 32 32" className="w-8 h-8 text-white" fill="currentColor" aria-hidden="true">
        <path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.385.694 4.605 1.886 6.477L4 29l7.74-1.853A11.94 11.94 0 0 0 16 27c6.627 0 12-5.373 12-12S22.628 3 16.001 3zm0 21.6c-1.84 0-3.557-.5-5.034-1.36l-.36-.214-4.6 1.1 1.124-4.475-.234-.367A9.55 9.55 0 0 1 6.4 15c0-5.293 4.308-9.6 9.601-9.6S25.6 9.707 25.6 15s-4.307 9.6-9.599 9.6zm5.262-7.18c-.289-.144-1.71-.844-1.974-.94-.264-.096-.456-.144-.648.145-.192.288-.745.94-.913 1.132-.168.192-.336.217-.625.072-.288-.144-1.218-.449-2.32-1.43-.857-.764-1.435-1.708-1.604-1.997-.168-.288-.018-.444.126-.588.13-.13.288-.336.432-.504.144-.168.192-.288.288-.48.096-.192.048-.36-.024-.504-.072-.144-.648-1.564-.888-2.14-.234-.563-.471-.487-.648-.497-.168-.008-.36-.01-.552-.01-.192 0-.504.072-.768.36-.264.288-1.008.984-1.008 2.4 0 1.416 1.032 2.784 1.176 2.976.144.192 2.028 3.096 4.92 4.34.688.297 1.224.474 1.643.607.69.219 1.318.188 1.815.114.553-.082 1.71-.699 1.95-1.373.24-.673.24-1.25.168-1.373-.072-.12-.264-.192-.552-.336z"/>
      </svg>
      <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping" />
    </a>
  );
}