## React prompts (pair-programming, ~20 minutes each)

### R1 — Counter

**Prompt:** Build a `<Counter />` component.

- Start at `0`
- Buttons: `+`, `-`, `Reset`
- `+` increments by 1, `-` decrements by 1
- The count must **not** go below `0`

**Stretch (if time):**

- Add a numeric `step` input (default `1`) and increment/decrement by `step`

**Business case:** Quantity selectors (cart items), seat counters, inventory adjustments, rating points.
**Why they ask:** Proves you can manage state correctly, enforce constraints, and avoid common stale-state bugs.

---

### R2 — Todo List (local only)

**Prompt:** Build a `<TodoApp />` component.

- Text input + `Add` button creates a new todo
- Ignore empty submissions
- Render todos in a list
- Clicking a todo toggles it complete/incomplete
- Each todo has a `Delete` button

**Stretch (if time):**

- Show an empty state message when there are no todos

**Business case:** Checklists, drafts, staged edits, onboarding tasks before persistence.
**Why they ask:** Tests list rendering, stable IDs, immutability, and basic UI state transitions (add/toggle/delete).

---

### R3 — Filterable List

**Prompt:** Given `items = ["Apple", "Banana", "Orange", "Grape"]`, build `<FilterableList items={items} />`.

- Render all items
- Add a search input that filters items by substring (case-insensitive)

**Stretch (if time):**

- Show “No results” when nothing matches

**Business case:** Filtering users/orders, searching catalogs, quick admin search.
**Why they ask:** Tests controlled inputs + derived state, correct matching logic, and empty-state UX.

---

### R4 — Fetch + Render (loading/error)

**Prompt:** Build `<UserList />` that uses a provided async function `fetchUsers()` returning `[{ id, name, email }]`.

- Fetch on mount
- Show `Loading...` while fetching
- Render each user’s `name` and `email`
- If fetch fails, show an error message

**Stretch (if time):**

- Add a `Retry` button that re-fetches

**Business case:** Nearly every data-driven screen (dashboards, lists, profile pages).
**Why they ask:** Tests async flow, loading/error states, and ability to build resilient UI that handles network failure.

---

### R5 — Signup Form Validation

**Prompt:** Build `<SignupForm />` with inputs: `email`, `password`, `confirmPassword`.

- Email must include `@`
- Password must be at least 8 characters
- Confirm password must match
- On submit, prevent submission if invalid and display messages

**Stretch (if time):**

- Disable submit until valid

**Business case:** Signup/login, password reset, checkout forms—directly affects conversion and support load.
**Why they ask:** Tests controlled forms, validation, and clear UX decisions (when/how to show errors).

---

### R6 — Tabs

**Prompt:** Build a `<Tabs tabs={...} />` component where `tabs = [{ label, content }]`.

- Render tab buttons
- Clicking a tab shows its content panel
- First tab is active by default

**Stretch (if time):**

- Arrow keys (left/right) switch tabs

**Business case:** Settings pages, multi-section profiles, admin detail views.
**Why they ask:** Tests component structure and state-driven rendering; stretch tests accessibility/keyboard support.

---

### R7 — Modal

**Prompt:** Build `<ModalDemo />`.

- Button opens the modal
- Modal has a close button
- Clicking the backdrop closes the modal
- Pressing `Escape` closes the modal

**Stretch (if time):**

- Focus the close button when the modal opens

**Business case:** Confirm delete, edit dialogs, onboarding prompts, consent/paywall flows.
**Why they ask:** Tests event handling, conditional rendering, listener cleanup, and UX details that commonly break.

---

### R8 — Timer

**Prompt:** Build a `<Timer />` component.

- Displays elapsed seconds
- `Start` begins incrementing once per second
- `Pause` stops incrementing
- `Reset` sets to 0 and stops
- Prevent multiple intervals from running at the same time

**Stretch (if time):**

- Allow setting a starting value via input

**Business case:** Workout intervals, resend-code countdowns, session timers, autosave cooldowns.
**Why they ask:** Tests effects/cleanup, preventing duplicate intervals, and correctness over time.

---

## Backend prompts (Express) (pair-programming, ~20 minutes each, no DB)

### B1 — Notes CRUD (in-memory)

**Prompt:** Implement an Express API for notes stored in memory.

- `GET /notes` returns all notes
- `POST /notes` creates a note from `{ text }`
  - Return `400` if `text` is missing/empty

- `DELETE /notes/:id` deletes a note
  - Return `404` if not found

- Notes should look like `{ id, text }`

**Stretch (if time):**

- Add `PATCH /notes/:id` to update `{ text }` with validation

**Business case:** Basic resource endpoints power internal tools and product features.
**Why they ask:** Tests REST fundamentals, route structure, validation, and status codes without DB complexity.

---

### B2 — Pagination + Search

**Prompt:** Implement `GET /items` over an in-memory array of strings.

- Query params:
  - `limit` (default `10`, max `50`)
  - `offset` (default `0`)
  - optional `q` for case-insensitive substring filtering

- Response shape:
  - `{ data: string[], meta: { total: number, limit: number, offset: number } }`

**Stretch (if time):**

- Return `400` if `limit/offset` are invalid (NaN/negative)

**Business case:** Listing endpoints (users, logs, orders) must paginate for performance and cost.
**Why they ask:** Tests API contract design, param parsing, defensive coding, and sensible defaults.

---

### B3 — Validation + Consistent Error Shape

**Prompt:** Implement `POST /users`.

- Accept `{ email, name }`
- Validate:
  - email includes `@`
  - name length >= 2

- On validation errors:
  - status `400`
  - body: `{ error: { code: "VALIDATION_ERROR", message: string, fields: Record<string,string> } }`

**Stretch (if time):**

- Add error middleware to ensure consistent error formatting

**Business case:** Frontends and clients need predictable errors to show correct messages and reduce support tickets.
**Why they ask:** Tests whether you can design consistent API contracts and handle validation cleanly.

---

### B4 — Auth Middleware (API Key)

**Prompt:** Protect routes with header `x-api-key`.

- If missing or invalid → return `401`
- If valid → allow request through
- Protected route: `GET /me` returns `{ userId: "demo" }`

**Stretch (if time):**

- Map keys to different `userId`s

**Business case:** Internal services, partner integrations, admin tools commonly use API keys.
**Why they ask:** Tests middleware, request lifecycle understanding, and basic security gating.

---

### B5 — Authorization (Ownership)

**Prompt:** Notes now look like `{ id, text, ownerId }`.

- Current user comes from header `x-user-id`
- Implement `DELETE /notes/:id`:
  - `404` if note not found
  - `403` if `ownerId` does not match `x-user-id`
  - `204` on success

**Stretch (if time):**

- `GET /notes` returns only notes owned by the current user

**Business case:** Prevents data leaks (“users can only modify their own data”).
**Why they ask:** Tests trust boundaries and correct server-side enforcement (authz), not relying on the client.

---

### B6 — Rate Limiter Middleware

**Prompt:** Create a middleware that rate limits by IP.

- Limit: `5` requests per minute per IP
- If exceeded:
  - return `429`
  - body: `{ error: { code: "RATE_LIMIT", message: string } }`

- Apply it to `POST /login`

**Stretch (if time):**

- Add `Retry-After` header in seconds

**Business case:** Reduces abuse/bots, protects uptime, and controls infra cost.
**Why they ask:** Tests practical reliability thinking and middleware composition.

---

### B7 — Stats Endpoint

**Prompt:** Implement `POST /stats`.

- Input: `{ numbers: number[] }`
- Validate: non-empty array of numbers
- Output: `{ count, min, max, sum, avg }`
- Return `400` if invalid

**Stretch (if time):**

- Support floats without rounding unless asked

**Business case:** Reporting/analytics summaries, invoice totals, dashboard rollups.
**Why they ask:** Tests data processing accuracy, validation, and clean response design.

---

### B8 — Dedupe Endpoint

**Prompt:** Implement `POST /dedupe`.

- Input: `{ items: string[] }`
- Output: `{ items: string[] }` with duplicates removed, preserving original order
- Return `400` if invalid input

**Stretch (if time):**

- Query param `caseInsensitive=true` dedupes ignoring case

**Business case:** Cleaning lists of emails/tags/recipients, normalizing imports, preventing duplicate inserts.
**Why they ask:** Tests correctness, order preservation, and ability to implement small real-world utilities.
