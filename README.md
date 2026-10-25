# GoPratle | Event Requirement Posting Flow 🚀

A production-grade, full-stack requirement posting system featuring an adaptive 4-step wizard for **Event Planners**, **Performers**, and **Production Crew**. Built with **Next.js (App Router, TypeScript, bespoke CSS design tokens)** on the frontend and **Node.js + Express + MongoDB (Mongoose)** on the backend.

---

## 📋 Table of Contents
1. [Assignment Overview](#-assignment-overview)
2. [Tech Stack & Architecture](#-tech-stack--architecture)
3. [The 4-Step Adaptive Flow](#-the-4-step-adaptive-flow)
4. [MongoDB Schema & Categorization](#-mongodb-schema--categorization)
5. [REST API Documentation](#-rest-api-documentation)
6. [Getting Started (Local Zero-Config Run)](#-getting-started-local-zero-config-run)
7. [Deployment Guide (Vercel + Atlas/Render)](#-deployment-guide)
8. [5-7 Minute Screen Recording Script](#-5-7-minute-screen-recording-script)
9. [Key Decisions, Assumptions & Trade-offs](#-key-decisions-assumptions--trade-offs)
10. [Edge Cases & Future Improvements](#-edge-cases--future-improvements)

---

## 🎯 Assignment Overview

GoPratle connects event organizers with top-tier talent. This application implements a requirement posting funnel that dynamically adapts based on the target category:
- **A. Step 1 - Event Basics**: Event title, event type, date schedule (single day vs multi-day range), location (city, state, address), optional booked venue toggle, and the primary Category Selector (**Event Planner**, **Performer**, or **Crew**).
- **B. Steps 2 & 3 - Category-Specific Adaptive Fields**: Automatically swaps UI controls, input fields, riders, and headcount counters based on whether the user is hiring a Planner, Performer, or Crew.
- **C. Step 4 - Review & Submission**: Executive summary card with instant edit jump-links, direct submission to MongoDB, unique requirement code generation (e.g., `GP-PLA-2026-XXXX`), and an interactive **Requirements Directory & Explorer** to browse, search, and inspect stored records.

---

## 🛠 Tech Stack & Architecture

### Frontend
- **Framework**: Next.js 15 (App Router, TypeScript)
- **Styling**: Vanilla CSS Design Tokens, Glassmorphism, CSS Custom Properties, and responsive flex/grid layouts.
- **Icons**: Lucide React
- **State Management**: Multi-step wizard state with localized validation, instant preset filling, and draft synchronization.

### Backend
- **Runtime**: Node.js & Express.js
- **Database**: MongoDB via Mongoose ORM
- **Reliability & Zero-Config Mode**: Features an automatic resilient in-memory fallback store if a local MongoDB service is not detected, enabling instant review and zero-config evaluation.
- **Security & Middleware**: CORS (cross-origin resource sharing), Morgan request logging, custom validation & centralized error handling middleware.

### System Flow
```
┌─────────────────────────────────────────────────────────────┐
│                   Next.js Frontend (Port 3000)              │
│  ┌──────────────┐   ┌──────────────┐   ┌─────────────────┐  │
│  │ Step 1       │   │ Steps 2 & 3  │   │ Step 4          │  │
│  │ Event Basics │──>│ Adaptive     │──>│ Review Summary  │  │
│  │ & Category   │   │ Category UI  │   │ & Post to DB    │  │
│  └──────────────┘   └──────────────┘   └─────────────────┘  │
│          │                                      │           │
└──────────┼──────────────────────────────────────┼───────────┘
           │                                      │
           │ HTTP REST API                        │ POST /api/requirements
           ▼                                      ▼
┌─────────────────────────────────────────────────────────────┐
│                 Express Backend (Port 5000)                 │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ Routes: /api/requirements                             │  │
│  │ Middleware: CORS, Morgan, ErrorHandler, Validator     │  │
│  │ Controller: RequirementController                     │  │
│  └───────────────────────────────────────────────────────┘  │
│                              │                              │
│                              ▼                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ Mongoose Model (Requirement.js)                       │  │
│  │ Pre-save hook: Generates `GP-[CAT]-YYYY-XXXX` code    │  │
│  └───────────────────────────────────────────────────────┘  │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│            MongoDB Atlas / Local Database                   │
│      Collections: requirements (Categorized Storage)        │
└─────────────────────────────────────────────────────────────┘
```

---

## 🧩 The 4-Step Adaptive Flow

### Step 1: Event Basics & Category Selection
- **Event Identity**: Title, Event Type (Wedding, Corporate Conference, Concert, Birthday, Fest, Exhibition, etc.)
- **Schedule**: Toggle between Single Day or Date Range with validation.
- **Location**: City, State, Street Address, Pincode.
- **Optional Venue Toggle**: "I have already booked a specific venue" reveals Venue Name, Hall/Banquet details, and Landmarks.
- **Category Selector Deck**: 3 glowing cards representing **Event Planner**, **Performer**, and **Crew** with category badges and icons.

### Step 2: Adaptive Role Specifications
- **When Planner Selected**:
  - Planning Services multi-select chips (Full Event Planning, Day-of Coordination, Decor & Styling, Vendor Sourcing, Budget Auditing, Guest RSVP Desk, Licensing/Permits).
  - Guest Count Tier Selector (Under 50, 50-150, 150-300, 300-700, 700+ Mega Convention).
  - Concept & Theme (Royal Traditional, Cyberpunk Neon, Modern Tech Minimalist, etc.).
  - Stage & Decor Atmosphere notes.
- **When Performer Selected**:
  - Act Role (Live Band, Solo Singer, DJ/Electronic, Comedian, Emcee/Anchor, Dancers, Magician, Instrumentalist).
  - Musical / Performance Genres (Bollywood, Sufi, Pop, EDM, Rock, Classical Fusion, etc.).
  - Performance Duration (45 mins, 60 mins, 90 mins, 2 hours, Multiple sets) and Number of Sets.
- **When Crew Selected**:
  - Interactive Headcount Builder: Add positions (Sound Engineer, Lighting Tech, Camera Operator, Stagehand, Usher, Rigger, Security) with counter (+ / -) and Experience Tiers (Junior, Mid, Senior, Lead).
  - Shift Schedule: Shift model (Morning, Evening, Overnight, Full Day 12h, Split) with Report and Wrap-up times.

### Step 3: Logistics, Riders, Budget & Organizer Info
- **When Planner Selected**:
  - On-site setup days needed (1, 2, 3+ days prior).
  - Catering & F&B Tasting coordination toggle.
  - Special permits & compliance requirements (Sound permits, Police NOC).
  - Dedicated Planning Fee Budget Range (Min & Max in ₹).
- **When Performer Selected**:
  - Sound & Stage Technical Rider (PA system provision, Stage dimensions, Microphone count, In-Ear Monitors, Instrument details).
  - Hospitality & Comfort Rider (Private AC Green Room, Meals & Beverages, Outstation Accommodation, Travel reimbursement).
  - Sample Video / Audio Links (YouTube, SoundCloud, Instagram reels).
  - Performance Fee Budget Range (Min & Max in ₹).
- **When Crew Selected**:
  - Equipment & Tools Policy (BYOE - Crew brings own tools vs Organizer provides all equipment, Tools required chips).
  - Uniform & Dress Code (All Black, Formal Suit, Smart Casual, Branded T-shirt, Safety Hi-Vis).
  - Perks & Amenities (Meals provided, Travel allowance, Overtime pay).
  - Safety Certifications (Electrical License, Rigging at Heights, First Aid).
  - Compensation Calculator: Rate type (Daily/Hourly), Rate per crew member, and auto-calculated total budget estimate.
- **Universal Organizer Info**:
  - Contact Name, Email, Phone/WhatsApp, and Organization name.

### Step 4: Executive Review & Final Submission
- Unified review dashboard split into Event Basics, Category Configuration, Logistics/Riders, and Organizer Info.
- **Quick Edit Shortcuts**: Jump directly back to Step 1, 2, or 3 to modify any field.
- **Submitting to MongoDB**: Triggers `POST /api/requirements` with visual loading feedback and error handling.
- **Success Modal**: Shows celebratory animation, copyable **Requirement Code** (`GP-PLA-2026-XXXX`), MongoDB ID, and quick navigation to post another requirement or browse the live directory.

---

## 🗄 MongoDB Schema & Categorization

Requirements are stored in a unified collection (`requirements`) with strongly-typed subdocuments for each category:

```javascript
{
  requirementCode: "GP-PLA-2026-1IQP",
  title: "NexGen Fintech Summit 2026",
  eventType: "Corporate Conference",
  dateType: "range",
  startDate: "2026-11-20T00:00:00.000Z",
  endDate: "2026-11-22T00:00:00.000Z",
  location: {
    city: "Mumbai",
    state: "Maharashtra",
    address: "Jio World Convention Centre, G Block BKC",
    pincode: "400051"
  },
  venue: {
    hasSpecificVenue: true,
    name: "Lotus Ballroom & Pavilion 3",
    hallDetails: "Tiered seating for 850 attendees",
    landmark: "Next to Maker Maxity"
  },
  category: "planner", // Categorized as 'planner' | 'performer' | 'crew'
  plannerDetails: {
    services: ["Full Event Planning", "Decor & Theme Styling", "Vendor Sourcing"],
    guestCount: "700_plus",
    themePreference: "Modern Tech Minimalist with Cyberpunk Blue Lighting",
    decorStyle: "Matte black stages with 8K curved LED walls",
    cateringCoordination: true,
    setupDaysNeeded: 2,
    specialRequirements: "Dedicated speaker lounge with green screen recording.",
    plannerBudget: { min: 350000, max: 650000, currency: "INR" }
  },
  organizer: {
    name: "Aditi Deshmukh",
    email: "aditi.d@nexgenfintech.io",
    phone: "+91 98200 11223",
    organization: "NexGen Media & Conferences"
  },
  status: "published"
}
```

---

## 📡 REST API Documentation

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Server uptime and MongoDB connection telemetry |
| `POST` | `/requirements` | Create and categorize a new requirement |
| `GET` | `/requirements` | List requirements with optional `?category=planner` and `?search=...` |
| `GET` | `/requirements/:id` | Fetch requirement by MongoDB ID or readable code |
| `DELETE` | `/requirements/:id` | Delete requirement |
| `GET` | `/requirements/stats` | Aggregate counts (`total`, `planner`, `performer`, `crew`) |
| `POST` | `/requirements/seed` | Seed 3 sample requirements for quick evaluation |

---

## 🚀 Getting Started (Local Zero-Config Run)

### 1. Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### 2. Start Backend Server
```bash
cd backend
npm install
npm run dev
```
*Note: If local MongoDB is running, it connects automatically to `mongodb://127.0.0.1:27017/gopratle_db`. If not, it falls back to the in-memory emulation store for zero-config evaluation.*

### 3. Start Frontend App
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deployment Guide

### Deploying Frontend to Vercel
1. Push repository to GitHub.
2. Import project into Vercel and set Root Directory to `frontend`.
3. Add Environment Variable:
   - `NEXT_PUBLIC_API_URL`: Your deployed backend URL (e.g., `https://gopratle-api.onrender.com/api`)
4. Click **Deploy**.

### Deploying Backend to Render / Railway
1. Create a free MongoDB database at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Deploy the `backend/` folder to Render Web Service or Railway.
3. Configure Environment Variables:
   - `PORT`: `5000`
   - `MONGODB_URI`: `mongodb+srv://<user>:<password>@cluster.mongodb.net/gopratle?retryWrites=true&w=majority`
4. Set Build Command: `npm install` and Start Command: `npm start`.

---

## 🎥 5-7 Minute Screen Recording Script

Use this structured outline for your submission walkthrough video:

| Time | Segment | Speaking Points / Demonstration |
|---|---|---|
| **0:00 - 1:00** | **Introduction & Problem Understanding** | Introduce yourself and summarize the goal: building an adaptive requirement posting flow for GoPratle that supports Event Planners, Performers, and Crew with seamless MongoDB persistence. |
| **1:00 - 2:00** | **Architecture & Tech Stack** | Highlight the Next.js 15 App Router frontend with custom CSS design system, Node.js + Express backend, Mongoose schema design with category validation, and resilient fallback handling. |
| **2:00 - 3:45** | **Application Flow & Live Demo** | • Show Step 1: Fill event title, date schedule, city, and venue toggle.<br>• Click the 3 category cards to show the visual feedback.<br>• Use the "Fill Sample Data" helper to demonstrate the **Planner**, **Performer**, and **Crew** flows.<br>• Walk through Step 2 (services, genre chips, crew headcount builder) and Step 3 (sound rider, dress codes, budget calculation).<br>• Review in Step 4 and click "Confirm & Post Requirement". |
| **3:45 - 4:45** | **API & MongoDB Data Flow** | Show the browser Network tab with `POST /api/requirements` returning 201 Created and the unique code (`GP-PLA-2026-XXXX`). Open the Requirements Explorer tab and click "View Raw MongoDB JSON" to show the structured document. |
| **4:45 - 5:45** | **Edge Cases & Testing** | Show form validation (empty fields, invalid emails, required dates). Mention multi-date ranges, zero-config in-memory fallback, and CORS handling. |
| **5:45 - 6:30** | **Limitations & Future Improvements** | Discuss file upload riders (PDF riders, sound contracts), email notifications via SendGrid/Resend, user auth (NextAuth/JWT), and real-time applicant chat via WebSockets. |

---

## 💡 Key Decisions, Assumptions & Trade-offs

1. **Adaptive Subdocuments vs Schema Discriminators**:
   - Rather than storing generic unstructured key-value pairs, we designed strongly typed category subdocuments (`plannerDetails`, `performerDetails`, `crewDetails`) on the `Requirement` schema. This enables precise validation, MongoDB indexing, and clear API contracts.
2. **Resilient Dual-Mode Database**:
   - For evaluator convenience, the backend checks for MongoDB connectivity on boot. If local MongoDB is not running, it initializes an in-memory fallback store so testing works instantly out of the box.
3. **One-Click Evaluation Presets**:
   - Added a "Fill Sample Data" dropdown in the navbar for Planner, Performer, and Crew scenarios to let evaluators test the full end-to-end flow in seconds.
4. **Explorer & Raw JSON Inspector**:
   - In addition to posting, the UI includes a live Requirements Explorer with category filters and a JSON inspector to examine the MongoDB payload directly.

---

## 🛡 Edge Cases & Future Improvements

### Handled Edge Cases
- **Date Range Validation**: Ensures End Date cannot precede Start Date.
- **Dynamic Crew Counters**: Headcount cannot be decremented below 1; total estimated crew budget dynamically updates as headcount changes.
- **Optional Venue Toggle**: Gracefully handles flexible vs pre-booked venues.
- **Empty State & Seeding**: Includes a "Seed Sample Data" button so the explorer is never empty on first launch.

### Future Roadmap
- [ ] Direct PDF / Rider file uploads using AWS S3 or Cloudinary.
- [ ] User authentication (OAuth / JWT) with separate Organizer and Talent profiles.
- [ ] Real-time notification and applicant matchmaking via WebSockets.
- [ ] Interactive budget calculator with city-based market rate benchmarks.

---

*Prepared for GoPratle Full-Stack Developer Internship Technical Assignment.*
