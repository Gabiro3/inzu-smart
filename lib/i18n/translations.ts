export type Language = "en" | "fr"

export const translations = {
  en: {
    nav: {
      home: "HOME",
      projects: "PROJECTS",
      services: "SERVICES",
      about: "ABOUT",
      contacts: "CONTACTS",
    },
    services: {
      architecture: "ARCHITECTURE",
      engineering: "ENGINEERING",
      consultancy: "CONSULTANCY",
      projectManagement: "PROJECT MANAGEMENT",
      materialSupply: "MATERIAL SUPPLY",
      ourServices: "Our Services",
      learnMore: "Learn More",
      bookConsultation: "Book a Consultation",
      whyChoose: "Why Choose Our",
      services: "Services?",
      whyChooseDescription: "At INZU SMART, we combine professional expertise with digital technology to deliver exceptional results. Our",
      whyChooseDescriptionEnd: "services are designed to help you achieve your goals efficiently and effectively.",
      contactUs: "Contact us today to learn more about how we can help with your project.",
      serviceNotFound: "Service Not Found",
      serviceNotFoundDescription: "The service you're looking for doesn't exist.",
      viewAllServices: "View All Services",
    },
    about: {
      companyOverview: "Company Overview",
      designPhilosophy: "Design Philosophy",
      vision: "Vision",
      mission: "Mission",
      founded: "Founded in",
      companyDescription: "is an architecture and construction solutions company supported by an AI-powered digital platform. Based in",
      companyAim: "the company aims to democratize access to smart, affordable, and culturally relevant housing across Africa.",
    },
    projects: {
      properties: "Properties",
      discoverAll: "Discover All Our Properties",
      exploreCollection: "Explore our complete collection of AI-designed real estate projects.",
      searchPlaceholder: "Search properties...",
      allCategories: "All Categories",
      allPrices: "All Prices",
      under500k: "Under $500K",
      priceRange500k1m: "$500K - $1M",
      over1m: "Over $1M",
      applyFilters: "Apply Filters",
      showing: "Showing",
      of: "of",
      propertiesCount: "properties",
      noPropertiesFound: "No properties found matching your criteria.",
      clearFilters: "Clear Filters",
    },
    common: {
      bookConsultation: "Book a Consultation",
    },
  },
  fr: {
    nav: {
      home: "ACCUEIL",
      projects: "PROJETS",
      services: "SERVICES",
      about: "À PROPOS",
      contacts: "CONTACTS",
    },
    services: {
      architecture: "ARCHITECTURE",
      engineering: "INGÉNIERIE",
      consultancy: "CONSEIL",
      projectManagement: "GESTION DE PROJET",
      materialSupply: "APPROVISIONNEMENT EN MATÉRIAUX",
      ourServices: "Nos Services",
      learnMore: "En savoir plus",
      bookConsultation: "Réserver une consultation",
      whyChoose: "Pourquoi choisir nos",
      services: "services?",
      whyChooseDescription: "Chez INZU SMART, nous combinons l'expertise professionnelle avec la technologie numérique pour offrir des résultats exceptionnels. Nos",
      whyChooseDescriptionEnd: "services sont conçus pour vous aider à atteindre vos objectifs de manière efficace et efficiente.",
      contactUs: "Contactez-nous dès aujourd'hui pour en savoir plus sur la façon dont nous pouvons vous aider avec votre projet.",
      serviceNotFound: "Service introuvable",
      serviceNotFoundDescription: "Le service que vous recherchez n'existe pas.",
      viewAllServices: "Voir tous les services",
    },
    about: {
      companyOverview: "Aperçu de l'entreprise",
      designPhilosophy: "Philosophie de conception",
      vision: "Vision",
      mission: "Mission",
      founded: "Fondée en",
      companyDescription: "est une entreprise de solutions d'architecture et de construction soutenue par une plateforme numérique alimentée par l'IA. Basée à",
      companyAim: "l'entreprise vise à démocratiser l'accès à des logements intelligents, abordables et culturellement pertinents à travers l'Afrique.",
    },
    projects: {
      properties: "Propriétés",
      discoverAll: "Découvrez toutes nos propriétés",
      exploreCollection: "Explorez notre collection complète de projets immobiliers conçus par IA.",
      searchPlaceholder: "Rechercher des propriétés...",
      allCategories: "Toutes les catégories",
      allPrices: "Tous les prix",
      under500k: "Moins de 500K $",
      priceRange500k1m: "500K $ - 1M $",
      over1m: "Plus de 1M $",
      applyFilters: "Appliquer les filtres",
      showing: "Affichage de",
      of: "sur",
      propertiesCount: "propriétés",
      noPropertiesFound: "Aucune propriété trouvée correspondant à vos critères.",
      clearFilters: "Effacer les filtres",
    },
    common: {
      bookConsultation: "Réserver une consultation",
    },
  },
} as const

export const getServiceDescription = (serviceId: string, lang: Language): string => {
  const descriptions: Record<string, Record<Language, string>> = {
    architecture: {
      en: "We help our clients who are unsure what to build or invest in architecturally by providing essential clarity and direction. Our role is to act as a strategic advisor, defining the highest and best use for their property or site. This involves conducting feasibility studies, defining the functional program, and mitigating potential risks before they commit to expensive design or construction phases. Ultimately, we ensure their architectural investment is well-defined, aligned with their goals, and set up for maximum success from day one.",
      fr: "Nous aidons nos clients qui ne savent pas quoi construire ou investir architecturalement en fournissant une clarté et une orientation essentielles. Notre rôle est d'agir en tant que conseiller stratégique, en définissant l'utilisation la plus élevée et la meilleure pour leur propriété ou leur site. Cela implique de mener des études de faisabilité, de définir le programme fonctionnel et d'atténuer les risques potentiels avant qu'ils ne s'engagent dans des phases de conception ou de construction coûteuses. En fin de compte, nous nous assurons que leur investissement architectural est bien défini, aligné sur leurs objectifs et configuré pour un succès maximum dès le premier jour.",
    },
    engineering: {
      en: "We provide comprehensive engineering services that ensure your project is structurally sound, efficient, and compliant with all regulations. Our engineering team works closely with architects and contractors to deliver integrated solutions that optimize performance, sustainability, and cost-effectiveness throughout the entire construction process.",
      fr: "Nous fournissons des services d'ingénierie complets qui garantissent que votre projet est structurellement solide, efficace et conforme à toutes les réglementations. Notre équipe d'ingénieurs travaille en étroite collaboration avec les architectes et les entrepreneurs pour fournir des solutions intégrées qui optimisent les performances, la durabilité et le rapport coût-efficacité tout au long du processus de construction.",
    },
    consultancy: {
      en: "We help our clients who are unsure what to build or invest in architecturally by providing essential clarity and direction. Our role is to act as a strategic advisor, defining the highest and best use for their property or site. This involves conducting feasibility studies, defining the functional program, and mitigating potential risks before they commit to expensive design or construction phases. Ultimately, we ensure their architectural investment is well-defined, aligned with their goals, and set up for maximum success from day one.",
      fr: "Nous aidons nos clients qui ne savent pas quoi construire ou investir architecturalement en fournissant une clarté et une orientation essentielles. Notre rôle est d'agir en tant que conseiller stratégique, en définissant l'utilisation la plus élevée et la meilleure pour leur propriété ou leur site. Cela implique de mener des études de faisabilité, de définir le programme fonctionnel et d'atténuer les risques potentiels avant qu'ils ne s'engagent dans des phases de conception ou de construction coûteuses. En fin de compte, nous nous assurons que leur investissement architectural est bien défini, aligné sur leurs objectifs et configuré pour un succès maximum dès le premier jour.",
    },
    "project-management": {
      en: "We oversee your entire construction project from conception to completion, ensuring timely delivery, budget adherence, and quality standards. Our project management team coordinates all stakeholders, manages schedules, tracks progress, and resolves issues proactively to keep your project on track and within budget.",
      fr: "Nous supervisons l'ensemble de votre projet de construction de la conception à la réalisation, en garantissant une livraison dans les délais, le respect du budget et les normes de qualité. Notre équipe de gestion de projet coordonne tous les intervenants, gère les calendriers, suit les progrès et résout les problèmes de manière proactive pour maintenir votre projet sur la bonne voie et dans le budget.",
    },
    "material-supply": {
      en: "We also simplify and lower the costs of your entire construction process by managing the procurement and supply of construction materials directly. We bypass traditional, multi-layered suppliers and work straight with the producers and manufacturers. This strategy ensures you receive high-quality materials at the lowest possible prices because we eliminate the middlemen markups. This not only significantly reduces your project budget but also streamlines the timeline, guaranteeing materials are delivered when and where they are needed, making the construction process faster and easier.",
      fr: "Nous simplifions également et réduisons les coûts de l'ensemble de votre processus de construction en gérant directement l'approvisionnement et la fourniture de matériaux de construction. Nous contournons les fournisseurs traditionnels à plusieurs niveaux et travaillons directement avec les producteurs et les fabricants. Cette stratégie garantit que vous recevez des matériaux de haute qualité aux prix les plus bas possibles car nous éliminons les majorations des intermédiaires. Cela réduit non seulement considérablement le budget de votre projet, mais rationalise également le calendrier, garantissant que les matériaux sont livrés au moment et à l'endroit où ils sont nécessaires, rendant le processus de construction plus rapide et plus facile.",
    },
  }

  return descriptions[serviceId]?.[lang] || descriptions[serviceId]?.en || ""
}

export const getServiceTitle = (serviceSlug: string, lang: Language): string => {
  const titles: Record<string, Record<Language, string>> = {
    architecture: {
      en: "Architecture",
      fr: "Architecture",
    },
    engineering: {
      en: "Engineering",
      fr: "Ingénierie",
    },
    consultancy: {
      en: "Consultancy",
      fr: "Conseil",
    },
    "project-management": {
      en: "Project Management",
      fr: "Gestion de projet",
    },
    "material-supply": {
      en: "Material Supply",
      fr: "Approvisionnement en matériaux",
    },
  }

  return titles[serviceSlug]?.[lang] || titles[serviceSlug]?.en || ""
}

export const getServiceName = (serviceSlug: string, lang: Language): string => {
  const names: Record<string, Record<Language, string>> = {
    architecture: {
      en: "ARCHITECTURE",
      fr: "ARCHITECTURE",
    },
    engineering: {
      en: "ENGINEERING",
      fr: "INGÉNIERIE",
    },
    consultancy: {
      en: "CONSULTANCY",
      fr: "CONSEIL",
    },
    "project-management": {
      en: "PROJECT MANAGEMENT",
      fr: "GESTION DE PROJET",
    },
    "material-supply": {
      en: "MATERIAL SUPPLY",
      fr: "APPROVISIONNEMENT EN MATÉRIAUX",
    },
  }

  return names[serviceSlug]?.[lang] || names[serviceSlug]?.en || ""
}

export const getCompanyInfo = (lang: Language) => {
  const companyInfo: Record<Language, {
    tagline: string
    purpose: string
    designPhilosophy: string
    vision: string
    mission: string
  }> = {
    en: {
      tagline: "Building smarter, living better.",
      purpose: "INZU SMART exists to make the process of designing, planning, and building homes easier and more accessible. By combining professional expertise with digital technology, the company helps clients make smarter decisions and achieve better building outcomes.",
      designPhilosophy: "Our design philosophy is rooted in simplicity, functionality, sustainability, and cultural relevance. We create spaces that respond to local climate, local materials, and community needs while integrating modern aesthetics and smart building strategies.",
      vision: "To become one of Africa's leading provider of intelligent, accessible, and culturally grounded housing solutions.",
      mission: "To combine architectural expertise with smart technology to help individuals and communities design and build safer, better, and more affordable homes.",
    },
    fr: {
      tagline: "Construire plus intelligemment, vivre mieux.",
      purpose: "INZU SMART existe pour rendre le processus de conception, de planification et de construction de maisons plus facile et plus accessible. En combinant l'expertise professionnelle avec la technologie numérique, l'entreprise aide les clients à prendre des décisions plus intelligentes et à obtenir de meilleurs résultats de construction.",
      designPhilosophy: "Notre philosophie de conception est ancrée dans la simplicité, la fonctionnalité, la durabilité et la pertinence culturelle. Nous créons des espaces qui répondent au climat local, aux matériaux locaux et aux besoins de la communauté tout en intégrant une esthétique moderne et des stratégies de construction intelligentes.",
      vision: "Devenir l'un des principaux fournisseurs de solutions de logement intelligentes, accessibles et culturellement ancrées en Afrique.",
      mission: "Combiner l'expertise architecturale avec la technologie intelligente pour aider les individus et les communautés à concevoir et construire des maisons plus sûres, meilleures et plus abordables.",
    },
  }

  return companyInfo[lang]
}

