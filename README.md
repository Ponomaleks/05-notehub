# NoteHub

A modern, responsive personal note-taking application powered by React 19, TypeScript, and Vite, featuring efficient server state caching with TanStack Query and schema-validated forms with Formik and Yup.

## Setup

1. Clone the repository and install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env
```

Add your personal authorization token to `.env`:
```env
VITE_NOTEHUB_TOKEN=your_token
```

> Obtain your API access token via the [NoteHub API docs](https://notehub-public.goit.study/api/docs).

## Scripts

```bash
npm run dev        # Start development server
npm run build      # Check types and build production bundle
npm run lint       # Run ESLint check
npm run preview    # Preview production build locally
```

## Tech Stack

- **Core & Build:** React 19, TypeScript, Vite, React Compiler (`babel-plugin-react-compiler`)
- **Server State & Data Fetching:** TanStack Query v5 & React Query Devtools, Axios
- **Form Management & Validation:** Formik, Yup
- **UI & UX Enhancements:** React Paginate, React Hot Toast, `use-debounce`
- **Styling:** CSS Modules, Modern Normalize
- **Code Quality:** ESLint & typescript-eslint