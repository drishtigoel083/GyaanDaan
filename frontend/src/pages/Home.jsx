import { motion } from "framer-motion";
import { BookOpen, Link2, Upload, Shield, Star } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-text", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
      });
      gsap.from(".hero-image", {
        x: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.3
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 px-6 md:px-12 py-12 md:py-16 items-center bg-[#FDFDFD] overflow-hidden">
      <div>
        <h2 className="hero-text text-4xl md:text-5xl lg:text-6xl font-black leading-tight uppercase italic">
          Never <br /> <span className="bg-[#B2F39D] px-2 border-3 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">Lose</span> <br /> Notes Again.
        </h2>
        <p className="hero-text mt-6 text-base md:text-lg font-bold text-gray-700 max-w-md">
          Upload once. Share a link. Access anytime. The neobrutalist way to manage academic notes.
        </p>
        <div className="hero-text mt-8 flex flex-wrap gap-4">
          <a href="/upload" className="px-6 py-3 bg-[#FFB7D5] border-3 border-black font-black text-base shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
            UPLOAD NOTES
          </a>
          <a href="/explore" className="px-6 py-3 bg-white border-3 border-black font-black text-base shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
            EXPLORE
          </a>
        </div>
      </div>

      <div className="hero-image relative max-w-sm md:max-w-md mx-auto w-full">
        <div className="absolute inset-0 bg-[#FFD363] border-3 border-black rounded-2xl translate-x-3 translate-y-3 -z-10"></div>
        <img 
          src="https://illustrations.popsy.co/white/studying.svg" 
          alt="Notes illustration" 
          className="w-full h-auto max-h-[320px] object-contain bg-white border-3 border-black rounded-2xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" 
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
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 0.5,
        stagger: 0.12,
        ease: "back.out(1.5)"
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
    <section id="features" ref={containerRef} className="px-6 md:px-12 py-16 md:py-20 bg-white border-y-4 border-black">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-3xl md:text-4xl font-black text-center mb-12 uppercase underline decoration-6 decoration-[#FFD363]">
          Why GyaanDaan?
        </h3>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02, rotate: i % 2 === 0 ? 1 : -1 }}
              className="feature-card p-6 border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between"
              style={{ backgroundColor: f.color }}
            >
              <div>
                <f.icon className="w-8 h-8 mb-4 text-black" strokeWidth={2.5} />
                <h4 className="font-black text-lg mb-2 uppercase">{f.title}</h4>
                <p className="font-bold text-sm text-gray-800">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
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
          start: "top 75%",
        },
        scale: 0.9,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(1.5)"
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const reviews = [
    {
      name: "Neha D.",
      role: "Medical Student",
      text: "GyaanDaan helped me stay organized during exams. One link and my whole study group was set!",
      color: "#B2F39D",
      rotate: "-1.5deg"
    },
    {
      name: "Jay K.",
      role: "Engineering Lead",
      text: "From scattered PDFs to a clean dashboard in minutes. The sharing process is smooth and stress-free.",
      color: "#FFB7D5",
      rotate: "1.5deg"
    },
    {
      name: "Fatima S.",
      role: "Business Major",
      text: "I finally have a central hub for all my semester notes. Simple, effective, and hassle-free.",
      color: "#FFFFFF",
      rotate: "-1deg"
    }
  ];

  return (
    <section ref={sectionRef} className="px-6 md:px-12 py-16 md:py-20 bg-[#FDFDFD] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-black text-sm uppercase tracking-widest text-gray-500 mb-1">Student Testimonials</p>
          <h3 className="text-3xl md:text-4xl font-black uppercase">What Students Say</h3>
        </div>

        <div className="flex flex-wrap justify-center gap-8 relative">
          {reviews.map((r, i) => (
            <div 
              key={i} 
              className="testimonial-card w-full sm:w-80 border-3 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative transition-transform hover:z-10"
              style={{ backgroundColor: r.color, transform: `rotate(${r.rotate})` }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-black text-black" />)}
              </div>
              <p className="font-bold text-sm leading-relaxed mb-6">
                "{r.text}"
              </p>
              <div className="flex items-center gap-3 border-t-2 border-black pt-4">
                <div className="w-10 h-10 bg-gray-200 border-2 border-black rounded-full overflow-hidden">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${r.name}`} alt={r.name} />
                </div>
                <div>
                  <p className="font-black text-sm uppercase">{r.name}</p>
                  <p className="font-bold text-xs text-gray-600">{r.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = ["Upload Notes", "Get Shareable Link", "Access Anywhere"];
  
  return (
    <section id="how" className="px-6 md:px-12 py-16 md:py-20 bg-[#FFD363] border-y-4 border-black">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-3xl md:text-4xl font-black text-center mb-12 uppercase">How it works</h3>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {steps.map((step, i) => (
            <div key={i} className="p-8 bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center">
              <div className="text-5xl font-black mb-3 italic">{i + 1}</div>
              <p className="text-lg font-black uppercase">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA = () => (
  <section className="px-6 md:px-12 py-16 md:py-20 text-center bg-white">
    <div className="max-w-4xl mx-auto">
      <h3 className="text-3xl md:text-5xl font-black uppercase leading-tight">
        Start sharing <span className="bg-[#B2F39D] px-3 border-3 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">knowledge</span> today
      </h3>
      <p className="mt-6 text-lg font-bold text-gray-700">No more lost files. No more endless chats.</p>
      <a href="/register" className="inline-block mt-8 px-8 py-4 bg-[#FFB7D5] border-3 border-black font-black text-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all">
        CREATE FREE ACCOUNT
      </a>
    </div>
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
      
      <footer className="px-6 py-8 border-t-4 border-black text-center font-black uppercase text-sm bg-white">
        © {new Date().getFullYear()} GyaanDaan. Built for students with grit.
      </footer>
    </div>
  );
}
