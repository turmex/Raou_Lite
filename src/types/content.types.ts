export interface SiteConfig {
    name: string;
    tagline: string;
    description: string;
    companyInfo: {
        fullName: string;
        locations: string[];
        email: string;
        phone: string;
    };
    social: {
        instagram: string;
        facebook: string;
        twitter: string;
    };
}

export interface MenuItem {
    label: string;
    path: string;
    hasDropdown?: boolean;
}

export interface NavigationConfig {
    logo: string;
    menuItems: MenuItem[];
    ctaButton: {
        label: string;
        path: string;
    };
}

export interface Destination {
    region: string;
    slug: string;
    shortDescription: string;
    longDescription: string;
    image: string;
    countries: string[];
    countryLinks?: Record<string, string>;
    countryDetails?: Record<string, any>;
}

export interface JournalPost {
    title: string;
    slug: string;
    author: string;
    date: string;
    image: string;
    excerpt: string;
    content: string;
}

export interface JournalConfig {
    title: string;
    subtitle: string;
    posts: JournalPost[];
}

export interface HomeConfig {
    hero: {
        title: string;
        subtitle: string;
        subtitle_short?: string;
        subtitle_long?: string;
        image: string;
        primaryCta: { label: string; path: string };
        secondaryCta: { label: string; path: string };
    };
    intro: {
        title: string;
        text: string;
        description: string;
        description_short?: string;
        description_long?: string;
        image: string;
    };
    servicesOverview: {
        title: string;
        description: string;
        link: string;
    }[];
    howWeWork: {
        steps: {
            name: string;
            description: string;
            description_short?: string;
            description_long?: string;
        }[];
    };
    signatureDestinationsPreview: {
        title: string;
        subtitle: string;
    };
    journalPreview: {
        title: string;
        subtitle: string;
    };
}

export interface AboutConfig {
    hero: {
        title: string;
        subtitle: string;
        subtitle_short?: string;
        subtitle_long?: string;
        image: string;
    };
    content: string[];
    content_short?: string[];
    content_long?: string[];
}

export interface ServicesConfig {
    hero: {
        title: string;
        subtitle: string;
        image: string;
    };
    intro: {
        title: string;
        description: string;
    };
    dmc: {
        title: string;
        description: string;
        portfolio: string[];
    };
    curated: {
        title: string;
        subtitle: string;
        description: string;
    };
    process: {
        title: string;
        steps: {
            step: string;
            name: string;
            description: string;
        }[];
    };
    whoWeWorkWith: string;
    cta: {
        dmc: string;
        curated: string;
    };
}

export interface ContactConfig {
    hero: {
        title: string;
        subtitle: string;
    };
    emails: {
        dmc: { label: string; email: string; response: string };
        travelers: { label: string; email: string; response: string };
    };
    form: {
        title: string;
        types: {
            dmc: string;
            private: string;
        };
        commonFields: {
            name: string;
            email: string;
            phone: string;
            destination: string;
            dates: string;
        };
        dmcFields: {
            companyName: string;
            role: string;
            eventType: {
                label: string;
                options: string[];
            };
            groupSize: string;
            budget: string;
        };
        privateFields: {
            travelers: string;
            travelStyle: {
                label: string;
                options: string[];
            };
            budget: string;
            interests: string;
        };
        messageField: string;
        submitButton: string;
        successMessage: string;
    };
}

export interface FooterConfig {
    brandName: string;
    description: string;
    links: MenuItem[];
    copyright: string;
}

export interface FeatureRequest {
    id: string;
    type: string;
    title: string;
    description: string;
    priority: string;
    date: string;
}

export interface ContentConfig {
    site: SiteConfig;
    navigation: NavigationConfig;
    home: HomeConfig;
    about: AboutConfig;
    services: ServicesConfig;
    destinations: Destination[];
    journal: JournalConfig;
    contact: ContactConfig;
    footer: FooterConfig;
    featureRequests?: FeatureRequest[];
}
