import { motion } from "framer-motion";
import { BookOpen, Link2, Upload, Shield, Star } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => (
  <nav className="flex justify-between items-center px-10 py-6 border-b-4 border-black bg-white sticky top-0 z-50">
    <h1 className="text-3xl font-black tracking-tighter">GYAANDAAN</h1>
    <div className="hidden md:flex space-x-8 items-center">
      <a href="#features" className="font-bold hover:underline decoration-4 underline-offset-4">Features</a>
      <a href="#how" className="font-bold hover:underline decoration-4 underline-offset-4">How it works</a>
      <a href="/login" className="px-6 py-2 border-4 border-black bg-[#FFD363] font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
        Login
      </a>
    </div>
  </nav>
);

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-text", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out"
      });
      gsap.from(".hero-image", {
        x: 100,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        delay: 0.5
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="grid md:grid-cols-2 gap-10 px-10 py-24 items-center bg-[#FDFDFD] overflow-hidden">
      <div>
        <h2 className="hero-text text-7xl font-black leading-none uppercase italic">
          Never <br /> <span className="bg-[#B2F39D] px-2 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">Lose</span> <br /> Notes Again.
        </h2>
        <p className="hero-text mt-12 text-2xl font-bold text-gray-800 max-w-lg">
          Upload once. Share a link. Access anytime. The neobrutalist way to manage academic notes.
        </p>
        <div className="hero-text mt-10 flex gap-6">
          <a href="/upload" className="px-8 py-4 bg-[#FFB7D5] border-4 border-black font-black text-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all">
            UPLOAD NOTES
          </a>
          <a href="/explore" className="px-8 py-4 bg-white border-4 border-black font-black text-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all">
            EXPLORE
          </a>
        </div>
      </div>

      <div className="hero-image relative">
        <div className="absolute inset-0 bg-[#FFD363] border-4 border-black rounded-3xl translate-x-4 translate-y-4 -z-10"></div>
        <img 
          src="https://illustrations.popsy.co/white/studying.svg" 
          alt="Notes illustration" 
          className="w-full bg-white border-4 border-black rounded-3xl p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]" 
        />
      </div>
    </section>
  );
};

const Features = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(1.7)"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const features = [
    { icon: Upload, title: "Easy Upload", desc: "Upload notes in seconds.", color: "#B2F39D" },
    { icon: Link2, title: "Shareable Links", desc: "One link, unlimited access.", color: "#FFB7D5" },
    { icon: BookOpen, title: "Organized", desc: "Find notes by subject & semester.", color: "#FFD363" },
    { icon: Shield, title: "Secure", desc: "Your notes, your control.", color: "#8EC5FC" }
  ];

  return (
    <section id="features" ref={containerRef} className="px-10 py-32 bg-white border-y-4 border-black">
      <h3 className="text-5xl font-black text-center mb-20 uppercase underline decoration-8 decoration-[#FFD363]">
        Why GyaanDaan?
      </h3>

      <div className="grid md:grid-cols-4 gap-10">
        {features.map((f, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02, rotate: i % 2 === 0 ? 1 : -1 }}
            className="feature-card p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            style={{ backgroundColor: f.color }}
          >
            <f.icon className="w-12 h-12 mb-6" strokeWidth={3} />
            <h4 className="font-black text-2xl mb-4 uppercase">{f.title}</h4>
            <p className="font-bold text-gray-800">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Testimonials = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".testimonial-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        scale: 0.5,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(2)"
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const reviews = [
    {
      name: "Neha D.",
      role: "Medical Student",
      text: "GyaanDaan didn't just help me store notes — it helped me save time. I've never felt more organized during exams. One link and my whole study group was set!",
      color: "#B2F39D",
      rotate: "-2deg"
    },
    {
      name: "Jay K.",
      role: "Engineering Lead",
      text: "From scattered PDFs to a professionally organized dashboard in minutes. The sharing process is smooth, sharp, and absolutely stress-free.",
      color: "#FFB7D5",
      rotate: "2deg"
    },
    {
      name: "Fatima S.",
      role: "Business Major, UAE",
      text: "I never imagined I'd have a central hub for all my semester notes. I was overwhelmed, unsure, and had no idea where to start. But GyaanDaan made it simple and powerful.",
      color: "#FFFFFF",
      rotate: "-1deg"
    }
  ];

  return (
    <section ref={sectionRef} className="px-10 py-32 bg-[#FDFDFD] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-10 left-10 opacity-20 select-none">
        <div className="grid grid-cols-4 gap-2">
          {[...Array(16)].map((_, i) => <div key={i} className="w-2 h-2 bg-black rounded-full" />)}
        </div>
      </div>
      <div className="absolute bottom-10 right-10 opacity-20 select-none">
        <div className="grid grid-cols-4 gap-2">
          {[...Array(16)].map((_, i) => <div key={i} className="w-2 h-2 bg-black rounded-full" />)}
        </div>
      </div>

      <div className="text-center mb-20">
        <p className="font-black text-xl uppercase tracking-widest text-gray-500 mb-2">Student Testimonial</p>
        <h3 className="text-6xl font-black uppercase">What They Say?</h3>
      </div>

      <div className="flex flex-wrap justify-center gap-12 relative">
        {reviews.map((r, i) => (
          <div 
            key={i} 
            className="testimonial-card w-full max-w-sm border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative transition-transform hover:z-10"
            style={{ backgroundColor: r.color, transform: `rotate(${r.rotate})` }}
          >
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-black" />)}
            </div>
            <p className="font-bold text-xl leading-relaxed mb-8">
              "{r.text}"
            </p>
            <div className="flex items-center gap-4 border-t-4 border-black pt-6">
              <div className="w-14 h-14 bg-gray-200 border-4 border-black rounded-full overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${r.name}`} alt={r.name} />
              </div>
              <div>
                <p className="font-black text-lg uppercase">{r.name}</p>
                <p className="font-bold text-gray-600">{r.role}</p>
              </div>
            </div>
            {/* Sparkle decoration */}
            <div className="absolute -top-6 -right-6">
               <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 0L24.5 15.5L40 20L24.5 24.5L20 40L15.5 24.5L0 20L15.5 15.5L20 0Z" fill="black"/>
               </svg>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = ["Upload Notes", "Get a Shareable Link", "Students Access Anytime"];
  
  return (
    <section id="how" className="px-10 py-32 bg-[#FFD363] border-y-4 border-black">
      <h3 className="text-5xl font-black text-center mb-20 uppercase">How it works</h3>
      <div className="grid md:grid-cols-3 gap-12 text-center">
        {steps.map((step, i) => (
          <div key={i} className="p-10 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center">
            <div className="text-7xl font-black mb-6 italic">{i + 1}</div>
            <p className="text-2xl font-black uppercase">{step}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const CTA = () => (
  <section className="px-10 py-32 text-center bg-white">
    <h3 className="text-6xl font-black uppercase max-w-4xl mx-auto leading-tight">
      Start sharing <span className="bg-[#B2F39D] px-4 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">knowledge</span> today
    </h3>
    <p className="mt-12 text-2xl font-bold text-gray-700">No more lost files. No more endless chats.</p>
    <a href="/register" className="inline-block mt-12 px-12 py-6 bg-[#FFB7D5] border-4 border-black font-black text-3xl shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[5px] hover:translate-y-[5px] hover:shadow-none transition-all">
      CREATE FREE ACCOUNT
    </a>
  </section>
);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-black font-mono">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CTA />
      
      <footer className="px-10 py-12 border-t-4 border-black text-center font-black uppercase text-xl bg-white">
        © {new Date().getFullYear()} GyaanDaan. Built for students with grit.
      </footer>
    </div>
  );
}
