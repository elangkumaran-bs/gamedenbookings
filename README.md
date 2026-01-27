# 🎮 GameDen - Premium PS4 Gaming Lounge

![GameDen Logo](public/image-removebg-preview%20(1).png)

**Live Website:** [http://gamedenbookings.fun/](http://gamedenbookings.fun/)

## 📖 About

GameDen is a premium PlayStation 4 gaming lounge located in Gobichettipalayam, Tamil Nadu, India. We offer an immersive gaming experience with PS4 and PS4 Pro consoles, featuring the latest games, racing wheel setups, and comfortable gaming stations.

This website serves as our online booking system, allowing customers to book gaming sessions 24/7.

## ✨ Features

### 🎯 Core Features
- **Online Booking System** - Real-time availability checking and instant booking confirmation
- **Dual Console Support** - Book PS4 or PS4 Pro with Racing Wheel setup
- **Game Library** - Browse our extensive collection of latest PlayStation games
- **Flexible Time Slots** - Choose from multiple time slots (11 AM - 11 PM)
- **Multiple Players** - Support for 1-4 players per booking
- **Instant Notifications** - Email confirmations via EmailJS
- **Mobile Responsive** - Optimized for all devices (desktop, tablet, mobile)

### 🎨 Design Features
- **Modern UI/UX** - Sleek liquid glass morphism design
- **Animated Background** - Dynamic snowfall particles effect
- **Smooth Animations** - CSS animations and transitions
- **Interactive Components** - Hover effects and micro-interactions
- **Dark Theme** - Gaming-focused dark color scheme with blue/purple accents

### 🛠️ Technical Features
- **React 18** with TypeScript
- **Firebase Firestore** - Real-time database for bookings
- **EmailJS Integration** - Automated email notifications
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Vite** - Fast build tool and dev server
- **SEO Optimized** - Meta tags, structured data, sitemap
- **PWA Ready** - Progressive Web App capabilities

## 🎮 Gaming Options

### PS4 Gaming
- **Price:** ₹50 per hour
- Premium PS4 console
- Latest game library including:
  - Grand Theft Auto V
  - FIFA 24
  - Mortal Kombat 11
  - WWE 2K SmackDown
  - Red Dead Redemption 2

### PS4 Pro with Racing Wheel
- **Price:** ₹80 per hour
- Enhanced graphics and performance
- Professional racing wheel & pedals setup
- Perfect for racing enthusiasts
- Exclusive titles like Spider-Man

## 🏪 Location & Hours

**Address:**
```
1E Shanthi Nagar, PB Complex
Sathy Main Road
Gobichettipalayam, Tamil Nadu 638452
India
```

**Contact:**
- 📞 Phone: [+91 9344407141](tel:+919344407141)
- 📧 Email: [gamedenoffiz@gmail.com](mailto:gamedenoffiz@gmail.com)
- 📱 Instagram: [@game_den__](https://www.instagram.com/game_den__)

**Opening Hours:**
- Website: 24/7 online bookings
- Shop: Monday - Sunday, 11:00 AM - 11:00 PM

## 🚀 Technology Stack

### Frontend
- **React 18.3.1** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **React Router 7.9.4** - Client-side routing
- **Lucide React** - Beautiful icon library

### Backend & Services
- **Firebase 12.4.0** - Firestore database for bookings
- **EmailJS** - Email notification service
- **Netlify** - Hosting and continuous deployment

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes
- **TypeScript 5.6** - Type checking

## 📦 Installation & Setup

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager
- Git

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/elangkumaran-bs/gamedenbookings.git
cd gamedenbookings
```

2. **Install dependencies**
```bash
npm install
```

3. **Run development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

Build output will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## 🌐 Deployment

This project is configured for **Netlify** deployment with automatic CI/CD.

### Deploy to Netlify

1. **Connect to GitHub**
   - Push your code to GitHub
   - Go to [Netlify Dashboard](https://app.netlify.com)
   - Import your repository

2. **Build Settings** (auto-detected from `netlify.toml`)
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18

3. **Deploy**
   - Click "Deploy site"
   - Your site will be live in 1-2 minutes

For detailed deployment instructions, see [NETLIFY_DEPLOY.md](NETLIFY_DEPLOY.md).

## 📁 Project Structure

```
gamedenbookings/
├── public/                      # Static assets
│   ├── image-removebg-preview (1).png  # Logo
│   ├── gameden-logo.png        # Logo variant
│   ├── manifest.json           # PWA manifest
│   ├── robots.txt              # SEO robots file
│   ├── sitemap.xml             # SEO sitemap
│   └── _redirects              # Netlify redirects
├── src/
│   ├── components/             # React components
│   │   ├── Header.tsx          # Navigation header
│   │   ├── Hero.tsx            # Hero section with logo
│   │   ├── GameLibrary.tsx     # Game showcase
│   │   ├── Pricing.tsx         # Pricing cards
│   │   ├── BookingForm.tsx     # Booking form
│   │   ├── Footer.tsx          # Footer with contact
│   │   └── ...                 # Other components
│   ├── pages/                  # Page components
│   │   ├── HomePage.tsx        # Landing page
│   │   └── BookingPage.tsx     # Booking page
│   ├── lib/                    # Third-party configs
│   │   ├── firebase.ts         # Firebase setup
│   │   └── emailjs.ts          # EmailJS setup
│   ├── types/                  # TypeScript types
│   │   └── booking.ts          # Booking interfaces
│   ├── utils/                  # Utility functions
│   │   └── bookingUtils.ts     # Booking helpers
│   ├── App.tsx                 # Root component
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles
├── index.html                  # HTML template
├── netlify.toml                # Netlify configuration
├── tailwind.config.js          # Tailwind CSS config
├── tsconfig.json               # TypeScript config
├── vite.config.ts              # Vite config
└── package.json                # Dependencies

```

## 🔍 SEO Optimization

The website is fully optimized for search engines:

- ✅ Comprehensive meta tags (title, description, keywords)
- ✅ Open Graph tags for social media sharing
- ✅ Twitter Card tags
- ✅ Schema.org structured data (LocalBusiness)
- ✅ Semantic HTML structure
- ✅ Mobile-friendly and responsive
- ✅ Fast loading times with Vite
- ✅ Sitemap.xml for search engines
- ✅ Robots.txt for crawler guidance
- ✅ Canonical URLs
- ✅ Geographic meta tags for local SEO

**Target Keywords:**
- GameDen, game den bookings, gamedenbookings
- Gaming lounge Gobichettipalayam
- PS4 gaming, PlayStation 4 rental
- Gaming cafe near me, gaming parlour
- PS4 Pro booking, video game lounge

## 📱 Progressive Web App (PWA)

The website is PWA-ready with:
- Web App Manifest for installation
- Offline-capable architecture
- Mobile-first responsive design
- Touch-optimized interface

## 🎨 Design System

### Color Palette
- **Primary:** Blue (#3b82f6) - Trust and technology
- **Secondary:** Purple (#9333ea) - Gaming and entertainment
- **Accent:** Pink (#ec4899) - Energy and excitement
- **Background:** Dark slate (#0f172a) - Gaming atmosphere
- **Text:** White/Blue shades - Readability

### Typography
- **Font Family:** System fonts (-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto)
- **Headings:** Bold, large, gradient text
- **Body:** Clean, readable text sizes with proper hierarchy

### Components
- Liquid Glass Cards - Frosted glass morphism
- Animated Buttons - Hover effects and transitions
- Modal Dialogs - Smooth animations
- Form Inputs - Clear validation states

## 🤝 Contributing

This is a private project for GameDen. For any suggestions or issues, please contact:
- Email: gamedenoffiz@gmail.com
- Phone: +91 9344407141

## 👨‍💻 Developer

**Developed by:** Elangkumaran BS

### Contact
- GitHub: [@elangkumaran-bs](https://github.com/elangkumaran-bs)
- Email: gamedenoffiz@gmail.com

## 📄 License

© 2024 GameDen. All rights reserved.

## 🙏 Acknowledgments

- **Firebase** - Backend database solution
- **EmailJS** - Email notification service
- **Netlify** - Hosting platform
- **Lucide Icons** - Beautiful icon library
- **Tailwind CSS** - Styling framework
- **React Community** - Amazing ecosystem

---

**Built with ❤️ and passion for gaming**

Visit us at [http://gamedenbookings.fun/](http://gamedenbookings.fun/) or our physical location in Gobichettipalayam!

## 📞 Get in Touch

Have questions? Want to book a session? Contact us:
- 📱 Instagram: [@game_den__](https://www.instagram.com/game_den__)
- 📞 Call: +91 9344407141
- 📧 Email: gamedenoffiz@gmail.com

**Open daily from 11 AM to 11 PM. Online bookings available 24/7!** 🎮
