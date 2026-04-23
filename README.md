# TelioLabs — Landing (Next.js 14 + Tailwind)

Componentización del HTML original a una app Next.js con App Router. Tipografía
**Bricolage Grotesque** (display) + **DM Sans** (body), cargadas por
`next/font/google` (sin `<link>` externos).

## Cómo correrlo

```bash
# 1. Instalar dependencias
npm install

# 2. Dev
npm run dev
# → http://localhost:3000

# 3. Build producción
npm run build && npm start
```

## Estructura

```
teliolabs/
├── app/
│   ├── layout.tsx          # Root layout + fuentes Google
│   ├── page.tsx            # Ensambla todos los componentes
│   └── globals.css         # Utilities (.sec-tag, .sec-title, .reveal)
├── components/
│   ├── Navbar.tsx          # Nav sticky navy
│   ├── ServicesCarousel.tsx  # Acordeón horizontal auto-rotación
│   ├── StatementHero.tsx   # Hero + canvas de nodos animados
│   ├── Audience.tsx        # Cards sticky-stacking
│   ├── ProcessSection.tsx  # Sticky scroll con 4 pasos
│   ├── ServicesTicker.tsx  # Carrusel infinito draggable
│   ├── CtaSection.tsx      # Quiz multi-paso + form
│   └── Footer.tsx          # 4 columnas
├── lib/
│   └── useRevealOnScroll.ts  # Hook IntersectionObserver
├── tailwind.config.ts      # Paleta + fuentes
├── next.config.js          # Permite imágenes de Unsplash
├── tsconfig.json
├── postcss.config.js
└── package.json
```

## Paleta (expuesta como clases Tailwind)

| Token | Valor | Clase |
|---|---|---|
| navy | `#060C18` | `bg-navy` `text-navy` |
| accent | `#4A6FE8` | `bg-accent` `text-accent` |
| accent-light | `#A8BEFF` | `bg-accent-light` |
| accent-dim | `#EBF0FF` | — |
| text | `#0D1828` | `text-text` |
| muted | `#6B7D9C` | `text-muted` |
| border | `#E2E8F0` | `border-border` |
| surface | `#F5F7FA` | `bg-surface` |

## Tipografía

- **Bricolage Grotesque** → clase `font-display` (headings, logos, títulos)
- **DM Sans** → clase `font-sans` (default, body)

Se cargan en `app/layout.tsx` con `next/font/google`, lo que las auto-aloja
(zero CLS, zero request a fonts.googleapis.com en runtime).

## Animaciones — sin GSAP

Decidí usar vanilla `requestAnimationFrame` + `IntersectionObserver` en lugar
de GSAP porque los efectos que usa el sitio son simples (ticker infinito,
sticky-scroll de 4 pasos, reveal on scroll) y GSAP añadiría ~40KB al bundle
sin beneficio visible.

**Si prefieres GSAP**, instala:
```bash
npm i gsap
```
Y reemplaza el `useEffect` de scroll en `ProcessSection.tsx` por:
```ts
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.create({
  trigger: sectionRef.current,
  start: "top top",
  end: "bottom bottom",
  onUpdate: (self) => {
    setStep(Math.min(STEPS.length - 1, Math.floor(self.progress * STEPS.length)));
  },
});
```

Para animaciones de texto (hero, reveals más ricos) también es un buen match
la librería **`motion`** (antes Framer Motion) — ya soporta React Server
Components.

## Notas sobre imágenes

- Las imágenes vienen de Unsplash por URL directa (fondo CSS, no `next/image`).
- Si quieres migrar a `next/image` para optimización automática, ya dejé
  configurado `images.unsplash.com` en `next.config.js`. Tendrías que cambiar
  los `style={{ backgroundImage }}` por `<Image src... fill />` con el padre
  `relative`.

## Integración al proyecto de TelioLabs existente

Si ya tienes el proyecto Next corriendo con el design system:

1. Copia la carpeta `components/` entera (o sólo los que necesites).
2. Copia `lib/useRevealOnScroll.ts`.
3. En tu `tailwind.config.ts` agrega los colores de `theme.extend.colors`
   (si no los tienes ya desde el design system).
4. En `app/globals.css` agrega las utilities `.sec-tag`, `.sec-title`,
   `.sec-sub`, `.reveal` y el `@keyframes fadeUp`.
5. En tu root `layout.tsx` asegúrate de que Bricolage Grotesque y DM Sans
   estén cargados vía `next/font/google` con los `variable` names que usa
   el Tailwind config (`--font-bricolage`, `--font-dm-sans`).

## Qué falta / posibles mejoras

- [ ] Rutas reales para `/about`, `/work` (ahora son `#` o `/about`)
- [ ] Envío del form del quiz (ahora sólo simula el submit)
- [ ] Migrar a `next/image` si quieres LCP optimizado
- [ ] Sitemap SEO + metadata por sección
- [ ] Internacionalización (es/en) — el site original está en inglés
