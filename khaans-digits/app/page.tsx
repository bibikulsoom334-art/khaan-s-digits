import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles, Globe2, Heart, ShieldCheck, MessageCircle, Layers3 } from "lucide-react";

const cards = [
  {name:"Birthday Wishes",desc:"Make their day unforgettable.",tone:"birthday"},
  {name:"Love & Romance",desc:"A personal message, beautifully presented.",tone:"love"},
  {name:"Wedding Invitations",desc:"Elegant digital invitations for your big day.",tone:"wedding"},
  {name:"Eid Greetings",desc:"Share warm wishes with everyone.",tone:"eid"},
  {name:"Anniversary Card",desc:"Celebrate a love story worth remembering.",tone:"anniversary",image:"/cards/anniversary.webp"},
  {name:"Valentine’s Day Card",desc:"Send a little love, beautifully.",tone:"valentines",image:"/cards/valentines-day.webp"},
  {name:"Mother’s Day Card",desc:"A heartfelt thank-you for Mum.",tone:"mothers",image:"/cards/mothers-day.webp"},
  {name:"Father’s Day Card",desc:"Celebrate the one who’s always there.",tone:"fathers",image:"/cards/fathers-day.webp"},
  {name:"Graduation Card",desc:"Celebrate every hard-earned achievement.",tone:"graduation",image:"/cards/graduation.webp"},
  {name:"Thank You Card",desc:"Make your gratitude feel extra special.",tone:"thankyou",image:"/cards/thank-you.webp"},
  {name:"Congratulations Card",desc:"Share the joy of a big milestone.",tone:"congratulations",image:"/cards/congratulations.webp"},
  {name:"Baby Shower Card",desc:"Welcome a beautiful new beginning.",tone:"baby",image:"/cards/baby-shower.webp"}
];
export default function Home() {
  return <main>
    <nav className="nav wrap">
      <Link href="/" className="brand"><Image src="/logo.png" alt="KHAANS DIGITS logo" width={48} height={48}/><span>KHAANS <b>DIGITS</b></span></Link>
      <div className="navlinks"><a href="#cards">Wishes Cards</a><a href="#services">Services</a><a href="#work">Our Work</a><a href="#process">Process</a></div>
      <Link className="navcta" href="/order">Start an Order <ArrowUpRight size={16}/></Link>
    </nav>
    <section className="hero wrap">
      <div className="hero-copy">
        <div className="eyebrow"><span className="pulse"/> DIGITAL CREATIVITY, REIMAGINED</div>
        <h1>Make every<br/><em>moment</em> memorable.</h1>
        <p className="lead">Premium digital wishes cards and immersive 3D websites, crafted around your ideas.</p>
        <div className="actions"><Link className="button primary" href="/order">Order Your Design <ArrowUpRight size={18}/></Link><a className="button ghost" href="#cards">Explore wishes cards</a></div>
        <div className="trust"><ShieldCheck size={17}/> Personalised designs · Direct communication · Made with care</div>
      </div>
      <div className="hero-art">
        <div className="orb orb1"/><div className="orb orb2"/>
        <div className="glass-card card-back"><span>YOUR MOMENT</span><b>Made special.</b><small>DESIGNED FOR YOU</small></div>
        <div className="glass-card card-front"><Sparkles size={22}/><span>WITH LOVE</span><h2>A little<br/>more magic.</h2><div className="card-line"/></div>
        <div className="float-tag"><Heart size={15} fill="currentColor"/> Made personal</div>
      </div>
    </section>
    <section className="intro wrap" id="cards"><div><div className="eyebrow">THE WISHES COLLECTION</div><h2>Words become<br/><em>experiences.</em></h2></div><p>Choose an occasion, share your message, and we’ll create a digital card that feels uniquely yours.</p></section>
    <section className="card-grid wrap">{cards.map((c,i)=><article className={`wish-card ${c.tone}`} key={c.name}><div className="wish-art">{c.image ? <Image src={c.image} alt={`${c.name} photo`} width={640} height={420} className="wish-photo"/> : <div className="wish-symbol">{["✦","♡","❋","☾"][i]}</div>}<span>{String(i+1).padStart(2,"0")}</span></div><div className="wish-info"><div><h3>{c.name}</h3><p>{c.desc}</p></div><Link href={`/order?occasion=${encodeURIComponent(c.name)}`} aria-label={`Order ${c.name}`}><ArrowUpRight/></Link></div></article>)}</section>
    <section className="services wrap" id="services"><div className="eyebrow">WHAT WE CREATE</div><h2>Digital craft, <em>built around you.</em></h2><div className="service-grid"><article><Globe2/><span>01 / WEB DEVELOPMENT</span><h3>3D Website Development</h3><p>Modern, responsive websites with immersive visuals and a polished user experience.</p><Link href="/order">Discuss your website <ArrowUpRight size={16}/></Link></article><article><Layers3/><span>02 / DIGITAL GREETINGS</span><h3>Online Wishes Cards</h3><p>Personalised greeting cards for birthdays, weddings, celebrations and meaningful moments.</p><Link href="/order">Order a wishes card <ArrowUpRight size={16}/></Link></article></div></section>
    <section className="process wrap" id="process"><div className="eyebrow">SIMPLE & PERSONAL</div><h2>From your idea to <em>the final detail.</em></h2><div className="steps"><div><b>01</b><h3>Tell us your idea</h3><p>Share the occasion, references and requirements.</p></div><div><b>02</b><h3>Discuss & confirm</h3><p>We contact you, discuss the scope and confirm pricing.</p></div><div><b>03</b><h3>We create</h3><p>Your project moves into production after confirmation.</p></div><div><b>04</b><h3>Receive your design</h3><p>We deliver through WhatsApp and email.</p></div></div></section>
    <section className="cta wrap" id="work"><div className="eyebrow">LET’S CREATE SOMETHING</div><h2>Your idea deserves<br/><em>a beautiful finish.</em></h2><p>Tell us what you have in mind. We’ll take it from there.</p><Link className="button primary" href="/order">Place an Order <ArrowUpRight size={18}/></Link></section>
    <footer className="footer wrap"><div className="brand"><Image src="/logo.png" alt="" width={38} height={38}/><span>KHAANS <b>DIGITS</b></span></div><p>Premium digital experiences, made personal.</p><div><a href="mailto:ibraheemimran938@gmail.com">Email</a><a href="https://wa.me/923449531512">WhatsApp</a><Link href="/login">Customer Login</Link></div><small>© {new Date().getFullYear()} KHAANS DIGITS. All rights reserved.</small></footer>
  </main>;
}