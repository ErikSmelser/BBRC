import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, ArrowRight, CheckCircle2, ChevronRight, Wind, Mountain, Sun, Leaf, Flower2, HelpCircle } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility for Tailwind class merging
 */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Configuration ---
const RETREAT_GURU_URL = "https://bigbearretreatcenter.secure.retreat.guru/program/love-and-awareness-the-heart-that-knows/";
const LOGO_URL = "https://bigbearretreatcenter.org/wp-content/uploads/2025/08/logo-_horizontal-black-wstar-scaled.png";
const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbwpFUPXTvCb8BKQ9AE2-beNY8Oul9CM4VqtQ8gzSIo_DM-bsWdJVuvrFjl-e1iYvofB/exec";

const TEACHERS = [
  {
    name: "Celeste Young",
    photo: "/celeste.png",
    bio: "Celeste Young is a Theravada Buddhist mindfulness and Dharma teacher. She has been practicing meditation and sitting Buddhist meditation retreats since 2002. She was one of the first teachers to be empowered at InsightLA. Since 2011, Celeste has worked with thousands of students teaching classes, leading retreats, and mentoring new teachers internationally."
  },
  {
    name: "Vance Pryor",
    photo: "/vance.png",
    bio: "Vance Pryor, PsyD, began practicing insight meditation in 1998. He has been deeply influenced by the teachings of Mahasi Sayadaw and Sayadaw U Tejaniya. He is a graduate of IMS’s 2017-2021 Teacher Training Program."
  }
];

interface TeacherProps {
  name: string;
  photo: string;
  bio: string;
}

const TeacherProfile: React.FC<TeacherProps> = ({ name, photo, bio }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered(!isHovered)}
    >
      <div className="flex items-center gap-2 transition-colors group-hover:text-retreat-ink">
        <Leaf className="w-4 h-4 text-retreat-olive group-hover:scale-110 transition-transform" /> 
        <span className="uppercase border-b border-dashed border-retreat-olive/30 group-hover:border-retreat-olive/60 transition-colors pb-0.5">
          {name}
        </span>
      </div>
      
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-72 md:w-80 bg-white rounded-[2rem] shadow-2xl p-6 z-[100] border border-retreat-olive/10 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-retreat-olive/20 shadow-md bg-retreat-cream">
                <img src={photo} alt={name} className="w-full h-full object-cover" />
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-serif text-retreat-ink leading-tight">{name}</h4>
                <p className="text-[13px] text-retreat-ink/80 leading-relaxed font-light">
                  {bio}
                </p>
              </div>
            </div>
            {/* Tooltip arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface RetreatInfoProps {
  label: string;
  title: string;
  content: React.ReactNode;
}

const RetreatInfoItem: React.FC<RetreatInfoProps> = ({ label, title, content }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered(!isHovered)}
    >
      <div className="flex items-center gap-2 transition-colors group-hover:text-retreat-ink">
        <HelpCircle className="w-4 h-4 text-retreat-olive group-hover:scale-110 transition-transform" /> 
        <span className="uppercase border-b border-dashed border-retreat-olive/30 group-hover:border-retreat-olive/60 transition-colors pb-0.5">
          {label}
        </span>
      </div>
      
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-72 md:w-96 bg-white rounded-[2rem] shadow-2xl p-8 z-[100] border border-retreat-olive/10 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-6">
              <h4 className="text-xl font-serif text-retreat-ink leading-tight border-b border-retreat-olive/10 pb-4">{title}</h4>
              <div className="text-[14px] text-retreat-ink/80 leading-relaxed font-light">
                {content}
              </div>
            </div>
            {/* Tooltip arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    zip: '',
    message: ''
  });
  const [contactFormData, setContactFormData] = useState({
    firstName: '',
    lastName: '',
    zip: '',
    email: '',
    message: ''
  });
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);
  const [showZipInfo, setShowZipInfo] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContactInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactLoading(true);

    try {
      if (GOOGLE_SHEET_URL) {
        const params = new URLSearchParams();
        const timestamp = new Date().toLocaleString('en-US', { 
          year: 'numeric', 
          month: 'numeric', 
          day: 'numeric', 
          hour: 'numeric', 
          minute: 'numeric', 
          second: 'numeric', 
          hour12: false 
        });

        params.append('timestamp', timestamp);
        params.append('firstName', contactFormData.firstName);
        params.append('lastName', contactFormData.lastName);
        params.append('zip', contactFormData.zip);
        params.append('email', contactFormData.email);
        params.append('message', contactFormData.message);
        params.append('formSource', 'Contact Form Inquiry');

        await fetch(GOOGLE_SHEET_URL, {
          method: 'POST',
          mode: 'no-cors',
          body: params
        });
      }
      setContactSuccess(true);
      setContactFormData({ firstName: '', lastName: '', zip: '', email: '', message: '' });
    } catch (error) {
      console.error("Error saving contact inquiry:", error);
    } finally {
      setContactLoading(false);
    }
  };

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (GOOGLE_SHEET_URL) {
        // Using URLSearchParams for better compatibility with Google Apps Script no-cors
        const params = new URLSearchParams();
        const timestamp = new Date().toLocaleString('en-US', { 
          year: 'numeric', 
          month: 'numeric', 
          day: 'numeric', 
          hour: 'numeric', 
          minute: 'numeric', 
          second: 'numeric', 
          hour12: false 
        });

        params.append('timestamp', timestamp);
        params.append('firstName', formData.firstName);
        params.append('lastName', formData.lastName);
        params.append('email', formData.email);
        params.append('zip', formData.zip);
        params.append('message', formData.message);
        params.append('formSource', 'Meta Ads Landing Page');

        await fetch(GOOGLE_SHEET_URL, {
          method: 'POST',
          mode: 'no-cors',
          body: params
        });
      }
      setStep(2);
    } catch (error) {
      console.error("Error saving lead:", error);
      setStep(2);
    } finally {
      setLoading(false);
    }
  };

  const handleContinueToRegister = () => {
    // Construct the URL with query parameters for Retreat Guru
    // We use an exhaustive set of parameters to cover various form versions/configurations
    const params = new URLSearchParams();
    params.append('form', '1');
    params.append('lang', 'en');
    
    // 1. Standard Flat Parameters (Most common)
    params.append('first_name', formData.firstName);
    params.append('last_name', formData.lastName);
    params.append('email', formData.email);
    params.append('zip', formData.zip);
    params.append('zip_code', formData.zip);
    params.append('postal_code', formData.zip);
    
    // 2. Alternative Flat Parameters (Secondary)
    params.append('f_name', formData.firstName);
    params.append('l_name', formData.lastName);
    params.append('firstname', formData.firstName);
    params.append('lastname', formData.lastName);
    params.append('first', formData.firstName);
    params.append('last', formData.lastName);
    params.append('email_address', formData.email);
    params.append('zipcode', formData.zip);
    
    // 3. registration[...] Array-style Parameters (Standard Retreat Guru pattern)
    params.append('registration[first_name]', formData.firstName);
    params.append('registration[last_name]', formData.lastName);
    params.append('registration[email]', formData.email);
    params.append('registration[zip]', formData.zip);
    params.append('registration[zip_code]', formData.zip);
    params.append('registration[postal_code]', formData.zip);
    params.append('registration[f_name]', formData.firstName);
    params.append('registration[l_name]', formData.lastName);
    params.append('registration[firstname]', formData.firstName);
    params.append('registration[lastname]', formData.lastName);
    
    // 4. participant[...] variants (Used in some multi-participant forms)
    params.append('participant[first_name]', formData.firstName);
    params.append('participant[last_name]', formData.lastName);
    params.append('participant[email]', formData.email);
    params.append('participant[zip]', formData.zip);

    // 5. User-discovered "reg-form" identifiers
    params.append('reg-form-firstname', formData.firstName);
    params.append('reg-form-lastname', formData.lastName);
    params.append('reg-form-email', formData.email);
    params.append('reg-form-zip', formData.zip);
    params.append('reg-form-zip_code', formData.zip);
    params.append('reg-form-postal_code', formData.zip);

    // 6. Hyphenated variants
    params.append('first-name', formData.firstName);
    params.append('last-name', formData.lastName);

    const finalUrl = `${RETREAT_GURU_URL}?${params.toString()}`;
    window.location.href = finalUrl;
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navigation / Header */}
      <nav className="w-full py-6 px-4 md:px-8 bg-retreat-cream border-b border-retreat-olive/10 relative z-20">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <img 
            src={LOGO_URL} 
            alt="Big Bear Retreat Center" 
            className="h-10 md:h-14 object-contain"
            referrerPolicy="no-referrer"
          />
          <div className="hidden md:flex gap-10 text-sm uppercase tracking-widest font-medium items-center">
            <span className="cursor-default">
              <span className="text-red-900 font-bold mr-2">RETREAT</span>
              <span className="text-retreat-olive">June 8 - 14, 2026.</span>
            </span>
            <span className="cursor-default text-retreat-olive">Big Bear City, CA</span>
          </div>
        </div>
      </nav>

      <main className="flex-grow flex flex-col items-center relative">
        {/* Persistent Background */}
        <div className="fixed inset-0 z-0">
          <img 
            src="/hero-background.jpg" 
            className="w-full h-full object-cover"
            alt="Big Bear Retreat Background"
          />
          <div className="absolute inset-0 bg-retreat-ink/5" />
        </div>

        {/* Hero Section */}
        <section className="relative w-full py-5 px-4 min-h-[70vh] flex items-center z-10">
          <div className="relative z-10 max-w-5xl mx-auto">
            <div className="backdrop-blur-xl bg-white/90 p-8 md:p-16 rounded-[2.5rem] shadow-2xl border border-white/40 text-center space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl md:text-7xl font-serif leading-[1.1] text-retreat-ink mb-4">
                  Love and Awareness:<br />
                  <span className="italic">The Heart that Knows</span>
                </h1>
                <p className="text-xs md:text-sm uppercase tracking-[0.3em] font-bold text-retreat-olive/60">
                  Experienced and new practitioners welcome
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-lg md:text-xl text-retreat-ink tracking-wide max-w-5xl mx-auto font-light leading-relaxed text-left"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
                  <div className="md:col-span-5 lg:col-span-4">
                    <img 
                      src="/meditation.jpg" 
                      alt="Mindfulness practice in the mountains" 
                      className="w-full aspect-[4/5] object-cover rounded-[2rem] shadow-2xl border border-white/20"
                    />
                  </div>
                  <div className="md:col-span-7 lg:col-span-8 space-y-8 py-4">
                    <p className="text-2xl md:text-3xl font-serif italic text-retreat-olive/80">
                      "This retreat was one of the most beautiful, healing experiences of my life"
                    </p>
                    <div className="space-y-6 opacity-90">
                      <p>Join us in the natural beauty of the San Bernardino mountains for this silent insight meditation retreat.</p>
                      <p>
                        Awareness and love are not two separate paths but one living expression of wisdom. When the heart is open, awareness becomes tender; when the mind is clear, love naturally shines through.
                      </p>
                      <p>
                        This retreat invites a relaxed exploration of that meeting point — cultivating mindfulness that is infused with care, and love that is grounded in knowing.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-col items-center gap-4 pt-4"
              >
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-retreat-olive">Your Teachers</span>
                <div className="flex justify-center gap-6 text-xs md:text-sm tracking-[0.2em] font-semibold text-retreat-earth">
                  {TEACHERS.map((teacher, idx) => (
                    <TeacherProfile key={idx} name={teacher.name} photo={teacher.photo} bio={teacher.bio} />
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="flex flex-col items-center gap-4 pt-4"
              >
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-retreat-olive">Your Retreat</span>
                <div className="flex flex-wrap justify-center gap-8 text-xs md:text-sm tracking-[0.2em] font-semibold text-retreat-earth">
                  <RetreatInfoItem 
                    label="What is a Silent Retreat?"
                    title="The Experience of Silence"
                    content={
                      <p>
                        Silent, or Vipassana (Insight), meditation retreats offer a structured schedule of sitting and walking meditation, rest, mindful eating, and contemplative teachings. These elements deepen the embodied experience of mindfulness. Participants receive guided instructions and access to practice discussion meetings with teachers to support their development within the silent environment.
                      </p>
                    }
                  />
                  <RetreatInfoItem 
                    label="What is a Typical Day Like?"
                    title="A Day of Practice"
                    content={
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 font-mono text-[12px]">
                        {[
                          { t: "6:00 am", a: "Wake Up" },
                          { t: "6:30 am", a: "Sitting" },
                          { t: "7:30 am", a: "Breakfast" },
                          { t: "8:45 am", a: "Morning Instructions" },
                          { t: "9:45 am", a: "Walking" },
                          { t: "10:15 am", a: "Sitting" },
                          { t: "12:30 pm", a: "Lunch" },
                          { t: "2:30 pm", a: "Sitting" },
                          { t: "3:00 pm", a: "Walking" },
                          { t: "3:30 pm", a: "Sitting" },
                          { t: "4:15 pm", a: "Walking" },
                          { t: "5:30 pm", a: "Dinner" },
                          { t: "7:00 pm", a: "Sitting" },
                          { t: "7:20 pm", a: "Stretch" },
                          { t: "7:30 pm", a: "Dharma Talk" },
                          { t: "8:15 pm", a: "Walking" }
                        ].map((item, i) => (
                          <React.Fragment key={i}>
                            <span className="text-retreat-olive font-bold text-right">{item.t}</span>
                            <span className="text-retreat-ink">{item.a}</span>
                          </React.Fragment>
                        ))}
                      </div>
                    }
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Lead Capture Section */}
        <section id="register" className="relative z-10 w-full max-w-5xl mx-auto px-4 mt-0 pb-5">
          <div className="backdrop-blur-xl bg-white/90 rounded-[2.5rem] shadow-2xl border border-white/40 p-8 md:p-16 overflow-hidden">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex flex-col md:flex-row gap-12 items-center">
                    <div className="md:w-1/2 space-y-6">
                      <div className="space-y-4">
                        <img 
                          src={LOGO_URL} 
                          alt="BBRC Logo" 
                          className="h-8 md:h-10 object-contain opacity-80"
                          referrerPolicy="no-referrer"
                        />
                        <h2 className="text-3xl md:text-5xl font-serif text-retreat-ink italic">
                          Begin your journey.
                        </h2>
                      </div>
                      <ul className="space-y-4">
                        {[
                          "June 8 - 14, 2026",
                          "Silent Meditation Retreat",
                          "Expert Guidance & Community",
                          "Freshly Prepared Meals"
                        ].map((text, i) => (
                          <li key={i} className={cn(
                            "flex items-center gap-3 text-sm font-medium uppercase tracking-widest",
                            i === 0 ? "text-red-900 font-bold" : "text-retreat-earth"
                          )}>
                            <CheckCircle2 className="w-5 h-5 text-retreat-olive opacity-50" />
                            {text}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="md:w-1/2 w-full">
                      <form onSubmit={handleStep1Submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5 col-span-2 md:col-span-1">
                          <label className="text-[10px] uppercase tracking-widest font-bold text-retreat-olive ml-1">First Name</label>
                          <input 
                            required
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder="Sierra"
                            className="w-full px-5 py-4 bg-retreat-cream/30 border border-retreat-olive/10 rounded-2xl focus:ring-2 focus:ring-retreat-olive/20 focus:border-retreat-olive outline-none transition-all placeholder:text-retreat-olive/30"
                          />
                        </div>
                        <div className="space-y-1.5 col-span-2 md:col-span-1">
                          <label className="text-[10px] uppercase tracking-widest font-bold text-retreat-olive ml-1">Last Name</label>
                          <input 
                            required
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder="Walker"
                            className="w-full px-5 py-4 bg-retreat-cream/30 border border-retreat-olive/10 rounded-2xl focus:ring-2 focus:ring-retreat-olive/20 focus:border-retreat-olive outline-none transition-all placeholder:text-retreat-olive/30"
                          />
                        </div>
                        <div className="space-y-1.5 col-span-2">
                          <label className="text-[10px] uppercase tracking-widest font-bold text-retreat-olive ml-1">Email Address</label>
                          <input 
                            required
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="hello@meditation.com"
                            className="w-full px-5 py-4 bg-retreat-cream/30 border border-retreat-olive/10 rounded-2xl focus:ring-2 focus:ring-retreat-olive/20 focus:border-retreat-olive outline-none transition-all placeholder:text-retreat-olive/30"
                          />
                        </div>
                        <div className="space-y-1.5 col-span-2">
                          <label className="text-[10px] uppercase tracking-widest font-bold text-retreat-olive ml-1">ZIP Code</label>
                          <input 
                            required
                            name="zip"
                            value={formData.zip}
                            onChange={handleInputChange}
                            placeholder="92315"
                            className="w-full px-5 py-4 bg-retreat-cream/30 border border-retreat-olive/10 rounded-2xl focus:ring-2 focus:ring-retreat-olive/20 focus:border-retreat-olive outline-none transition-all placeholder:text-retreat-olive/30"
                          />
                        </div>
                        <div className="space-y-1.5 col-span-2">
                          <label className="text-[10px] uppercase tracking-widest font-bold text-retreat-olive ml-1">Message (Optional)</label>
                          <textarea 
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="A brief note or question about your practice..."
                            rows={3}
                            className="w-full px-5 py-4 bg-retreat-cream/30 border border-retreat-olive/10 rounded-2xl focus:ring-2 focus:ring-retreat-olive/20 focus:border-retreat-olive outline-none transition-all placeholder:text-retreat-olive/30 resize-none"
                          />
                        </div>
                        <button 
                          disabled={loading}
                          className="col-span-2 mt-4 bg-retreat-olive text-white py-5 px-8 rounded-2xl font-semibold flex items-center justify-center gap-3 hover:bg-retreat-ink transition-all active:scale-[0.98] disabled:opacity-50"
                        >
                          {loading ? "Processing..." : "Continue to Step 2"}
                          <ArrowRight className="w-5 h-5" />
                        </button>
                      </form>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="max-w-2xl mx-auto text-center space-y-10 py-8"
                >
                  <div className="space-y-4">
                    <div className="w-20 h-20 bg-retreat-olive/10 rounded-full flex items-center justify-center mx-auto mb-6 text-retreat-olive">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h2 className="text-4xl md:text-6xl font-serif text-retreat-ink">
                      Thank you, <span className="italic">{formData.firstName}</span>.
                    </h2>
                  </div>

                  <button 
                    onClick={handleContinueToRegister}
                    className="w-full bg-retreat-earth text-white py-6 px-10 rounded-3xl font-serif text-2xl flex items-center justify-center gap-4 hover:bg-retreat-olive shadow-xl shadow-retreat-earth/20 transition-all active:scale-[0.98]"
                  >
                    Complete your registration...
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  <div className="pt-8 border-t border-retreat-olive/10 flex flex-col md:flex-row items-center justify-center gap-8 text-[11px] uppercase tracking-widest font-bold text-retreat-olive opacity-60">
                    <div className="flex items-center gap-2">Secure Registration</div>
                    <div className="flex items-center gap-2">Retreat Guru Partner</div>
                    <div className="flex items-center gap-2">Mountain Resort Housing</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Contact Section */}
        <section className="relative z-10 w-full max-w-5xl mx-auto px-4 py-5">
          <div className="backdrop-blur-xl bg-white/90 rounded-[2.5rem] p-8 md:p-16 border border-white/40 shadow-2xl space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-serif text-retreat-ink">Questions before you register?</h2>
              <div className="space-y-2">
                <p className="text-sm text-retreat-ink/60 max-w-lg mx-auto">
                  Fill out the form below and we'll get back to you, or{' '}
                  <a href="mailto:guestservices@bigbearretreatcenter.org?subject=Questions%20about%20the%20upcoming%20retreat&bcc=erik.smelser@gmail.com" className="text-retreat-olive hover:text-retreat-ink font-semibold underline underline-offset-4 decoration-retreat-olive/30 transition-colors">
                    email
                  </a>{' '}
                  us directly with your questions.
                </p>
                <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-red-800 pt-2">
                  * required field
                </div>
              </div>
            </div>

            {contactSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-retreat-olive/10 p-8 rounded-3xl text-center space-y-4"
              >
                <div className="w-12 h-12 bg-retreat-olive/20 rounded-full flex items-center justify-center mx-auto text-retreat-olive">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif text-retreat-ink">Inquiry Sent</h3>
                <p className="text-sm text-retreat-ink/60">Thank you for reaching out. Our team will get back to you shortly.</p>
                <button 
                  onClick={() => setContactSuccess(false)}
                  className="text-xs uppercase tracking-widest font-bold text-retreat-olive hover:text-retreat-ink underline underline-offset-4"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4 max-w-xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-retreat-olive ml-1">
                      First Name <span className="text-red-800">*</span>
                    </label>
                    <input 
                      required
                      name="firstName"
                      value={contactFormData.firstName}
                      onChange={handleContactInputChange}
                      placeholder="First Name"
                      className="w-full px-5 py-3 bg-white/50 border border-retreat-olive/10 rounded-xl focus:ring-2 focus:ring-retreat-olive/20 outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-retreat-olive ml-1">
                      Last Name <span className="text-red-800">*</span>
                    </label>
                    <input 
                      required
                      name="lastName"
                      value={contactFormData.lastName}
                      onChange={handleContactInputChange}
                      placeholder="Last Name"
                      className="w-full px-5 py-3 bg-white/50 border border-retreat-olive/10 rounded-xl focus:ring-2 focus:ring-retreat-olive/20 outline-none"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 mb-1">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-retreat-olive ml-1">
                        ZIP Code <span className="text-red-800">*</span>
                      </label>
                      <div className="relative">
                        <button 
                          type="button"
                          onMouseEnter={() => setShowZipInfo(true)}
                          onMouseLeave={() => setShowZipInfo(false)}
                          onClick={() => setShowZipInfo(!showZipInfo)}
                          className="text-retreat-olive hover:text-retreat-ink transition-colors"
                        >
                          <HelpCircle className="w-3 h-3" />
                        </button>
                        <AnimatePresence>
                          {showZipInfo && (
                            <motion.div 
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.95 }}
                              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 bg-retreat-ink text-white text-[10px] rounded-lg shadow-xl z-50 pointer-events-none"
                            >
                              We simply like to know where folks who are interested in Big Bear Retreat Center are from.
                              <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-retreat-ink" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    <input 
                      required
                      name="zip"
                      value={contactFormData.zip}
                      onChange={handleContactInputChange}
                      placeholder="ZIP"
                      className="w-full px-5 py-3 bg-white/50 border border-retreat-olive/10 rounded-xl focus:ring-2 focus:ring-retreat-olive/20 outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-retreat-olive ml-1">
                      Email <span className="text-red-800">*</span>
                    </label>
                    <input 
                      required
                      type="email"
                      name="email"
                      value={contactFormData.email}
                      onChange={handleContactInputChange}
                      placeholder="email@example.com"
                      className="w-full px-5 py-3 bg-white/50 border border-retreat-olive/10 rounded-xl focus:ring-2 focus:ring-retreat-olive/20 outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-retreat-olive ml-1">
                    Message <span className="text-red-800">*</span>
                  </label>
                  <textarea 
                    required
                    name="message"
                    rows={4}
                    value={contactFormData.message}
                    onChange={handleContactInputChange}
                    placeholder="How can we help you?"
                    className="w-full px-5 py-3 bg-white/50 border border-retreat-olive/10 rounded-xl focus:ring-2 focus:ring-retreat-olive/20 outline-none resize-none"
                  />
                </div>
                <button 
                  disabled={contactLoading}
                  className="w-full bg-retreat-ink text-white py-4 rounded-xl font-semibold hover:bg-retreat-olive transition-all disabled:opacity-50"
                >
                  {contactLoading ? "Sending..." : "Send Question"}
                </button>
              </form>
            )}
          </div>
        </section>

        {/* Info Grid */}
        <section className="w-full bg-retreat-olive py-5 text-white relative z-10">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="space-y-4">
              <h3 className="text-2xl italic">The Practice</h3>
              <p className="text-white/70 font-light leading-relaxed">
                Silent meditation allows for a deepening of insight and a natural blossoming of compassion. 
                Experience Vipassana meditation in a supportive, held environment.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl italic">The Setting</h3>
              <p className="text-white/70 font-light leading-relaxed">
                Nestled on 100 acres of forested land in the San Bernardino Mountains, 
                our center provides the perfect sanctuary for deep inner work.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl italic">Belonging</h3>
              <p className="text-white/70 font-light leading-relaxed">
                We are committed to creating a space where all feel welcome and included. 
                Our community is built on mutual respect and shared intention.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 bg-transparent text-center relative z-10">
        <div className="max-w-7xl mx-auto px-4 space-y-6">
          <img 
            src={LOGO_URL} 
            alt="Big Bear Retreat Center" 
            className="h-10 mx-auto brightness-0 invert"
            referrerPolicy="no-referrer"
          />
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-white opacity-60">
            Big Bear Retreat Center © 2026 • Big Bear City, California
          </p>
        </div>
      </footer>
    </div>
  );
}
