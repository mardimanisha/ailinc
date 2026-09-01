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
};

export const heroCopy = {
  eyebrow: "Corporate Profile",
  lines: ["Product engineering,", "secured end to end."],
  sub: "AILinc Technologies Pvt Ltd builds and secures AI-native software for enterprise and public-sector clients — engineered by one delivery team, delivered across six countries.",
  cta: "See capabilities",
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
  { value: 6, suffix: "", label: "Countries of delivery" },
];

export const whoWeAre = {
  eyebrow: "Who we are",
  title: ["We build any tech product", "for any"],
  rotatingWords: ["country", "organization", "individual"],
  body: "From powerful government platforms to enterprise systems and disruptive consumer apps — if you can imagine it, we can build it.",
  stats: [
    { value: "5+", label: "Countries We Operate In" },
    { value: "20+", label: "Projects Delivered" },
    { value: "24/7", label: "Global Delivery & Support" },
  ],
  reach: {
    kicker: "Wherever you operate",
    lead: "AI, web and content solutions — engineered around whatever you bring us.",
    statement: "Any tech product, one tech team —",
    statementHighlight: "we deliver it.",
    badges: [
      {
        icon: "globe",
        label: "Any Country",
        caption: "Localized. Compliant. Delivered.",
      },
      {
        icon: "landmark",
        label: "Any Government",
        caption: "Digital transformation at scale.",
      },
      {
        icon: "layers",
        label: "Any Organization",
        caption: "Custom systems that drive real impact.",
      },
      {
        icon: "users",
        label: "Any Individual",
        caption: "Your idea. Our tech. Limitless possibilities.",
      },
    ],
    cta: {
      title: "One Requirement. Infinite Possibilities.",
      body: "Share your idea or requirement — our team turns it into a powerful, real-world solution.",
      button: "Let's Build Together",
      expertsCount: "100+",
    },
  },
};

export const whoWeAreFeatures = [
  {
    icon: "cube",
    accent: "#2356D6",
    title: "AI-Powered",
    body: "Intelligent solutions at every layer.",
  },
  {
    icon: "shield",
    accent: "#1783E3",
    title: "Secure by Design",
    body: "Enterprise-grade security & compliance.",
  },
  {
    icon: "rocket",
    accent: "#0CB1F1",
    title: "Scalable & Reliable",
    body: "Built to scale across users and borders.",
  },
  {
    icon: "users",
    accent: "#00E0FF",
    title: "Built for Everyone",
    body: "Governments, enterprises, startups & individuals.",
  },
] as const;

export const whoWeAreTrustedBy = [
  { icon: "landmark", label: "Governments" },
  { icon: "building", label: "Enterprises" },
  { icon: "rocket", label: "Startups" },
  { icon: "heart", label: "NGOs" },
  { icon: "users", label: "Individuals" },
] as const;

export const whoWeAreDomains = [
  { icon: "landmark", label: "Government" },
  { icon: "heart", label: "Healthcare" },
  { icon: "finance", label: "Finance" },
  { icon: "cap", label: "Education" },
  { icon: "truck", label: "Logistics" },
  { icon: "bag", label: "Retail" },
  { icon: "building", label: "Real Estate" },
  { icon: "more", label: "& More" },
] as const;

export const operatingCountries = [
  { name: "Saudi Arabia", code: "SA", flag: "/flags/sa.png" },
  { name: "UAE", code: "AE", flag: "/flags/ae.png" },
  { name: "Singapore", code: "SG", flag: "/flags/sg.png" },
  { name: "Sri Lanka", code: "LK", flag: "/flags/lk.png" },
  { name: "India", code: "IN", flag: "/flags/in.png" },
  { name: "Australia", code: "AU", flag: "/flags/au.png" },
];

export const deliveryProcess = [
  { step: "01", label: "Idea", detail: "Problem framed, scope defined with you." },
  { step: "02", label: "Prototype", detail: "A working proof of concept, fast." },
  { step: "03", label: "Product", detail: "Production-grade build, engineered to ship." },
  { step: "04", label: "Automation", detail: "Pipelines, monitoring, release automation in place." },
  { step: "05", label: "Scale", detail: "Grows with you, wherever you operate next." },
];

export const buildCapabilities = [
  {
    title: "Product Development",
    detail: "We build digital products from scratch to scale.",
    bullets: ["SaaS Platforms", "Enterprise Systems", "Consumer Products"],
  },
  {
    title: "AI Prototyping",
    detail: "Validate ideas faster with AI prototypes and MVPs.",
    bullets: ["AI MVPs", "Proof of Concepts", "Rapid Experimentation"],
  },
  {
    title: "Web & Mobile Apps",
    detail: "High-performance web and mobile applications that users love.",
    bullets: ["iOS / Android Apps", "Web Applications", "Cross-platform Solutions"],
  },
  {
    title: "Custom Software",
    detail: "Tailored software to fit your unique business processes.",
    bullets: ["Enterprise Software", "Workflow Systems", "Business Automation"],
  },
  {
    title: "AI Tools & Agents",
    detail: "Intelligent tools and agents that augment work and decisions.",
    bullets: ["AI Assistants", "Chatbots & Agents", "Smart Analytics"],
  },
  {
    title: "Workflow Automation",
    detail: "Automate processes. Save time. Improve efficiency.",
    bullets: ["Process Automation", "API Integrations", "RPA & AI Workflows"],
  },
  {
    title: "AI Integration",
    detail: "Integrate AI capabilities into your existing systems and products.",
    bullets: ["Model Integration", "Data Pipelines", "AI-Driven Features"],
  },
] as const;

export const domainFocus = [
  "Enterprise",
  "Finance",
  "Healthcare",
  "Logistics",
  "Education",
  "Manufacturing",
  "Retail",
  "Real Estate",
];

/**
 * Photography for the "Who we build it for" tiles — one per domain.
 *
 * Sourced from Unsplash (unsplash.com/license: free for commercial use,
 * no attribution required) and served locally from public/images/domains
 * rather than hotlinked, so the site carries no third-party CDN
 * dependency. Each is 1400px wide, q75.
 *
 * To swap any of them, replace the file in place — nothing here or in
 * the component needs to change.
 */
export const domainImages: Record<string, string> = {
  Enterprise: "/images/domains/enterprise.jpg",
  Finance: "/images/domains/finance.jpg",
  Healthcare: "/images/domains/healthcare.jpg",
  Logistics: "/images/domains/logistics.jpg",
  Education: "/images/domains/education.jpg",
  Manufacturing: "/images/domains/manufacturing.jpg",
  Retail: "/images/domains/retail.jpg",
  "Real Estate": "/images/domains/real-estate.jpg",
};

export const clientLogos = [
  { name: "Accreqo", logo: "/logos/clients/accreqo.png" },
  { name: "RTIH", logo: "/logos/clients/rtih.png" },
  { name: "ZSkillup", logo: "/logos/clients/zskillup.png" },
  { name: "Audix GRC", logo: "/logos/clients/audix-grc.png" },
  { name: "Ulektz", logo: "/logos/clients/ulektz.png" },
  { name: "S3CE Technology Solutions", logo: "/logos/clients/sage.png" },
  { name: "University of Bahrain", logo: "/logos/clients/university-of-bahrain.png" },
  { name: "Jaro Education", logo: "/logos/clients/jaro-education.png" },
];

export const productionLogos = [
  { name: "AgileOlogy", logo: "/logos/partners/trust/agileology.webp" },
  { name: "AIMERZ.ai", logo: "/logos/partners/trust/aimerz.png" },
  { name: "Impacteers", logo: "/logos/clients/impacteers-logo-web.svg" },
  { name: "Airtribe", logo: "/logos/partners/trust/airtribe.svg" },
  { name: "FDE Academy", logo: "/logos/partners/trust/fde-academy.svg" },
];

export const awardLogos = [
  { name: "The Times of India", logo: "/logos/partners/trust/toi-logo-full.svg" },
  { name: "The Times of India", logo: "/logos/partners/trust/toi-logo-box.svg" },
  { name: "Business Outreach", logo: "/logos/partners/trust/business-outreach.png" },
  { name: "Thapar Institute of Engineering & Technology", logo: "/logos/partners/trust/thapar.png" },
  { name: "BITS Pilani", logo: "/logos/partners/trust/bits-pilani-official.webp" },
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

export const portfolio = {
  eyebrow: "Project Portfolio",
  title: ["What we have", "actually", "built."],
  body: "Twenty-five-plus product engagements across five countries — platforms in healthcare compliance, governance, higher education and skilling. Eight are set out here; each one shipped, in production, and still running.",
  stats: [
    { value: 25, suffix: "+", label: "Product engagements" },
    { value: 5, suffix: "+", label: "Countries of delivery" },
  ],
  sectionEyebrow: "The portfolio",
  sectionTitle: "Eight builds, five markets",
  projects: [
    {
      client: "Accreqo",
      image: "/images/cards/accreqo.jpg",
      logo: "/logos/clients/accreqo.png",
      flag: "/flags/sa.png",
      country: "Saudi Arabia",
      step: "01",
      title: "Multi-Tenant Compliance Intelligence Platform",
      body: "Multi-tenant accreditation and compliance platform for clinics, hospitals and academic medical centres, with role-based evidence workflows, immutable audit trails and PDPL-aligned data residency.",
      tags: ["Multi-tenant", "RBAC", "Audit trails", "PDPL"],
      impact: {
        timeline: "16 weeks",
        value: "3x",
        label: "Faster audit-evidence turnaround",
      },
    },
    {
      client: "RTIH",
      image: "/images/cards/rtih.jpg",
      logo: "/logos/clients/rtih.png",
      flag: "/flags/in.png",
      country: "India",
      step: "02",
      title: "API-First Innovation Ecosystem Platform",
      body: "Innovation-ecosystem platform covering programme operations, partner directories and founder tooling — headless CMS with an API-driven front end and automated release pipelines.",
      tags: ["Headless CMS", "REST APIs", "CI/CD", "Cloud"],
      impact: {
        timeline: "10 weeks",
        value: "5x",
        label: "More frequent, automated releases",
      },
    },
    {
      client: "Audix GRC",
      image: "/images/cards/audix-grc.jpg",
      logo: "/logos/clients/audix-grc.png",
      flag: "/flags/in.png",
      country: "India",
      step: "03",
      title: "Continuous Assurance & Controls Engine",
      body: "GRC product engineering — audit workflow automation, evidence management and continuous readiness scoring, driven by a rules engine mapping controls to live system state.",
      tags: ["Rules engine", "Workflow automation", "SSO", "Security"],
      impact: {
        timeline: "14 weeks",
        value: "60%",
        label: "Less manual evidence collection",
      },
    },
    {
      client: "Bahrain Institution",
      image: "/images/cards/bahrain-institution.jpg",
      logo: "/logos/clients/university-of-bahrain.png",
      flag: "/flags/bh.png",
      country: "Bahrain",
      step: "04",
      title: "Retrieval-Augmented Academic Intelligence",
      body: "Applied AI and academic content systems for a Gulf institution — retrieval-augmented generation over institutional material, with vector search and human-in-the-loop review.",
      tags: ["LLM / RAG", "Vector search", "Python", "Cloud"],
      impact: {
        timeline: "12 weeks",
        value: "70%",
        label: "Faster answers from institutional content",
      },
    },
    {
      client: "ZSkillup",
      image: "/images/cards/zskillup.jpg",
      logo: "/logos/clients/zskillup.png",
      flag: "/flags/in.png",
      country: "India",
      step: "05",
      title: "Event-Driven Skills Intelligence Platform",
      body: "Upskilling platform with analytics-driven learner tracking, cohort management and automated skill assessment, built on an event-driven data pipeline feeding real-time dashboards.",
      tags: ["Event pipeline", "Auto-grading", "Analytics", "AWS"],
      impact: {
        timeline: "9 weeks",
        value: "80%",
        label: "Less manual grading time",
      },
    },
    {
      client: "Ulektz",
      image: "/images/cards/ulektz.jpg",
      logo: "/logos/clients/ulektz.png",
      flag: "/flags/sg.png",
      country: "Singapore",
      step: "06",
      title: "High-Concurrency Campus Network Platform",
      body: "Education networking and campus-services platform at scale — high-concurrency APIs, distributed caching and load-tested release paths across a large institutional user base.",
      tags: ["Microservices", "Caching", "Load testing", "CDN"],
      impact: {
        timeline: "11 weeks",
        value: "99.9%",
        label: "Uptime under peak campus load",
      },
    },
    {
      client: "Jaro Education",
      image: "/images/cards/jaro-education.jpg",
      logo: "/logos/clients/jaro-education.png",
      flag: "/flags/in.png",
      country: "India",
      step: "07",
      title: "Enrolment & Programme Data Platform",
      body: "Platform engineering for an executive-education provider — enrolment funnels, cohort operations and a reporting warehouse consolidating programme and partner data.",
      tags: ["Data warehouse", "ETL", "Integrations", "Analytics"],
      impact: {
        timeline: "13 weeks",
        value: "75%",
        label: "Faster enrolment reporting cycles",
      },
    },
    {
      client: "S3CE Technology Solutions",
      image: "/images/cards/s3ce.jpg",
      logo: "/logos/clients/sage.png",
      flag: "/flags/au.png",
      country: "Australia",
      step: "08",
      title: "Cloud-Native Delivery & Observability",
      body: "Embedded engineering partnership covering build, integration and ongoing platform support — infrastructure-as-code, containerised deployment and full-stack observability.",
      tags: ["IaC", "Kubernetes", "Observability", "CI/CD"],
      impact: {
        timeline: "8 weeks",
        value: "50%",
        label: "Faster incident detection & response",
      },
    },
  ],
  alsoDeliveredEyebrow: "Also delivered",
  alsoDeliveredTitle: "Advanced and specialist work",
  alsoDelivered: [
    {
      tag: "Sovereign AI",
      body: "LMS architecture for a Gulf client, designed for in-Kingdom data residency and sovereign LLM hosting.",
      countries: [
        { code: "BH", name: "Bahrain", flag: "/flags/bh.png" },
        { code: "AE", name: "UAE", flag: "/flags/ae.png" },
        { code: "SA", name: "Saudi Arabia", flag: "/flags/sa.png" },
      ],
    },
    {
      tag: "Applied AI",
      body: "Clinical and operational AI systems for a healthcare provider group in Saudi Arabia.",
      countries: [
        { code: "SA", name: "Saudi Arabia", flag: "/flags/sa.png" },
        { code: "QA", name: "Qatar", flag: "/flags/qa.png" },
      ],
    },
    {
      tag: "Content pipelines",
      body: "Automated e-book generation pipeline converting source material into structured, publishable coursebooks.",
      countries: [
        { code: "SG", name: "Singapore", flag: "/flags/sg.png" },
        { code: "LK", name: "Sri Lanka", flag: "/flags/lk.png" },
      ],
    },
    {
      tag: "Supply chain",
      body: "Visibility and operations platform for a logistics operator in the UAE.",
      countries: [{ code: "AE", name: "UAE", flag: "/flags/ae.png" }],
    },
    {
      tag: "Enterprise BI",
      body: "Reporting and analytics layer for an engineering group in the Kingdom, consolidating fragmented systems.",
      countries: [
        { code: "IN", name: "India", flag: "/flags/in.png" },
        { code: "LK", name: "Sri Lanka", flag: "/flags/lk.png" },
      ],
    },
    {
      tag: "Embedded leadership",
      body: "Dedicated engineering pod plus CTO-level technology leadership for a venture-backed product company.",
      countries: [{ code: "IN", name: "India", flag: "/flags/in.png" }],
    },
    {
      tag: "BFSI security",
      body: "Cybersecurity and GRC capability programmes built for banking-sector requirements.",
      countries: [
        { code: "IN", name: "India", flag: "/flags/in.png" },
        { code: "SA", name: "Saudi Arabia", flag: "/flags/sa.png" },
      ],
    },
    {
      tag: "Performance",
      body: "Load, stress and reliability programmes run ahead of high-traffic platform launches.",
      countries: [
        { code: "IN", name: "India", flag: "/flags/in.png" },
        { code: "AU", name: "Australia", flag: "/flags/au.png" },
      ],
    },
  ],
  further: {
    value: "+20",
    title: "further engagements delivered",
    body: "Across product engineering, AI, data, cloud and security — including work we cannot name here. Full detail available under mutual non-disclosure.",
  },
};

export const founders = [
  {
    name: "Shubham Lal",
    role: "Co-Founder & CEO",
    body: "Eight years at Microsoft across AI and cloud systems. Leads technology delivery and client partnerships.",
    image: "/trainers/shubham_lal.jpg",
  },
  {
    name: "Sandeep Volam",
    role: "Co-Founder & Chairman",
    body: "Leads corporate governance, people operations and commercial expansion across the Gulf region.",
    image: "/team/sandeep_volam.jpg",
  },
];

export const trainers = [
  {
    name: "Yamini Bandi",
    title: "SDE-2 & ML Engineer",
    experience: "5 years",
    photo: "/trainers/yamini_bandi.jpg",
    specialization: "ML Engineer",
    rating: 4.8,
    location: "Hyderabad, India",
    linkedin: "https://www.linkedin.com/in/yaminibandi/",
    achievements: ["Developed ML models handling 1B+ daily predictions at Amazon"],
  },
  {
    name: "Divyansh Dubey",
    title: "Gen AI Expert",
    experience: "7 years",
    photo: "/trainers/Divyansh_dubey.jpg",
    specialization: "Prompt & GenAI Expert",
    rating: 4.7,
    location: "Bengaluru, India",
    linkedin: "https://www.linkedin.com/in/divyansh-dubey/",
    achievements: ["Created viral GenAI applications with 5M+ users at Google"],
  },
  {
    name: "Abirami Sukumari",
    title: "Staff Developer Advocate",
    experience: "20 years",
    photo: "/trainers/Abirami_sukumari.jpg",
    specialization: "Cloud AI and Databases",
    rating: 4.9,
    location: "Bengaluru, India",
    linkedin: "https://www.linkedin.com/in/abiramisukumaran/",
    achievements: ["22 years of experience with Fortune 500 companies"],
  },
  {
    name: "Raghav Nakra",
    title: "Software Engineer",
    experience: "3+ years",
    photo: "/team/raghav_nakra.jpg",
    specialization: "Full Stack Development & DSA",
    rating: null,
    location: "Delhi, India",
    linkedin: "https://www.linkedin.com/in/raghav-nakra/",
    achievements: [
      "Software Engineer at Microsoft",
      "ACM ICPC Regionalist · Topcoder Member",
      "Mentored 200+ students in DSA & Competitive Programming",
      "IIIT Delhi graduate (B.Tech Computer Science)",
    ],
  },
  {
    name: "Mahesh Yerra",
    title: "Senior Software Engineer",
    experience: "5+ years",
    photo: "/team/mahesh_yerra.jpg",
    specialization: "Backend Engineering & Full Stack Development",
    rating: null,
    location: "Visakhapatnam, India",
    linkedin: "https://www.linkedin.com/in/mahesh1133/",
    achievements: [
      "Senior Software Engineer at Teradata",
      "Ex-Amazon SDE (3+ yrs, Bengaluru)",
      "NIT Calicut graduate · B.Tech Computer Science",
    ],
  },
  {
    name: "Shivam Jindal",
    title: "Software Engineer",
    experience: "4+ years",
    photo: "/team/shivam_jindal.jpg",
    specialization: "Software Engineering & Career Coaching",
    rating: null,
    location: "Gurugram, India",
    linkedin: "https://www.linkedin.com/in/shivam-jindal/",
    achievements: [
      "Software Engineer at Airbnb (Dec 2024–present)",
      "Top 5% Mentor on Topmate",
      "Mentor at PrepInsta",
    ],
  },
  {
    name: "Ananth Kumar Vasamsetti",
    title: "Senior Member of Technical Staff",
    experience: "10+ years",
    photo: "/team/ananth_kumar.jpg",
    specialization: "Full Stack & Production Engineering",
    rating: null,
    location: "Hyderabad, India",
    linkedin: "https://www.linkedin.com/in/ananth-kumar-vasamsetti-60bb7392/",
    achievements: [
      "SMTS at Salesforce (Marketing Cloud R&D)",
      "Ex-Deliveroo Software Engineer II",
      "Ex-Microsoft, Ex-ServiceNow, Ex-eBay",
      "MVGR College of Engineering graduate",
    ],
  },
  {
    name: "Rahul Mohan",
    title: "Senior Software Engineer",
    experience: "6+ years",
    photo: "/team/rahul_mohan.jpg",
    specialization: "Software Engineering & Cloud",
    rating: null,
    location: "Bengaluru, India",
    linkedin: "https://www.linkedin.com/in/rahul-mohan-4a6610a8/",
    achievements: [
      "Senior Software Engineer at Egnyte (Oct 2024–present)",
      "Ex-Exotel SDE-II (2 yrs 5 mos)",
      "Ex-Salesforce, Ex-HealthifyMe, Ex-Virtusa",
      "NIT Puducherry graduate",
    ],
  },
  {
    name: "Sourov Roy",
    title: "Senior Member of Technical Staff",
    experience: "6+ years",
    photo: "/team/sourov_roy.jpg",
    specialization: "Distributed Systems & Software Engineering",
    rating: null,
    location: "Hyderabad, India",
    linkedin: "https://www.linkedin.com/in/sourovroy-ai/",
    achievements: [
      "SMTS at Salesforce (Dec 2025–present)",
      "Ex-Amazon Software Engineer (4+ yrs, Jul 2020–Aug 2024)",
      "Ex-Deliveroo Software Engineer II",
      "Jadavpur University graduate",
    ],
  },
  {
    name: "Shreyansh Sinha",
    title: "Software Engineer 2",
    experience: "4+ years",
    photo: "/team/shreyansh_sinha.jpg",
    specialization: "Software Development & DSA",
    rating: null,
    location: "Hyderabad, India",
    linkedin: "https://www.linkedin.com/in/shreyansh-sinha-2b47a2188/",
    achievements: [
      "SWE 2 at Microsoft",
      "Ex-Siemens Healthineers, Ex-JP Morgan Chase",
      "NIT Calicut graduate",
      "HackerRank Certified in Problem Solving",
    ],
  },
  {
    name: "Vivek Ananth",
    title: "Cloud Data & AI Engineer",
    experience: "4+ years",
    photo: "/team/vivek_ananth.jpg",
    specialization: "Data Science & AI Engineering",
    rating: null,
    location: "Hyderabad, India",
    linkedin: "https://www.linkedin.com/in/avivek5692/",
    achievements: [
      "Cloud Data & AI Engineer at CloudIBL Technologies",
      "Google AI & Microsoft Certified · Magna M Scholar",
      "Data Scientist at Conversant (2+ yrs)",
      "Mentor at Upscalar",
    ],
  },
  {
    name: "Shahar Banu",
    title: "Senior DevOps Specialist",
    experience: "17+ years",
    photo: "/team/shahar_banu.jpg",
    specialization: "Cloud, DevOps & AWS",
    rating: null,
    location: "Hyderabad, India",
    linkedin: "https://www.linkedin.com/in/shaharbanu/",
    achievements: [
      "Senior DevOps Specialist at Equisoft (May 2023–present)",
      "Ex-AWS DevOps Engineer & Keynote Speaker (6 yrs)",
      "AWS Certified · 5G Evangelist · D&I Advocate",
      "CSIR College of Engineering graduate",
    ],
  },
  {
    name: "Ajeya B Jois",
    title: "Senior ML Scientist",
    experience: "7 years",
    photo: "/team/ajeya_b_jois.jpg",
    specialization: "Machine Learning & GenAI",
    rating: null,
    location: "Bengaluru, India",
    linkedin: "https://www.linkedin.com/in/ajeyabjois/",
    achievements: [
      "Senior ML Scientist at PayPal · XGBoost Fraud Detection",
      "Ex-Oracle Data Scientist 3 (2 yrs 9 mos)",
      "Ex-Qualcomm Data Scientist (3+ yrs)",
      "BITS Pilani graduate",
    ],
  },
  {
    name: "Yash Mittal",
    title: "Senior Consultant",
    experience: "5+ years",
    photo: "/team/yash_mittal.jpg",
    specialization: "Mobile & AI-First Development",
    rating: null,
    location: "India",
    linkedin: "https://www.linkedin.com/in/yashmittal00/",
    achievements: [
      "Senior Consultant at Thoughtworks (Jul 2025–present)",
      "AI-First Developer with LLMs, Flutter & React",
      "Open Source Contributor",
      "Amrita Vishwa Vidyapeetham graduate",
    ],
  },
  {
    name: "Gaddam Mallesham",
    title: "Senior Government Official",
    experience: "15+ years",
    photo: "/team/gaddam_mallesham.jpg",
    specialization: "Public Administration & Governance",
    rating: null,
    location: "Telangana, India",
    linkedin:
      "https://www.linkedin.com/in/gaddam-mallesham-ba760117a?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    achievements: [
      "Senior Gazetted Officer, Telangana",
      "Government relations & strategic advisory",
    ],
  },
  {
    name: "Dr. Srinivas Kaveti",
    title: "International Lawyer",
    experience: "35+ years",
    photo: "/team/srinivas_kaveti.jpg",
    specialization: "International & AI Law",
    rating: null,
    location: "USA, UK & India",
    linkedin:
      "https://www.linkedin.com/in/dr-srinivas-kaveti?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    achievements: [
      "Doctorate in Law (Artificial Intelligence)",
      "Vice President at Ramseyer & Associates, USA",
      "Media legal expert on national & international TV",
    ],
  },
  {
    name: "Nomaan Abdul Majeed",
    title: "CMO International",
    experience: "20+ years",
    photo: "/team/nomaan_abdul_majeed.jpg",
    specialization: "International Marketing & Entrepreneurship",
    rating: null,
    location: "Hyderabad, India",
    linkedin:
      "https://www.linkedin.com/in/nomaan-abdul-majeed-7051645?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    achievements: [
      "Empowering student startups & entrepreneurship ecosystem",
      "Strategic advisor at Lords Institute of Engineering",
    ],
  },
  {
    name: "Ganesh Rayala",
    title: "Tech Entrepreneur",
    experience: "15+ years",
    photo: "/team/ganesh_rayala.jpg",
    specialization: "Technology Solutions & Business Strategy",
    rating: null,
    location: "Hyderabad, India",
    linkedin:
      "https://www.linkedin.com/in/ganesh-rayala-4ab96a7?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    achievements: [
      "Founded Luvetha Tech Solutions Pvt. Ltd.",
      "Siddhartha Institute of Engineering graduate",
    ],
  },
  {
    name: "Dr. Sanjay Kulkarni",
    title: "Data & AI Transformation Leader",
    experience: "25+ years",
    photo: "/team/sanjay_kulkarni.jpeg",
    specialization: "Data & AI Educator",
    rating: null,
    location: "",
    linkedin: "https://www.linkedin.com/in/sanjay1kulkarni/",
    achievements: ["Fortune 500 experience with practical, hands-on training approach"],
  },
  {
    name: "Anuj Garg",
    title: "Engineering Manager",
    experience: "10+ years",
    photo: "/team/anuj.jpeg",
    specialization: "Full Stack & Cloud Architect",
    rating: null,
    location: "",
    linkedin: "https://www.linkedin.com/in/anuj-garg-8785805b/",
    achievements: ["Gartner · Ex-Adobe, IBM, Allstate"],
  },
  {
    name: "Rajesh Talreja",
    title: "Product Development Lead",
    experience: "13+ years",
    photo: "/team/rajesh_talreja.jpeg",
    specialization: "Java & Microservices Expert",
    rating: null,
    location: "",
    linkedin: "https://www.linkedin.com/in/rajesh-talreja-91891671/",
    achievements: ["End-to-end product development expertise"],
  },
  {
    name: "Guntuka Sekhar Reddy",
    title: "Director of Business Development and Franchise Operations",
    experience: "26+ years",
    photo: "/trainers/sheaker_reddy.jpeg",
    specialization: "Business Development | Franchise Operations | Strategic Expansion",
    rating: null,
    location: "",
    linkedin: "https://www.linkedin.com/in/guntuka-sekhar-reddy-40465b193/",
    achievements: [
      "Logistics Business Development & Operations — 10 years (Venkateshwara Goods Carriers)",
      "Agro Products & Real Estate — 9 years (Avani Bioventures)",
      "IT Solutions, Franchising & Social Media — 7 years",
    ],
  },
  {
    name: "Kranthi Priya",
    title: "Chief Business Head (Technical)",
    experience: "Managing Partner at IGNAI (2018–2025)",
    photo: "/trainers/Kranthi_Priya.jpeg",
    specialization:
      "Educational Technology | Child Development | New Business Development | Marketing Strategy",
    rating: null,
    location: "Hyderabad, India",
    linkedin:
      "https://www.linkedin.com/in/kranthi-priya-aa00a2123?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    achievements: [
      "EdTech Innovator shaping future-ready kids",
      "Marketing, Sales & Analytics — Indian School of Business (Grade A · 97%)",
      "Integrating technology with child development principles",
    ],
  },
];

export const press = [
  {
    image: "/gallery/et-achievers-stage.jpg",
    tag: "Award",
    category: "Awards",
    outlet: "ET Industry Achievers, AP & Telangana 2025–26",
    blurb:
      "On stage at the ET Industry Achievers Awards, AP & Telangana 2025–26 — an initiative by The Times of India.",
    w: 2048,
    h: 1152,
  },
  {
    image: "/gallery/press-sakshi.jpg",
    tag: "Press",
    category: "Press",
    outlet: "Sakshi",
    blurb:
      "Sakshi: Osmania University's UCE signs an MoU with AI Linc Technologies to advance student training in Artificial Intelligence, Machine Learning, and Data Analytics.",
    w: 400,
    h: 950,
  },
  {
    image: "/gallery/press-hans-india.jpg",
    tag: "Press",
    category: "Press",
    outlet: "Hans India",
    blurb:
      "Hans India: \"OU's UCE partners with AI LINC to upskill students in AI, ML, and data analytics\" — the MoU was formalised under Vice-Chancellor Prof. Kumar Molugaram.",
    w: 521,
    h: 414,
  },
  {
    image: "/gallery/press-namaste-telangana.jpg",
    tag: "Press",
    category: "Press",
    outlet: "Namaste Telangana",
    blurb:
      "Namaste Telangana: Osmania University's engineering college partners with AI Linc Technologies to build AI and ML skills among students through a formal understanding agreement.",
    w: 1039,
    h: 859,
  },
  {
    image: "/gallery/et-achievers-award.jpg",
    tag: "Award",
    category: "Awards",
    featured: true,
    outlet: "The Times of India · Economic Times",
    blurb:
      "Shubham Lal, Founder & CEO of AI Linc, receives the ET Industry Achievers award as Emerging Leader in AI & Technology Education.",
    w: 2048,
    h: 1366,
  },
  {
    image: "/gallery/press-andhraprabha.jpg",
    tag: "Press",
    category: "Press",
    outlet: "Andhra Prabha",
    blurb:
      "Andhra Prabha: Osmania University's UCE inks an understanding agreement with AI Linc Technologies to strengthen AI and ML skill-building for engineering students.",
    w: 1280,
    h: 614,
  },
  {
    image: "/gallery/press-hyderabad-headlines.jpg",
    tag: "Press",
    category: "Press",
    outlet: "Hyderabad Headlines",
    blurb:
      "Hyderabad Headlines: \"Osmania University's UCE joins hands with AI LINC to drive AI, ML & Data Analytics upskilling\" in a landmark academia-industry MoU.",
    w: 770,
    h: 560,
  },
  {
    image: "/gallery/press-shubham-feature.jpg",
    tag: "Feature",
    category: "Press",
    outlet: "Print feature",
    blurb:
      "\"Shaping the future through AI innovation and EdTech solutions\" — a profile of Shubham Lal's path from Microsoft engineer to Founder & CEO of AI Linc Technologies.",
    w: 780,
    h: 597,
  },
  {
    image: "/gallery/press-andhraprabha-2.jpg",
    tag: "Press",
    category: "Press",
    outlet: "Andhra Prabha",
    blurb:
      "Andhra Prabha: Further coverage of the Osmania University–AI Linc Technologies MoU, signed to advance AI and ML skill development on campus.",
    w: 1280,
    h: 589,
  },
  {
    image: "/gallery/press-telugu-prabha.jpg",
    tag: "Press",
    category: "Press",
    outlet: "Telugu Prabha",
    blurb:
      "Telugu Prabha: \"AI Linc ushers in a new era of skill development in data analytics\" — reporting on the Osmania University MoU signing.",
    w: 1280,
    h: 925,
  },
  {
    image: "/gallery/press-prajavakyam.jpg",
    tag: "Press",
    category: "Press",
    outlet: "Prajavakyam",
    blurb:
      "Prajavakyam: Osmania University's UCE signs an understanding agreement with AI Linc Technologies to build AI, ML, and data-analytics capability among engineering students.",
    w: 691,
    h: 1280,
  },
  {
    image: "/linkedIn/1787220556895.jpg",
    tag: "Milestone",
    category: "Talks",
    outlet: "AILinc expands to Saudi Arabia",
    blurb:
      "AILinc expands its wings to Saudi Arabia, spanning Jeddah, Riyadh, and Dammam — a step toward becoming a GLOCAL company across the GCC.",
    w: 800,
    h: 1066,
  },
  {
    image: "/linkedIn/1784618548650.jpg",
    event: "zskillup-prephasz",
    tag: "Panel",
    category: "Talks",
    outlet: "Industry Leadership Panel, moderated by Shubham Lal",
    blurb:
      "Moderating a panel with leaders twice his age, Shubham Lal called it surreal — struck by \"the incredible combination of extraordinary achievements and genuine humility.\"",
    w: 800,
    h: 533,
  },
  {
    image: "/linkedIn/1785848002390.jpg",
    event: "zskillup-prephasz",
    tag: "Product Launch",
    category: "Talks",
    outlet: "prephasz by ZSkillup, in partnership with AILinc",
    blurb:
      "From countless discussions and late nights to launch day — prephasz by ZSkillup goes live, built in partnership with AILinc.",
    w: 800,
    h: 533,
  },
  {
    image: "/linkedIn/1782932788524.jpg",
    tag: "Panel Speaker",
    category: "Talks",
    outlet: "Full Stack Academy — Super 40 BBA launch",
    blurb:
      "Honored as panel speaker at the launch of Full Stack Academy's Super 40 BBA Program, discussing academia-industry readiness and real-world skill building.",
    w: 800,
    h: 533,
  },
  {
    image: "/linkedIn/1782932789376.jpg",
    tag: "Panel Speaker",
    category: "Talks",
    outlet: "Full Stack Academy — Super 40 BBA launch",
    blurb:
      "Backstage at the Super 40 BBA launch — bridging academia and industry with practical, career-ready learning.",
    w: 800,
    h: 533,
  },
  {
    image: "/linkedIn/1780052619051.jpg",
    tag: "Feature",
    category: "Press",
    outlet: "Business Outreach — Strategic Leadership Edition",
    blurb:
      "\"Strategic leadership curating scalability across EdTech and software development\" — Business Outreach profiles AILinc's growth from mentorship to a 1M+ learner ecosystem.",
    w: 800,
    h: 1028,
  },
  {
    image: "/linkedIn/1781956543912.jpg",
    tag: "Award",
    category: "Awards",
    featured: true,
    outlet: "Business Outreach — 30 Under 30, 2026",
    blurb:
      "\"Manifestations do come true.\" Named to the Business Outreach 30 Under 30 — honouring the founders and builders shaping the future of technology.",
    w: 800,
    h: 1000,
  },
  {
    image: "/linkedIn/1781956547221.jpg",
    tag: "Feature",
    category: "Press",
    outlet: "Business Outreach — EdTech & AI Leadership",
    blurb:
      "Profiled as a visionary entrepreneur and AI innovator transforming EdTech — leading AILinc and Leapify Technologies to make technology more accessible and growth-driven.",
    w: 800,
    h: 1422,
  },
  {
    image: "/linkedIn/1777711236954.jpg",
    tag: "Award",
    category: "Awards",
    outlet: "The Times of India · ET Industry Achievers",
    blurb:
      "Honoured as Emerging Leader in AI & Innovation at the ET Industry Achievers, AP & Telangana — presented by The Times of India.",
    w: 800,
    h: 800,
  },
  {
    image: "/linkedIn/1776245178959.jpg",
    tag: "Keynote",
    category: "Talks",
    outlet: "CSI Student Chapter Inauguration, Guru Nanak University",
    blurb:
      "Serving as chief guest and keynote speaker at the inauguration of the CSI Student Chapter at Guru Nanak University.",
    w: 800,
    h: 1066,
  },
  {
    image: "/linkedIn/1776245179055.jpg",
    tag: "Keynote",
    category: "Talks",
    outlet: "CSI Student Chapter Inauguration, Guru Nanak University",
    blurb:
      "Receiving a memento of appreciation from Guru Nanak University for the CSI Student Chapter inauguration address.",
    w: 800,
    h: 1066,
  },
  {
    image: "/linkedIn/1776245181371.jpg",
    tag: "Keynote",
    category: "Talks",
    outlet: "CSI Student Chapter Inauguration, Guru Nanak University",
    blurb:
      "On stage with fellow guests of honour at the CSI Student Chapter inauguration, Guru Nanak University.",
    w: 800,
    h: 1066,
  },
  {
    image: "/linkedIn/1779458059315.jpg",
    tag: "Masterclass",
    category: "Talks",
    outlet: "CU Online Live Masterclass, Chandigarh University",
    blurb:
      "Live masterclass on \"How to 10X Your Productivity with Agentic AI\" for CU Online — covering Cursor, Netlify, Napkin AI, and Claude.",
    w: 800,
    h: 1000,
  },
];

export const nav = [
  { label: "Company", href: "/#company" },
  { label: "Technology", href: "/#technology" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Team", href: "/team" },
];
