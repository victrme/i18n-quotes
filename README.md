# A Quotes API used by Bonjourr

[![Tests](https://github.com/victrme/i18n-quotes/actions/workflows/test.yaml/badge.svg?event=push)](https://github.com/victrme/i18n-quotes/actions/workflows/test.yaml)

This API returns quotes using 3 different providers: 
- Random quotes found on the internet
- Inspirational quotes by inspirobot
- Famous quotes from the tv show kaamelott

⚠️ For performance reasons when used in [Bonjourr API](https://github.com/victrme/bonjourr-apis), quotes are fetched from this repo using [jsDelivr CDN](https://www.jsdelivr.com/github). This may cause problem when forking this repo. 

## Run and deploy

This API can easily be deployed as a Cloudflare Worker or a Netlify Edge Function. Other integrations might be added in the future.

```bash
# pnpm is needed in package scripts
npm install --global pnpm
```

### Cloudflare Worker

```bash
npm install --global wrangler

# dev
pnpm cloudflare:dev

# ⎔ Starting local server...
# Ready on http://127.0.0.1:8787  

# deploy
pnpm cloudflare:deploy
```


### Netlify Edge Function

```bash
npm install --global netlify

# dev
pnpm netlify:dev

# ◈ Server now ready on http://localhost:8888 
# ◈ Loaded edge function index

# deploy using dashboard
```

## API Endpoints

All endpoints return a list of quotes with the same type

```typescript
type Quotes = {
  author: string
  content: string
}[]
```

### Classic

Returns 20 random english quotes

```HTTP
GET /classic
```
```jsonc
[
  {
    "author": "Joseph Campbell",
    "content": "Find a place inside where there's joy, and the joy will burn out the pain."
  },
  {
    "author": "Theodore Roosevelt",
    "content": "With self-discipline most anything is possible."
  },
  // ...
]
```  

Returns 20 random quotes from a specified language

```HTTP
GET /classic/:lang
```

```jsonc
[
  {
    "author": "Socrate",
    "content": "Tout ce que je sais, c'est que je ne sais rien."
  },
  {
    "content": "L’enthousiasme a toujours engendré la certitude.",
    "author": "Alfred Espinas"
  },
  // ...
]

```

### Inspirobot

Returns 20 quotes from [Inspirobot](https://inspirobot.me/) 

```HTTP
GET /inspirobot
```

```jsonc
[
  {
    "author": "Inspirobot",
    "content": "Depressions can become memorable."
  },
  {
    "author": "Inspirobot",
    "content": "Notice how your left nostril is connecting to your heart."
  },
  // ...
]
```

### Kaamelott

Returns 20 quotes from a list of kaamelott quotes shamelessly stolen from [sin0light/api-kaamelott](https://github.com/sin0light/api-kaamelott).

```HTTP
GET /kaamelott
```

```jsonc
[
  {
    "author": "Le Roi Burgonde",
    "content": "Arthour !… Pas changer assiette pour fromage !"
  },
  {
    "author": "Perceval",
    "content": "Là, vous faites sirop de vingt-et-un et vous dites: beau sirop, mi-sirop, siroté, gagne-sirop, sirop-grelot, passe-montagne, sirop au bon goût."
  },
  // ...
]
```
