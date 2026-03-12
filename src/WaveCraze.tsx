import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Flame, Music, Zap, Calendar, MapPin,
  Instagram, Facebook, ChevronRight, Menu, X, Linkedin
} from 'lucide-react';
import sahil from './assets/sai.jpg';
import raj from './assets/raj.jpg';
import asif from './assets/asif.jpg';
import anshul from './assets/anshul.jpeg';
import talentxImg from './assets/talentx.jpeg';
import aboutImg from './assets/about.jpg';
import { Preloader } from './Preloader';

// ─── NAVBAR ───────────────────────────────────────────────────────────────────

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) setIsOpen(false); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Events', href: '#events' },
    { name: 'Schedule', href: '#schedule' },
    { name: 'Team', href: '#team' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-md py-3 border-b border-fire-red/20' : 'bg-transparent py-4 md:py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
        <a href="#home" className="text-xl md:text-2xl font-bold tracking-tighter flex items-center gap-2 shrink-0">
          <Flame className="text-fire-red fill-fire-red" size={24} />
          <span className="font-display italic">WaveCraze</span>
        </a>
        <div className="hidden md:flex gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm uppercase tracking-widest font-semibold hover:text-fire-red transition-colors">
              {link.name}
            </a>
          ))}
        </div>
        <button className="md:hidden text-white p-2 -mr-2 touch-manipulation" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
          className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-md border-b border-fire-red/20 py-4 px-4 flex flex-col gap-1"
        >
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={() => setIsOpen(false)}
              className="text-base uppercase tracking-widest font-semibold hover:text-fire-red py-3 px-2 border-b border-white/5 last:border-0 transition-colors touch-manipulation">
              {link.name}
            </a>
          ))}
        </motion.div>
      )}
    </nav>
  );
};

// ─── EMBERS ───────────────────────────────────────────────────────────────────

const Embers = () => {
  const [particles, setParticles] = useState<{ id: number; left: string; size: string; duration: string; delay: string }[]>([]);
  useEffect(() => {
    setParticles(Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 4 + 2}px`,
      duration: `${Math.random() * 5 + 5}s`,
      delay: `${Math.random() * 5}s`,
    })));
  }, []);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {particles.map((p) => (
        <div key={p.id} className="ember-particle animate-float"
          style={{ left: p.left, width: p.size, height: p.size, bottom: '-20px', animationDuration: p.duration, animationDelay: p.delay, boxShadow: '0 0 10px #ff4d00' }} />
      ))}
    </div>
  );
};

// ─── HERO ─────────────────────────────────────────────────────────────────────

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  return (
    <section id="home" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-black">
      <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1517483000871-1dbf64a6e1c6?q=80&w=2070&auto=format&fit=crop"
          alt="Fire background" className="w-full h-full object-cover opacity-60 scale-110" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
        <div className="absolute inset-0 ash-overlay" />
      </motion.div>
      <Embers />
      <div className="relative z-20 text-center px-4 sm:px-6 w-full max-w-5xl mx-auto">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="text-fire-red uppercase tracking-[0.3em] sm:tracking-[0.5em] font-bold text-xs sm:text-sm mb-3 sm:mb-4">
          A James Cameron Inspired Fest
        </motion.p>
        <motion.h1 initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: 'easeOut' }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display italic font-bold tracking-tighter mb-2 fire-glow leading-none">
          WAVECRAZE
        </motion.h1>
        <motion.div initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: '100%' }} transition={{ delay: 0.5, duration: 1 }}
          className="h-px bg-gradient-to-r from-transparent via-fire-red to-transparent max-w-xs sm:max-w-2xl mx-auto mb-4 sm:mb-6" />
        <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-display tracking-[0.15em] sm:tracking-[0.2em] uppercase font-light">
          Fire and Ash
        </motion.h2>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}
          className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
          <div className="flex items-center gap-2 text-gray-300">
            <Calendar size={16} className="text-fire-red shrink-0" />
            <span className="tracking-widest uppercase text-xs font-semibold">March 13 - 14, 2026</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <MapPin size={16} className="text-fire-red shrink-0" />
            <span className="tracking-widest uppercase text-xs font-semibold">SAC</span>
          </div>
        </motion.div>
        <a href="#events">
          <motion.button whileHover={{ scale: 1.05, backgroundColor: '#ff4d00', color: '#fff' }} whileTap={{ scale: 0.95 }}
            className="mt-8 sm:mt-12 px-8 sm:px-10 py-3 sm:py-4 border border-fire-red text-fire-red uppercase tracking-widest font-bold text-xs sm:text-sm transition-all rounded-sm touch-manipulation">
            Register Now
          </motion.button>
        </a>
      </div>
      <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 opacity-50">
        <div className="w-px h-8 sm:h-12 bg-gradient-to-b from-fire-red to-transparent" />
      </motion.div>
    </section>
  );
};

// ─── ABOUT ────────────────────────────────────────────────────────────────────

const About = () => (
  <section id="about" className="py-16 sm:py-24 bg-black relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
      <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
        <h3 className="text-fire-red font-bold uppercase tracking-widest text-sm mb-3 sm:mb-4">The Legacy</h3>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display italic mb-6 sm:mb-8">Rising from the Ashes</h2>
        <p className="text-gray-400 leading-relaxed mb-4 sm:mb-6 text-base sm:text-lg">
          WaveCraze is not just a fest; it's a rebirth. Inspired by the raw power of fire and the haunting beauty of ash, this year's theme challenges you to push beyond your limits.
        </p>
        <p className="text-gray-400 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
          Join creators, innovators, and performers as we ignite the stage and leave behind a legacy that will never fade. From high-octane technical battles to soul-stirring cultural performances, WaveCraze is where the heat meets the beat.
        </p>
      </motion.div>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative mt-6 md:mt-0">
        <div className="absolute -inset-3 sm:-inset-4 border border-fire-red/20 rounded-2xl -rotate-3" />
        <img src={aboutImg} alt="About WaveCraze" className="rounded-2xl relative z-10 grayscale hover:grayscale-0 transition-all duration-700 w-full object-cover" />
        <div className="absolute -bottom-5 -right-5 sm:-bottom-6 sm:-right-6 bg-fire-red p-5 sm:p-8 rounded-2xl z-20 hidden md:block">
          <Flame size={36} className="text-white" />
        </div>
      </motion.div>
    </div>
  </section>
);

// ─── EVENTS ───────────────────────────────────────────────────────────────────

interface EventCardProps { title: string; category: string; icon: any; image: string; link: string; }

const EventCard = ({ title, category, icon: Icon, image, link }: EventCardProps) => (
  <motion.div whileHover={{ y: -8 }} className="group relative h-[320px] sm:h-[380px] lg:h-[400px] overflow-hidden rounded-2xl bg-ash-gray border border-white/5">
    <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500" referrerPolicy="no-referrer" />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
    <div className="absolute bottom-0 left-0 p-5 sm:p-8 w-full">
      <div className="bg-fire-red/20 backdrop-blur-md w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-3 sm:mb-4 border border-fire-red/30">
        <Icon className="text-fire-red" size={20} />
      </div>
      <p className="text-fire-red text-xs uppercase tracking-widest font-bold mb-1 sm:mb-2">{category}</p>
      <h4 className="text-xl sm:text-2xl font-display italic font-bold mb-3 sm:mb-4">{title}</h4>
      <a href={link} target="_blank" rel="noopener noreferrer"
        className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest group-hover:text-fire-red transition-colors touch-manipulation">
        Register Now <ChevronRight size={16} />
      </a>
    </div>
  </motion.div>
);

const Events = () => {
  const events = [
    { title: 'Glam It Up', category: '', icon: Music, image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop', link: 'https://forms.gle/your-glam-form' },
    { title: 'TalentX', category: '', icon: Zap, image: talentxImg, link: 'https://docs.google.com/forms/d/e/1FAIpQLSdsSbAuMgzJKYlJ56c5IZhr5Hd-MhhLFR2jcfIi6MSriYGLrQ/viewform?usp=header' },
  ];
  return (
    <section id="events" className="py-16 sm:py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 sm:mb-16 gap-6">
          <div>
            <h3 className="text-fire-red font-bold uppercase tracking-widest text-sm mb-3 sm:mb-4">The Arena</h3>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display italic">Featured Events</h2>
          </div>
          <button className="px-6 sm:px-8 py-3 bg-white/5 border border-white/10 hover:border-fire-red transition-colors uppercase tracking-widest text-xs font-bold rounded-sm whitespace-nowrap touch-manipulation">
            Explore All Events
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-2xl sm:max-w-none mx-auto">
          {events.map((event, i) => <EventCard key={i} {...event} />)}
        </div>
      </div>
    </section>
  );
};

// ─── SCHEDULE ─────────────────────────────────────────────────────────────────

const Schedule = () => {
  const days = [
    { date: 'March 13', events: [{ time: '6:00 PM', title: 'Glam it Up', location: 'SAC' }] },
    { date: 'March 13', events: [{ time: '7:30 PM', title: 'TalentX', location: 'SAC' }] },
  ];
  return (
    <section id="schedule" className="py-16 sm:py-24 bg-ash-gray/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-16">
          <h3 className="text-fire-red font-bold uppercase tracking-widest text-sm mb-3 sm:mb-4">Timeline</h3>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display italic">The Burn Schedule</h2>
        </div>
        <div className="space-y-8 sm:space-y-12">
          {days.map((day, i) => (
            <div key={i}>
              <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-8 overflow-hidden">
                <span className="text-2xl sm:text-3xl font-display italic font-bold text-fire-red shrink-0">{day.date}</span>
                <div className="h-px flex-1 bg-fire-red/20 min-w-0" />
              </div>
              <div className="space-y-3 sm:space-y-4">
                {day.events.map((event, j) => (
                  <motion.div key={j} whileHover={{ x: 6 }}
                    className="bg-black/40 p-4 sm:p-6 rounded-xl border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                    <div className="flex items-center gap-4 sm:gap-6">
                      <span className="text-fire-red font-mono text-sm shrink-0">{event.time}</span>
                      <h4 className="text-lg sm:text-xl font-semibold">{event.title}</h4>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm ml-0 sm:ml-auto shrink-0">
                      <MapPin size={14} /><span>{event.location}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── TEAM ─────────────────────────────────────────────────────────────────────

const Team = () => {
  const members = [
    { name: 'D Sai Sahil', role: 'President', image: sahil },
    { name: 'Mohammed Asif', role: 'General Secretary', image: asif },
    { name: 'Sk Raj Ali', role: 'Vice President', image: raj },
    { name: 'Anshul Kumar Parira', role: 'Treasurer', image: anshul },
  ];
  return (
    <section id="team" className="py-16 sm:py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-16">
          <h3 className="text-fire-red font-bold uppercase tracking-widest text-sm mb-3 sm:mb-4">The Architects</h3>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display italic">Meet the Members</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {members.map((member, i) => (
            <motion.div key={i} whileHover={{ y: -8 }} className="text-center group">
              <div className="relative mb-4 sm:mb-6 inline-block">
                <div className="absolute inset-0 bg-fire-red rounded-full scale-0 group-hover:scale-105 transition-transform duration-500 opacity-20" />
                <img src={member.image} alt={member.name}
                  className="w-28 h-28 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 object-cover rounded-full border-2 border-white/10 group-hover:border-fire-red transition-colors duration-500"
                  referrerPolicy="no-referrer" />
              </div>
              <h4 className="text-sm sm:text-lg lg:text-xl font-bold mb-1 leading-tight px-1">{member.name}</h4>
              <p className="text-fire-red text-xs uppercase tracking-widest font-bold">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── FOOTER ───────────────────────────────────────────────────────────────────

const Footer = () => (
  <footer className="bg-black border-t border-white/5 pt-16 sm:pt-24 pb-10 sm:pb-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-12 sm:mb-16">
        <div className="sm:col-span-2">
          <a href="#home" className="text-2xl sm:text-3xl font-bold tracking-tighter flex items-center gap-2 mb-5 sm:mb-8">
            <Flame className="text-fire-red fill-fire-red" size={28} />
            <span className="font-display italic">WaveCraze</span>
          </a>
          <p className="text-gray-500 max-w-md leading-relaxed text-sm sm:text-base">
            The ultimate celebration of creativity and competition. Join us as we set the standard for what a college fest can be. Rising from the ashes, fueled by fire.
          </p>
        </div>
        <div>
          <h5 className="text-white uppercase tracking-widest font-bold text-sm mb-4 sm:mb-6">Quick Links</h5>
          <ul className="space-y-3 sm:space-y-4 text-gray-500 text-sm">
            <li><a href="#home" className="hover:text-fire-red transition-colors py-1 block">Home</a></li>
            <li><a href="#about" className="hover:text-fire-red transition-colors py-1 block">About Us</a></li>
            <li><a href="#events" className="hover:text-fire-red transition-colors py-1 block">Events</a></li>
            <li><a href="#schedule" className="hover:text-fire-red transition-colors py-1 block">Schedule</a></li>
          </ul>
        </div>
        <div>
          <h5 className="text-white uppercase tracking-widest font-bold text-sm mb-4 sm:mb-6">Connect</h5>
          <div className="flex gap-3 sm:gap-4 mb-6 sm:mb-8">
            <a href="https://www.instagram.com/radionitroz.nitdgp" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-fire-red transition-colors touch-manipulation" aria-label="Instagram"><Instagram size={18} /></a>
            <a href="https://www.linkedin.com/company/radio-nitroz-nitdgp" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-fire-red transition-colors touch-manipulation" aria-label="LinkedIn"><Linkedin size={18} /></a>
            <a href="https://www.facebook.com/radionitroz.nitdgp" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-fire-red transition-colors touch-manipulation" aria-label="Facebook"><Facebook size={18} /></a>
          </div>
          <p className="text-gray-500 text-sm break-all">https://www.radionitroz.in/</p>
        </div>
      </div>
      <div className="pt-8 sm:pt-12 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 text-gray-600 text-xs uppercase tracking-widest font-bold text-center sm:text-left">
        <p>© 2026 WaveCraze. All rights reserved.</p>
        <p>Designed by RNWebD Team.</p>
      </div>
    </div>
  </footer>
);

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function WaveCrazeApp() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [showSite, setShowSite] = useState(false);

  return (
    <>
      {/* AnimatePresence watches showPreloader — when it goes false,
          it lets Preloader's exit animation play, THEN calls onExitComplete */}
      <AnimatePresence onExitComplete={() => setShowSite(true)}>
        {showPreloader && (
          <Preloader
            duration={2000}
            onComplete={() => setShowPreloader(false)}
          />
        )}
      </AnimatePresence>

      {showSite && (
        <div className="min-h-screen font-sans">
          <Navbar />
          <Hero />
          <About />
          <Events />
          <Schedule />
          <Team />
          <Footer />
        </div>
      )}
    </>
  );
}