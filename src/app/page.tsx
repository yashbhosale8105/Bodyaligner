"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

// ============================================================
// Counter Animation Component
// ============================================================
function Counter({ value, duration = 1500, suffix = "" }: { value: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          let start = 0;
          const end = value;
          if (start === end) return;
          const range = end - start;
          let current = start;
          const increment = end > start ? 1 : -1;
          const stepTime = Math.abs(Math.floor(duration / range));
          const timer = setInterval(() => {
            current += increment;
            setCount(current);
            if (current === end) {
              clearInterval(timer);
            }
          }, Math.max(stepTime, 16));
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration, hasStarted]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ============================================================
// Types & Interfaces
// ============================================================
interface Exercise {
  cat: string;
  tag: string;
  name: string;
  dur: string;
  g: [string, string]; // Gradients
  desc: string;
  steps: string[];
  videoUrl: string;
}

interface TeamMember {
  name: string;
  role: string;
  badge: string;
  creds: string;
  img: string;
}

interface Testimonial {
  q: string;
  n: string;
  c: string;
  i: string; // Initial letter
  stars: number;
}

interface FAQItem {
  q: string;
  a: string;
}

interface ServiceItem {
  id: string;
  title: string;
  desc: string;
  iconClass: string;
  details: string;
  indications: string[];
}

// ============================================================
// Static Data
// ============================================================
const EXERCISES: Exercise[] = [
  {
    cat: "spine",
    tag: "Spine & back",
    name: "Cat-Cow Flow",
    dur: "4 min",
    g: ["#006CA6", "#1D3A8A"],
    desc: "A gentle spinal mobiliser that warms the whole back, easing morning stiffness and restoring segmental movement.",
    steps: [
      "Start on all fours, wrists under shoulders",
      "Inhale, drop the belly and lift the chest",
      "Exhale, round the spine toward the ceiling",
      "Flow slowly for 10 unhurried rounds",
    ],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-doing-yoga-stretching-exercises-in-gym-43028-large.mp4",
  },
  {
    cat: "spine",
    tag: "Spine & back",
    name: "McGill Curl-Up",
    dur: "5 min",
    g: ["#0083CA", "#1D3A8A"],
    desc: "A spine-sparing core hold that builds the deep endurance your lower back relies on through the day.",
    steps: [
      "Lie on your back, one knee bent",
      "Hands under the small of your back",
      "Lift head and shoulders a few centimetres",
      "Hold 8 seconds, breathe, repeat ×6",
    ],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-doing-stretch-exercises-on-a-mat-43034-large.mp4",
  },
  {
    cat: "neck",
    tag: "Neck & shoulder",
    name: "Chin Tuck Reset",
    dur: "3 min",
    g: ["#52B3EC", "#006CA6"],
    desc: "The single best desk-worker exercise — retrains a forward head posture and calms tension headaches.",
    steps: [
      "Sit tall, eyes level on the horizon",
      "Glide the chin straight back, making a 'double chin'",
      "Hold 5 seconds without tilting",
      "Release slowly, repeat ×10",
    ],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-doing-stretching-exercises-on-a-yoga-mat-43036-large.mp4",
  },
  {
    cat: "neck",
    tag: "Neck & shoulder",
    name: "Scapular Wall Slides",
    dur: "4 min",
    g: ["#0083CA", "#006CA6"],
    desc: "Opens tight shoulders and switches on the mid-back muscles that hold you upright.",
    steps: [
      "Stand with back flat against a wall",
      "Arms in a goalpost, elbows touching wall",
      "Slide arms overhead keeping contact",
      "Lower under control ×12",
    ],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-doing-yoga-stretching-exercises-in-gym-43028-large.mp4",
  },
  {
    cat: "hips",
    tag: "Hips & knees",
    name: "Glute Bridge",
    dur: "5 min",
    g: ["#52B3EC", "#1D3A8A"],
    desc: "Wakes up the glutes to offload an aching lower back and protect the knees during daily loading.",
    steps: [
      "Lie on your back, knees bent, feet flat",
      "Drive through heels to lift the hips",
      "Squeeze glutes at the top for 3 seconds",
      "Lower slowly, repeat ×12",
    ],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-doing-stretch-exercises-on-a-mat-43034-large.mp4",
  },
  {
    cat: "hips",
    tag: "Hips & knees",
    name: "90/90 Hip Switch",
    dur: "6 min",
    g: ["#0083CA", "#1D3A8A"],
    desc: "Restores rotational hip mobility — the missing range behind so many stiff backs and cranky knees.",
    steps: [
      "Sit with both knees bent at 90°",
      "Rotate both knees to one side",
      "Keep the chest tall and feet light",
      "Switch side to side ×10",
    ],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-doing-stretching-exercises-on-a-yoga-mat-43036-large.mp4",
  },
  {
    cat: "mobility",
    tag: "Mobility",
    name: "Thoracic Opener",
    dur: "4 min",
    g: ["#006CA6", "#1D3A8A"],
    desc: "A feel-good rotation drill that returns mid-back mobility lost to long hours at a screen.",
    steps: [
      "Side-lying, knees stacked at 90°",
      "Top arm sweeps open like a book",
      "Follow your hand with your eyes",
      "Breathe into the stretch, ×8 each side",
    ],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-doing-yoga-stretching-exercises-in-gym-43028-large.mp4",
  },
  {
    cat: "mobility",
    tag: "Mobility",
    name: "World’s Greatest Stretch",
    dur: "6 min",
    g: ["#0083CA", "#006CA6"],
    desc: "A full-body flow hitting hips, spine and shoulders — the perfect pre-activity primer.",
    steps: [
      "Step into a deep lunge",
      "Drop the back knee, sink the hips",
      "Rotate and reach the lead arm skyward",
      "Return and switch ×6 each side",
    ],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-doing-stretching-exercises-on-a-yoga-mat-43036-large.mp4",
  },
  {
    cat: "core",
    tag: "Core",
    name: "Dead Bug",
    dur: "5 min",
    g: ["#52B3EC", "#1D3A8A"],
    desc: "Teaches your core to stay braced while the limbs move — exactly how the back needs to work in life.",
    steps: [
      "Lie down, arms up, knees over hips",
      "Lower opposite arm and leg slowly",
      "Keep the lower back pinned to the floor",
      "Return and alternate ×10",
    ],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-doing-stretch-exercises-on-a-mat-43034-large.mp4",
  },
];

const TEAM: TeamMember[] = [
  {
    name: "Dr. Kunal Mahalle",
    role: "Founder & Lead Practitioner",
    badge: "Spine & Joint Specialist",
    creds: "Physiotherapist & Chiropractor",
    img: "/assets/owner.png",
  },
  {
    name: "Clinic Support Team",
    role: "Patient Care Coordinators",
    badge: "Boutique Clinic Care",
    creds: "Available for Assistance",
    img: "/assets/clinic_interior.png",
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    q: "Dr Kunal's approach to back pain is incredible. I had been suffering for months, and after just 3 sessions of chiropractic adjustment, I feel 90% better!",
    n: "Aniket Sharma",
    c: "Office Professional",
    i: "A",
    stars: 5,
  },
  {
    q: "Best chiropractor in Pune! He explained everything so clearly and the needle therapy really helped my shoulder injury.",
    n: "Priyanka Patil",
    c: "Yoga Instructor",
    i: "P",
    stars: 5,
  },
  {
    q: "Very clean clinic and professional staff. The movement correction exercises fixed my posture issues from sitting at a desk all day.",
    n: "Rahul Mehta",
    c: "Software Engineer",
    i: "R",
    stars: 5,
  },
];

const FAQS: FAQItem[] = [
  {
    q: "Does chiropractic adjustment hurt?",
    a: "No, most patients feel immediate relief. You might hear a 'pop' sound, which is just gas being released from the joint. It is a painless and safe procedure.",
  },
  {
    q: "How many sessions will I need?",
    a: "This depends on the severity of your condition. After the first assessment, Dr Kunal will provide a personalized recovery plan. Most acute pains improve significantly in 3-5 sessions.",
  },
  {
    q: "What should I wear for my session?",
    a: "Wear comfortable, loose clothing or gym wear that allows you to move easily. Avoid stiff fabrics like denim if possible.",
  },
  {
    q: "Do I need a doctor's referral?",
    a: "No, you can book an appointment directly with us. We conduct a thorough initial assessment to understand your history.",
  },
];

const SERVICES: ServiceItem[] = [
  {
    id: "chiro",
    title: "Chiropractic Alignment",
    desc: "Advanced spine alignment and joint mobilization to restore nerve health.",
    iconClass: "fa-bone",
    details: "Using precise manual adjustments and mobilization techniques to realign the vertebrae, decompression of spinal nerves, and restore natural biomechanical balance.",
    indications: ["Herniated Discs", "Stiff Neck", "Low Back Pain", "Sciatica Nerve Compression"],
  },
  {
    id: "cupping",
    title: "Cupping Therapy",
    desc: "Dry and wet cupping (Hijama) to enhance blood flow and detoxification.",
    iconClass: "fa-tint",
    details: "Utilises suction cups on key trigger points to release deep muscular tension, increase blood circulation, promote cellular repair, and detoxify tissues.",
    indications: ["Muscle Tension", "Chronic Pain", "Poor Circulation", "Detoxification Needs"],
  },
  {
    id: "needling",
    title: "Dry Needling",
    desc: "Targeted muscle release for chronic tension and deep trigger points.",
    iconClass: "fa-syringe",
    details: "A modern treatment that uses thin monofilament needles to penetrate muscle trigger points, releasing tight knots, improving muscle length, and easing local pain.",
    indications: ["Myofascial Trigger Points", "Chronic Tightness", "Tendinitis", "Headaches"],
  },
  {
    id: "sports",
    title: "Sports Rehab",
    desc: "Functional movement correction and rehabilitation for athletes.",
    iconClass: "fa-running",
    details: "Personalised, sports-specific assessment and rehabilitation. Restores strength, agility, and joint range of motion to get you back to peak performance safely.",
    indications: ["Ligament Sprains", "Muscle Strains", "Rotator Cuff Injury", "Post-Injury Training"],
  },
  {
    id: "body-align",
    title: "Body Alignment",
    desc: "Total body postural Assessment and corrective alignment for optimal function.",
    iconClass: "fa-child",
    details: "A comprehensive assessment of body symmetry, foot posture, pelvic tilt, and shoulder level, followed by target alignments to fix posture discrepancies.",
    indications: ["Uneven Shoulders", "Pelvic Tilt", "Forward Head Posture", "Flat Feet Compensations"],
  },
  {
    id: "sciatica",
    title: "Sciatica Treatment",
    desc: "Specialized nerve decompression and therapy for radiating leg pain.",
    iconClass: "fa-user-injured",
    details: "Focuses on relieving compression along the sciatic nerve pathway through custom lumbar adjustments, nerve gliding, and targeted muscular releases.",
    indications: ["Radiating Leg Pain", "Numbness in Feet", "Piriformis Syndrome", "Lower Back Pinched Nerve"],
  },
  {
    id: "pain-mgmt",
    title: "Pain Management",
    desc: "Comprehensive strategies to reduce chronic and acute pain effectively.",
    iconClass: "fa-hand-holding-heart",
    details: "Combines modalities like dry needling, cupping, thermal therapy, and gentle mobilizations to lower pain signals and rebuild active tolerance.",
    indications: ["Chronic Arthritis", "Fibromyalgia", "Acute Spasms", "Persistent Inflammation"],
  },
  {
    id: "massage",
    title: "Massage Therapy",
    desc: "Deep tissue and medical massage for muscle recovery and relaxation.",
    iconClass: "fa-spa",
    details: "Physiotherapist-guided medical massage designed to target tense muscular fascia, restore lymph flow, and accelerate workout recovery.",
    indications: ["Muscle Fatigue", "Fascial Restriction", "Stress & Tightness", "Post-Workout Recovery"],
  },
  {
    id: "geriatric",
    title: "Geriatric Rehab",
    desc: "Improving mobility, balance, and quality of life for senior citizens.",
    iconClass: "fa-wheelchair",
    details: "Gentle exercises, balance training, and fall prevention protocols customized for elderly patients to support active, independent living.",
    indications: ["Balance Impairment", "Joint Stiffness", "Osteoarthritis", "Reduced Endurance"],
  },
  {
    id: "manual",
    title: "Manual Therapy",
    desc: "Hands-on techniques to mobilize joints and soft tissues.",
    iconClass: "fa-hand-sparkles",
    details: "High-grade therapeutic touch comprising joint manipulation, passive stretching, and soft tissue mobilization to alleviate dysfunction and stiffness.",
    indications: ["Frozen Shoulder", "Joint Restrictions", "Post-Cast Stiffness", "Scar Tissue Adhesions"],
  },
  {
    id: "exercise",
    title: "Exercise Therapy",
    desc: "Customized therapeutic exercises to strengthen and stabilize your body.",
    iconClass: "fa-dumbbell",
    details: "Scientifically designed core stability, strength, and endurance routines to build permanent protection around healing joints.",
    indications: ["Core Weakness", "Post-Surgical Weakness", "General Deconditioning", "Postural Fatigue"],
  },
  {
    id: "dns",
    title: "DNS",
    desc: "Dynamic Neuromuscular Stabilization for core stability and control.",
    iconClass: "fa-dna",
    details: "Uses developmental kinesiology patterns to retrain default coordination, activation of the deep stabilizing system, and optimize locomotion.",
    indications: ["Movement Coordination Issues", "Deep Core Insufficiency", "Chronic Spine Instability"],
  },
  {
    id: "post-op",
    title: "Post Operative Rehab",
    desc: "Guiding your recovery after surgery to regain full strength and motion.",
    iconClass: "fa-user-nurse",
    details: "Structured step-by-step protocols following orthopedic surgeries to safely manage swelling, rebuild muscle mass, and restore full range of motion.",
    indications: ["Post-ACL Surgery", "Knee/Hip Replacement", "Spine Decompression Rehab", "Fracture Recovery"],
  },
];

const PRICING_PLANS = [
  {
    title: "Consultation & Screening",
    desc: "The deep-dive first visit for every new patient.",
    price: "₹1,000",
    unit: "/45 min",
    features: [
      "Full posture & movement screen",
      "Root-cause diagnosis",
      "Treatment roadmap plan",
    ],
    cta: "Book assessment",
    featured: false,
  },
  {
    title: "Standard Treatment Session",
    desc: "Personalised, hands-on spinal alignment and therapy.",
    price: "₹1,500",
    unit: "/visit",
    features: [
      "Joint mobilization & alignment",
      "Dry needling/cupping (if required)",
      "Corrective home exercise video",
    ],
    cta: "Start treatment",
    featured: true,
  },
  {
    title: "Complete Recovery Pack",
    desc: "Six comprehensive sessions for lasting spinal stability.",
    price: "₹7,500",
    unit: "/6 visits",
    features: [
      "Everything in standard, ×6",
      "Save ₹1,500 vs single visits",
      "Priority same-week booking",
      "Ergonomics & form review",
    ],
    cta: "Choose recovery pack",
    featured: false,
  },
];

export default function Home() {
  const [wizardDirection, setWizardDirection] = useState<"next" | "prev">("next");
  const [showCookies, setShowCookies] = useState(true);

  // Spotlight Hover Position Tracker
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };
  // Navigation & UI States
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Exercise Library States
  const [exerciseFilter, setExerciseFilter] = useState("all");
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  // Selected Service Detail Modal State
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // Testimonial Slider States
  const [testiIndex, setTestiIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);

  // Services Horizontal Slider State (Old) - Kept for reference but unused in new UI
  const [servicesSlideIndex, setServicesSlideIndex] = useState(0);
  const servicesTrackRef = useRef<HTMLDivElement | null>(null);
  const tourRef = useRef<HTMLDivElement | null>(null);
  const tourRaf = useRef<number | null>(null);
  const tourTicking = useRef(false);
  const [tourIndex, setTourIndex] = useState(0);
  const tourIndexRef = useRef(0);
  const lastScrollTime = useRef(0);
  const scrollCooldown = 800; // ms

  useEffect(() => {
    tourIndexRef.current = tourIndex;
  }, [tourIndex]);

  // Services Accordion State (New)
  const [expandedCategory, setExpandedCategory] = useState("Spine & Alignment");

  // Booking Wizard States
  const [bookingStep, setBookingStep] = useState(0);
  const [bookingData, setBookingData] = useState({
    service: "",
    day: "",
    time: "",
    name: "",
    phone: "",
    email: "",
    notes: "",
  });
  const [isBookingDone, setIsBookingDone] = useState(false);

  // Dynamically generate booking calendar (next 5 working days)
  const [availableDays, setAvailableDays] = useState<{ label: string; date: number; dayName: string }[]>([]);
  const availableTimes = ["10:00", "11:30", "13:00", "15:00", "16:30", "18:00", "19:30"];

  // ============================================================
  // Scroll and Intersection Observer for Reveal Animations
  // ============================================================
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Intersection observer for reveal styling
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            const children = e.target.querySelectorAll(":scope > *");
            children.forEach((c, ci) => {
              (c as HTMLElement).style.transitionDelay = `${ci * 70}ms`;
            });
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
    );

    const observeElements = () => {
      const els = document.querySelectorAll(".reveal, .reveal-l, .reveal-r, .reveal-scale, [data-stagger]");
      els.forEach((el) => {
        if (!el.classList.contains("in")) {
          io.observe(el);
        }
      });
    };

    observeElements();
    // Observe again whenever filters/rendering changes
    const timer = setTimeout(observeElements, 200);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      io.disconnect();
      clearTimeout(timer);
    };
  }, [exerciseFilter]);

  useEffect(() => {
    const container = tourRef.current;
    if (!container) return;

    const section = container.closest(".clinic-tour") as HTMLElement | null;
    const tourPane = container.closest(".tour-inner") as HTMLElement | null;
    if (!section || !tourPane) return;

    const slides = Array.from(container.querySelectorAll<HTMLDivElement>(".bento-item"));
    const slideCount = slides.length;
    container.style.setProperty("--bento-gap", "1.5rem");

    // Compute offset for a given index
    const getOffsetForIndex = (idx: number) => {
      if (!slides.length) return 0;
      const viewportWidth = window.innerWidth;
      const gap = parseFloat(getComputedStyle(container).getPropertyValue("--bento-gap")) || 24;
      const itemWidth = slides[0].getBoundingClientRect().width;
      const gridContentWidth = slideCount * itemWidth + (slideCount - 1) * gap;
      const wrapEl = document.querySelector(".wrap");
      const gutter = wrapEl ? parseFloat(getComputedStyle(wrapEl).paddingLeft) : 24;
      const maxTranslateX = gridContentWidth + 2 * gutter - viewportWidth;
      if (maxTranslateX <= 0) return 0;
      const progress = idx / (slideCount - 1);
      return -(progress * maxTranslateX);
    };

    // Snap to a specific index
    const snapToIndex = (idx: number) => {
      const clamped = Math.max(0, Math.min(slideCount - 1, idx));
      setTourIndex(clamped);
      tourIndexRef.current = clamped;
      const offset = getOffsetForIndex(clamped);
      container.style.setProperty("--tour-offset", `${offset}px`);
    };

    // Initialize
    snapToIndex(0);

    let isLocked = false;
    let isTransitioning = false;

    const lock = () => {
      if (isLocked) return;
      isLocked = true;
      document.body.style.overflow = "hidden";
    };

    const unlock = () => {
      if (!isLocked) return;
      isLocked = false;
      document.body.style.overflow = "";
    };

    // IntersectionObserver to lock scroll when section is fully in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.8) {
            lock();
          } else {
            unlock();
          }
        });
      },
      { threshold: 0.8 }
    );
    observer.observe(section);

    const COOLDOWN = 500; // ms between transitions

    const handleWheel = (e: WheelEvent) => {
      if (!isLocked) return;
      e.preventDefault();
      if (isTransitioning) return;

      const currentIdx = tourIndexRef.current;
      const goingDown = e.deltaY > 0;

      if (goingDown && currentIdx >= slideCount - 1) {
        // At last image — unlock and let page scroll down naturally
        unlock();
        return;
      }
      if (!goingDown && currentIdx <= 0) {
        // At first image — unlock and let page scroll up naturally
        unlock();
        return;
      }

      isTransitioning = true;
      const nextIdx = goingDown ? currentIdx + 1 : currentIdx - 1;
      snapToIndex(nextIdx);
      setTimeout(() => {
        isTransitioning = false;
        // Re-lock if the section is still in view
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight + 50) {
          lock();
        }
      }, COOLDOWN);
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isLocked) return;
      e.preventDefault();
      if (isTransitioning) return;

      const diffY = touchStartY - e.touches[0].clientY;
      if (Math.abs(diffY) < 50) return;

      const currentIdx = tourIndexRef.current;
      const goingDown = diffY > 0;

      if (goingDown && currentIdx >= slideCount - 1) {
        unlock();
        return;
      }
      if (!goingDown && currentIdx <= 0) {
        unlock();
        return;
      }

      isTransitioning = true;
      touchStartY = e.touches[0].clientY; // reset for next swipe
      const nextIdx = goingDown ? currentIdx + 1 : currentIdx - 1;
      snapToIndex(nextIdx);
      setTimeout(() => {
        isTransitioning = false;
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight + 50) {
          lock();
        }
      }, COOLDOWN);
    };

    const handleResize = () => {
      snapToIndex(tourIndexRef.current);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("resize", handleResize);

    return () => {
      observer.disconnect();
      unlock();
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", handleResize);
      if (tourRaf.current) window.cancelAnimationFrame(tourRaf.current);
    };
  }, []);

  const handleTourPrev = () => {
    const newIdx = Math.max(tourIndexRef.current - 1, 0);
    const container = tourRef.current;
    if (!container) return;
    const slides = container.querySelectorAll<HTMLDivElement>(".bento-item");
    const slideCount = slides.length;
    const viewportWidth = window.innerWidth;
    const gap = parseFloat(getComputedStyle(container).getPropertyValue("--bento-gap")) || 24;
    const itemWidth = slides[0]?.getBoundingClientRect().width || 0;
    const gridContentWidth = slideCount * itemWidth + (slideCount - 1) * gap;
    const wrapEl = document.querySelector(".wrap");
    const gutter = wrapEl ? parseFloat(getComputedStyle(wrapEl).paddingLeft) : 24;
    const maxTranslateX = gridContentWidth + 2 * gutter - viewportWidth;
    const progress = newIdx / (slideCount - 1);
    const offset = maxTranslateX > 0 ? -(progress * maxTranslateX) : 0;
    setTourIndex(newIdx);
    tourIndexRef.current = newIdx;
    container.style.setProperty("--tour-offset", `${offset}px`);
  };

  const handleTourNext = () => {
    const container = tourRef.current;
    if (!container) return;
    const slides = container.querySelectorAll<HTMLDivElement>(".bento-item");
    const slideCount = slides.length;
    const newIdx = Math.min(tourIndexRef.current + 1, slideCount - 1);
    const viewportWidth = window.innerWidth;
    const gap = parseFloat(getComputedStyle(container).getPropertyValue("--bento-gap")) || 24;
    const itemWidth = slides[0]?.getBoundingClientRect().width || 0;
    const gridContentWidth = slideCount * itemWidth + (slideCount - 1) * gap;
    const wrapEl = document.querySelector(".wrap");
    const gutter = wrapEl ? parseFloat(getComputedStyle(wrapEl).paddingLeft) : 24;
    const maxTranslateX = gridContentWidth + 2 * gutter - viewportWidth;
    const progress = newIdx / (slideCount - 1);
    const offset = maxTranslateX > 0 ? -(progress * maxTranslateX) : 0;
    setTourIndex(newIdx);
    tourIndexRef.current = newIdx;
    container.style.setProperty("--tour-offset", `${offset}px`);
  };

  // Generate Booking Calendar Days
  useEffect(() => {
    const days = [];
    const dNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const base = new Date();
    let count = 0;
    while (count < 6) {
      base.setDate(base.getDate() + 1);
      const wd = base.getDay();
      if (wd !== 0) { // Exclude Sunday (0)
        days.push({
          label: `${dNames[(wd + 5) % 6]} ${base.getDate()}`,
          date: base.getDate(),
          dayName: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][wd],
        });
        count++;
      }
    }
    setAvailableDays(days);
  }, []);

  // Services Slider Handlers
  const handleServicesNext = () => {
    if (servicesTrackRef.current) {
      const cards = servicesTrackRef.current.children;
      if (cards.length > 0) {
        const cardWidth = (cards[0] as HTMLElement).getBoundingClientRect().width + 22; // width + gap
        const maxIndex = Math.max(0, SERVICES.length - getServicesPerView());
        setServicesSlideIndex((prev) => Math.min(prev + 1, maxIndex));
      }
    }
  };

  const handleServicesPrev = () => {
    setServicesSlideIndex((prev) => Math.max(prev - 1, 0));
  };

  const getServicesPerView = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth <= 620) return 1;
      if (window.innerWidth <= 980) return 2;
    }
    return 3;
  };

  useEffect(() => {
    if (servicesTrackRef.current && servicesTrackRef.current.children.length > 0) {
      const card = servicesTrackRef.current.children[0] as HTMLElement;
      if (card) {
        const step = card.getBoundingClientRect().width + 22;
        servicesTrackRef.current.style.transform = `translateX(${-servicesSlideIndex * step}px)`;
      }
    }
  }, [servicesSlideIndex]);

  // Responsive items for Testimonials Slider
  const getTestimonialsPerView = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth <= 600) return 1;
      if (window.innerWidth <= 900) return 2;
    }
    return 3;
  };

  const handleTestiNext = () => {
    const pv = getTestimonialsPerView();
    const max = Math.max(0, TESTIMONIALS.length - pv);
    setTestiIndex((prev) => Math.min(prev + 1, max));
  };

  const handleTestiPrev = () => {
    setTestiIndex((prev) => Math.max(prev - 1, 0));
  };

  useEffect(() => {
    if (trackRef.current && trackRef.current.children.length > 0) {
      const card = trackRef.current.children[0] as HTMLElement;
      if (card) {
        const step = card.getBoundingClientRect().width + 24;
        trackRef.current.style.transform = `translateX(${-testiIndex * step}px)`;
      }
    }
  }, [testiIndex]);

  // Booking validation checker
  const isBookingStepValid = () => {
    if (bookingStep === 0) return !!bookingData.service;
    if (bookingStep === 1) return !!bookingData.day && !!bookingData.time;
    if (bookingStep === 2) return !!bookingData.name.trim() && !!bookingData.phone.trim();
    return true;
  };

  const handleBookingNext = () => {
    setWizardDirection("next");
    if (bookingStep < 3) {
      setBookingStep((prev) => prev + 1);
    } else {
      setIsBookingDone(true);
      // Construct WhatsApp message with details
      const text = `Hello Dr. Kunal, I'd like to book an appointment.\n\n*Service:* ${bookingData.service}\n*Preferred Date:* ${bookingData.day}\n*Preferred Time:* ${bookingData.time}\n*Name:* ${bookingData.name}\n*Phone:* ${bookingData.phone}\n*Email:* ${bookingData.email || 'N/A'}\n*Notes:* ${bookingData.notes || 'None'}`;
      const url = `https://wa.me/917218818815?text=${encodeURIComponent(text)}`;
      setTimeout(() => {
        window.open(url, "_blank");
      }, 1500);
    }
  };

  const handleBookingBack = () => {
    setWizardDirection("prev");
    if (bookingStep > 0) {
      setBookingStep((prev) => prev - 1);
    }
  };

  return (
    <>
      <svg width="0" height="0" style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
        <filter id="sharpen-filter">
          <feConvolveMatrix order="3" preserveAlpha="true" kernelMatrix="0 -0.5 0  -0.5 3 -0.5  0 -0.5 0"/>
        </filter>
      </svg>
      {/* ============ NAV ============ */}
      <nav className={`nav ${scrolled ? "scrolled" : ""} ${!scrolled ? "on-dark" : ""}`} id="nav">
        <a className="brand" href="#top">
          <img 
            src="/assets/4.png" 
            alt="Bodyaligner Logo" 
            style={{ 
              height: scrolled ? "85px" : "105px", 
              width: "auto", 
              transition: "height 0.4s var(--ease-out)" 
            }} 
          />
        </a>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#why-choose">Why Us</a>
          <a href="#booking">Booking</a>
          <a href="#clinic-tour">Clinic Tour</a>
          <a href="#contact">Location</a>
          <a href="#faq">FAQ</a>
        </div>
        <div className="nav-cta">
          <a href="tel:+917218818815" className="btn btn-ghost">
            Call Now
          </a>
          <a href="#booking" className="btn btn-accent">
            Book Appointment
          </a>
          <button
            className="nav-toggle"
            id="navToggle"
            aria-label="Menu"
            onClick={() => setMobileMenuOpen(true)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* ============ MOBILE MENU DRAWER ============ */}
      <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`} id="mobileMenu">
        <button
          className="close"
          id="menuClose"
          aria-label="Close"
          onClick={() => setMobileMenuOpen(false)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        <a href="#about" onClick={() => setMobileMenuOpen(false)}>
          About
        </a>
        <a href="#services" onClick={() => setMobileMenuOpen(false)}>
          Services
        </a>
        <a href="#why-choose" onClick={() => setMobileMenuOpen(false)}>
          Why Us
        </a>
        <a href="#booking" onClick={() => setMobileMenuOpen(false)}>
          Booking
        </a>
        <a href="#clinic-tour" onClick={() => setMobileMenuOpen(false)}>
          Clinic Tour
        </a>
        <a href="#contact" onClick={() => setMobileMenuOpen(false)}>
          Location
        </a>
        <a href="#faq" onClick={() => setMobileMenuOpen(false)}>
          FAQ
        </a>
        <a href="tel:+917218818815" style={{ color: "var(--mint)", fontWeight: 700 }} onClick={() => setMobileMenuOpen(false)}>
          Call: +91 72188 18815
        </a>
      </div>

      {/* ============ HERO ============ */}
      <header className="hero" id="top" data-screen-label="Hero">
        <div className="hero-bg"></div>
        <div className="hero-blob"></div>
        <div className="hero-grain"></div>
        <div className="hero-vignette"></div>

        <div className="hero-inner">
          <div className="hero-top-row">
            <div className="hero-text-content">
              <h1 className="hero-massive-title centered">
                <span className="title-row single-line" style={{ animationDelay: "0.1s" }}>
                  <span className="title-base">RELIEF&nbsp;&nbsp;FROM</span>
                  <img
                    src="/images/pain-removebg-preview.png"
                    alt="Pain"
                    className="hero-keyword-image"
                  />
                </span>

                <span className="title-row single-line" style={{ animationDelay: "0.3s" }}>
                  <span className="title-base">RESTORE</span>
                  <img
                    src="/images/Video_background_for_physiothera__202606071803-removebg-preview.png"
                    alt="Movement"
                    className="hero-keyword-image movement-keyword"
                  />
                </span>
              </h1>
              <p className="lead hero-lead-anim">
                Advanced physiotherapy and chiropractic care for back pain, neck pain, joint pain, posture issues, and sports injuries. Get perfectly aligned by Dr. Kunal Mahalle.
              </p>
              <div className="hero-actions hero-actions-anim">
                <a href="tel:+917218818815" className="btn btn-primary btn-large">
                  <i className="fas fa-phone" style={{ marginRight: "8px" }}></i> Call Now
                </a>
                <a href="#booking" className="btn btn-accent btn-large">
                  Book Appointment
                  <i className="fas fa-arrow-right" style={{ marginLeft: "8px" }}></i>
                </a>
              </div>
            </div>

            {/* Hero Image removed as requested */}
          </div>
        </div>

        {/* ============ TRUST MARQUEE (pinned bottom of hero) ============ */}
        <div className="trust">
          <div className="track" id="trustTrack">
            <span>Spine Alignment Specialists</span>
            <span>·</span>
            <span>Advanced Chiropractic Adjustments</span>
            <span>·</span>
            <span>Dry Needling &amp; Cupping Therapy</span>
            <span>·</span>
            <span>Posture Correction</span>
            <span>·</span>
            <span>Sports Rehab Pune</span>
            <span>·</span>
            <span>Navel Displacement Care</span>
            <span>·</span>
            <span>Spine Alignment Specialists</span>
            <span>·</span>
            <span>Advanced Chiropractic Adjustments</span>
            <span>·</span>
            <span>Dry Needling &amp; Cupping Therapy</span>
            <span>·</span>
            <span>Posture Correction</span>
            <span>·</span>
            <span>Sports Rehab Pune</span>
            <span>·</span>
            <span>Navel Displacement Care</span>
          </div>
        </div>
      </header>



      {/* ============ ABOUT THE SPECIALIST ============ */}
      <section className="section" id="about">
        <div className="wrap split">
          <div className="split-media reveal-l" style={{ aspectRatio: "1006 / 602", height: "auto", borderRadius: "20px" }}>
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              <Image
                src="/assets/owner.png"
                alt="Dr Kunal Mahalle"
                fill
                sizes="(max-width: 860px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
          <div className="reveal-r">
            <div className="eyebrow">About the Specialist</div>
            <h2 style={{ fontSize: "clamp(2rem,4vw,3.2rem)", marginTop: "14px", maxWidth: "18ch", color: "var(--mint)", fontWeight: 800 }}>
              Meet Dr Kunal Mahalle
            </h2>
            <p className="lead" style={{ marginTop: "18px" }}>
              Dr Kunal Mahalle is a highly skilled physiotherapist and chiropractic practitioner focused on long-term pain relief through personalized treatment and movement correction.
            </p>
            <p style={{ color: "var(--ink-soft)", marginTop: "12px" }}>
              His approach combines manual therapy, advanced chiropractic techniques, and functional movements to not just treat the symptom, but solve the root cause of your pain.
            </p>
            <div className="approach-list" style={{ marginTop: "24px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <i className="fas fa-check" style={{ color: "var(--mint-deep)" }}></i>
                  <span style={{ fontSize: "0.95rem", fontWeight: "600" }}>Spine Alignment</span>
                </div>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <i className="fas fa-check" style={{ color: "var(--mint-deep)" }}></i>
                  <span style={{ fontSize: "0.95rem", fontWeight: "600" }}>Advanced Chiropractic</span>
                </div>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <i className="fas fa-check" style={{ color: "var(--mint-deep)" }}></i>
                  <span style={{ fontSize: "0.95rem", fontWeight: "600" }}>Dry Needling &amp; Cupping</span>
                </div>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <i className="fas fa-check" style={{ color: "var(--mint-deep)" }}></i>
                  <span style={{ fontSize: "0.95rem", fontWeight: "600" }}>Posture Correction</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SERVICES (Accordion) ============ */}
      <section className="services-section section" id="services" data-screen-label="Services">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="eyebrow reveal">Our Services</div>
              <h2 className="reveal" style={{ color: "var(--mint)", fontWeight: 800 }}>Specialized Treatments</h2>
            </div>
            <p className="lead reveal" style={{ maxWidth: "48ch" }}>
              We provide evidence-based care tailored to your specific pain and lifestyle needs. Click a category to expand, and a card to explore details.
            </p>
          </div>

          <div className="accordion-wrapper reveal">
            {[
              {
                title: "Spine & Alignment",
                icon: "fa-bone",
                serviceIds: ["chiro", "body-align", "manual", "dns"]
              },
              {
                title: "Pain Relief",
                icon: "fa-bolt",
                serviceIds: ["pain-mgmt", "sciatica", "needling", "cupping"]
              },
              {
                title: "Movement & Rehabilitation",
                icon: "fa-person-running",
                serviceIds: ["exercise", "sports", "post-op", "geriatric"]
              },
              {
                title: "Recovery & Wellness",
                icon: "fa-spa",
                serviceIds: ["massage"]
              }
            ].map((cat) => {
              const isExpanded = expandedCategory === cat.title;
              return (
                <div key={cat.title} className={`category-section ${isExpanded ? "expanded" : ""}`}>
                  <div 
                    className="category-header" 
                    onClick={() => {
                      setExpandedCategory(isExpanded ? "" : cat.title);
                      // Smooth scroll to header if expanding
                      if (!isExpanded) {
                        setTimeout(() => {
                          const el = document.getElementById(`cat-${cat.title.replace(/\s+/g, '-')}`);
                          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                        }, 150);
                      }
                    }}
                    id={`cat-${cat.title.replace(/\s+/g, '-')}`}
                  >
                    <i className={`fas fa-fw ${cat.icon} category-icon`} aria-hidden="true" style={{ width: '30px', textAlign: 'center' }}></i>
                    <span className="category-title" style={{ fontSize: '1.2rem' }}>{cat.title}</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--mint)', marginRight: '10px', opacity: 0.8 }}>
                      {isExpanded ? "Click to close" : "Click to view services"}
                    </span>
                    <i className="fas fa-chevron-down chevron" aria-hidden="true"></i>
                  </div>
                  
                  <div className="services-grid">
                    {cat.serviceIds.map(id => {
                      const svc = SERVICES.find(s => s.id === id);
                      if (!svc) return null;
                      return (
                        <div 
                          key={svc.id} 
                          className="service-card spotlight-card" 
                          onClick={() => setSelectedService(svc)}
                          onMouseMove={handleMouseMove}
                        >
                          <i className={`fas ${svc.iconClass} service-icon`} aria-hidden="true"></i>
                          <div className="service-name">{svc.title}</div>
                          <div className="service-desc">{svc.desc}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ STATS BAR ============ */}
      <section className="section stats-bar" style={{ paddingBlock: "80px 0px" }}>
        <div className="wrap reveal" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "30px", borderBottom: "1px solid var(--line)", paddingBottom: "50px", textAlign: "center" }}>
          <div>
            <div style={{ fontSize: "clamp(2.4rem, 5vw, 3.6rem)", fontWeight: "700", color: "var(--ink)", fontFamily: "var(--serif)", lineHeight: 1 }}>
              <Counter value={1500} suffix="+" />
            </div>
            <div style={{ fontSize: "0.8rem", color: "var(--ink-soft)", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: "10px", fontWeight: "600" }}>Spinal Alignments</div>
          </div>
          <div>
            <div style={{ fontSize: "clamp(2.4rem, 5vw, 3.6rem)", fontWeight: "700", color: "var(--ink)", fontFamily: "var(--serif)", lineHeight: 1 }}>
              <Counter value={98} suffix="%" />
            </div>
            <div style={{ fontSize: "0.8rem", color: "var(--ink-soft)", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: "10px", fontWeight: "600" }}>Recovery Rate</div>
          </div>
          <div>
            <div style={{ fontSize: "clamp(2.4rem, 5vw, 3.6rem)", fontWeight: "700", color: "var(--ink)", fontFamily: "var(--serif)", lineHeight: 1 }}>
              <Counter value={2} suffix="+" />
            </div>
            <div style={{ fontSize: "0.8rem", color: "var(--ink-soft)", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: "10px", fontWeight: "600" }}>Years Experience</div>
          </div>
          <div>
            <div style={{ fontSize: "clamp(2.4rem, 5vw, 3.6rem)", fontWeight: "700", color: "var(--clay)", fontFamily: "var(--serif)", lineHeight: 1 }}>
              <Counter value={5} suffix="★" duration={800} />
            </div>
            <div style={{ fontSize: "0.8rem", color: "var(--ink-soft)", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: "10px", fontWeight: "600" }}>Google Rating (5.0)</div>
          </div>
        </div>
      </section>

      {/* ============ WHY CHOOSE US ============ */}
      <section className="section why-choose" id="why-choose">
        <div className="wrap split">
          <div className="reveal-l">
            <div className="eyebrow">Why Choose Bodyaligner</div>
            <h2 style={{ fontSize: "clamp(2rem,4vw,3.2rem)", marginTop: "14px", color: "var(--mint)", fontWeight: 800 }}>Root Cause Focused Recovery</h2>
            <p className="lead" style={{ marginTop: "18px", marginBottom: "30px" }}>
              We don't just treat the pain; we correct the movement patterns that cause it.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
              <div style={{ display: "flex", gap: "14px" }}>
                <div className="ic" style={{ flex: "0 0 46px", height: "46px", borderRadius: "12px", background: "var(--ink)", display: "grid", placeItems: "center" }}>
                  <i className="fas fa-user-friends" style={{ color: "var(--mint)" }}></i>
                </div>
                <div>
                  <h4 style={{ fontFamily: "var(--sans)", fontWeight: 700, fontSize: "1.05rem" }}>One-on-One Care</h4>
                  <p style={{ fontSize: "0.88rem", color: "var(--ink-soft)", marginTop: "4px" }}>Personalized attention throughout your session.</p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "14px" }}>
                <div className="ic" style={{ flex: "0 0 46px", height: "46px", borderRadius: "12px", background: "var(--ink)", display: "grid", placeItems: "center" }}>
                  <i className="fas fa-search" style={{ color: "var(--mint)" }}></i>
                </div>
                <div>
                  <h4 style={{ fontFamily: "var(--sans)", fontWeight: 700, fontSize: "1.05rem" }}>Root Cause Analysis</h4>
                  <p style={{ fontSize: "0.88rem", color: "var(--ink-soft)", marginTop: "4px" }}>We find why the pain started ergonomically.</p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "14px" }}>
                <div className="ic" style={{ flex: "0 0 46px", height: "46px", borderRadius: "12px", background: "var(--ink)", display: "grid", placeItems: "center" }}>
                  <i className="fas fa-microscope" style={{ color: "var(--mint)" }}></i>
                </div>
                <div>
                  <h4 style={{ fontFamily: "var(--sans)", fontWeight: 700, fontSize: "1.05rem" }}>Modern Equipment</h4>
                  <p style={{ fontSize: "0.88rem", color: "var(--ink-soft)", marginTop: "4px" }}>Using advanced chiropractic alignment tools.</p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "14px" }}>
                <div className="ic" style={{ flex: "0 0 46px", height: "46px", borderRadius: "12px", background: "var(--ink)", display: "grid", placeItems: "center" }}>
                  <i className="fas fa-heart" style={{ color: "var(--mint)" }}></i>
                </div>
                <div>
                  <h4 style={{ fontFamily: "var(--sans)", fontWeight: 700, fontSize: "1.05rem" }}>Safe Environment</h4>
                  <p style={{ fontSize: "0.88rem", color: "var(--ink-soft)", marginTop: "4px" }}>Strict hygiene standards with boutique clinic setup.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="split-media reveal-r" style={{ aspectRatio: "765 / 1024" }}>
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              <Image
                src="/assets/clinic_interior.png"
                alt="Bodyaligner Clinic Interior"
                fill
                sizes="(max-width: 860px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============ EXERCISE LIBRARY ============ */}
      <section className="section exercises" id="exercises" data-screen-label="Exercises">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="eyebrow reveal">Exercise library</div>
              <h2 className="reveal" style={{ color: "var(--mint)", fontWeight: 800 }}>Guided movement, prescribed by physios</h2>
            </div>
            <p className="lead reveal">
              A growing library of follow-along video routines. Filter by area, press play, and move with a clinician guiding every rep.
            </p>
          </div>

          <div className="ex-filters reveal" id="exFilters">
            {["all", "spine", "neck", "hips", "mobility", "core"].map((cat) => (
              <button
                key={cat}
                className={`chip ${exerciseFilter === cat ? "active" : ""}`}
                onClick={() => setExerciseFilter(cat)}
              >
                {cat === "all" ? "All" : cat === "spine" ? "Spine & back" : cat === "neck" ? "Neck & shoulder" : cat === "hips" ? "Hips & knees" : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          <div className="ex-grid" id="exGrid">
            {EXERCISES.filter((e) => exerciseFilter === "all" || e.cat === exerciseFilter).map((ex, i) => (
              <article
                key={i}
                className="ex-card reveal spotlight-card"
                style={{ transitionDelay: `${i * 60}ms` }}
                onClick={() => setSelectedExercise(ex)}
                onMouseMove={handleMouseMove}
              >
                <div
                  className="thumb"
                  style={{ background: `linear-gradient(150deg, ${ex.g[0]}, ${ex.g[1]})` }}
                ></div>
                <div className="ov"></div>
                <span className="play">
                  <svg viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                <div className="meta">
                  <div className="tag">{ex.tag}</div>
                  <h4>{ex.name}</h4>
                  <span className="dur">
                    <svg viewBox="0 0 24 24" strokeWidth="2">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v5l3 2" />
                    </svg>
                    {ex.dur}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BOOKING ============ */}
      <section className="section booking" id="booking" data-screen-label="Booking">
        <div className="wrap book-grid">
          <div className="book-aside reveal-l">
            <div className="eyebrow">Online booking</div>
            <h2 style={{ marginTop: "14px", color: "var(--mint)", fontWeight: 800 }}>Reserve your spot in under a minute</h2>
            <p className="lead">
              Pick a service, choose a time that works, and click confirm to submit via WhatsApp. We will confirm your slot immediately.
            </p>
            <ul className="book-points">
              <li>
                <span className="tick">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                </span>{" "}
                Same-week slots available
              </li>
              <li>
                <span className="tick">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                </span>{" "}
                Expert spine alignment by Dr Kunal
              </li>
              <li>
                <span className="tick">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                </span>{" "}
                Dedicated one-on-one session
              </li>
              <li>
                <span className="tick">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                </span>{" "}
                Clean &amp; calming clinic environment
              </li>
            </ul>
          </div>

          <div className="book-card reveal-r">
            <div className="book-progress">
              {[0, 1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`step ${bookingStep > step || isBookingDone ? "done" : ""} ${bookingStep === step && !isBookingDone ? "active" : ""}`}
                >
                  <i></i>
                </div>
              ))}
            </div>

            {/* Success screen */}
            {isBookingDone ? (
              <div className="book-done" id="bookDone">
                <div className="check">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                </div>
                <h3>Sending WhatsApp details...</h3>
                <p>We've opened WhatsApp to finalize your booking with Dr Kunal Mahalle. Please click send on WhatsApp.</p>
              </div>
            ) : (
              <>
                {/* step 0: service */}
                {bookingStep === 0 && (
                  <div className={`book-step active ${wizardDirection === "prev" ? "going-back" : ""}`}>
                    <h3>What brings you in?</h3>
                    <p className="sub">Choose the service that fits best — you can refine on the call.</p>
                    <div className="opt-grid" data-group="service">
                      {[
                        { title: "Consultation & Assessment", sub: "New patients initial assessment" },
                        { title: "Chiropractic Alignment", sub: "Spinal alignment & joint correction" },
                        { title: "Sports Rehabilitation", sub: "Athletic recovery & training" },
                        { title: "Cupping Therapy (Hijama)", sub: "Blood flow & tissue detox" },
                        { title: "Dry Needling", sub: "Deep myofascial release" },
                        { title: "Sciatica / Radiculopathy", sub: "Pinched nerve relief" },
                      ].map((opt, i) => (
                        <button
                          key={i}
                          className={`opt ${bookingData.service === opt.title ? "sel" : ""}`}
                          onClick={() => setBookingData((prev) => ({ ...prev, service: opt.title }))}
                        >
                          <span className="t">{opt.title}</span>
                          <span className="d">{opt.sub}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* step 1: date/time */}
                {bookingStep === 1 && (
                  <div className={`book-step active ${wizardDirection === "prev" ? "going-back" : ""}`}>
                    <h3>Pick a day &amp; time</h3>
                    <p className="sub">Showing the next available appointments at our clinic.</p>
                    <div className="day-grid" data-group="day">
                      {availableDays.map((day, i) => (
                        <button
                          key={i}
                          className={`day ${bookingData.day === day.label ? "sel" : ""}`}
                          onClick={() => setBookingData((prev) => ({ ...prev, day: day.label }))}
                        >
                          <div className="dn">{day.dayName}</div>
                          <div className="dd">{day.date}</div>
                        </button>
                      ))}
                    </div>
                    <div className="time-grid" data-group="time">
                      {availableTimes.map((time, i) => (
                        <button
                          key={i}
                          className={`time ${bookingData.time === time ? "sel" : ""}`}
                          onClick={() => setBookingData((prev) => ({ ...prev, time: time }))}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* step 2: details */}
                {bookingStep === 2 && (
                  <div className={`book-step active ${wizardDirection === "prev" ? "going-back" : ""}`}>
                    <h3>Your details</h3>
                    <p className="sub">We will confirm your details and contact you via WhatsApp.</p>
                    <div className="field">
                      <label htmlFor="fName">Full name</label>
                      <input
                        type="text"
                        id="fName"
                        placeholder="Aniket Sharma"
                        value={bookingData.name}
                        onChange={(e) => setBookingData((prev) => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="fPhone">Mobile number</label>
                      <input
                        type="tel"
                        id="fPhone"
                        placeholder="+91 99887 76655"
                        value={bookingData.phone}
                        onChange={(e) => setBookingData((prev) => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="fEmail">Email (Optional)</label>
                      <input
                        type="email"
                        id="fEmail"
                        placeholder="aniket@example.com"
                        value={bookingData.email}
                        onChange={(e) => setBookingData((prev) => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="fNote">
                        Brief symptoms <span style={{ fontWeight: 400, opacity: 0.6 }}>(optional)</span>
                      </label>
                      <textarea
                        id="fNote"
                        rows={2}
                        placeholder="E.g., Low back pain radiating to left leg…"
                        value={bookingData.notes}
                        onChange={(e) => setBookingData((prev) => ({ ...prev, notes: e.target.value }))}
                      ></textarea>
                    </div>
                  </div>
                )}

                {/* step 3: confirm */}
                {bookingStep === 3 && (
                  <div className={`book-step active ${wizardDirection === "prev" ? "going-back" : ""}`}>
                    <div id="bookReview">
                      <h3>Confirm your booking</h3>
                      <p className="sub">Quick check before sending via WhatsApp.</p>
                      <div className="book-summary">
                        <div className="row">
                          <span>Service</span>
                          <span>{bookingData.service}</span>
                        </div>
                        <div className="row">
                          <span>When</span>
                          <span>
                            {bookingData.day} · {bookingData.time}
                          </span>
                        </div>
                        <div className="row">
                          <span>Name</span>
                          <span>{bookingData.name}</span>
                        </div>
                        <div className="row">
                          <span>Contact</span>
                          <span>{bookingData.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="book-nav" id="bookNav">
                  <button
                    className={`book-back ${bookingStep > 0 ? "show" : ""}`}
                    id="bookBack"
                    onClick={handleBookingBack}
                  >
                    <svg viewBox="0 0 24 24" width="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M19 12H5M11 6l-6 6 6 6" />
                    </svg>{" "}
                    Back
                  </button>
                  <button
                    className="btn btn-primary"
                    id="bookNext"
                    disabled={!isBookingStepValid()}
                    onClick={handleBookingNext}
                  >
                    {bookingStep === 3 ? (
                      <>
                        Confirm via WhatsApp{" "}
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <path d="M5 12l5 5L20 7" />
                        </svg>
                      </>
                    ) : (
                      <>
                        Continue{" "}
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ============ CLINIC TOUR (Bento Grid) ============ */}
      <section className="section clinic-tour" id="clinic-tour">
        <div className="wrap">
          <div className="text-center" style={{ marginBottom: "50px", textAlign: "center" }}>
            <span className="eyebrow" style={{ justifyContent: "center" }}>Visit Us</span>
            <h2 className="section-title" style={{ marginTop: "12px", fontSize: "2.5rem", color: "var(--mint)", fontWeight: 800 }}>Clinic Tour</h2>
            <p className="lead" style={{ marginInline: "auto", marginTop: "12px" }}>A glimpse into our professional, clean, and healing environment in Pune.</p>
          </div>
        </div>

        <div className="tour-inner">
          <div className="tour-wrap">
            <div className="bento-grid" ref={tourRef}>
              {/* Item 1 */}
              <div className="bento-item reveal spotlight-card" style={{ gridColumn: "span 7", height: "300px" }} onMouseMove={handleMouseMove}>
                <Image src="/assets/full_shoot.jpeg" alt="Treatment Session" fill style={{ objectFit: "cover" }} />
                <div className="bento-overlay">
                  <h4>Treatment in Action</h4>
                  <p>Hands-on care for lasting recovery.</p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="bento-item reveal spotlight-card" style={{ gridColumn: "span 5", height: "300px" }} onMouseMove={handleMouseMove}>
                <Image src="/assets/clinic_frontage.png" alt="Clinic Entrance" fill style={{ objectFit: "cover" }} />
                <div className="bento-overlay">
                  <h4>Clinic Entrance</h4>
                  <p>Welcoming and easy to locate.</p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="bento-item reveal spotlight-card" style={{ gridColumn: "span 5", height: "260px" }} onMouseMove={handleMouseMove}>
                <Image src="/assets/lounge.jpeg" alt="Patient Lounge" fill style={{ objectFit: "cover" }} />
                <div className="bento-overlay">
                  <h4>Patient Lounge</h4>
                  <p>Relaxing waiting area for your comfort.</p>
                </div>
              </div>

              {/* Item 4 */}
              <div className="bento-item reveal spotlight-card" style={{ gridColumn: "span 7", height: "260px" }} onMouseMove={handleMouseMove}>
                <Image src="/assets/treatment_demo.png" alt="Treatment Demo" fill style={{ objectFit: "cover" }} />
                <div className="bento-overlay">
                  <h4>Expert Treatment</h4>
                  <p>Professional care by Dr Kunal Mahalle.</p>
                </div>
              </div>
            </div>

            <div className="tour-controls">
              <button className="tour-arrow prev" type="button" onClick={handleTourPrev} aria-label="Previous slide">
                <span>‹</span>
              </button>
              <button className="tour-arrow next" type="button" onClick={handleTourNext} aria-label="Next slide">
                <span>›</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TEAM SPECIALIST CREDENTIALS ============ */}
      <section className="section" id="team" data-screen-label="Team">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="eyebrow reveal">Clinic Specialist</div>
              <h2 className="reveal" style={{ color: "var(--mint)", fontWeight: 800 }}>Dedicated Spine Practitioner</h2>
            </div>
            <p className="lead reveal">
              See the same senior practitioner throughout your recovery, ensuring a consistent plan and direct accountability.
            </p>
          </div>
          <div className="team-grid" data-stagger="" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", maxWidth: "800px", margin: "0 auto", gap: "30px" }}>
            {TEAM.map((member, i) => (
              <article key={i} className="member">
                <div className="ph" style={{ position: "relative", height: "320px", borderRadius: "var(--r-lg)", overflow: "hidden" }}>
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    sizes="(max-width: 480px) 100vw, 400px"
                    style={{ objectFit: "cover" }}
                  />
                  <span className="badge">{member.badge}</span>
                </div>
                <h4 style={{ fontSize: "1.4rem", marginTop: "16px" }}>{member.name}</h4>
                <div className="role">{member.role}</div>
                <div className="creds">{member.creds}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="section testi" id="testimonials">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="eyebrow reveal">Success Stories</div>
              <h2 className="reveal" style={{ color: "var(--mint)", fontWeight: 800 }}>Patient Experiences</h2>
            </div>
            <div className="testi-nav reveal">
              <button id="testiPrev" aria-label="Previous testimonial" onClick={handleTestiPrev}>
                <svg viewBox="0 0 24 24">
                  <path d="M15 6l-6 6 6 6" />
                </svg>
              </button>
              <button id="testiNext" aria-label="Next testimonial" onClick={handleTestiNext}>
                <svg viewBox="0 0 24 24">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          </div>
          <div style={{ overflow: "hidden" }}>
            <div className="testi-track" id="testiTrack" ref={trackRef}>
              {TESTIMONIALS.map((testi, i) => (
                <div key={i} className="testi-card">
                  <div className="stars">
                    {Array.from({ length: testi.stars }).map((_, si) => (
                      <svg key={si} viewBox="0 0 24 24">
                        <path d="M12 2l3 6 6 .9-4.3 4.2 1 6L12 17l-5.7 2.1 1-6L4 8.9 10 8z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote>"{testi.q}"</blockquote>
                  <div className="who">
                    <span className="av">{testi.i}</span>
                    <div>
                      <div className="nm">{testi.n}</div>
                      <div className="cx">{testi.c}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ PRICING ============ */}
      <section className="section" id="pricing" data-screen-label="Pricing">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="eyebrow reveal">Clear pricing</div>
              <h2 className="reveal" style={{ color: "var(--mint)", fontWeight: 800 }}>Simple plans, no hidden fees</h2>
            </div>
            <p className="lead reveal" style={{ maxWidth: "48ch" }}>
              Pay per session or opt for package savings. Every plan includes assessment and active recovery tracking support.
            </p>
          </div>
          <div className="price-grid" data-stagger="">
            {PRICING_PLANS.map((plan, i) => (
              <article key={i} className={`price spotlight-card ${plan.featured ? "feat" : ""}`} onMouseMove={handleMouseMove}>
                {plan.featured && <span className="tag-feat">Most popular</span>}
                <h3>{plan.title}</h3>
                <p className="desc">{plan.desc}</p>
                <div className="amt">
                  {plan.price}
                  <small>{plan.unit}</small>
                </div>
                <ul>
                  {plan.features.map((feat, fi) => (
                    <li key={fi}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M5 12l5 5L20 7" />
                      </svg>{" "}
                      {feat}
                    </li>
                  ))}
                </ul>
                <a href="#booking" className={`btn ${plan.featured ? "btn-accent" : "btn-ghost"}`}>
                  {plan.cta}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="section services" id="faq" data-screen-label="FAQ">
        <div className="wrap">
          <div
            className="sec-head"
            style={{ justifyContent: "center", textAlign: "center", flexDirection: "column", alignItems: "center" }}
          >
            <div className="eyebrow reveal">Got Questions?</div>
            <h2 className="reveal" style={{ textAlign: "center", color: "var(--mint)", fontWeight: 800 }}>
              Frequently Asked Questions
            </h2>
          </div>
          <div className="faq-wrap reveal" id="faqWrap">
            {FAQS.map((faq, i) => {
              const isOpen = activeFaq === i;
              return (
                <div key={i} className={`faq-item ${isOpen ? "open" : ""}`}>
                  <button
                    className="faq-q"
                    onClick={() => setActiveFaq((prev) => (prev === i ? null : i))}
                  >
                    <span>{faq.q}</span>
                    <span className="pm">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round">
                        <path d="M12 5v14M5 12h14" style={{ transition: "transform 0.4s" }} />
                      </svg>
                    </span>
                  </button>
                  <div
                    className="faq-a"
                    style={{
                      maxHeight: isOpen ? "220px" : "0px",
                      transition: "max-height 0.4s ease-in-out",
                    }}
                  >
                    <p>{faq.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section className="section contact" id="contact" data-screen-label="Contact">
        <div className="wrap contact-grid">
          <div className="reveal-l">
            <div className="eyebrow" style={{ color: "var(--mint)" }}>
              Visit Our Clinic
            </div>
            <h2 style={{ marginTop: "14px", color: "var(--mint)", fontWeight: 800 }}>Ready when you are</h2>
            <p className="lead">Same day appointments available. Give us a call or walk in to start your recovery.</p>
            <div className="contact-info">
              <div className="ci">
                <span className="ic">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 21s-7-4.5-7-10a7 7 0 0 1 14 0c0 5.5-7 10-7 10z" />
                    <circle cx="12" cy="11" r="2.5" />
                  </svg>
                </span>
                <div>
                  <div className="k">Location</div>
                  <div className="v">Bodyaligner Clinic, Pune, Maharashtra</div>
                  <a href="https://maps.app.goo.gl/bCqCFe6eJdKUvaHy8" target="_blank" rel="noopener noreferrer" style={{ color: "var(--mint)", fontWeight: "600", fontSize: "0.85rem", marginTop: "4px", display: "inline-block" }}>
                    Open in Google Maps
                  </a>
                </div>
              </div>
              <div className="ci">
                <span className="ic">
                  <svg viewBox="0 0 24 24">
                    <path d="M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
                  </svg>
                </span>
                <div>
                  <div className="k">Phone</div>
                  <div className="v">+91 72188 18815 / 84597 54634</div>
                </div>
              </div>
              <div className="ci">
                <span className="ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                  </svg>
                </span>
                <div>
                  <div className="k">Instagram</div>
                  <a href="https://www.instagram.com/body_aligner" target="_blank" rel="noopener noreferrer" className="v" style={{ textDecoration: "underline" }}>
                    @body_aligner
                  </a>
                </div>
              </div>
              <div className="ci">
                <span className="ic">
                  <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                </span>
                <div>
                  <div className="k">Timing</div>
                  <div className="v">Mon - Sat: 10:00 AM - 8:00 PM</div>
                </div>
              </div>
            </div>
          </div>

          <div className="map reveal-r" style={{ padding: "0", minHeight: "450px" }}>
            <iframe
              title="Body Aligner Clinic Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1891.060580306607!2d73.745616!3d18.6068004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bb1913b918bf:0xbd157979134c708c!2sBody_Aligner!5e0!3m2!1sen!2sin!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "450px" }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="footer-fittr">
        <div className="wrap">
          <div className="foot-grid-fittr">
            {/* Column 1: Brand & Contact Info */}
            <div className="foot-brand-col">
              <a className="brand" href="#top">
                <img src="/assets/4.png" alt="Bodyaligner Logo" style={{ height: "90px", width: "auto" }} />
              </a>
              <div className="foot-locations">
                Pune &nbsp;|&nbsp; Maharashtra &nbsp;|&nbsp; India
              </div>
              <div className="foot-contact-details">
                <div className="item">
                  <i className="fas fa-phone-alt"></i>
                  <span>+91 72188 18815 / 84597 54634</span>
                </div>
                <div className="item">
                  <i className="fas fa-envelope"></i>
                  <span>support@bodyaligner.in</span>
                </div>
                <div className="item">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>
                    Office no 19 floor no 3, SSD Sai Luxuria, Bhumkar Das Gugre Rd, near Akshara International School, Tathawade, Pune, Maharashtra - 411057
                  </span>
                </div>
              </div>
            </div>

            {/* Column 2: Company */}
            <div className="foot-col-fittr">
              <h5>Company</h5>
              <ul>
                <li><a href="#about">About Us</a></li>
                <li><a href="#services">Our Services</a></li>
                <li><a href="#why-choose">Why Choose Us</a></li>
                <li><a href="#booking">Online Booking</a></li>
                <li><a href="#clinic-tour">Clinic Tour</a></li>
                <li><a href="#faq">Help &amp; FAQ</a></li>
              </ul>
            </div>

            {/* Column 3: Offerings */}
            <div className="foot-col-fittr">
              <h5>Offerings</h5>
              <ul>
                <li><a href="#services" onClick={(e) => setSelectedService(SERVICES.find(s => s.id === 'chiro') || null)}>Chiropractic Alignment</a></li>
                <li><a href="#services" onClick={(e) => setSelectedService(SERVICES.find(s => s.id === 'sports') || null)}>Sports Rehab</a></li>
                <li><a href="#services" onClick={(e) => setSelectedService(SERVICES.find(s => s.id === 'cupping') || null)}>Cupping Therapy</a></li>
                <li><a href="#services" onClick={(e) => setSelectedService(SERVICES.find(s => s.id === 'needling') || null)}>Dry Needling</a></li>
                <li><a href="#services" onClick={(e) => setSelectedService(SERVICES.find(s => s.id === 'body-align') || null)}>Body Alignment</a></li>
                <li><a href="#services" onClick={(e) => setSelectedService(SERVICES.find(s => s.id === 'dns') || null)}>DNS Stabilization</a></li>
              </ul>
            </div>

            {/* Column 4: Tools */}
            <div className="foot-col-fittr">
              <h5>Tools</h5>
              <ul>
                <li><a href="#exercises">Exercise Video Library</a></li>
                <li><a href="#booking">Spine Health Assessment</a></li>
                <li><a href="https://wa.me/917218818815" target="_blank" rel="noopener noreferrer">WhatsApp Consultation</a></li>
                <li><a href="tel:+917218818815">Direct Specialist Call</a></li>
              </ul>
            </div>

            {/* Column 5: Legal */}
            <div className="foot-col-fittr">
              <h5>Legal</h5>
              <ul>
                <li><a href="#top" onClick={(e) => { e.preventDefault(); }}>Terms &amp; Conditions</a></li>
                <li><a href="#top" onClick={(e) => { e.preventDefault(); }}>Privacy Policy</a></li>
                <li><a href="#top" onClick={(e) => { e.preventDefault(); }}>Warranty &amp; Care Policy</a></li>
                <li><a href="#top" onClick={(e) => { e.preventDefault(); }}>Booking Refund Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="foot-bottom-fittr">
            <span>© 2026 Bodyaligner Clinic. All rights reserved.</span>
            <div className="foot-certs-fittr">
              <span className="cert-item"><i className="fas fa-check-circle"></i> Certified Clinic</span>
              <span className="cert-item"><i className="fas fa-check-circle"></i> Regd. Practitioner</span>
              <span className="cert-item"><i className="fas fa-check-circle"></i> Safe Care</span>
            </div>
            <div className="foot-social-fittr">
              <a href="https://www.instagram.com/body_aligner" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://wa.me/917218818815" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <i className="fab fa-whatsapp"></i>
              </a>
              <a href="tel:+917218818815" aria-label="Phone">
                <i className="fas fa-phone-alt"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* ============ DYNAMIC DETAILS / PLAYBACK MODAL (EXERCISE) ============ */}
      {selectedExercise && (
        <div className="modal open" role="dialog" aria-modal="true">
          <div className="modal-back" onClick={() => setSelectedExercise(null)}></div>
          <div className="modal-card">
            <button
              className="modal-close"
              aria-label="Close"
              onClick={() => setSelectedExercise(null)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
            <div className="modal-video" style={{ position: "relative", overflow: "hidden", background: "#000" }}>
              <video
                src={selectedExercise.videoUrl}
                autoPlay
                loop
                muted
                playsInline
                controls
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div className="modal-body">
              <span className="tag">{selectedExercise.tag}</span>
              <h3>{selectedExercise.name}</h3>
              <p>{selectedExercise.desc}</p>
              <div className="modal-steps">
                {selectedExercise.steps.map((step, idx) => (
                  <div key={idx} className="s">
                    <b>{String(idx + 1).padStart(2, "0")}</b> {step}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============ SERVICES DETAIL MODAL ============ */}
      {selectedService && (
        <div className="modal open" role="dialog" aria-modal="true">
          <div className="modal-back" onClick={() => setSelectedService(null)}></div>
          <div className="modal-card" style={{ maxWidth: "600px", background: "var(--cream-2)" }}>
            <button
              className="modal-close"
              aria-label="Close"
              onClick={() => setSelectedService(null)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
            <div className="modal-body" style={{ padding: "34px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(255,255,255,0.1)", display: "grid", placeItems: "center" }}>
                  <i className={`fas ${selectedService.iconClass}`} style={{ color: "var(--mint)", fontSize: "1.5rem" }}></i>
                </div>
                <h3 style={{ margin: "0", fontSize: "1.6rem", color: "white" }}>{selectedService.title}</h3>
              </div>

              <p style={{ color: "rgba(255,255,255,0.86)", fontSize: "1.05rem", lineHeight: "1.6" }}>{selectedService.details}</p>

              <h4 style={{ color: "var(--mint)", fontSize: "1.1rem", marginTop: "24px", marginBottom: "10px", fontFamily: "var(--sans)", fontWeight: "700" }}>Common Indications:</h4>
              <ul style={{ listStyle: "none", padding: "0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                {selectedService.indications.map((ind, i) => (
                  <li key={i} style={{ display: "flex", gap: "8px", alignItems: "center", color: "rgba(255,255,255,0.8)", fontSize: "0.95rem" }}>
                    <i className="fas fa-check" style={{ color: "var(--mint)", fontSize: "0.8rem" }}></i>
                    {ind}
                  </li>
                ))}
              </ul>

              <div style={{ marginTop: "32px", display: "flex", gap: "12px" }}>
                <a href="#booking" className="btn btn-accent" style={{ flex: "1", justifyContent: "center" }} onClick={() => {
                  setBookingData(prev => ({ ...prev, service: selectedService.title }));
                  setSelectedService(null);
                }}>
                  Book Assessment
                </a>
                <button className="btn btn-ghost" style={{ color: "white", borderColor: "rgba(255,255,255,0.2)" }} onClick={() => setSelectedService(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}




    </>
  );
}
