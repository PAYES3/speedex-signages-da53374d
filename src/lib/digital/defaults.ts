/** Default Speedex Digital content. Admin-managed rows in the digital_* tables override these. No prices anywhere. */
export type DigitalCategory = 'web' | 'marketing';
export type DigitalService = {
  slug: string; category: DigitalCategory;
  title: string; title_ar: string; summary: string; summary_ar: string;
  body: string; body_ar: string; benefits: string[];
};

const s = (slug: string, category: DigitalCategory, title: string, title_ar: string, summary: string, summary_ar: string, body: string, benefits: string[]): DigitalService =>
  ({ slug, category, title, title_ar, summary, summary_ar, body, body_ar: summary_ar, benefits });

export const DIGITAL_SERVICES: DigitalService[] = [
  s('website-development', 'web', 'Website Development', 'تطوير المواقع', 'Fast, secure and scalable websites engineered to perform on every device.', 'مواقع سريعة وآمنة وقابلة للتوسع تعمل بكفاءة على جميع الأجهزة.', 'We build modern websites on reliable technology, with clean code, fast loading, strong security and simple content management, so your site keeps working for your business as it grows.', ['Mobile-first, fast-loading builds', 'Secure hosting and SSL setup', 'Easy content management', 'SEO-ready structure from day one']),
  s('website-designing', 'web', 'Website Designing', 'تصميم المواقع', 'Premium, conversion-focused website designs that reflect your brand.', 'تصاميم مواقع راقية تركّز على التحويل وتعكس هويتك.', 'Our designers craft distinctive layouts, typography and visuals that make your brand look credible and guide visitors towards calling, messaging or buying.', ['Custom visual direction', 'Responsive layouts for phone, tablet and desktop', 'Clear calls to action', 'Brand-consistent design system']),
  s('corporate-website', 'web', 'Corporate Website', 'المواقع المؤسسية', 'Professional corporate websites that build trust with clients and partners.', 'مواقع مؤسسية احترافية تبني الثقة مع العملاء والشركاء.', 'A corporate website presents your company, divisions, services and credentials clearly, in English and Arabic, with a structure decision-makers can navigate quickly.', ['Bilingual English/Arabic', 'Company profile and division pages', 'Enquiry and careers forms', 'Structured for search engines']),
  s('landing-page', 'web', 'Landing Page', 'صفحات الهبوط', 'Focused landing pages built to turn ad clicks into enquiries.', 'صفحات هبوط مركّزة تحوّل نقرات الإعلانات إلى استفسارات.', 'We design single-goal landing pages for campaigns and launches, with persuasive copy, fast loading and tracking connected to your ad platforms.', ['One clear goal per page', 'Fast loading for paid traffic', 'Form and WhatsApp lead capture', 'Conversion tracking setup']),
  s('ui-ux-design', 'web', 'UI/UX Design', 'تصميم واجهات وتجربة المستخدم', 'User-centred interface and experience design for websites and apps.', 'تصميم واجهات وتجربة استخدام تتمحور حول المستخدم للمواقع والتطبيقات.', 'From user journeys and wireframes to polished interface designs and clickable prototypes, we make digital products easy and enjoyable to use.', ['User journey mapping', 'Wireframes and prototypes', 'Accessible interface design', 'Design handover for developers']),
  s('e-commerce-development', 'web', 'E-Commerce Development', 'تطوير المتاجر الإلكترونية', 'Online stores that make it easy for customers to browse, pay and return.', 'متاجر إلكترونية تسهّل على العملاء التصفح والدفع والعودة.', 'We build online stores with clear product catalogues, smooth checkout, local payment options and the tools you need to manage orders and stock.', ['Product catalogue and search', 'Secure checkout and UAE payment gateways', 'Order and inventory management', 'Mobile-optimised shopping']),
  s('wordpress-development', 'web', 'WordPress Development', 'تطوير ووردبريس', 'Flexible WordPress websites your team can update with ease.', 'مواقع ووردبريس مرنة يسهل على فريقك تحديثها.', 'Custom WordPress themes and plugins, set up properly for speed and security, so your team can publish pages and news without technical help.', ['Custom themes', 'Speed and security hardening', 'Editor training', 'Ongoing updates and support']),
  s('custom-web-development', 'web', 'Custom Web Development', 'تطوير الويب المخصص', 'Tailored web applications, portals and integrations for your workflows.', 'تطبيقات ويب وبوابات وتكاملات مصممة خصيصاً لسير عملك.', 'When off-the-shelf tools fall short, we design and build custom portals, booking systems, dashboards and integrations around how your business actually works.', ['Custom portals and dashboards', 'Booking and request systems', 'Third-party integrations', 'Scalable architecture']),
  s('shopify-development', 'web', 'Shopify Development', 'تطوير شوبيفاي', 'Shopify stores designed, configured and optimised to sell.', 'متاجر شوبيفاي مصممة ومهيأة ومحسّنة للبيع.', 'We set up and customise Shopify stores, from theme design and product setup to apps, payments and shipping, ready to launch and grow.', ['Theme customisation', 'Product and collection setup', 'Payments, shipping and apps', 'Store speed optimisation']),
  s('woocommerce-development', 'web', 'WooCommerce Development', 'تطوير ووكومرس', 'WooCommerce stores built on WordPress with full flexibility.', 'متاجر ووكومرس مبنية على ووردبريس بمرونة كاملة.', 'Build your store on WordPress with WooCommerce, with custom design, product setup, payment gateways and the extensions your business needs.', ['Custom store design', 'Payment and shipping setup', 'Extension configuration', 'Performance tuning']),
  s('digital-marketing', 'marketing', 'Digital Marketing', 'التسويق الرقمي', 'Integrated digital marketing strategies that drive measurable growth.', 'استراتيجيات تسويق رقمي متكاملة تحقق نمواً قابلاً للقياس.', 'We combine search, social, paid media and messaging into one clear plan with defined goals and transparent monthly reporting.', ['Channel strategy', 'Campaign planning and execution', 'Content creation', 'Monthly performance reports']),
  s('seo-services', 'marketing', 'SEO Services', 'خدمات تحسين محركات البحث', 'Rank higher on Google for the searches your customers make.', 'تصدّر نتائج جوجل في عمليات البحث التي يجريها عملاؤك.', 'Technical SEO, keyword research, on-page optimisation and content that grows your organic visibility in English and Arabic.', ['Technical site audits', 'Keyword research', 'On-page optimisation', 'Content and link strategy']),
  s('google-ads-sem', 'marketing', 'Google Ads (SEM)', 'إعلانات جوجل', 'Search and display campaigns that put you in front of ready-to-buy customers.', 'حملات بحث وعرض تضعك أمام العملاء المستعدين للشراء.', 'We plan, build and manage Google Ads campaigns with careful keyword targeting, compelling ads and ongoing optimisation.', ['Search, display and Performance Max', 'Keyword and audience targeting', 'Ad copy and extensions', 'Conversion tracking and optimisation']),
  s('social-media-marketing', 'marketing', 'Social Media Marketing', 'التسويق عبر وسائل التواصل', 'Engaging social content and campaigns across the platforms your customers use.', 'محتوى وحملات جذابة على المنصات التي يستخدمها عملاؤك.', 'Content planning, design, posting, community management and paid social campaigns on Instagram, Facebook, LinkedIn, TikTok and X.', ['Content calendars', 'Creative design and reels', 'Community management', 'Paid social campaigns']),
  s('whatsapp-marketing', 'marketing', 'WhatsApp Marketing', 'التسويق عبر واتساب', 'Reach customers directly with WhatsApp campaigns and automated replies.', 'تواصل مباشرة مع العملاء عبر حملات واتساب والردود الآلية.', 'WhatsApp Business setup, broadcast campaigns, catalogues and automated replies that keep conversations moving and customers coming back.', ['WhatsApp Business setup', 'Broadcast campaigns', 'Catalogue and quick replies', 'Automated follow-ups']),
  s('local-seo', 'marketing', 'Local SEO', 'تحسين البحث المحلي', 'Get found on Google Maps and “near me” searches across the UAE.', 'اظهر على خرائط جوجل وفي عمليات البحث القريبة في الإمارات.', 'We optimise your Google Business Profile, local listings and reviews so nearby customers find and choose you.', ['Google Business Profile optimisation', 'Local citations', 'Review strategy', 'Location pages']),
  s('e-commerce-seo', 'marketing', 'E-Commerce SEO', 'تحسين محركات البحث للمتاجر', 'Search optimisation that brings more shoppers to your products.', 'تحسين للبحث يجلب المزيد من المتسوقين إلى منتجاتك.', 'Product and category optimisation, structured data and technical fixes that help your store’s products rank and sell.', ['Product and category optimisation', 'Structured product data', 'Site speed and crawlability', 'Content for buying searches']),
];

export const DIGITAL_STEPS: [string, string, string, string][] = [
  ['Discover', 'We learn your business, customers, competitors and goals.', 'الاستكشاف', 'نتعرف إلى نشاطك وعملائك ومنافسيك وأهدافك.'],
  ['Strategy', 'We build a clear plan covering channels, content and targets.', 'الاستراتيجية', 'نضع خطة واضحة للقنوات والمحتوى والأهداف.'],
  ['Create', 'Our team designs and builds your website, content and campaigns.', 'الإبداع', 'يصمم فريقنا موقعك ومحتواك وحملاتك.'],
  ['Launch', 'Everything goes live after your approval.', 'الإطلاق', 'يتم الإطلاق بعد موافقتك.'],
  ['Optimise', 'We monitor performance and improve continuously.', 'التحسين', 'نراقب الأداء ونحسّنه باستمرار.'],
  ['Report', 'Clear monthly reports show results and next steps.', 'التقارير', 'تقارير شهرية واضحة بالنتائج والخطوات التالية.'],
];

export const DIGITAL_REASONS: [string, string, string, string][] = [
  ['Part of an established group', 'Backed by Excellent Group of Companies in Abu Dhabi.', 'جزء من مجموعة راسخة', 'مدعومون من مجموعة إكسلنت للشركات في أبوظبي.'],
  ['Web and marketing under one roof', 'One team for your website, search, social and campaigns.', 'الويب والتسويق في مكان واحد', 'فريق واحد لموقعك والبحث والتواصل والحملات.'],
  ['Bilingual by default', 'Websites and content in English and Arabic.', 'ثنائية اللغة', 'مواقع ومحتوى بالعربية والإنجليزية.'],
  ['Transparent reporting', 'Clear monthly reports, no vague promises.', 'تقارير شفافة', 'تقارير شهرية واضحة دون وعود مبهمة.'],
  ['You own everything', 'Your accounts, designs and websites remain yours.', 'الملكية لك', 'حساباتك وتصاميمك ومواقعك تبقى ملكك.'],
  ['Local market knowledge', 'We understand UAE customers and industries.', 'معرفة بالسوق المحلي', 'نفهم العملاء والقطاعات في الإمارات.'],
];

export const DIGITAL_INDUSTRIES: [string, string][] = [
  ['Automotive', 'السيارات'], ['Transport & Logistics', 'النقل والخدمات اللوجستية'], ['Real Estate', 'العقارات'],
  ['Retail & E-Commerce', 'التجزئة والتجارة الإلكترونية'], ['Hospitality & Restaurants', 'الضيافة والمطاعم'],
  ['Healthcare & Clinics', 'الرعاية الصحية والعيادات'], ['Construction & Contracting', 'البناء والمقاولات'],
  ['Facilities Management', 'إدارة المرافق'], ['Trading', 'التجارة'], ['Education & Training', 'التعليم والتدريب'],
];

export const DIGITAL_FAQ: [string, string, string, string][] = [
  ['How much does a website or campaign cost?', 'Every project is different, so we prepare a tailored quote after understanding your goals. Request a consultation and our team will get back to you.', 'كم تكلفة الموقع أو الحملة؟', 'كل مشروع مختلف، لذلك نعدّ عرض سعر مخصصاً بعد فهم أهدافك. اطلب استشارة وسيتواصل معك فريقنا.'],
  ['How long does a website take?', 'Timelines depend on scope. We agree a clear schedule with you before work begins.', 'كم يستغرق إنجاز الموقع؟', 'يعتمد الجدول الزمني على نطاق العمل، ونتفق معك على جدول واضح قبل البدء.'],
  ['Do you build bilingual websites?', 'Yes. We build websites and create content in English and Arabic.', 'هل تبنون مواقع ثنائية اللغة؟', 'نعم، نبني المواقع وننشئ المحتوى بالعربية والإنجليزية.'],
  ['Who owns the website and accounts?', 'You do. All websites, designs, social and ad accounts remain your property.', 'لمن تعود ملكية الموقع والحسابات؟', 'لك. تبقى المواقع والتصاميم وحسابات التواصل والإعلانات ملكاً لك.'],
  ['How soon will I see marketing results?', 'Paid ads can bring enquiries quickly; SEO and social media build steadily over several months.', 'متى تظهر نتائج التسويق؟', 'قد تجلب الإعلانات استفسارات بسرعة، بينما ينمو أثر البحث والتواصل تدريجياً على مدى أشهر.'],
  ['Do you work outside Abu Dhabi?', 'Yes. We serve businesses across the UAE.', 'هل تعملون خارج أبوظبي؟', 'نعم، نخدم الشركات في جميع أنحاء الإمارات.'],
];

export const DIGITAL_SETTINGS_DEFAULTS: Record<string, string> = {
  tagline: 'Driving Business Growth Through Digital Solutions',
  tagline_ar: 'نقود نمو الأعمال من خلال الحلول الرقمية',
  hero_text: 'Speedex Digital helps UAE businesses build a strong online presence, from premium websites and online stores to SEO, Google Ads and social media that bring real enquiries.',
  hero_text_ar: 'تساعد سبيدكس ديجيتال الشركات في الإمارات على بناء حضور رقمي قوي، من المواقع والمتاجر الراقية إلى تحسين البحث وإعلانات جوجل ووسائل التواصل التي تجلب استفسارات حقيقية.',
  about_text: 'Speedex Digital is the digital business of Speedex Group, part of Excellent Group of Companies in Abu Dhabi. We design and build websites and run digital marketing for businesses across the UAE, combining creative design, solid engineering and clear reporting.',
  about_text_ar: 'سبيدكس ديجيتال هي الذراع الرقمية لمجموعة سبيدكس، التابعة لمجموعة إكسلنت للشركات في أبوظبي. نصمم ونطور المواقع وندير التسويق الرقمي للشركات في الإمارات، بالجمع بين التصميم الإبداعي والهندسة المتينة والتقارير الواضحة.',
  phone: '+971 50 776 1493',
  whatsapp: '971507761493',
  email: 'admin@excellentgroup.ae',
  address: 'Mussaffah, Abu Dhabi, United Arab Emirates',
  instagram: '', facebook: '', linkedin: '', tiktok: '', x: '',
  footer_text: 'Websites, e-commerce and digital marketing for growing UAE businesses.',
  seo_title: 'Speedex Digital | Web Design & Digital Marketing Agency in Abu Dhabi',
  seo_description: 'Speedex Digital builds websites, online stores and runs SEO, Google Ads, social media and WhatsApp marketing for businesses in Abu Dhabi and across the UAE.',
  ai_knowledge: '',
  draftly_url: '',
  logo_url: '',
};
