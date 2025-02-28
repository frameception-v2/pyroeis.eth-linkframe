### Step 1: Create Base Frame Structure
```text
- Build: Implement GET/POST /frame endpoints with main screen rendering
  - Create basic frame image showing "My Links" header
  - Add three buttons: Farcaster, GitHub, More
  - Handle empty POST actions
- Outcome: Frame displays main screen with all 3 buttons visible in frame inspector
```

### Step 2: Implement Page Navigation State
```text
- Build: State management using URL-encoded JSON
  - Add state param with currentPage tracking
  - Handle "More" button to update state to 'more'
  - Add temporary Back button logic
- Outcome: Clicking "More" shows same frame but state.page='more' in debug logs
```

### Step 3: Render More Screen with Static Data
```text
- Build: More screen UI with mock links
  - Create alternate image template for "Recent Links"
  - Display 3 placeholder URLs in image
  - Add Back button functionality
- Outcome: Clicking "More" shows mock links screen, Back returns to main
```

### Step 4: Integrate Farcaster API Client
```text
- Build: Farcaster API integration
  - Implement GET /farcaster/user/{fid}/casts
  - Basic URL parsing from cast.text using regex
  - Sort links by timestamp
- Outcome: Console logs show 3 most recent URLs from test account's casts
```

### Step 5: Connect Recent Links to UI
```text
- Build: Dynamic more screen content
  - Replace mock links with real API data
  - Add link buttons (1-3) based on available URLs
  - Handle URL opening in browser
- Outcome: More screen displays actual recent URLs from API, clicks open URLs
```

### Step 6: Implement Error Handling
```text
- Build: API failure fallbacks
  - Add error boundary for Farcaster API calls
  - Display "Links unavailable" in image when errors occur
  - Cache empty state to prevent retries
- Outcome: Simulated API failure shows error message in frame
```

### Step 7: Add Server-Side Caching
```text
- Build: 5-minute TTL cache for links
  - Implement in-memory cache for /casts responses
  - Add cache key using fid + timestamp
- Outcome: Repeated requests within 5 minutes show same timestamped results
```

### Step 8: Secure URL Handling
```text
- Build: URL validation
  - Add allowlist for http/https protocols
  - Filter invalid URLs during parsing
  - Encode URLs before display
- Outcome: Test cast with javascript:alert() shows sanitized empty result
```

### Step 9: Optimize Image Rendering
```text
- Build: SVG template system
  - Create base SVG with text placeholders
  - Implement dynamic text replacement
  - Add cache headers for images
- Outcome: Frame images render <500ms with different content states
```