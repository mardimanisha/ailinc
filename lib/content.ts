/**
 * Every string here is sourced from AI_LINC_Company_Profile.pdf.
 */

export const company = {
  name: "AILinc Technologies Private Limited",
  short: "AI LINC",
  tagline: "Empowering the world with infinite possibilities of AI",
  cin: "U58202TS2025PTC200811",
  gstin: "36ABDCA2646R1Z7",
  hq: "Financial District, Hyderabad, India",
  address: "AI Linc, Financial District, Hyderabad, Telangana 500032",
  phone: "+91 96939 41136",
  tech: { site: "ailinc.com", emails: ["shubham@ailinc.com", "sandeep@ailinc.com"] },
  edu: { site: "ailinc.in", emails: ["shubham@ailinc.in"] },
};

export const heroCopy = {
  eyebrow: "Corporate Profile",
  lines: ["One Company.", "Two Verticals."],
  sub: "AILinc Technologies Pvt Ltd builds AI-native software for enterprises and AI-native learning infrastructure for institutions — engineered by the same team, delivered across six countries.",
  cta: "Explore both verticals",
};

export const countries = [
  "Saudi Arabia",
  "UAE",
  "Singapore",
  "Sri Lanka",
  "India",
  "Australia",
];

export const stats = [
  { value: 20, suffix: "+", label: "Products shipped" },
  { value: 30, suffix: "+", label: "Education collaborations" },
  { value: 10, suffix: "+", label: "Clients live on our LMS" },
];

export const whoWeAre = {
  eyebrow: "Who we are",
  title: ["Engineering and education,", "built on one", "AI backbone"],
  body: "AI LINC is a Hyderabad-based technology and learning company. Our Technology & Software Services vertical designs, builds and secures production systems for enterprise clients. Our Education & Institutional Learning vertical supplies trainers, curriculum and a white-label LMS to governments, universities and EdTech platforms. Both are led by founders with enterprise engineering backgrounds, and both draw on the same practitioner talent pool.",
  reach: {
    kicker: "Wherever you operate",
    scope: ["Any company", "Any domain", "Any segment", "Any country"],
    lead: "AI, web and content solutions — engineered around whatever you bring us.",
    statement: "You bring the tech requirement.",
    statementHighlight: "We build the solution.",
  },
};

export const verticals = [
  {
    index: "Vertical 01",
    title: "Technology & Software Services",
    body: "Product engineering, AI/ML systems, cybersecurity and GRC, data and cloud platforms — delivered as full builds, augmented squads or advisory engagements for enterprise and government clients.",
    site: "ailinc.com",
    href: "#technology",
    action: "See capabilities",
    featured: false,
  },
  {
    index: "Vertical 02",
    title: "Education & Institutional Learning",
    body: "Trainers, mentors, curriculum design and a white-label AI-native LMS supplied strictly business-to-business and business-to-government — to institutions, platforms and corporate L&D teams.",
    site: "ailinc.in",
    href: "#education",
    action: "See what we supply",
    featured: true,
  },
  {
    index: "The Platform",
    title: "The AI LINC LMS",
    body: "Adaptive, AI-native, white-label and multi-tenant — your brand and domain on the front, our intelligence layer underneath. One platform instance, many institutions.",
    site: "ailinc.in",
    href: "#platform",
    action: "Inspect the stack",
    featured: false,
  },
];

export const capabilities = [
  {
    step: "01",
    kicker: "Build",
    title: "Product Engineering",
    image: "/images/cards/build.jpg",
    lead: "Taking a system from architecture to something real users depend on.",
    items: [
      {
        name: "AI / ML Product Engineering",
        detail: "Applied AI systems and AI-native features, prototype to production.",
      },
      {
        name: "Full-Stack Development",
        detail: "Web and platform engineering across modern stacks.",
      },
      {
        name: "Data Engineering",
        detail: "Pipelines, warehousing and the analytics layer above them.",
      },
    ],
  },
  {
    step: "02",
    kicker: "Run",
    title: "Platform Reliability",
    image: "/images/cards/run.jpg",
    lead: "Making sure it holds up once traffic, scale and release cadence arrive.",
    items: [
      {
        name: "Cloud & DevOps",
        detail: "Cloud architecture, CI/CD, infrastructure-as-code, release automation.",
      },
      {
        name: "Performance Testing",
        detail: "Load, stress and reliability testing before real users find the limits.",
      },
      {
        name: "Monitoring & Reliability",
        detail: "Observability, alerting and incident response once a system is carrying real load.",
      },
    ],
  },
  {
    step: "03",
    kicker: "Secure",
    title: "Security & Compliance",
    image: "/images/cards/secure.jpg",
    lead: "Independent assurance, whether or not we built the system in question.",
    items: [
      {
        name: "Cybersecurity & VAPT",
        detail: "Penetration testing and security assessment against real threat models.",
      },
      {
        name: "Governance, Risk & Compliance",
        detail: "Programmes spanning GDPR, PDPL and sector-specific regulation.",
      },
      {
        name: "Audit & Certification Readiness",
        detail: "Gap assessment and evidence preparation ahead of a formal audit.",
      },
    ],
  },
];

export const engagements = [
  {
    title: "Assessment & Advisory",
    lede: "We review, you act.",
    body: "Independent security, compliance and architecture assessments delivered as a report with findings you can act on internally.",
  },
  {
    title: "Resource Augmentation",
    lede: "We build alongside you.",
    body: "Vetted engineers embed into your existing teams, reporting into your leads and working to your standards and sprint cadence.",
  },
  {
    title: "Project Delivery",
    lede: "We own the outcome.",
    body: "Scoped builds with defined milestones, acceptance criteria and a delivery team accountable end to end.",
  },
];

export const supply = [
  {
    step: "01",
    tag: "People",
    title: "Trainer Marketplace",
    image: "/images/cards/office.jpg",
    body: "Working practitioners with two to ten-plus years of experience, sourced from MAANG and top product companies, matched to your programme requirements and delivery calendar.",
  },
  {
    step: "02",
    tag: "People",
    title: "Mentors, Mocks & Masterclasses",
    image: "/images/cards/boardroom.jpg",
    body: "An on-demand pool for interview preparation, mentorship tracks, guest webinars and industry masterclasses, layered onto programmes you already run.",
  },
  {
    step: "03",
    tag: "Content",
    title: "Curriculum & Content Design",
    image: "/images/cards/aerial.jpg",
    body: "Learning roadmaps, session-level breakdowns, assignments, projects, MCQ banks and assessments — built to your academic structure and outcome requirements.",
  },
  {
    step: "04",
    tag: "Platform",
    title: "The AI LINC LMS",
    image: "/images/cards/globe.jpg",
    body: "Adaptive, AI-native, white-label and multi-tenant — your brand and domain on the front, our intelligence layer underneath.",
  },
];

export const audiences = [
  "Government training programmes",
  "EdTech platforms",
  "Universities & colleges",
  "Corporate L&D teams",
];

export const platformLayers = [
  {
    layer: "Experience Layer",
    items: [
      { name: "Students", detail: "Path, progress, feedback" },
      { name: "Trainers", detail: "Cohort view, interventions" },
      { name: "Faculty", detail: "Curriculum, evaluation" },
      { name: "Administrators", detail: "Outcomes, reporting" },
    ],
  },
  {
    layer: "Delivery & Assessment",
    items: [
      {
        name: "Adaptive Learning Paths",
        detail: "Sequencing responds to mastery, not to a fixed calendar.",
      },
      {
        name: "Unified Evaluation Engine",
        detail: "MCQs, code, projects and peer review in one pipeline.",
      },
      {
        name: "Assessment Integrity",
        detail: "Identity checks, anomaly detection, tamper-evident certificates.",
      },
    ],
  },
  {
    layer: "Intelligence Layer",
    items: [
      {
        name: "Competency Tracking",
        detail: "Skill acquisition per learner, not percentage complete.",
      },
      {
        name: "Cohort Analytics",
        detail: "Where a batch is drifting, early enough to act on it.",
      },
      {
        name: "AI Content Operations",
        detail: "Structuring, question generation and remediation.",
      },
    ],
  },
];

export const foundation = {
  title: "Multi-tenant, cloud-native infrastructure",
  body: "One platform instance, many institutions — isolated data, independent branding, shared engineering effort. New tenants are configured, not rebuilt.",
};

export const founders = [
  {
    name: "Shubham Lal",
    role: "Co-Founder & CEO",
    body: "Eight years at Microsoft across AI and cloud systems. Leads technology delivery and institutional partnerships.",
    image: "/trainers/shubham_lal.jpg",
  },
  {
    name: "Sandeep Volam",
    role: "Co-Founder & Chairman",
    body: "Leads corporate governance, people operations and commercial expansion across the Gulf region.",
    image: "/team/sandeep_volam.jpg",
  },
];

export const team = [
  { name: "Ajeya B Jois", image: "/team/ajeya_b_jois.jpg" },
  { name: "Ananth Kumar", image: "/team/ananth_kumar.jpg" },
  { name: "Anuj", image: "/team/anuj.jpeg" },
  { name: "Gaddam Mallesham", image: "/team/gaddam_mallesham.jpg" },
  { name: "Ganesh Rayala", image: "/team/ganesh_rayala.jpg" },
  { name: "Mahesh Yerra", image: "/team/mahesh_yerra.jpg" },
  { name: "Nomaan Abdul Majeed", image: "/team/nomaan_abdul_majeed.jpg" },
  { name: "Raghav Nakra", image: "/team/raghav_nakra.jpg" },
  { name: "Rahul Mohan", image: "/team/rahul_mohan.jpg" },
  { name: "Rajesh Talreja", image: "/team/rajesh_talreja.jpeg" },
  { name: "Sanjay Kulkarni", image: "/team/sanjay_kulkarni.jpeg" },
  { name: "Shahar Banu", image: "/team/shahar_banu.jpg" },
  { name: "Shivam Jindal", image: "/team/shivam_jindal.jpg" },
  { name: "Shreyansh Sinha", image: "/team/shreyansh_sinha.jpg" },
  { name: "Sourov Roy", image: "/team/sourov_roy.jpg" },
  { name: "Srinivas Kaveti", image: "/team/srinivas_kaveti.jpg" },
  { name: "Vivek Ananth", image: "/team/vivek_ananth.jpg" },
  { name: "Yash Mittal", image: "/team/yash_mittal.jpg" },
];

export const trainers = [
  { name: "Abirami Sukumari", image: "/trainers/Abirami_sukumari.jpg" },
  { name: "Divyansh Dubey", image: "/trainers/Divyansh_dubey.jpg" },
  { name: "Kranthi Priya", image: "/trainers/Kranthi_Priya.jpeg" },
  { name: "Noorman", image: "/trainers/noorman.jpeg" },
  { name: "Poorva", image: "/trainers/poorva_image.jpg" },
  { name: "Sandeep", image: "/trainers/sandeep.jpeg" },
  { name: "Sheaker Reddy", image: "/trainers/sheaker_reddy.jpeg" },
  { name: "Shubham Lal", image: "/trainers/shubham_lal.jpg" },
  { name: "Yamini Bandi", image: "/trainers/yamini_bandi.jpg" },
];

export const partners = [
  { name: "Pearson Edexcel", image: "/logos/partners/edexcel.svg" },
  { name: "Lords University", image: "/logos/partners/lords-university.jpg" },
  { name: "Impacteers", image: "/logos/partners/impacteers.svg" },
  { name: "Be10x", image: "/logos/partners/be10x.png" },
  { name: "UTB", image: "/logos/partners/utb.png" },
  { name: "ZSkillup", image: "/logos/partners/zskillup.png" },
];

export const trustBar = {
  accredited: [
    { name: "Microsoft", image: "/logos/partners/trust/microsoft.svg" },
    { name: "AWS", image: "/logos/partners/trust/aws.svg" },
    { name: "Google", image: "/logos/partners/trust/google.svg" },
  ],
  runningInProduction: [
    { name: "AgileOlogy", image: "/logos/partners/trust/agileology.webp" },
    { name: "AIMERZ.ai", image: "/logos/partners/trust/aimerz.png" },
    { name: "Impacteers", image: "/logos/partners/impacteers.svg" },
    { name: "Airtribe", image: "/logos/partners/trust/airtribe.svg", dark: true },
    { name: "FDE Academy", image: "/logos/partners/trust/fde-academy.svg", dark: true },
  ],
  recognised: [
    { name: "The Times of India", image: "/logos/partners/trust/toi-crest.gif" },
    { name: "TOI", image: "/logos/partners/trust/toi-icon.png" },
    { name: "Business Outreach", image: "/logos/partners/trust/business-outreach.png" },
    { name: "Thapar Institute of Engineering & Technology", image: "/logos/partners/trust/thapar.png" },
    { name: "BITS Pilani", image: "/logos/partners/trust/bits-pilani.png" },
  ],
};

export const press = [
  {
    image: "/gallery/et-achievers-stage.jpg",
    tag: "Award",
    outlet: "ET Industry Achievers, AP & Telangana 2025–26",
    w: 2048,
    h: 1152,
  },
  {
    image: "/gallery/press-sakshi.jpg",
    tag: "Press",
    outlet: "Sakshi",
    w: 400,
    h: 950,
  },
  {
    image: "/gallery/press-hans-india.jpg",
    tag: "Press",
    outlet: "Hans India",
    w: 521,
    h: 414,
  },
  {
    image: "/gallery/press-namaste-telangana.jpg",
    tag: "Press",
    outlet: "Namaste Telangana",
    w: 1039,
    h: 859,
  },
  {
    image: "/gallery/et-achievers-award.jpg",
    tag: "Award",
    outlet: "The Times of India · Economic Times",
    w: 2048,
    h: 1366,
  },
  {
    image: "/gallery/press-andhraprabha.jpg",
    tag: "Press",
    outlet: "Andhra Prabha",
    w: 1280,
    h: 614,
  },
  {
    image: "/gallery/press-hyderabad-headlines.jpg",
    tag: "Press",
    outlet: "Hyderabad Headlines",
    w: 770,
    h: 560,
  },
  {
    image: "/gallery/press-shubham-feature.jpg",
    tag: "Feature",
    outlet: "Print feature",
    w: 780,
    h: 597,
  },
  {
    image: "/gallery/press-andhraprabha-2.jpg",
    tag: "Press",
    outlet: "Andhra Prabha",
    w: 1280,
    h: 589,
  },
  {
    image: "/gallery/press-telugu-prabha.jpg",
    tag: "Press",
    outlet: "Telugu Prabha",
    w: 1280,
    h: 925,
  },
  {
    image: "/gallery/press-prajavakyam.jpg",
    tag: "Press",
    outlet: "Prajavakyam",
    w: 691,
    h: 1280,
  },
];

export const footprint =
  "Our institutional footprint is concentrated in Telangana and the Gulf, and we grow it deliberately rather than as fast as we could. We size engagements against the delivery capacity we actually hold — trainers, content teams and platform support are committed per programme before a proposal goes out.";

export const nav = [
  { label: "Company", href: "/#company" },
  { label: "Technology", href: "/#technology" },
  { label: "Education", href: "/#education" },
  { label: "Platform", href: "/#platform" },
  { label: "Team", href: "/team" },
];
