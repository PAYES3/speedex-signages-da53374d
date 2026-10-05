import { createFileRoute } from '@tanstack/react-router';
import { useState, type FormEvent } from 'react';
import { useServerFn } from '@tanstack/react-start';
import { toast } from 'sonner';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, MessageCircle, Phone, MapPin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Reveal } from '@/components/Reveal';
import { useLang } from '@/hooks/useLang';
import { submitDigitalConsultation } from '@/lib/api/forms.functions';
import { digitalServices, digitalSteps, digitalPackages, digitalAddons, digitalReasons, digitalIndustries, digitalFaq } from '@/lib/speedex-digital-content';
import digitalLogo from '@/assets/speedex-digital-logo.png.asset.json';
import workspace from '@/assets/speedex-digital-workspace.jpg';

const whatsapp = (message: string) => `https://wa.me/971507761493?text=${encodeURIComponent(message)}`;

export const Route = createFileRoute('/speedex-digital')({
  head: () => ({
    meta: [
      { title: 'Speedex Digital | Digital Marketing Agency in Abu Dhabi, UAE' },
      { name: 'description', content: 'Speedex Digital offers social media management, paid ads, SEO, website design and lead generation in Abu Dhabi and across the UAE. View packages and get a free consultation.' },
      { name: 'keywords', content: 'digital marketing Abu Dhabi, social media management UAE, SEO Abu Dhabi, Google Ads UAE, lead generation UAE, website design Abu Dhabi' },
      { property: 'og:title', content: 'Speedex Digital | Digital Marketing in Abu Dhabi' },
      { property: 'og:description', content: 'Social media, paid ads, SEO, websites and lead generation for UAE businesses. Explore Speedex Digital packages.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://www.speedexsignages.com/speedex-digital' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [{ rel: 'canonical', href: 'https://www.speedexsignages.com/speedex-digital' }],
  }),
  component: SpeedexDigitalPage,
});

function SpeedexDigitalPage() {
  const { lang } = useLang();
  const ar = lang === 'ar';
  const tr = (en: string, arabic: string) => ar ? arabic : en;
  const submit = useServerFn(submitDigitalConsultation);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const section = 'mx-auto max-w-7xl px-5 sm:px-8 lg:px-10';
  const eyebrow = 'text-xs font-bold uppercase text-primary';
  const heading = 'mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-foreground';
  const consultationUrl = whatsapp("Hello Speedex Digital, I'm interested in a free consultation. Please share more details.");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    const service = String(fields.get('service') || '');
    const plan = String(fields.get('plan') || '');
    const company = String(fields.get('company') || '').trim();
    const message = String(fields.get('message') || '').trim();
    setSending(true);
    try {
      await submit({ data: {
        name: String(fields.get('name') || ''),
        phone: String(fields.get('phone') || ''),
        email: String(fields.get('email') || ''),
        company, service: service as 'Social Media', plan: plan as 'Starter', message,
      } });
      form.reset();
      setSent(true);
      toast.success(tr('Thank you! Your request has been received.', 'شكراً لك! تم استلام طلبك.'));
    } catch {
      toast.error(tr('We could not send your request. Please try again.', 'تعذر إرسال طلبك. يرجى المحاولة مجدداً.'));
    } finally {
      setSending(false);
    }
  }

  return <div className="overflow-x-clip">
    <section className="relative isolate min-h-[min(860px,95svh)] overflow-hidden bg-muted pt-28 pb-16 sm:pt-32 sm:pb-24 flex flex-col justify-end">
      <img src={workspace} width={1536} height={1024} fetchPriority="high" alt="Speedex Digital creative team developing marketing campaigns and reviewing analytics" className="absolute inset-0 -z-20 h-full w-full object-cover object-center" />
      <div className="absolute inset-0 -z-10 bg-background/85 sm:bg-background/60" />
      <div className={`${section} w-full`}>
        <div className="max-w-3xl">
          <img src={digitalLogo.url} width={1640} height={575} alt="Speedex Digital" className="mb-8 w-44 sm:w-56 h-auto" />
          <p className={`${eyebrow} mb-4`}>{tr('Digital marketing · Abu Dhabi, UAE', 'التسويق الرقمي · أبوظبي، الإمارات')}</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] text-foreground">{tr('Digital Marketing That Moves Your Business Forward', 'تسويق رقمي يدفع أعمالك إلى الأمام')}</h1>
          <p className="mt-6 max-w-2xl text-base sm:text-xl leading-relaxed text-foreground/85">{tr('From brand identity to lead generation, Speedex Digital helps UAE businesses get seen, get contacted and get results.', 'من الهوية التجارية إلى استقطاب العملاء، تساعد سبيدكس ديجيتال الشركات الإماراتية على الظهور والتواصل وتحقيق النتائج.')}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-auto min-h-12 rounded-md whitespace-normal text-center"><a href={consultationUrl} target="_blank" rel="noopener noreferrer">{tr('Get a Free Consultation', 'احصل على استشارة مجانية')} <ArrowUpRight /></a></Button>
            <Button asChild variant="outline" size="lg" className="h-auto min-h-12 rounded-md whitespace-normal text-center"><a href="#packages">{tr('View Packages', 'عرض الباقات')} <ArrowDown /></a></Button>
          </div>
        </div>
        <div className="mt-12 grid gap-3 border-t border-foreground/20 pt-6 text-sm font-semibold text-foreground sm:grid-cols-3">
          {[tr('Part of Excellent Group of Companies, Abu Dhabi', 'جزء من مجموعة إكسلنت للشركات، أبوظبي'), tr('Serving UAE businesses across industries', 'نخدم الشركات الإماراتية في مختلف القطاعات'), tr('Results you can measure', 'نتائج قابلة للقياس')].map((item) => <p key={item} className="flex items-start gap-2"><Check className="w-4 h-4 shrink-0 text-primary mt-1" />{item}</p>)}
        </div>
      </div>
    </section>

    <section className="py-20 sm:py-28 bg-background"><div className={`${section} grid gap-12 lg:grid-cols-[1.15fr_.85fr] lg:items-end`}>
      <Reveal><p className={eyebrow}>{tr('About Speedex Digital', 'عن سبيدكس ديجيتال')}</p><h2 className={heading}>{tr('Your Growth Partner, Built on Real Business Experience', 'شريك نموّك بخبرة أعمال حقيقية')}</h2><p className="mt-7 text-lg text-muted-foreground leading-relaxed">{tr('Speedex Digital is the digital marketing division of Speedex Signages, part of Excellent Group of Companies in Abu Dhabi. We already market and grow businesses across automotive, transport, facilities management, contracting and trading. That experience is now available to your business.', 'سبيدكس ديجيتال هي قسم التسويق الرقمي في سبيدكس ساينجز، التابعة لمجموعة إكسلنت للشركات في أبوظبي. نسوّق وننمّي أعمالاً في قطاعات السيارات والنقل وإدارة المرافق والمقاولات والتجارة. وهذه الخبرة متاحة الآن لعملك.')}</p><p className="mt-5 text-lg text-muted-foreground leading-relaxed">{tr('We combine creative design, performance marketing and clear reporting, so every dirham you spend online has a purpose. No vague promises, just a clear plan, consistent execution and transparent results.', 'نجمع بين التصميم الإبداعي والتسويق القائم على الأداء والتقارير الواضحة، ليكون لكل درهم تنفقه عبر الإنترنت هدف. لا وعود مبهمة، بل خطة واضحة وتنفيذ مستمر ونتائج شفافة.')}</p></Reveal>
      <div className="grid grid-cols-3 border-y border-border divide-x divide-border py-8 text-center"><div><b className="block text-3xl sm:text-4xl text-primary">7+</b><span className="text-xs sm:text-sm text-muted-foreground">{tr('Industries served', 'قطاعات نخدمها')}</span></div><div><b className="block text-3xl sm:text-4xl text-primary">1</b><span className="text-xs sm:text-sm text-muted-foreground">{tr('Team for strategy, design & campaigns', 'فريق للاستراتيجية والتصميم والحملات')}</span></div><div><b className="block text-3xl sm:text-4xl text-primary">12</b><span className="text-xs sm:text-sm text-muted-foreground">{tr('Monthly reports each year', 'تقريراً شهرياً كل عام')}</span></div></div>
    </div></section>

    <section className="py-20 sm:py-28 bg-muted/50"><div className={section}>
      <Reveal><p className={eyebrow}>{tr('Our services', 'خدماتنا')}</p><h2 className={heading}>{tr('Everything You Need to Grow Online', 'كل ما تحتاجه للنمو عبر الإنترنت')}</h2><p className="mt-4 text-muted-foreground text-lg">{tr('One team for your brand, your content, your ads and your leads.', 'فريق واحد لعلامتك ومحتواك وإعلاناتك وعملائك المحتملين.')}</p></Reveal>
      <div className="mt-12 grid gap-px bg-border border border-border sm:grid-cols-2 lg:grid-cols-3">{digitalServices.map(([title, desc, titleAr, descAr], i) => <Reveal key={title} className="h-full"><div className="h-full bg-background p-7 sm:p-8"><span className="text-xs font-bold text-primary">{String(i + 1).padStart(2, '0')} / 12</span><h3 className="mt-6 text-xl font-bold text-foreground">{tr(title, titleAr)}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{tr(desc, descAr)}</p></div></Reveal>)}</div>
    </div></section>

    <section className="py-20 sm:py-28"><div className={section}><Reveal><p className={eyebrow}>{tr('How we work', 'آلية عملنا')}</p><h2 className={heading}>{tr('A Simple, Transparent Process', 'عملية بسيطة وشفافة')}</h2></Reveal><div className="mt-12 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">{digitalSteps.map(([title, desc, titleAr, descAr], i) => <Reveal key={title}><div className="border-t-2 border-primary pt-5"><span className="text-sm font-bold text-primary">{String(i + 1).padStart(2,'0')}</span><h3 className="mt-5 text-xl font-bold">{tr(title, titleAr)}</h3><p className="mt-3 text-muted-foreground text-sm">{tr(desc, descAr)}</p></div></Reveal>)}</div></div></section>

    <section id="packages" className="scroll-mt-20 py-20 sm:py-28 bg-muted/50"><div className={section}>
      <Reveal><p className={eyebrow}>{tr('Packages & pricing', 'الباقات والأسعار')}</p><h2 className={heading}>{tr('Choose the Package That Fits Your Business', 'اختر الباقة التي تناسب عملك')}</h2><p className="mt-4 max-w-3xl text-muted-foreground">{tr('Monthly plans with no hidden fees. Upgrade or change anytime. Ad spend is paid directly to the platforms and is not included in package prices.', 'خطط شهرية بلا رسوم مخفية. يمكنك الترقية أو التغيير في أي وقت. يُدفع الإنفاق الإعلاني مباشرة للمنصات ولا يشمله سعر الباقة.')}</p></Reveal>
      <div className="mt-12 grid gap-5 lg:grid-cols-3 items-stretch">{digitalPackages.map((pkg, i) => <div key={pkg.name} className={`flex flex-col border bg-background p-6 sm:p-8 ${i === 1 ? 'border-primary shadow-[var(--shadow-elegant)]' : 'border-border'}`}>
        <div className="flex items-start justify-between gap-2"><p className="text-xs font-bold uppercase text-primary">{tr(pkg.name, pkg.ar)}</p>{i === 1 && <span className="text-xs font-bold text-primary border border-primary/30 px-2 py-1">{tr('Most popular', 'الأكثر طلباً')}</span>}</div>
        <p className="mt-6 text-4xl font-extrabold text-foreground"><span className="text-sm font-semibold">AED </span>{pkg.price}<span className="text-base font-medium text-muted-foreground"> {tr('/ month', '/ شهر')}</span></p><p className="mt-3 text-sm text-muted-foreground min-h-12">{tr(pkg.audience, pkg.audienceAr)}</p>
        <div className="my-6 border-t border-border" /><ul className="flex-1 space-y-3 text-sm">{(ar ? pkg.featuresAr : pkg.features).map(feature => <li key={feature} className="flex gap-3 items-start"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{feature}</li>)}</ul>
        <Button asChild className="mt-8 min-h-12 h-auto whitespace-normal text-center" variant={i === 1 ? 'default' : 'outline'}><a href={whatsapp(`Hello Speedex Digital, I'm interested in the ${pkg.name} package. Please share more details.`)} target="_blank" rel="noopener noreferrer">{tr(`Choose ${pkg.name}`, `اختر باقة ${pkg.ar}`)} <ArrowUpRight /></a></Button>
      </div>)}</div>
      <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5 border-y border-border py-7"><div><h3 className="text-xl font-bold">{tr('Custom Package', 'باقة مخصصة')}</h3><p className="mt-2 text-sm text-muted-foreground">{tr('Need something different, or managing multiple branches or companies? We build tailored plans for groups and large businesses.', 'تحتاج إلى شيء مختلف أو تدير فروعاً أو شركات متعددة؟ نعد خططاً مخصصة للمجموعات والشركات الكبيرة.')}</p></div><Button asChild variant="outline" className="shrink-0 h-auto min-h-11 whitespace-normal text-center"><a href={whatsapp("Hello Speedex Digital, I'd like a custom package quote. Please share more details.")} target="_blank" rel="noopener noreferrer">{tr('Request a Custom Quote', 'اطلب عرض سعر مخصص')} <ArrowUpRight /></a></Button></div>
      <div className="mt-16"><h3 className="text-2xl font-bold">{tr('One-Time Services (Add-ons)', 'خدمات لمرة واحدة (إضافات)')}</h3><div className="mt-6 grid gap-x-8 sm:grid-cols-2">{digitalAddons.map(([name, price, nameAr]) => <div key={name} className="flex justify-between gap-3 border-b border-border py-4 text-sm"><span>{tr(name, nameAr)}</span><span className="shrink-0 font-bold text-primary">{tr('From', 'من')} AED {price}</span></div>)}</div><p className="mt-5 text-sm text-muted-foreground">{tr('All prices exclude 5% VAT. Final quotes depend on scope.', 'جميع الأسعار لا تشمل ضريبة القيمة المضافة بنسبة 5%. تعتمد الأسعار النهائية على نطاق العمل.')}</p><p className="mt-2 text-xs text-muted-foreground">{tr('Indicative package prices — please confirm with our team before ordering.', 'أسعار الباقات تقديرية — يرجى تأكيدها مع فريقنا قبل الطلب.')}</p></div>
    </div></section>

    <section className="py-20 sm:py-28"><div className={section}><Reveal><p className={eyebrow}>{tr('The Speedex advantage', 'ميزة سبيدكس')}</p><h2 className={heading}>{tr('Why Choose Speedex Digital', 'لماذا تختار سبيدكس ديجيتال')}</h2></Reveal><div className="mt-12 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">{digitalReasons.map(([title,desc,titleAr,descAr],i) => <div key={title} className="border-t border-border py-6"><span className="text-sm font-bold text-primary">0{i+1}</span><h3 className="mt-4 text-lg font-bold">{tr(title,titleAr)}</h3><p className="mt-2 text-sm text-muted-foreground">{tr(desc,descAr)}</p></div>)}</div></div></section>

    <section className="bg-muted/50 py-20 sm:py-24"><div className={section}><Reveal><p className={eyebrow}>{tr('Who we work with', 'مع من نعمل')}</p><h2 className={heading}>{tr('Industries We Serve', 'القطاعات التي نخدمها')}</h2></Reveal><div className="mt-10 flex flex-wrap gap-2">{digitalIndustries.map(([en,arabic]) => <span key={en} className="border border-border bg-background px-4 py-3 text-sm font-semibold">{tr(en,arabic)}</span>)}</div></div></section>

    <section className="py-20 sm:py-28"><div className={`${section} grid gap-10 lg:grid-cols-[.8fr_1.2fr]`}><div><p className={eyebrow}>{tr('Questions', 'استفسارات')}</p><h2 className={heading}>{tr('Frequently Asked Questions', 'الأسئلة الشائعة')}</h2></div><Accordion type="single" collapsible className="border-t border-border">{digitalFaq.map(([question,answer,questionAr,answerAr],i) => <AccordionItem key={question} value={`faq-${i}`}><AccordionTrigger className="text-start text-base sm:text-lg font-semibold no-underline hover:no-underline">{tr(question,questionAr)}</AccordionTrigger><AccordionContent className="text-sm sm:text-base text-muted-foreground leading-relaxed">{tr(answer,answerAr)}</AccordionContent></AccordionItem>)}</Accordion></div></section>

    <section className="bg-muted/50 py-20 sm:py-28"><div className={`${section} grid lg:grid-cols-2 gap-12 lg:gap-20`}><div><p className={eyebrow}>{tr('Let’s talk', 'لنتحدث')}</p><h2 className={heading}>{tr('Ready to Grow Your Business Online?', 'هل أنت مستعد لتنمية أعمالك عبر الإنترنت؟')}</h2><p className="mt-6 text-lg text-muted-foreground">{tr('Talk to our team today. We will review your business and recommend the right plan, free of charge.', 'تحدث مع فريقنا اليوم. سنراجع نشاطك ونوصي بالخطة المناسبة مجاناً.')}</p><div className="mt-8 flex flex-wrap gap-3"><Button asChild size="lg" className="h-auto min-h-12 whitespace-normal"><a href={consultationUrl} target="_blank" rel="noopener noreferrer"><MessageCircle />{tr('Chat on WhatsApp', 'تحدث عبر واتساب')}</a></Button><Button asChild size="lg" variant="outline" className="h-auto min-h-12 whitespace-normal"><a href="tel:+971507761493"><Phone />{tr('Call +971 50 776 1493', 'اتصل: ‎+971 50 776 1493')}</a></Button></div><div className="mt-12 space-y-4 text-sm text-muted-foreground"><p className="flex gap-3"><MapPin className="text-primary h-5 w-5 shrink-0" />{tr('Mussaffah-38, Abu Dhabi, UAE', 'مصفح 38، أبوظبي، الإمارات')}</p><p className="flex gap-3"><Mail className="text-primary h-5 w-5 shrink-0" /><a href="mailto:admin@excellentgroup.ae">admin@excellentgroup.ae</a></p><p className="flex gap-3"><Phone className="text-primary h-5 w-5 shrink-0" /><a href="tel:+971507761493">+971 50 776 1493</a></p><p>{tr('Sun–Thu, 8:30 AM – 7:00 PM', 'الأحد–الخميس، 8:30 صباحاً – 7:00 مساءً')}</p></div></div>
      <form onSubmit={handleSubmit} className="bg-background border border-border p-6 sm:p-8 space-y-5"><h3 className="text-2xl font-bold">{tr('Request Free Consultation', 'اطلب استشارة مجانية')}</h3><div className="grid sm:grid-cols-2 gap-4"><label className="block text-sm font-semibold">{tr('Full Name', 'الاسم الكامل')} *<Input name="name" required maxLength={120} className="mt-2 h-11" /></label><label className="block text-sm font-semibold">{tr('Company Name', 'اسم الشركة')}<Input name="company" maxLength={120} className="mt-2 h-11" /></label><label className="block text-sm font-semibold">{tr('Phone / WhatsApp', 'الهاتف / واتساب')} *<Input name="phone" type="tel" required maxLength={40} className="mt-2 h-11" /></label><label className="block text-sm font-semibold">{tr('Email', 'البريد الإلكتروني')} *<Input name="email" type="email" required maxLength={255} className="mt-2 h-11" /></label></div><label className="block text-sm font-semibold">{tr('Service of Interest', 'الخدمة المطلوبة')} *<select name="service" required defaultValue="" className="mt-2 h-11 w-full border border-input bg-background px-3 text-sm"><option value="" disabled>{tr('Select a service', 'اختر خدمة')}</option>{['Social Media','Paid Ads','SEO','Website','Lead Generation','Branding','Video','Other'].map(s => <option key={s} value={s}>{s}</option>)}</select></label><label className="block text-sm font-semibold">{tr('Package Interested In', 'الباقة المطلوبة')} *<select name="plan" required defaultValue="" className="mt-2 h-11 w-full border border-input bg-background px-3 text-sm"><option value="" disabled>{tr('Select a package', 'اختر باقة')}</option>{['Starter','Growth','Premium','Custom','Not sure'].map(s => <option key={s} value={s}>{s}</option>)}</select></label><label className="block text-sm font-semibold">{tr('Message', 'رسالتك')} *<Textarea name="message" required minLength={5} maxLength={2800} rows={4} className="mt-2" /></label><Button type="submit" size="lg" disabled={sending} className="w-full min-h-12 h-auto whitespace-normal">{sending ? tr('Sending…', 'جارٍ الإرسال…') : tr('Request Free Consultation', 'اطلب استشارة مجانية')} <ArrowRight /></Button>{sent && <p role="status" className="text-sm font-semibold text-primary">{tr('Thank you! Your request has been received.', 'شكراً لك! تم استلام طلبك.')}</p>}</form>
    </div></section>
  </div>;
}
