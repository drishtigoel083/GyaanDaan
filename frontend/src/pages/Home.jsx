import { motion } from "framer-motion";
import { BookOpen, Link2, Upload, Shield } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6">
        <h1 className="text-2xl font-bold">GyaanDaan</h1>
        <div className="space-x-6">
          <a href="#features" className="hover:text-blue-600 transition">Features</a>
          <a href="#how" className="hover:text-blue-600 transition">How it works</a>
          <a href="/login" className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition">Get Started</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="grid md:grid-cols-2 gap-10 px-10 py-24 items-center">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h2 className="text-5xl font-extrabold leading-tight">Never Lose Notes Again.</h2>
          <p className="mt-6 text-lg text-gray-600">
            Upload once. Share a link. Access anytime. A smarter way to manage academic notes.
          </p>
          <div className="mt-8 flex gap-4">
            <a href="/upload" className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:scale-105 transition">Upload Notes</a>
            <a href="/explore" className="px-6 py-3 border rounded-xl hover:bg-gray-200 transition">Explore</a>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
          <img src="/illustration.png" alt="Notes illustration" className="w-full" />
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="px-10 py-20">
        <motion.h3 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-3xl font-bold text-center mb-14">
          Why GyaanDaan?
        </motion.h3>

        <div className="grid md:grid-cols-4 gap-8">
          {[{ icon: Upload, title: "Easy Upload", desc: "Upload notes in seconds." },
            { icon: Link2, title: "Shareable Links", desc: "One link, unlimited access." },
            { icon: BookOpen, title: "Organized", desc: "Find notes by subject & semester." },
            { icon: Shield, title: "Secure", desc: "Your notes, your control." }]
            .map((f, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
              >
                <f.icon className="w-10 h-10 text-blue-600" />
                <h4 className="mt-4 font-semibold text-xl">{f.title}</h4>
                <p className="mt-2 text-gray-600">{f.desc}</p>
              </motion.div>
            ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="px-10 py-20 bg-white">
        <motion.h3 className="text-3xl font-bold text-center mb-12" whileInView={{ opacity: 1 }} initial={{ opacity: 0 }}>
          How it works
        </motion.h3>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {["Upload Notes", "Get a Shareable Link", "Students Access Anytime"].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="p-6 rounded-xl border"
            >
              <div className="text-4xl font-bold text-blue-600">{i + 1}</div>
              <p className="mt-4 font-medium">{step}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-10 py-20 text-center">
        <motion.h3 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-4xl font-bold">
          Start sharing knowledge today
        </motion.h3>
        <p className="mt-4 text-gray-600">No more lost files. No more endless chats.</p>
        <a href="/register" className="inline-block mt-8 px-8 py-4 bg-blue-600 text-white rounded-xl hover:scale-105 transition">
          Create Free Account
        </a>
      </section>

      {/* Footer */}
      <footer className="px-10 py-6 border-t text-center text-gray-500">
        © {new Date().getFullYear()} GyaanDaan. Built for students.
      </footer>
    </div>
  );
}
