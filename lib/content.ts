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
  title: ["Engineering, built on", "one", "AI backbone"],
  body: "AI LINC is a Hyderabad-based technology company. We design, build and secure production systems for enterprise and public-sector clients, led by founders with enterprise engineering backgrounds and a single delivery team.",
  reach: {
    kicker: "Wherever you operate",
    scope: ["Any company", "Any domain", "Any segment", "Any country"],
    lead: "AI, web and content solutions — engineered around whatever you bring us.",
    statement: "You bring the tech requirement.",
    statementHighlight: "We build the solution.",
  },
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
  { name: "Impacteers", logo: "/logos/partners/impacteers.svg" },
  { name: "Airtribe", logo: "/logos/partners/trust/airtribe.svg" },
  { name: "FDE Academy", logo: "/logos/partners/trust/fde-academy.svg" },
];

export const awardLogos = [
  { name: "The Times of India", logo: "/logos/partners/trust/toi-crest.gif" },
  { name: "TOI", logo: "/logos/partners/trust/toi-icon.png" },
  { name: "Business Outreach", logo: "/logos/partners/trust/business-outreach.png" },
  { name: "Thapar Institute of Engineering & Technology", logo: "/logos/partners/trust/thapar.png" },
  { name: "BITS Pilani", logo: "/logos/partners/trust/bits-pilani.png" },
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
      image: "/images/cards/secure.jpg",
      logo: "/logos/clients/accreqo.png",
      flag: "/flags/sa.png",
      country: "Saudi Arabia",
      step: "01",
      title: "Multi-Tenant Compliance Intelligence Platform",
      body: "Multi-tenant accreditation and compliance platform for clinics, hospitals and academic medical centres, with role-based evidence workflows, immutable audit trails and PDPL-aligned data residency.",
      tags: ["Multi-tenant", "RBAC", "Audit trails", "PDPL"],
    },
    {
      client: "RTIH",
      image: "/images/cards/office.jpg",
      logo: "/logos/clients/rtih.png",
      flag: "/flags/in.png",
      country: "India",
      step: "02",
      title: "API-First Innovation Ecosystem Platform",
      body: "Innovation-ecosystem platform covering programme operations, partner directories and founder tooling — headless CMS with an API-driven front end and automated release pipelines.",
      tags: ["Headless CMS", "REST APIs", "CI/CD", "Cloud"],
    },
    {
      client: "Audix GRC",
      image: "/images/cards/boardroom.jpg",
      logo: "/logos/clients/audix-grc.png",
      flag: "/flags/in.png",
      country: "India",
      step: "03",
      title: "Continuous Assurance & Controls Engine",
      body: "GRC product engineering — audit workflow automation, evidence management and continuous readiness scoring, driven by a rules engine mapping controls to live system state.",
      tags: ["Rules engine", "Workflow automation", "SSO", "Security"],
    },
    {
      client: "Bahrain Institution",
      image: "/images/cards/aerial.jpg",
      logo: "/logos/clients/university-of-bahrain.png",
      flag: "/flags/bh.png",
      country: "Bahrain",
      step: "04",
      title: "Retrieval-Augmented Academic Intelligence",
      body: "Applied AI and academic content systems for a Gulf institution — retrieval-augmented generation over institutional material, with vector search and human-in-the-loop review.",
      tags: ["LLM / RAG", "Vector search", "Python", "Cloud"],
    },
    {
      client: "ZSkillup",
      image: "/images/cards/build.jpg",
      logo: "/logos/clients/zskillup.png",
      flag: "/flags/in.png",
      country: "India",
      step: "05",
      title: "Event-Driven Skills Intelligence Platform",
      body: "Upskilling platform with analytics-driven learner tracking, cohort management and automated skill assessment, built on an event-driven data pipeline feeding real-time dashboards.",
      tags: ["Event pipeline", "Auto-grading", "Analytics", "AWS"],
    },
    {
      client: "Ulektz",
      image: "/images/cards/globe.jpg",
      logo: "/logos/clients/ulektz.png",
      flag: "/flags/sg.png",
      country: "Singapore",
      step: "06",
      title: "High-Concurrency Campus Network Platform",
      body: "Education networking and campus-services platform at scale — high-concurrency APIs, distributed caching and load-tested release paths across a large institutional user base.",
      tags: ["Microservices", "Caching", "Load testing", "CDN"],
    },
    {
      client: "Jaro Education",
      image: "/images/cards/run.jpg",
      logo: "/logos/clients/jaro-education.png",
      flag: "/flags/in.png",
      country: "India",
      step: "07",
      title: "Enrolment & Programme Data Platform",
      body: "Platform engineering for an executive-education provider — enrolment funnels, cohort operations and a reporting warehouse consolidating programme and partner data.",
      tags: ["Data warehouse", "ETL", "Integrations", "Analytics"],
    },
    {
      client: "S3CE Technology Solutions",
      image: "/images/cards/office.jpg",
      logo: "/logos/clients/sage.png",
      flag: "/flags/au.png",
      country: "Australia",
      step: "08",
      title: "Cloud-Native Delivery & Observability",
      body: "Embedded engineering partnership covering build, integration and ongoing platform support — infrastructure-as-code, containerised deployment and full-stack observability.",
      tags: ["IaC", "Kubernetes", "Observability", "CI/CD"],
    },
  ],
  alsoDeliveredEyebrow: "Also delivered",
  alsoDeliveredTitle: "Advanced and specialist work",
  alsoDelivered: [
    {
      tag: "Sovereign AI",
      body: "LMS architecture for a Gulf client, designed for in-Kingdom data residency and sovereign LLM hosting.",
    },
    {
      tag: "Applied AI",
      body: "Clinical and operational AI systems for a healthcare provider group in Saudi Arabia.",
    },
    {
      tag: "Content pipelines",
      body: "Automated e-book generation pipeline converting source material into structured, publishable coursebooks.",
    },
    {
      tag: "Supply chain",
      body: "Visibility and operations platform for a logistics operator in the UAE.",
    },
    {
      tag: "Enterprise BI",
      body: "Reporting and analytics layer for an engineering group in the Kingdom, consolidating fragmented systems.",
    },
    {
      tag: "Embedded leadership",
      body: "Dedicated engineering pod plus CTO-level technology leadership for a venture-backed product company.",
    },
    {
      tag: "BFSI security",
      body: "Cybersecurity and GRC capability programmes built for banking-sector requirements.",
    },
    {
      tag: "Performance",
      body: "Load, stress and reliability programmes run ahead of high-traffic platform launches.",
    },
    {
      tag: "Modernisation",
      body: "Legacy systems decomposed into services with staged, zero-downtime cutover.",
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

export const nav = [
  { label: "Company", href: "/#company" },
  { label: "Technology", href: "/#technology" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Team", href: "/team" },
];
