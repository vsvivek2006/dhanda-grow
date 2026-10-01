# GetGSTFast - Online GST Registration Service

GetGSTFast is a Next.js (App Router) based marketing and landing page application designed to convert Indian business owners looking for GST registration services.

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui
- **Icons:** lucide-react
- **Forms:** React Hook Form + Zod
- **Blog:** Markdown based with `react-markdown`

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `/src/app`: Contains all Next.js routes (Home, Pricing, Contact, Blog, etc.)
  - `page.tsx`: The main conversion-optimized homepage
  - `/gst-registration-in/[city]`: Dynamic SEO landing pages for local search
  - `/blog`: Markdown-powered blog for content marketing
- `/src/components`: UI components organized into `layout`, `shared`, and `ui` (shadcn).
- `/src/lib`: Utilities including `constants.ts` for quick branding/pricing updates.
- `/content/blog`: Drop `.md` files here to add new blog posts automatically.

## Important TODOs Before Launch

1. **Update `constants.ts`:**
   - Update `SUPPORT_PHONE`, `SUPPORT_EMAIL`, and `WHATSAPP_LINK` with real business numbers.
2. **Update Environment Variables:**
   - Create a `.env.local` file and add your tracking codes:
     ```env
     NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
     NEXT_PUBLIC_META_PIXEL_ID="XXXXXXXXXXXXXXX"
     ```
3. **API Integration:**
   - The `/api/lead` route currently just returns success. You need to connect it to a database (Supabase/Firebase) or a webhook (Zapier/Make) to actually store leads.
4. **Legal Info:**
   - Update the placeholder text in the Footer and Legal pages to reflect the actual registered company name and office address.

## SEO & Tracking

- The project is configured with a dynamic `sitemap.ts` and `robots.ts`.
- `JSON-LD` structured data is injected directly into `layout.tsx`.
- The Thank You page has `noindex` applied to prevent search engine indexing of the success state.
- Analytics are handled gracefully via `next/script` in `Analytics.tsx`.
