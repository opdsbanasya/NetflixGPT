# Codebase Issue Report 🐛

Full audit of the NetflixGPT / MovieGPT codebase. Issues are grouped by severity.

---

## 🔴 Critical Bugs

### 1. `Login.js` — Reading stale state in `.catch()` block
**Location**: [Login.js:56](file:///d:/Web%20Dev/NetflixGPT/src/Components/Login.js#L56)

```js
console.log(errorMessage.signError); // ← BUG: reads the OLD state, not the new one
```

`setErrorMessage(...)` is called on line 55, but React state updates are asynchronous. On line 56 you immediately read `errorMessage.signError`, which is still the **previous** value (likely `null`), causing a `TypeError: Cannot read properties of null`.

---

### 2. `Login.js` — Inconsistent error state shape on sign-in failure
**Location**: [Login.js:67](file:///d:/Web%20Dev/NetflixGPT/src/Components/Login.js#L67)

```js
setErrorMessage(errorCode + " " + FireErrorMessage); // ← sets a STRING
```

The sign-up error handler sets an **object** (`{ signError: ... }`), but the sign-in error handler sets a raw **string**. The JSX on lines 85/91/95 tries to read `.nameResult`, `.emailResult`, `.passwordResult` from `errorMessage`, which won't work on a string.

---

### 3. `Login.js` — `alert("Invalid User")` on sign-in failure
**Location**: [Login.js:68](file:///d:/Web%20Dev/NetflixGPT/src/Components/Login.js#L68)

Using `alert()` is a blocking browser API that freezes the entire page. This should be shown as an inline error message in the UI instead.

---

### 4. `Header.js` — `onAuthStateChanged` listener is never unsubscribed
**Location**: [Header.js:24-35](file:///d:/Web%20Dev/NetflixGPT/src/Components/Header.js#L24-L35)

```js
useEffect(() => {
    onAuthStateChanged(auth, (user) => { ... })
}, [])
```

`onAuthStateChanged` returns an unsubscribe function that must be called in the `useEffect` cleanup. Without it, every time the `Header` component remounts, a **new** listener is added without removing the old one, causing duplicate dispatches, memory leaks, and potential race conditions.

---

### 5. `llama.js` — API key exposed in the browser (`dangerouslyAllowBrowser: true`)
**Location**: [llama.js:5-6](file:///d:/Web%20Dev/NetflixGPT/src/utils/llama.js#L5-L6)

```js
apiKey: process.env['NEXT_PUBLIC_GROQ_API'],
dangerouslyAllowBrowser: true
```

`NEXT_PUBLIC_*` env vars are embedded into the client-side bundle and visible to **anyone** inspecting your page source. The Groq API key should be called from a Next.js **API route** (`/api/search`) instead, so it never leaves the server.

---

### 6. `tmdb.js` — TMDB Bearer token exposed in the browser
**Location**: [tmdb.js:5](file:///d:/Web%20Dev/NetflixGPT/src/utils/tmdb.js#L5)

```js
Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_TMDB_API
```

Same issue as above. This constant is used in client-side hooks (`useNowPlayingMovies`, etc.), so the bearer token is embedded in the JS bundle. Should be proxied through a server-side API route.

---

### 7. `GPTSearchBar.js` — Regex uses non-greedy match, breaks on nested arrays
**Location**: [GPTSearchBar.js:59](file:///d:/Web%20Dev/NetflixGPT/src/Components/GPTSearchBar.js#L59)

```js
const match = llamaResult.match(/\[([\s\S]*?)\]/);
```

The `*?` (non-greedy) regex will match the **shortest** possible `[...]` substring. If the AI model response contains a stray `[]` before the actual JSON array (e.g., inside a `<think>` block), this will match the wrong thing. Should use a greedy match or a more targeted extraction.

---

## 🟠 Bugs (Medium)

### 8. `userSlice.js` — `addUser` replaces the entire slice state instead of setting a field
**Location**: [userSlice.js:9-10](file:///d:/Web%20Dev/NetflixGPT/src/store/userSlice.js#L9-L10)

```js
addUser: (state, action) => {
    return action.payload; // Replaces ENTIRE state
},
```

The initial state is `{ users: [] }`, but `addUser` returns a flat payload object `{ uid, email, ... }`, completely discarding the `users` array structure. This means `useSelector(store => store.user)` returns a user object directly instead of a state with a `users` field, which is confusing and fragile. The `removeUser` reducer returns `null`, making the entire slice state `null`.

---

### 9. `Header.js` — `gptIcon` is imported as a static asset, used as `src` directly
**Location**: [Header.js:13](file:///d:/Web%20Dev/NetflixGPT/src/Components/Header.js#L13)

```js
import gptIcon from "../assets/gpt-search.png";
```

In Next.js, static image imports return an **object** `{ src, height, width }`, not a raw string URL. Using it directly as `<img src={gptIcon}>` may render as `[object Object]`. Should use `gptIcon.src` or Next.js `<Image>` component.

---

### 10. `TitleOfMainMovie.js` — Unused `useState` import
**Location**: [TitleOfMainMovie.js:2](file:///d:/Web%20Dev/NetflixGPT/src/Components/TitleOfMainMovie.js#L2)

```js
import { useState } from "react";
```

`useState` is imported but never used in the component.

---

### 11. `MoviesCards.js` — Unused `useSelector` import
**Location**: [MoviesCards.js:2](file:///d:/Web%20Dev/NetflixGPT/src/Components/MoviesCards.js#L2)

```js
import { useSelector } from "react-redux";
```

`useSelector` is imported but never called in the component.

---

### 12. `MovieCard.js` — `matchPercent` recalculates on every render (random flicker)
**Location**: [MovieCard.js:15](file:///d:/Web%20Dev/NetflixGPT/src/Components/MovieCard.js#L15)

```js
const matchPercent = Math.floor(Math.random() * (99 - 85 + 1) + 85);
```

This generates a new random number on **every re-render**. When the parent re-renders (e.g., scrolling, state change), each card's match percentage flickers to a new value. Should use `useMemo` with `movie.id` as the key, or derive it deterministically from the movie data.

---

### 13. `Login.js` — `handleFormType` uses confusing short-circuit logic
**Location**: [Login.js:24](file:///d:/Web%20Dev/NetflixGPT/src/Components/Login.js#L24)

```js
setFormType(formType === "signin" && "signup" || formType === "signup" && "signin")
```

This works by accident due to JavaScript's short-circuit evaluation, but is extremely fragile and hard to read. Should be a simple ternary: `formType === "signin" ? "signup" : "signin"`.

---

### 14. `MovieProductionsCompanies.js` — Hardcoded string in `alt` attribute
**Location**: [MovieProductionsCompanies.js:17](file:///d:/Web%20Dev/NetflixGPT/src/Components/MovieProductionsCompanies.js#L17)

```js
alt='{company?.name}'
```

Single quotes make this a literal string `"{company?.name}"` instead of the actual company name. Should be `alt={company?.name}`.

---

### 15. `MovieProductionsCompanies.js` — Missing `key` prop on production countries
**Location**: [MovieProductionsCompanies.js:26-31](file:///d:/Web%20Dev/NetflixGPT/src/Components/MovieProductionsCompanies.js#L26-L31)

The `.map()` over `production_countries` doesn't include a `key` prop, which causes React warnings and potential rendering bugs.

---

### 16. `Login.js` — `bg-netflix-red` no longer exists in tailwind config
**Location**: [Login.js:98](file:///d:/Web%20Dev/NetflixGPT/src/Components/Login.js#L98)

```js
className="... bg-netflix-red hover:bg-red-700 ..."
```

The Tailwind config was updated to use `netflix.primary` (#8B5CF6) and `netflix.card` etc. The old `netflix.red` color was removed, so `bg-netflix-red` resolves to nothing and the button will have no background color.

---

## 🟡 Code Smells & Improvements

### 17. All data-fetching hooks — No error handling on `fetch()`
**Location**: [useNowPlayingMovies.js](file:///d:/Web%20Dev/NetflixGPT/src/hooks/useNowPlayingMovies.js), [usePopularMovies.js](file:///d:/Web%20Dev/NetflixGPT/src/hooks/usePopularMovies.js), [useTopRatedMovies.js](file:///d:/Web%20Dev/NetflixGPT/src/hooks/useTopRatedMovies.js), [useUpcomingMovies.js](file:///d:/Web%20Dev/NetflixGPT/src/hooks/useUpcomingMovies.js)

None of the TMDB fetch calls have `try/catch` or check `response.ok`. If the API returns a 401 (bad token) or 500, the code silently dispatches `undefined` into Redux, causing downstream crashes.

---

### 18. All category hooks — Fetch functions defined outside `useEffect` without deps
**Location**: All four category hooks (e.g., [useNowPlayingMovies.js:12-24](file:///d:/Web%20Dev/NetflixGPT/src/hooks/useNowPlayingMovies.js#L12-L24))

The async fetch function is defined outside `useEffect` but uses `dispatch` from the closure. It works, but the React exhaustive-deps lint rule will warn that `getNowPlayingMovies` should be in the dependency array or moved inside `useEffect`. The pattern used in `useMovieDetails` (function inside `useEffect`) is correct and should be used everywhere.

---

### 19. `TrailerContainer.js` — Random movie index on every render
**Location**: [TrailerContainer.js:11](file:///d:/Web%20Dev/NetflixGPT/src/Components/TrailerContainer.js#L11)

```js
const movieIndex = Math.floor(Math.random() * 20);
```

This picks a new random movie on every re-render. If the parent re-renders for any reason, the hero movie flickers. Not currently used (replaced by `HeroSection`), but still exists as dead code.

---

### 20. Dead / Unused Components
**Location**: 
- [TrailerContainer.js](file:///d:/Web%20Dev/NetflixGPT/src/Components/TrailerContainer.js) — No longer imported (replaced by `HeroSection`)
- [TitleOfMainMovie.js](file:///d:/Web%20Dev/NetflixGPT/src/Components/TitleOfMainMovie.js) — Only used by `TrailerContainer`
- [MovieImageSlider.js](file:///d:/Web%20Dev/NetflixGPT/src/Components/MovieImageSlider.js) — Empty component, commented out in `MoviePage.js`
- [style.css](file:///d:/Web%20Dev/NetflixGPT/style.css) — Root-level CSS with `.scrollbar-hide`, `.title-shadow`, `.production-name`. The scrollbar utility has been replaced by `.hide-scrollbar` in `globals.css`, making this partially redundant. Still imported by `MoviesCards.js`.

---

### 21. `Casts.js` — `console.log(movieCast)` left in production code
**Location**: [Casts.js:11](file:///d:/Web%20Dev/NetflixGPT/src/Components/Casts.js#L11)

```js
console.log(movieCast);
```

Debug logging left in production code.

---

### 22. `Footer.js` — Hardcoded old color scheme (`bg-purple-300`, `bg-black`)
**Location**: [Footer.js:33-34](file:///d:/Web%20Dev/NetflixGPT/src/Components/Footer.js#L33-L34)

The Footer still uses the old Netflix clone colors (`bg-black`, `bg-purple-300`, `bg-[#FFFBCA]`) instead of the new design system (`#050505`, `netflix-primary`, etc.).

---

### 23. `Footer.js` — Scroll-to-top button uses a fixed `div` with `onClick` instead of a `button`
**Location**: [Footer.js:48-50](file:///d:/Web%20Dev/NetflixGPT/src/Components/Footer.js#L48-L50)

The outer `<div onClick={handleBottomToTop}>` wrapping a `<button>` is redundant and has accessibility issues. The `onClick` should just be on the `<button>` itself.

---

### 24. `gpt-search/page.js` — Duplicates `<Header />` rendering
**Location**: [gpt-search/page.js:7](file:///d:/Web%20Dev/NetflixGPT/src/app/gpt-search/page.js#L7)

The GPT Search page explicitly renders `<Header />` inside its layout, but the `Browse` wrapper component (which wraps `/browse` routes) also renders `<Header />`. If the GPT search page is accessed under `/browse`, this could cause a double header. Currently it's at `/gpt-search` (outside `/browse`), so no header is rendered by the parent layout — but this means the auth listener in `Header` is not active on the GPT search page when accessed directly.

---

### 25. `GPTSearchBar.js` — `useEffect` depends on `searchParams` but `handleClickGPTSearch` is not stable
**Location**: [GPTSearchBar.js:27-33](file:///d:/Web%20Dev/NetflixGPT/src/Components/GPTSearchBar.js#L27-L33)

The `useEffect` calls `handleClickGPTSearch(query)` which is defined inside the component and recreated every render. In React Strict Mode, this will fire twice. The `searchParams` dependency also means every time URL params change (even unrelated ones), the search re-fires.

---

### 26. `.gitignore` — Missing common entries
**Location**: [.gitignore](file:///d:/Web%20Dev/NetflixGPT/.gitignore)

Missing:
- `.env.local`
- `.env.*.local`
- `.vercel`
- `*.log`

---

### 27. `firebase.js` — `analytics` variable is assigned but never exported or used
**Location**: [firebase.js:22-24](file:///d:/Web%20Dev/NetflixGPT/src/utils/firebase.js#L22-L24)

```js
let analytics;
if (typeof window !== "undefined") {
    analytics = getAnalytics(app);
}
```

`analytics` is initialized but never exported or used anywhere in the codebase.

---

### 28. `constant.js` — Typo in rules text
**Location**: [constant.js:8](file:///d:/Web%20Dev/NetflixGPT/src/utils/constant.js#L8)

```js
name: "Name must contains atleast 1 space"
```

Should be "Name must contain at least 1 space" (grammar fix).

---

## Summary Table

| # | Severity | File | Issue |
|---|----------|------|-------|
| 1 | 🔴 Critical | Login.js:56 | Reading stale state in catch block |
| 2 | 🔴 Critical | Login.js:67 | Inconsistent error state shape |
| 3 | 🔴 Critical | Login.js:68 | `alert()` blocks UI |
| 4 | 🔴 Critical | Header.js:24 | Auth listener never unsubscribed |
| 5 | 🔴 Critical | llama.js:5 | Groq API key leaked to browser |
| 6 | 🔴 Critical | tmdb.js:5 | TMDB token leaked to browser |
| 7 | 🔴 Critical | GPTSearchBar.js:59 | Non-greedy regex may match wrong array |
| 8 | 🟠 Medium | userSlice.js:9 | addUser replaces entire slice state |
| 9 | 🟠 Medium | Header.js:13 | Static image import used as string src |
| 10 | 🟠 Medium | TitleOfMainMovie.js:2 | Unused useState import |
| 11 | 🟠 Medium | MoviesCards.js:2 | Unused useSelector import |
| 12 | 🟠 Medium | MovieCard.js:15 | Random match % flickers on re-render |
| 13 | 🟠 Medium | Login.js:24 | Confusing short-circuit toggle logic |
| 14 | 🟠 Medium | MovieProductionsCompanies.js:17 | Hardcoded string in alt attribute |
| 15 | 🟠 Medium | MovieProductionsCompanies.js:26 | Missing key prop in .map() |
| 16 | 🟠 Medium | Login.js:98 | `bg-netflix-red` color removed from config |
| 17 | 🟡 Smell | All category hooks | No error handling on fetch |
| 18 | 🟡 Smell | All category hooks | Function defined outside useEffect |
| 19 | 🟡 Smell | TrailerContainer.js:11 | Random index on every render |
| 20 | 🟡 Smell | Multiple files | Dead/unused components |
| 21 | 🟡 Smell | Casts.js:11 | console.log left in production |
| 22 | 🟡 Smell | Footer.js:33 | Hardcoded old color scheme |
| 23 | 🟡 Smell | Footer.js:48 | Accessibility: div with onClick |
| 24 | 🟡 Smell | gpt-search/page.js:7 | Duplicate Header rendering |
| 25 | 🟡 Smell | GPTSearchBar.js:27 | Unstable function in useEffect |
| 26 | 🟡 Smell | .gitignore | Missing common entries |
| 27 | 🟡 Smell | firebase.js:22 | Unused analytics variable |
| 28 | 🟡 Smell | constant.js:8 | Typo: "atleast" → "at least" |
