# Naya Zameen — Next.js Website

Ye aapke design (screenshot) ke mutabiq bani hui **Next.js homepage** hai — navbar, hero section, search box, featured projects, popular locations, featured properties, quick links, trusted-by aur contact CTA — sab kuch shamil hai. Ye ek **poora working Next.js project** hai — bas `npm install` chala kar seedha run ho jayega.

## Tech Stack

- **Next.js 16** (App Router)
- **React 19**
- **Tailwind CSS v4**
- **lucide-react** (icons)

Build test kar ke verify kiya hua hai — `npm run build` successfully chal chuka hai, koi error nahi.

## Zip mein kya hai?

```
naya-zameen-nextjs/
├── app/
│   ├── layout.js          → root layout
│   ├── page.js             → homepage (sab components assemble karta hai)
│   └── globals.css         → Tailwind + color theme
├── components/
│   ├── Navbar.js
│   ├── Hero.js              → hero + search box
│   ├── FeaturedProjects.js
│   ├── PopularLocations.js
│   ├── FeaturedProperties.js
│   ├── ExtraSections.js    → quick links, trusted-by, CTA banner
│   └── Footer.js
├── lib/
│   └── data.js              → sara dummy/sample data (projects, properties, locations)
├── next.config.mjs
├── package.json
└── jsconfig.json
```

**Note:** `node_modules/` aur `.next/` (build output) zip mein shamil nahi hain — inhe zip mein daalna file size ko bohot bada kar deta, aur ye khud generate ho jate hain.

## Setup Steps

**1. Zip ko extract karein**, phir terminal mein us folder ke andar jayein:
```bash
cd naya-zameen-nextjs
```

**2. Dependencies install karein:**
```bash
npm install
```

**3. Development server chalayein:**
```bash
npm run dev
```

**4. Browser mein kholein:** `http://localhost:3000` — aapko wahi design dikhega jo screenshot mein tha.

### Production build (deploy karne se pehle)
```bash
npm run build
npm run start
```

## Branding

Aapka asli logo (`public/logo-horizontal.png`) navbar aur footer mein use ho raha hai, aur icon (`app/icon.png`) favicon ke taur par lag chuka hai. Color scheme bhi logo se hi liya gaya hai:
- **Primary (Teal)** `#006679` — buttons, links, headings ka highlight
- **Accent (Gold)** `#B69C56` — "Add Property" jaisa primary call-to-action

- **Data/content**: `lib/data.js` mein `featuredProjects`, `featuredProperties`, `popularLocations` arrays edit karein — abhi ye static/dummy data hai.
- **Colors**: `app/globals.css` mein `--color-primary-*` (teal) aur `--color-accent-*` (gold) variables change karein.
- **Images**: filhal Unsplash ke placeholder images use ho rahe hain (`next.config.mjs` mein unke domain ki permission di hui hai). Apni images `public/` folder mein daal kar path replace kar dein.
- **Fonts**: filhal system font stack use ho raha hai (koi Google Fonts dependency nahi) taake bina internet ke bhi build ho sake. Chahein to `app/layout.js` mein `next/font/google` se koi bhi font add kar sakte hain.

## Next Steps (agar chahiye)

Ye abhi sirf **homepage (static UI)** hai. Agar aap chahte hain:
- Property detail page
- Working search/filter functionality
- Database se real data (Prisma/MongoDB/API integration)
- Admin panel "Add Property"
- Login/Signup (NextAuth)

...to mujhe bata dein, main wo bhi bana kar zip de dunga.
