<div align="center">

# ✈️ ItinerAI

**Generatore di itinerari di viaggio basato su intelligenza artificiale**
*AI-powered travel itinerary generator*

[🌍 Demo Live](https://itiner-ai-eight.vercel.app)

</div>

---

## 🇮🇹 Italiano

### Descrizione

**ItinerAI** è un'applicazione full-stack che genera itinerari di viaggio personalizzati grazie all'intelligenza artificiale. L'utente sceglie una destinazione, la durata, il budget e i propri interessi: l'AI crea un piano dettagliato giorno per giorno, con attività, consigli pratici e foto della meta.

L'app include autenticazione completa, una sezione profilo con statistiche personali, salvataggio degli itinerari, validazione semantica degli input tramite AI, dark mode e design completamente responsive.

### ✨ Funzionalità principali

- **Generazione AI di itinerari** — piani di viaggio giorno per giorno con attività, orari e consigli, generati con Google Gemini
- **Validazione intelligente** — l'AI verifica che destinazione e interessi siano reali e appropriati prima di generare
- **Autenticazione** — registrazione e login sicuri con password criptate (bcrypt) e sessioni JWT
- **Sezione profilo** — avatar, interessi personalizzati e statistiche di viaggio (itinerari creati, mete diverse, giorni totali)
- **Gestione itinerari** — salvataggio, visualizzazione dettagliata ed eliminazione dei viaggi (CRUD completo)
- **Interessi personalizzati** — gli interessi salvati nel profilo precompilano automaticamente il form di generazione
- **Foto delle destinazioni** — immagini di copertina da Unsplash, con fallback elegante in caso di immagine non disponibile
- **Dark mode** — tema chiaro/scuro con interruttore animato e persistenza della preferenza
- **Design responsive** — interfaccia ottimizzata per desktop e mobile, con menu hamburger animato

### 🛠️ Stack tecnologico

| Area | Tecnologie |
|------|------------|
| **Framework** | Next.js 16 (App Router), React |
| **Styling** | Tailwind CSS |
| **Database** | PostgreSQL (Neon), Prisma ORM |
| **Autenticazione** | Auth.js (NextAuth) |
| **AI** | Google Gemini API |
| **Immagini** | Unsplash API |
| **Deploy** | Vercel |

### 🚀 Avvio in locale

```bash
# Clona il repository
git clone https://github.com/DavideB96/ItinerAI.git
cd ItinerAI

# Installa le dipendenze
npm install

# Configura le variabili d'ambiente (vedi sotto)
# crea un file .env.local e un file .env

# Genera il client Prisma
npx prisma generate

# Avvia il server di sviluppo
npm run dev
```

L'app sarà disponibile su `http://localhost:3000`.

### 🔑 Variabili d'ambiente

Nel file `.env` (per Prisma):

```
DATABASE_URL="la-tua-stringa-di-connessione-postgresql"
```

Nel file `.env.local` (per l'app):

```
GEMINI_API_KEY="la-tua-chiave-gemini"
UNSPLASH_ACCESS_KEY="la-tua-chiave-unsplash"
AUTH_SECRET="il-tuo-segreto-authjs"
```

---

## 🇬🇧 English

### Description

**ItinerAI** is a full-stack application that generates personalized travel itineraries using artificial intelligence. Users choose a destination, duration, budget and their interests: the AI creates a detailed day-by-day plan, complete with activities, practical tips and photos of the destination.

The app features full authentication, a profile section with personal statistics, itinerary saving, AI-based input validation, dark mode and a fully responsive design.

### ✨ Key features

- **AI itinerary generation** — day-by-day travel plans with activities, schedules and tips, powered by Google Gemini
- **Smart validation** — the AI checks that destination and interests are real and appropriate before generating
- **Authentication** — secure sign-up and login with hashed passwords (bcrypt) and JWT sessions
- **Profile section** — avatar, custom interests and travel statistics (itineraries created, unique destinations, total days)
- **Itinerary management** — save, view in detail and delete trips (full CRUD)
- **Personalized interests** — interests saved in the profile auto-fill the generation form
- **Destination photos** — Unsplash cover images, with an elegant fallback when an image is unavailable
- **Dark mode** — light/dark theme with an animated toggle and persistent preference
- **Responsive design** — interface optimized for desktop and mobile, with an animated hamburger menu

### 🛠️ Tech stack

| Area | Technologies |
|------|--------------|
| **Framework** | Next.js 16 (App Router), React |
| **Styling** | Tailwind CSS |
| **Database** | PostgreSQL (Neon), Prisma ORM |
| **Authentication** | Auth.js (NextAuth) |
| **AI** | Google Gemini API |
| **Images** | Unsplash API |
| **Deployment** | Vercel |

### 🚀 Running locally

```bash
# Clone the repository
git clone https://github.com/DavideB96/ItinerAI.git
cd ItinerAI

# Install dependencies
npm install

# Set up environment variables (see below)
# create a .env.local file and a .env file

# Generate the Prisma client
npx prisma generate

# Start the development server
npm run dev
```

The app will be available at `http://localhost:3000`.

### 🔑 Environment variables

In the `.env` file (for Prisma):

```
DATABASE_URL="your-postgresql-connection-string"
```

In the `.env.local` file (for the app):

```
GEMINI_API_KEY="your-gemini-key"
UNSPLASH_ACCESS_KEY="your-unsplash-key"
AUTH_SECRET="your-authjs-secret"
```

---

## 📸 Screenshot

<div align="center">

<img width="628" height="263" alt="Screenshot 2026-06-22 150416" src="https://github.com/user-attachments/assets/28fb769c-46e5-463f-aaea-2746ad7bf447" />


<!--
Per aggiungere uno screenshot:
1. Crea una cartella "screenshots" nella radice del progetto
2. Inserisci le immagini (es. home.png, genera.png, dettaglio.png)
3. Decommenta e adatta le righe qui sotto:

![Homepage](screenshots/home.png)
![Generazione itinerario](screenshots/genera.png)
![Dettaglio viaggio](screenshots/dettaglio.png)
-->

</div>

---

<div align="center">

Realizzato da **Davide Bianchi**
[GitHub](https://github.com/DavideB96) · [LinkedIn](https://linkedin.com/in/davidebianchi96)

</div>
