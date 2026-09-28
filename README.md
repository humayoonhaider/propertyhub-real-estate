# PropertyHub — Real Estate Discovery Platform

> **Find a Place You'll Love to Call Home.**
> Explore thoughtfully selected properties, compare your options, and discover a place that fits your lifestyle.

PropertyHub is a fictional, modern property discovery web application conceptualized and developed by **SH Web Studio**. Designed with an editorial aesthetic, responsive layouts, client-side filtering, and local browser persistence, it serves as a showcase of high-end frontend craftsmanship.

---

## Key Features

* **Cinematic Property Search & Filtering**: Multi-criteria search across cities, property styles (Houses, Apartments, Villas, Offices, Commercial, Land), price tiers, bedrooms, bathrooms, and ownership purpose (Buy/Rent).
* **Detailed Property Showcases**: Interactive image galleries with lightbox zoom, key architectural metrics, covered area calculations, amenities checklist, and structured highlights.
* **Interactive Favorites & Shortlists**: Save and compare properties locally in the browser with real-time badge updates and instant persistence via `localStorage`.
* **Client-Side Property Inquiries**: Simulated inquiry flows with full form validation, saving leads locally without transmitting sensitive private data.
* **"List a Property" Demo Portal**: Add new custom listings directly to the active catalog with instantaneous UI updates and localStorage sync.
* **Advisor & Agent Directory**: Fictional specialist profiles with direct contact modals and portfolio details.
* **100% Frontend-Only Architecture**: Zero server dependencies, zero required environment variables, and instant deployment compatibility with Vercel and static web hosts.
* **Full Responsive Fidelity**: Tested across desktop (1440px/1200px), tablet (992px/768px), and mobile (480px/375px) viewports with zero horizontal overflow.

---

## Tech Stack

* **React 19**
* **TypeScript & Vite**
* **Tailwind CSS v4**
* **React Router v7**
* **Lucide Icons**
* **Browser localStorage API**

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
The application will launch locally on `http://localhost:3000`.

### 3. Build for Production
```bash
npm run build
```

---

## Vercel Deployment

PropertyHub is 100% frontend-ready and pre-configured for direct deployment on **Vercel**:

1. Push this repository to GitHub or GitLab.
2. Import the repository in your [Vercel Dashboard](https://vercel.com).
3. Framework Preset will auto-detect as **Vite**.
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. **No Environment Variables** are required!
7. The included `vercel.json` ensures all client-side routes (`/properties`, `/agents`, `/favorites`, etc.) resolve seamlessly on deep linking and page refresh.

---

## Important Disclaimer

**PropertyHub is a fictional concept project created by SH Web Studio for portfolio and demonstration purposes. Property listings, agents, contact information, prices, and other business information shown in the application are fictional demo content.**
