import { createFileRoute } from '@tanstack/react-router';

const SYSTEM = `You are the friendly assistant for Speedex Signages, a UAE-based signage and branding company.

About Speedex Signages:
- Founded in 2007, based in Al Quoz Industrial Area, Dubai.
- 18+ years of experience, 2400+ projects, 950+ clients, 65+ team members.
- Services: Indoor Signage, Outdoor Signage, LED Signage, Acrylic Signage, 3D Letter Signage, Vehicle Branding, Wayfinding Signage, Digital Signage, CNC Cutting, Laser Cutting.
- Process: Concept & Design, Fabrication, Installation (with permits), Maintenance, and Digital Signage solutions.
- Products: LED Channel Letters, Acrylic 3D Letters, LED Neon, Reception Logos, Safety Signs, Pylon Signs, Wayfinding, Stainless Steel Letters, Light Boxes.
- Contact: phone +971 4 000 0000, email info@speedexsignages.ae. WhatsApp via the floating button on the website.
- Careers: openings in Design, Production, Installation, Project Management and Sales — apply on the Careers page.
- For quotes, direct the user to the Contact page or the Get a Quote button.

Keep answers concise (2-4 sentences), friendly and helpful. If asked something unrelated to Speedex, politely steer back to signage topics.`;

export const Route = createFileRoute('/api/chat')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { messages } = (await request.json()) as { messages: { role: string; content: string }[] };
          if (!Array.isArray(messages)) return new Response('Bad request', { status: 400 });

          const apiKey = process.env.LOVABLE_API_KEY;
          if (!apiKey) return new Response('AI not configured', { status: 500 });

          const upstream = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: 'google/gemini-3-flash-preview',
              stream: true,
              messages: [{ role: 'system', content: SYSTEM }, ...messages.slice(-20)],
            }),
          });

          if (upstream.status === 429) return new Response(JSON.stringify({ error: 'rate_limited' }), { status: 429 });
          if (upstream.status === 402) return new Response(JSON.stringify({ error: 'payment_required' }), { status: 402 });
          if (!upstream.ok || !upstream.body) {
            const text = await upstream.text();
            console.error('AI gateway error:', upstream.status, text);
            return new Response('AI gateway error', { status: 500 });
          }

          return new Response(upstream.body, {
            headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' },
          });
        } catch (e) {
          console.error('chat handler error', e);
          return new Response('Internal error', { status: 500 });
        }
      },
    },
  },
});