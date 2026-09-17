import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  Copy,
  Gift,
  Heart,
  Menu,
  Search,
  Send,
  Sparkles,
  ImagePlus,
  Upload,
  Trash2,
  Star,
  WandSparkles,
  X,
} from "lucide-react";

const categories = ["All templates", "Birthday", "For her", "For him", "Kids", "Milestones"];

type Template = {
  id: number;
  title: string;
  eyebrow: string;
  description: string;
  category: string;
  tone: string;
  image: string;
  tags: string[];
  featured?: boolean;
};

const templates: Template[] = [
  {
    id: 1,
    title: "Birthday bloom",
    eyebrow: "A little extra love",
    description: "A joyful, floral note for the person who makes every room brighter.",
    category: "For her",
    tone: "coral",
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=85",
    tags: ["Floral", "Joyful", "Personal"],
    featured: true,
  },
  {
    id: 2,
    title: "Make a wish",
    eyebrow: "Best day ever",
    description: "Bright, bold and ready for a celebration that goes until midnight.",
    category: "Birthday",
    tone: "purple",
    image:
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=900&q=85",
    tags: ["Balloons", "Confetti"],
  },
  {
    id: 3,
    title: "Little legend",
    eyebrow: "For the tiny VIP",
    description: "A playful card for big laughs, small hands and the sweetest wishes.",
    category: "Kids",
    tone: "lime",
    image:
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=900&q=85",
    tags: ["Playful", "Kids"],
  },
  {
    id: 4,
    title: "Cheers to you",
    eyebrow: "Raise a glass",
    description: "For the friend who makes ordinary days feel like a Friday night.",
    category: "For him",
    tone: "ink",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=85",
    tags: ["Cheers", "Cool"],
  },
  {
    id: 5,
    title: "New chapter",
    eyebrow: "A very good year",
    description: "A thoughtful milestone moment for everything that comes next.",
    category: "Milestones",
    tone: "blue",
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=85",
    tags: ["Milestone", "Thoughtful"],
  },
  {
    id: 6,
    title: "Party in a card",
    eyebrow: "Send the fun",
    description: "A colorful little party, delivered instantly to their inbox.",
    category: "Birthday",
    tone: "yellow",
    image:
      "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?auto=format&fit=crop&w=900&q=85",
    tags: ["Colorful", "Instant"],
  },
];

function Home() {
  const [activeCategory, setActiveCategory] = useState("All templates");
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState<number[]>([1]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [editorMode, setEditorMode] = useState(false);
  const [editorName, setEditorName] = useState("your favorite person");
  const [editorMessage, setEditorMessage] = useState("You make every day brighter. Here's to your best year yet!");
  const [editorTheme, setEditorTheme] = useState("coral");
  const [editorFont, setEditorFont] = useState("editorial");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string | null>(null);
  const [savedDesign, setSavedDesign] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const filteredTemplates = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return templates.filter((template) => {
      const matchesCategory = activeCategory === "All templates" || template.category === activeCategory;
      const searchable = `${template.title} ${template.description} ${template.tags.join(" ")}`.toLowerCase();
      return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [activeCategory, query]);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2600);
  };

  const toggleFavorite = (id: number) => {
    setFavorites((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
    notify(favorites.includes(id) ? "Removed from your favorites" : "Saved to your favorites");
  };

  const scrollToTemplates = () => document.getElementById("templates")?.scrollIntoView({ behavior: "smooth" });

  const openEditor = (template: Template) => {
    setSelectedTemplate(template);
    setEditorMode(true);
    setSavedDesign(false);
    setEditorName("your favorite person");
    setEditorMessage("You make every day brighter. Here's to your best year yet!");
    setEditorTheme(template.tone === "purple" ? "purple" : template.tone === "lime" ? "lime" : "coral");
    setEditorFont("editorial");
    setPhotoPreview(null);
    setPhotoName(null);
  };

  const closeEditor = () => {
    setSelectedTemplate(null);
    setEditorMode(false);
    setSavedDesign(false);
  };

  const editorThemes = [
    { id: "coral", label: "Coral joy", accent: "#ff7057", surface: "#fff5ed" },
    { id: "purple", label: "Purple party", accent: "#9978ee", surface: "#f1edff" },
    { id: "lime", label: "Lime light", accent: "#9ebd44", surface: "#f3f9d9" },
    { id: "blue", label: "Blue skies", accent: "#4a9fd6", surface: "#eaf6fc" },
  ];

  const activeEditorTheme = editorThemes.find((theme) => theme.id === editorTheme) ?? editorThemes[0];
  const fontStyles = [
    { id: "editorial", label: "Editorial", sample: "Classic", family: '"Playfair Display", serif' },
    { id: "friendly", label: "Friendly", sample: "Warm", family: '"DM Sans", sans-serif' },
    { id: "handwritten", label: "Handwritten", sample: "Personal", family: '"Caveat", cursive' },
    { id: "modern", label: "Modern", sample: "Clean", family: '"Space Grotesk", sans-serif' },
  ];
  const activeFontStyle = fontStyles.find((font) => font.id === editorFont) ?? fontStyles[0];

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      notify("Please choose an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      notify("Please choose an image under 5 MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setPhotoPreview(typeof reader.result === "string" ? reader.result : null);
      setPhotoName(file.name);
      setSavedDesign(false);
      notify("Personal photo added to your card");
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="site-shell">
      <div className="announcement-bar">
        <span className="announcement-dot" />
        Fresh wishes, ready to send <span className="announcement-separator">✦</span> Free to personalize
        <span className="announcement-arrow">↗</span>
      </div>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Wishwell home">
          <span className="brand-mark">w</span>
          <span>
            <strong>Wishwell</strong>
            <small>celebrate beautifully</small>
          </span>
        </a>
        <nav className={`main-nav ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
          <a href="#templates" onClick={() => setMenuOpen(false)}>Browse cards</a>
          <a href="#how-it-works" onClick={() => setMenuOpen(false)}>How it works</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>Our little story</a>
        </nav>
        <div className="header-actions">
          <button className="text-button" onClick={() => notify("Your favorites are saved for this session")}>Saved <span>{favorites.length}</span></button>
          <button className="button button-dark button-small" onClick={scrollToTemplates}>Find a card <ArrowUpRight size={15} /></button>
          <button className="menu-button" aria-label="Toggle menu" onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-copy reveal-up">
            <div className="kicker"><Sparkles size={15} /> Birthday wishes, but make them memorable</div>
            <h1>Make their day <em>feel</em> like a big deal.</h1>
            <p>Beautifully designed birthday templates for the people who deserve more than a quick “HBD”.</p>
            <div className="hero-actions">
              <button className="button button-dark" onClick={scrollToTemplates}>Explore the collection <ArrowUpRight size={17} /></button>
              <button className="play-link" onClick={() => notify("A little inspiration is on its way")}> <span className="play-icon">▶</span> See the magic</button>
            </div>
            <div className="hero-proof">
              <div className="avatar-stack" aria-label="Wishwell community">
                <span className="avatar avatar-one">A</span><span className="avatar avatar-two">M</span><span className="avatar avatar-three">S</span><span className="avatar avatar-four">+</span>
              </div>
              <span><strong>12k+</strong> happy senders this month</span>
            </div>
          </div>

          <div className="hero-art reveal-up delay-1" aria-label="Featured birthday card preview">
            <div className="shape shape-star">✦</div>
            <div className="shape shape-sparkle">✧</div>
            <div className="shape shape-circle" />
            <div className="hero-card">
              <div className="card-image" style={{ backgroundImage: `url(${templates[0].image})` }}>
                <span className="card-stamp">WISH<br />BIG</span>
                <span className="card-ribbon">FROM THE HEART</span>
              </div>
              <div className="hero-card-note">
                <span>For your brightest human</span>
                <strong>Happy<br /><i>birthday,</i><br />beautiful.</strong>
                <div className="note-line" />
                <small>With all my love, always</small>
              </div>
            </div>
            <div className="floating-note note-top"><span>01</span> Made to be remembered</div>
            <div className="floating-note note-bottom"><Gift size={14} /> A little joy, delivered</div>
          </div>
        </section>

        <section className="marquee-section" aria-label="Wishwell values">
          <div className="marquee-track"><span>Good vibes only</span><b>✦</b><span>Personal, not predictable</span><b>✦</b><span>Made for the moment</span><b>✦</b><span>Good vibes only</span><b>✦</b><span>Personal, not predictable</span></div>
        </section>

        <section className="collection-section" id="templates">
          <div className="section-heading reveal-up">
            <div>
              <div className="eyebrow">The collection</div>
              <h2>Find the feeling.</h2>
            </div>
            <p>Start with a mood, make it yours, and send a little more joy into the world.</p>
          </div>

          <div className="catalog-controls">
            <div className="category-list" role="tablist" aria-label="Filter templates">
              {categories.map((category) => (
                <button key={category} className={`category-pill ${activeCategory === category ? "active" : ""}`} onClick={() => setActiveCategory(category)}>{category}</button>
              ))}
            </div>
            <label className="search-field">
              <Search size={17} />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a vibe" aria-label="Search templates" />
              {query && <button className="clear-search" onClick={() => setQuery("")} aria-label="Clear search"><X size={14} /></button>}
            </label>
          </div>

          <div className="template-grid">
            {filteredTemplates.map((template, index) => (
              <article className={`template-card ${template.featured ? "featured-card" : ""} tone-${template.tone} reveal-up`} style={{ animationDelay: `${index * 70}ms` }} key={template.id}>
                <div className="template-visual" style={{ backgroundImage: `url(${template.image})` }}>
                  <div className="visual-overlay" />
                  <span className="template-eyebrow">{template.eyebrow}</span>
                  <button className={`favorite-button ${favorites.includes(template.id) ? "is-favorite" : ""}`} aria-label={`${favorites.includes(template.id) ? "Remove" : "Add"} ${template.title} ${favorites.includes(template.id) ? "from" : "to"} favorites`} onClick={() => toggleFavorite(template.id)}>
                    <Heart size={18} fill={favorites.includes(template.id) ? "currentColor" : "none"} />
                  </button>
                  <div className="template-title-wrap"><h3>{template.title}</h3><span>{template.tags[0]}</span></div>
                </div>
                <div className="template-meta">
                  <p>{template.description}</p>
                  <button className="card-link" onClick={() => openEditor(template)}>Personalize card <ArrowUpRight size={15} /></button>
                </div>
              </article>
            ))}
          </div>
          {filteredTemplates.length === 0 && <div className="empty-state"><WandSparkles size={30} /><h3>No cards in that mood yet.</h3><p>Try another feeling or clear your search.</p><button className="button button-outline" onClick={() => { setQuery(""); setActiveCategory("All templates"); }}>Reset filters</button></div>}
          <div className="collection-footer"><span>Showing {filteredTemplates.length} of {templates.length} cards</span><button className="text-button" onClick={() => notify("More little wonders are coming soon")}>See all cards <ChevronRight size={15} /></button></div>
        </section>

        <section className="how-section" id="how-it-works">
          <div className="how-intro reveal-up"><div className="eyebrow">The easy part</div><h2>Thoughtful takes<br /><em>less than a minute.</em></h2><p>We made sending something meaningful feel as easy as choosing the right words.</p><button className="button button-coral" onClick={scrollToTemplates}>Start with a template <ArrowUpRight size={16} /></button></div>
          <div className="steps-list">
            <div className="step-item reveal-up"><span className="step-number">01</span><div><h3>Pick your vibe</h3><p>Find a template that feels like them. Soft, silly, sentimental or somewhere in between.</p></div><span className="step-icon"><Search size={18} /></span></div>
            <div className="step-item reveal-up"><span className="step-number">02</span><div><h3>Make it personal</h3><p>Add their name, your favorite memory, or an inside joke only the two of you get.</p></div><span className="step-icon"><WandSparkles size={18} /></span></div>
            <div className="step-item reveal-up"><span className="step-number">03</span><div><h3>Send the good stuff</h3><p>Share it instantly by text, email or link. Big feelings, zero postage required.</p></div><span className="step-icon"><Send size={18} /></span></div>
          </div>
        </section>

        <section className="testimonial-section" id="about">
          <div className="testimonial-quote"><div className="eyebrow">Kind words</div><div className="quote-mark">“</div><blockquote>It felt like me, only <em>better at words.</em> That’s the whole magic of Wishwell.</blockquote><div className="quote-author"><span className="quote-avatar">J</span><span><strong>Jules M.</strong><small>Professional best friend</small></span></div></div>
          <div className="testimonial-art"><div className="testimonial-scribble">YOU<br />GOT<br /><i>THIS</i> <span>✦</span></div><div className="testimonial-card"><Star size={16} fill="currentColor" /><span>Made with feeling<br /><b>and a little bit of fun.</b></span></div></div>
        </section>

        <section className="newsletter-section">
          <div className="newsletter-icon"><Gift size={25} /></div><div><div className="eyebrow">The good stuff</div><h2>More reasons to celebrate.</h2><p>Occasional inspiration, new templates and zero boring emails.</p></div><form className="newsletter-form" onSubmit={(event) => { event.preventDefault(); notify("You're on the list — keep an eye on your inbox"); }}><input type="email" required placeholder="Your email address" aria-label="Your email address" /><button className="button button-dark" type="submit">I'm in <ArrowUpRight size={16} /></button></form>
        </section>
      </main>

      <footer className="site-footer"><a className="brand" href="#top"><span className="brand-mark">w</span><span><strong>Wishwell</strong><small>celebrate beautifully</small></span></a><p>For the moments worth making a little more.</p><div className="footer-links"><a href="#templates">Cards</a><a href="#how-it-works">How it works</a><button onClick={() => notify("Contact us at hello@wishwell.cards")}>Say hello</button></div><span className="footer-copy">© 2026 Wishwell</span></footer>

      {selectedTemplate && <div className="modal-backdrop" role="presentation" onClick={closeEditor}><div className={`preview-modal ${editorMode ? "editor-modal" : ""}`} role="dialog" aria-modal="true" aria-label={`${selectedTemplate.title} editor`} onClick={(event) => event.stopPropagation()}><button className="modal-close" aria-label="Close editor" onClick={closeEditor}><X size={18} /></button>{editorMode ? <><div className="editor-preview-pane" style={{ background: activeEditorTheme.surface }}><div className="editor-preview-label"><Sparkles size={14} /> Live preview</div><div className="editable-card" style={{ background: photoPreview ? `linear-gradient(180deg, rgba(20,20,24,.04), rgba(20,20,24,.3)), url(${photoPreview}) center/cover` : selectedTemplate.image ? `linear-gradient(180deg, rgba(20,20,24,.04), rgba(20,20,24,.22)), url(${selectedTemplate.image}) center/cover` : activeEditorTheme.surface }}><div className="editable-card-overlay" /><div className="editable-card-copy"><span style={{ color: activeEditorTheme.accent }}>FOR {editorName.toUpperCase()}</span><h3 style={{ fontFamily: activeFontStyle.family }}>Happy <i style={{ color: activeEditorTheme.accent }}>birthday,</i><br />beautiful.</h3><div className="editable-rule" style={{ background: activeEditorTheme.accent }} /><p style={{ fontFamily: activeFontStyle.family }}>{editorMessage}</p></div></div><div className="preview-device-note"><span style={{ background: activeEditorTheme.accent }} /> Looks lovely on every screen</div></div><div className="editor-panel"><div className="eyebrow">Personalize your card</div><h2>Make it <em>theirs.</em></h2><p className="editor-helper">A few thoughtful details turn a pretty card into a very personal one.</p><label className="editor-label" htmlFor="editor-name">Their name</label><input id="editor-name" className="editor-input" value={editorName} maxLength={32} onChange={(event) => setEditorName(event.target.value)} placeholder="e.g. Maya" /><div className="editor-label editor-label-with-action"><span>Add a personal photo</span>{photoPreview && <button className="remove-photo" type="button" onClick={() => { setPhotoPreview(null); setPhotoName(null); notify("Personal photo removed"); }}><Trash2 size={12} /> Remove</button>}</div><label className={`photo-upload ${photoPreview ? "has-photo" : ""}`} htmlFor="editor-photo"><span className="photo-upload-icon">{photoPreview ? <ImagePlus size={17} /> : <Upload size={17} />}</span><span><strong>{photoPreview ? "Change your photo" : "Upload a photo"}</strong><small>{photoPreview ? photoName : "JPG, PNG or WEBP · up to 5 MB"}</small></span><input id="editor-photo" type="file" accept="image/jpeg,image/png,image/webp" onChange={handlePhotoUpload} /></label><label className="editor-label" htmlFor="editor-message">Your message</label><textarea id="editor-message" className="editor-input editor-textarea" value={editorMessage} maxLength={140} onChange={(event) => setEditorMessage(event.target.value)} placeholder="Write something from the heart..." /><div className="editor-label">Choose a mood</div><div className="theme-swatches" role="radiogroup" aria-label="Choose a card color"><div className="theme-swatch-list">{editorThemes.map((theme) => <button key={theme.id} className={`theme-swatch ${editorTheme === theme.id ? "selected" : ""}`} style={{ background: theme.accent }} aria-label={theme.label} aria-checked={editorTheme === theme.id} role="radio" onClick={() => setEditorTheme(theme.id)}><span>{editorTheme === theme.id && <Check size={14} />}</span></button>)}</div><span className="theme-name">{activeEditorTheme.label}</span></div><div className="editor-label">Choose a type style</div><div className="font-style-grid" role="radiogroup" aria-label="Choose a font style">{fontStyles.map((font) => <button key={font.id} type="button" className={`font-style-option ${editorFont === font.id ? "selected" : ""}`} style={{ fontFamily: font.family }} aria-label={font.label} aria-checked={editorFont === font.id} role="radio" onClick={() => { setEditorFont(font.id); setSavedDesign(false); }}><span className="font-sample">{font.sample}</span><small>{font.label}</small>{editorFont === font.id && <Check className="font-selected-check" size={13} />}</button>)}</div><div className="editor-actions"><button className="button button-dark" onClick={() => { setSavedDesign(true); notify("Your personalized card is ready to share"); }}>Save design <Check size={16} /></button><button className="copy-link" onClick={() => notify("Personalized link copied")}><Copy size={15} /> Copy preview link</button></div>{savedDesign && <div className="saved-design"><div className="saved-check"><Check size={15} /></div><div><strong>Looking good, {editorName}!</strong><span>Your card is ready to share with a little more joy.</span></div></div>}<div className="modal-note"><Check size={15} /> No account needed to start</div></div></> : <><div className="modal-image" style={{ backgroundImage: `url(${selectedTemplate.image})` }}><span>{selectedTemplate.eyebrow}</span><h3>{selectedTemplate.title}</h3></div><div className="modal-content"><div className="eyebrow">A little something for them</div><h2>Make it <em>theirs.</em></h2><p>{selectedTemplate.description} Personalize this template with their name, your message and a little bit of your shared magic.</p><div className="modal-actions"><button className="button button-coral" onClick={() => setEditorMode(true)}>Personalize this card <ArrowUpRight size={16} /></button><button className="copy-link" onClick={() => notify("Preview link copied")}><Copy size={15} /> Copy link</button></div><div className="modal-note"><Check size={15} /> No account needed to start</div></div></>}</div></div>}
      {toast && <div className="toast" role="status"><Check size={16} /> {toast}</div>}
    </div>
  );
}

export default Home;

export { Home };

// Keep the component tree intentionally small: this experience is static-first and easy to extend with a CMS later.
const _unused = [Copy, Star];
void _unused;
