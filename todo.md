#### Database
- [x] Task 1: Create base frame endpoints  
  File: src/routes/frame.js  
  Action: Create file with GET/POST handlers  
  Code:  
  ```javascript
  app.get('/frame', (req, res) => {
    res.send(`<html><head>
      <meta property="fc:frame" content="vNext">
      <meta property="fc:frame:image" content="${BASE_URL}/frame-image">
      <meta property="fc:frame:button:1" content="Farcaster">
      <meta property="fc:frame:button:2" content="GitHub">
      <meta property="fc:frame:button:3" content="More">
    </head></html>`);
  });

  app.post('/frame', (req, res) => {
    res.redirect('/frame');
  });
  ```  
  Outcome: Frame displays 3 buttons with "My Links" header image

- [x] Task 2: Add state management  
  File: src/routes/frame.js  
  Action: Modify POST handler  
  Code:  
  ```javascript
  const parseState = (raw) => {
    try {
      return JSON.parse(decodeURIComponent(raw));
    } catch {
      return { currentPage: 'main' };
    }
  };

  app.post('/frame', (req, res) => {
    const state = parseState(req.body.state);
    if (req.body.button === 3) state.currentPage = 'more';
    const encodedState = encodeURIComponent(JSON.stringify(state));
    res.redirect(`/frame?state=${encodedState}`);
  });
  ```  
  Outcome: Debug logs show state.page changes on More click

- [ ] Task 3: Implement More screen UI  
  File: public/images/more-screen.svg  
  Action: Create SVG template  
  Code:  
  ```svg
  <svg>
    <text x="20" y="50">Recent Links</text>
    <text x="20" y="100">1. example.com/link1</text>
    <text x="20" y="140">2. example.com/link2</text>
    <text x="20" y="180">3. example.com/link3</text>
  </svg>
  ```  
  Outcome: More screen shows placeholder URLs

- [ ] Task 4: Create Farcaster service  
  File: src/services/farcaster.js  
  Action: Implement API client  
  Code:  
  ```javascript
  export const getRecentLinks = async (fid) => {
    const response = await fetch(`https://api.farcaster.xyz/v2/user/${fid}/casts`);
    const casts = await response.json();
    return casts
      .flatMap(cast => [...cast.text.matchAll(/https?:\/\/[^\s]+/g)])
      .sort((a,b) => b.timestamp - a.timestamp)
      .slice(0,3);
  };
  ```  
  Endpoint: GET /farcaster/user/{fid}/casts  
  Outcome: Console shows recent URLs from test account

- [ ] Task 5: Connect API to UI  
  File: src/routes/frame.js  
  Action: Modify image endpoint  
  Code:  
  ```javascript
  app.get('/frame-image', async (req, res) => {
    const state = parseState(req.query.state);
    if (state.currentPage === 'more') {
      const links = await getRecentLinks(FARCUSTER_FID);
      // Render SVG with dynamic links
    }
  });
  ```  
  Outcome: More screen displays live API data

#### Implementation Plan
- [ ] Task 6: Add error boundaries  
  File: src/services/farcaster.js  
  Action: Wrap API calls  
  Code:  
  ```javascript
  try {
    const links = await getRecentLinks(fid);
  } catch (error) {
    console.error('Farcaster API failed');
    return { error: true };
  }
  ```  
  Outcome: Error message shown on API failure

- [ ] Task 7: Implement caching  
  File: src/utils/cache.js  
  Action: Create TTL cache  
  Code:  
  ```javascript
  const cache = new Map();

  export const getCached = (key) => {
    const entry = cache.get(key);
    if (entry && Date.now() < entry.expires) return entry.data;
  };
  ```  
  Outcome: Repeated requests return cached data

- [ ] Task 8: Sanitize URLs  
  File: src/services/farcaster.js  
  Action: Add validation  
  Code:  
  ```javascript
  const isValidURL = (url) => {
    try {
      const parsed = new URL(url);
      return ['http:','https:'].includes(parsed.protocol);
    } catch {
      return false;
    }
  };
  ```  
  Outcome: Malicious URLs filtered

- [ ] Task 9: Optimize SVG rendering  
  File: src/templates/base.svg  
  Action: Create template system  
  Code:  
  ```javascript
  const renderSVG = (template, replacements) => {
    return Object.entries(replacements).reduce(
      (acc, [key, val]) => acc.replace(`{{${key}}}`, val),
      template
    );
  };
  ```  
  Outcome: Images render <500ms
