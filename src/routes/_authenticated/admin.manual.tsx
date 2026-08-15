import { createFileRoute } from '@tanstack/react-router';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';

export const Route = createFileRoute('/_authenticated/admin/manual')({
  head: () => ({
    meta: [
      { title: 'Admin User Manual | Speedex Signages' },
      { name: 'robots', content: 'noindex, nofollow' },
    ],
  }),
  component: ManualPage,
});

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 rounded-2xl border border-border bg-card p-5 sm:p-6">
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground [&_strong]:text-foreground [&_li]:ms-4 [&_li]:list-disc">
        {children}
      </div>
    </section>
  );
}

const TOC = [
  ['login', 'Logging in and out'],
  ['dashboard', 'Dashboard'],
  ['homepage', 'Homepage Builder'],
  ['content', 'Website Content'],
  ['media', 'Media Library'],
  ['companies', 'Our Groups (company slider + cards)'],
  ['services', 'Services'],
  ['portfolio', 'Portfolio'],
  ['reviews', 'Reviews'],
  ['messages', 'Messages (leads)'],
  ['settings', 'Settings & SEO'],
  ['arabic', 'Arabic mode'],
  ['images', 'Image guidelines'],
] as const;

function ManualPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Admin User Manual"
        description="A plain-English guide to every screen in this admin panel."
        action={
          <Button variant="outline" onClick={() => window.print()}>
            <Printer className="mr-2 h-4 w-4" /> Print / Save as PDF
          </Button>
        }
      />

      <nav className="rounded-2xl border border-border bg-card p-5">
        <p className="text-sm font-bold">Contents</p>
        <ul className="mt-3 grid gap-1 sm:grid-cols-2 lg:grid-cols-3">
          {TOC.map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} className="text-sm text-primary hover:underline">{label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <Section id="login" title="Logging in and out">
        <p>Go to <strong>/admin/login</strong> and sign in with your admin email and password. After signing in you land on the Dashboard.</p>
        <ul>
          <li>If sign-in fails, check the email and password first. Passwords are case sensitive.</li>
          <li>If the page keeps sending you back to the login screen, your account may not have the admin role yet — ask your developer to grant it.</li>
          <li>To sign out, use <strong>Sign out</strong> at the bottom of the left sidebar. <strong>View site</strong> opens the public website.</li>
        </ul>
      </Section>

      <Section id="dashboard" title="Dashboard">
        <p>The Dashboard is the first screen after login. It gives you a quick overview and shortcuts to the other admin sections. Nothing here is edited directly — use the sidebar to open the section you want to change.</p>
      </Section>

      <Section id="homepage" title="Homepage Builder">
        <p>Sidebar: <strong>Homepage Builder</strong>. This controls the blocks that make up the home page.</p>
        <ul>
          <li><strong>Sections list</strong> — each row is one block of the home page (hero slider, about, services, before/after, testimonials, and so on).</li>
          <li><strong>Reorder</strong> — drag a section up or down to change where it appears on the page.</li>
          <li><strong>Visible</strong> — turn a section off to hide it from the public site without deleting it.</li>
          <li><strong>Edit</strong> — opens the fields for that block (headings, text, images, buttons). Fill them in and press <strong>Save</strong>.</li>
          <li><strong>Hero slides</strong> — each slide has a background image or video, a title, a subtitle, description and two buttons with their link addresses.</li>
          <li><strong>See the Transformation</strong> — the before/after block has a <strong>Before image</strong> and an <strong>After image</strong> you can upload or replace.</li>
          <li><strong>Version history</strong> — earlier saved versions are kept so a previous state can be restored.</li>
        </ul>
        <p>Changes appear on the public home page as soon as they are saved (refresh the page to see them).</p>
      </Section>

      <Section id="content" title="Website Content">
        <p>Sidebar: <strong>Website Content</strong>. This is a list of text values used across the site (page headings, intro paragraphs, and similar). Find the item you want, edit the text, and press <strong>Save</strong>. Items are grouped by the page they belong to.</p>
      </Section>

      <Section id="media" title="Media Library">
        <p>Sidebar: <strong>Media Library</strong>. All uploaded images and videos live here, organised in folders.</p>
        <ul>
          <li><strong>Upload</strong> — choose one or more files. Large images are compressed automatically for faster loading.</li>
          <li><strong>Folders</strong> — keep logos, backgrounds, portfolio photos and so on separate.</li>
          <li><strong>Edit</strong> — set a title, description and alt text (alt text describes the image for search engines and screen readers).</li>
          <li><strong>Hide / Deactivate</strong> — keeps the file but stops it being listed publicly.</li>
          <li><strong>Delete</strong> — removes the file permanently. If it is used on a page, that page will show a missing image, so replace it first.</li>
        </ul>
      </Section>

      <Section id="companies" title="Our Groups (company slider + cards)">
        <p>Sidebar: <strong>Our Groups</strong>. One list of companies powers two different things:</p>
        <ul>
          <li>The <strong>Our Companies slider</strong> on the <strong>Home page</strong> and the <strong>About page</strong>. Both pages read the same records — edit once, both update.</li>
          <li>The <strong>Our Groups page</strong> card grid. This is a separate layout: it shows a card per company, not the slider.</li>
        </ul>
        <p>Fields for each company:</p>
        <ul>
          <li><strong>Company name</strong> — the title shown on the slide and card.</li>
          <li><strong>Slug</strong> — the web address part for the internal company page. Lowercase letters, numbers and hyphens only.</li>
          <li><strong>Category / tagline</strong> — the small orange label above the name.</li>
          <li><strong>Description</strong> — the paragraph under the name. On mobile the slider shows the first few lines.</li>
          <li><strong>Logo</strong> — the logo shown inside the white card and in the header menu. Upload a PNG or JPG with a clean background. The logo is never stretched.</li>
          <li><strong>Slider background (desktop)</strong> — the large photo behind the white card. Use a wide, landscape image.</li>
          <li><strong>Mobile background (optional)</strong> — a taller/portrait version used on phones. If empty, the desktop image is used.</li>
          <li><strong>Explore button text</strong> — the wording of the slider button. Leave empty for "Explore Company".</li>
          <li><strong>Website URL</strong> — this company's own website, for example <strong>https://example.com</strong>. It is used by the <strong>Learn more</strong> button on the Our Groups page and by the slider button, and it opens in a new tab. Each company has its own address — clear the field to fall back to the internal company page.</li>
          <li><strong>Accent colour</strong> — used as a background tint where no image exists.</li>
          <li><strong>Sort order</strong> — the position in the slider and the grid. Lower numbers come first.</li>
          <li><strong>Active</strong> — turn off to remove the company from the website without deleting it.</li>
        </ul>
        <p><strong>Logo and background are separate.</strong> Uploading one never replaces the other.</p>
        <p><strong>Drag and drop</strong> the rows in the list to reorder the slides. <strong>Duplicate</strong> creates an inactive copy you can edit. The <strong>Preview</strong> panel shows how the slide will look, with a desktop / mobile toggle.</p>
        <p>To check a website link: save the company, open the public Our Groups page and click <strong>Learn more</strong> on that card — it should open that company's website in a new tab.</p>
      </Section>

      <Section id="services" title="Services">
        <p>Sidebar: <strong>Services</strong>. Each service has a <strong>title</strong>, <strong>slug</strong>, <strong>description</strong>, an <strong>icon</strong> name, an <strong>image</strong>, a <strong>sort order</strong> and a <strong>published</strong> switch. Unpublished services are hidden from the public site. Use <strong>Save</strong> to store changes and <strong>Delete</strong> to remove a service permanently.</p>
      </Section>

      <Section id="portfolio" title="Portfolio">
        <p>Sidebar: <strong>Portfolio</strong>. Manage projects and their categories.</p>
        <ul>
          <li><strong>Categories</strong> — name, slug and order. These become the filter buttons on the public portfolio page.</li>
          <li><strong>Projects</strong> — title, slug, category, description, cover image, extra images or videos, client, year, sort order and a published switch.</li>
          <li>The cover image is what appears in the grid; the extra media appears on the project itself.</li>
        </ul>
      </Section>

      <Section id="reviews" title="Reviews">
        <p>Sidebar: <strong>Reviews</strong>. Customers submit reviews with a star rating from the public site. New reviews are <strong>not</strong> shown until you approve them.</p>
        <ul>
          <li><strong>Approve</strong> — publishes the review on the website.</li>
          <li><strong>Unapprove</strong> — hides it again.</li>
          <li><strong>Delete</strong> — removes it permanently.</li>
        </ul>
      </Section>

      <Section id="messages" title="Messages (leads)">
        <p>Sidebar: <strong>Messages</strong>. All enquiries arrive here, grouped into <strong>Contact messages</strong>, <strong>Quote requests</strong> and <strong>Job applications</strong>. Each entry shows the sender's name, email, phone and message with the date received. Use the email link to reply from your own email program, and <strong>Delete</strong> to remove an entry.</p>
      </Section>

      <Section id="settings" title="Settings & SEO">
        <p>Sidebar: <strong>Settings</strong>. Global values used across the site — company contact details, phone, email, address, social links and similar. Edit the value next to a name and press <strong>Save</strong>.</p>
        <p>Page-level SEO (the browser tab title and the description shown in search results) is edited where the content lives: services and companies have their own <strong>SEO title</strong> and <strong>SEO description</strong> fields, and portfolio projects have an <strong>SEO description</strong>. Keep titles under about 60 characters and descriptions under about 155.</p>
      </Section>

      <Section id="arabic" title="Arabic mode">
        <p>Visitors switch the public site to Arabic using the language button in the header. The layout flips to right-to-left and the interface wording (menus, buttons, section titles) is translated automatically. Content you type in the admin panel is shown as you entered it — if a value has no Arabic version, the English text is displayed. The admin panel itself is English only.</p>
      </Section>

      <Section id="images" title="Image guidelines">
        <ul>
          <li><strong>Formats</strong> — JPG or PNG for photos and logos, WebP if you have it, MP4 for video.</li>
          <li><strong>Logos</strong> — PNG with a transparent or white background, roughly 400×400 px.</li>
          <li><strong>Slider backgrounds (desktop)</strong> — landscape, about 1920×1080 px.</li>
          <li><strong>Mobile backgrounds</strong> — portrait, about 1080×1500 px, with the subject near the top.</li>
          <li><strong>Portfolio covers</strong> — landscape, about 1600×900 px.</li>
          <li>Keep files under roughly 2 MB where possible; uploads are compressed automatically.</li>
          <li>To replace an image, upload the new one in the same field — the old one stays in the Media Library.</li>
        </ul>
      </Section>
    </div>
  );
}