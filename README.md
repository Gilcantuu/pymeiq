# PymeIQ

> Diagnóstico AI para PYMES en Latinoamérica.
> Proyecto del curso **AI-101: Free-Stack Agentic Builder Studio** — Negocios Inteligentes.
> Estudiante: Gilberto Cantú Armas · Profesora: MBA Patricia Navarro.

PymeIQ ayuda al dueño de una PYME a diagnosticar la salud de su negocio en 10 minutos respondiendo 12 preguntas, y devuelve un plan de acción priorizado, comparado con benchmarks de su industria.

Este repo es el "Setup Sprint" (Week 0): infraestructura base lista para construir las siguientes 6 semanas.

---

## 🧱 Stack

| Capa            | Tecnología        |
| --------------- | ----------------- |
| Framework       | Next.js 14 (App Router) |
| UI              | Tailwind CSS 3    |
| Hosting         | Vercel (free tier) |
| Repositorio     | GitHub            |
| Base de datos   | Supabase (free tier, sin tablas en Week 0) |
| Coding agent    | Claude Code       |
| Lenguaje        | JavaScript (ES2022) |

---

## 🚀 Cómo correrlo en local

### 1. Pre-requisitos
- Node.js **20.x** o superior — verifica con `node -v`
- npm 10+ (viene con Node) — verifica con `npm -v`
- Cuenta de GitHub
- Cuenta de Vercel (conectada a GitHub)
- Cuenta de Supabase

### 2. Clonar el repo
```bash
git clone https://github.com/<TU-USUARIO>/pymeiq.git
cd pymeiq
```

### 3. Instalar dependencias
```bash
npm install
```

### 4. Configurar variables de entorno
```bash
cp .env.example .env.local
```
Edita `.env.local` y llena los valores (ver siguiente sección).

### 5. Correr el dev server
```bash
npm run dev
```
Abre [http://localhost:3000](http://localhost:3000).

---

## 🔐 Variables de entorno

Estas variables se cargan desde `.env.local` en desarrollo y desde Vercel → Settings → Environment Variables en producción.

| Variable | Para qué sirve | Dónde obtenerla |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | URL del proyecto Supabase | Supabase → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Llave pública anónima | Supabase → Settings → API |
| `NEXT_PUBLIC_SITE_URL` | URL pública del sitio | `http://localhost:3000` en dev, tu `.vercel.app` en prod |

⚠️ **Nunca** commitees `.env.local`. Ya está en `.gitignore`.

---

## ☁️ Deploy a Vercel

1. Haz push a `main` en GitHub.
2. En vercel.com → "Add New Project" → importa tu repo.
3. Framework preset: **Next.js** (autodetectado).
4. En **Environment Variables**, agrega las 3 variables de arriba.
5. Click "Deploy". En 1–2 min tendrás tu URL pública (`pymeiq.vercel.app` o similar).
6. A partir de ahí, cada push a `main` se deploya automáticamente.

---

## 🗂️ Estructura del proyecto

```
pymeiq/
├── app/
│   ├── layout.js          # Layout raíz (Navbar + Footer)
│   ├── page.js            # Homepage `/`
│   ├── globals.css        # Tailwind base
│   └── docs/
│       └── page.js        # `/docs` placeholder
├── components/
│   ├── Navbar.js
│   ├── Footer.js
│   ├── Hero.js
│   ├── HowItWorks.js
│   ├── Roadmap.js
│   └── TechStack.js
├── public/                # Assets estáticos
├── .env.example
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── README.md
```

---

## 🧪 Tests del Week 0

Los tres self-tests manuales obligatorios se documentan en `TEST_EVIDENCE.md`:
1. Test de deploy (homepage carga, 200 OK, sin errores de consola).
2. Test de navegación (`/docs` accesible desde el navbar).
3. Test responsive (viewport 375px sin scroll horizontal).

---

## 🗺️ Roadmap del curso

| Semana | Entregable |
| ------ | ---------- |
| Week 0 | Infraestructura (este repo) |
| Week 1 | Generative Core Agent — motor diagnóstico AI |
| Week 2 | Research + Benchmarking Dashboard |
| Week 3 | Product Architecture + Pricing Simulator |
| Week 4 | Marketing Engine + Landing Page upgrade |
| Week 5 | Public Chatbot / Guided Assistant |
| Week 6 | Integrated Agentic Venture (deliverable final) |

---

## 📄 Licencia

Proyecto académico — uso educativo.
© 2026 Gilberto Cantú Armas.
