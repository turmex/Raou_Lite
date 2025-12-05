# RAOU - Curated Travel Experiences

An enterprise-grade luxury travel agency website built with modern web technologies, featuring bespoke travel experiences, destinations worldwide, and intuitive trip planning.

## 🌟 Overview

RAOU is a boutique travel agency offering curated, high-end travel experiences across the globe. The website showcases:

- **Bespoke Travel Services**: Tailormade experiences, family holidays, honeymoons, corporate events
- **Global Destinations**: South America, Central America, Asia, Europe, North America, Africa, Caribbean, Middle East
- **Curated Experiences**: Safari holidays, remote destinations, adventure travel, luxury experiences
- **Trip Finder**: Interactive multi-step form to help clients plan their perfect journey
- **About & Philosophy**: Company story and the 8 principles that guide their work

## 🎨 Design System

The design system emphasizes luxury, sophistication, and adventure with:

### Colors
- **Primary**: Deep charcoal (`hsl(20 14% 15%)`) - Sophisticated dark tone
- **Accent**: Warm terracotta (`hsl(18 45% 52%)`) - Adventurous highlight color
- **Warm Neutral**: Light stone (`hsl(30 35% 93%)`) - Elegant backgrounds
- **Stone**: Mid-tone (`hsl(30 8% 52%)`) - Supporting neutral

### Typography
- **Headings**: Elegant serif fonts for titles and hero text
- **Body**: Clean sans-serif for readability
- **Scale**: Comprehensive type scale from text-xs to text-7xl

### Visual Effects
- **Gradients**: Hero overlays and card overlays for image depth
- **Shadows**: Luxury shadow (`--shadow-luxury`) and card shadow (`--shadow-card`)
- **Animations**: Fade-in, fade-in-up, scale-in, and slide-in effects
- **Transitions**: Smooth 400ms cubic-bezier transitions

## 🏗️ Architecture

### Pages
1. **Home** (`/`) - Hero section, featured experiences, destinations, CTAs
2. **About** (`/about`) - Company story, philosophy, values
3. **Contact** (`/contact`) - Contact form, office information
4. **Destinations** (`/destinations`) - Regional destination grids
5. **Experiences** (`/experiences`) - Travel experience categories
6. **Experience Detail** (`/experiences/:slug`) - Individual experience pages
7. **Trip Finder** (`/trip-finder`) - 4-step journey planning wizard

### Components
- **Navigation** - Responsive mega-menu with dropdowns
- **Footer** - Multi-column footer with newsletter signup
- **Cards** - Reusable card components with hover effects
- **Forms** - Contact and trip finder forms with validation

### Key Features
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Smooth scroll animations and transitions
- ✅ SEO optimized with semantic HTML and meta tags
- ✅ Accessible navigation and forms
- ✅ Image optimization with lazy loading
- ✅ Toast notifications for form submissions

## 🛠️ Technology Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS with design tokens
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **Forms**: React Hook Form
- **Notifications**: Sonner toast library
- **State Management**: TanStack Query

## 📁 Project Structure

```
src/
├── assets/              # Images from presentation
│   ├── hero-background.jpg
│   ├── logo.jpg
│   ├── bespoke-travel.jpg
│   ├── family-holidays.jpg
│   ├── honeymoons.jpg
│   ├── safari-holidays.jpg
│   ├── remote-destinations.jpg
│   └── unusual-holidays.jpg
├── components/
│   ├── ui/             # shadcn/ui components
│   ├── Navigation.tsx  # Main navigation with mega-menu
│   └── Footer.tsx      # Site footer
├── pages/
│   ├── Home.tsx        # Landing page
│   ├── About.tsx       # About RAOU
│   ├── Contact.tsx     # Contact form
│   ├── Destinations.tsx # Destinations overview
│   ├── Experiences.tsx  # Experiences overview
│   ├── ExperienceDetail.tsx # Individual experience
│   ├── TripFinder.tsx   # Multi-step trip planner
│   └── NotFound.tsx     # 404 page
├── hooks/              # Custom React hooks
├── lib/                # Utilities
├── App.tsx             # App router configuration
├── index.css           # Design system & Tailwind
└── main.tsx            # App entry point
```

## 🎯 Content Structure

### Destinations
- South America (Argentina, Brazil, Chile, Peru, Colombia, Ecuador)
- Central America (Costa Rica, Panama, Guatemala, Belize)
- Asia (Japan, Thailand, Indonesia, Vietnam, India, Sri Lanka)
- Europe (Italy, France, Spain, Greece, Portugal, Switzerland)
- North America (USA, Canada, Mexico)
- Africa (South Africa, Kenya, Tanzania, Morocco, Botswana, Rwanda)
- The Caribbean (Bahamas, Jamaica, Barbados, St. Lucia)
- Middle East (UAE, Jordan, Oman, Israel)

### Experiences

**Who's Traveling**
- Family Holidays
- Honeymoons
- Couples Holidays
- Solo Holidays
- Group Holidays

**What Type of Holiday**
- Safari Holidays
- Remote Destinations
- Adventure Holidays
- Beach Holidays
- Unusual Holidays
- Slow Holidays
- Train Travel

**Remarkable Experiences**
- Eclipse Service
- Proposal Travel

## 🚀 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1023px
- Desktop: ≥ 1024px
- Large Desktop: ≥ 1400px

## 🎨 Brand Philosophy

RAOU is guided by 8 core principles:
1. **Courage** - Daring to venture beyond the expected
2. **Idealism** - Believing in travel's transformative power
3. **Curiosity** - Exploring with wonder
4. **Playfulness** - Infusing joy into journeys
5. **Candour** - Honest and transparent communication
6. **Intuition** - Trusting instincts for perfect experiences
7. **Free-Spiritedness** - Embracing the unexpected
8. **Persistence** - Dedicated to exceeding expectations

## 🔮 Future Enhancements

- Backend integration with Lovable Cloud/Supabase for:
  - User authentication and accounts
  - Saved trips and wishlists
  - Booking management
  - Newsletter subscriptions
  - Contact form submissions
- AI-powered trip recommendations
- Interactive destination maps
- Customer testimonials and reviews
- Blog/travel inspiration articles
- Multi-language support
- Video backgrounds and galleries
- Live chat integration

## 📄 License

Built with Lovable - Enterprise-grade travel website for RAOU.

---

**Built with passion for travel and excellence in craft.**
