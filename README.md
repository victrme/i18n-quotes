# A Quotes API used by Bonjourr

This API returns quotes using 3 different providers:

-   Random quotes found on the internet
-   Inspirational quotes by inspirobot
-   Famous quotes from the tv show kaamelott

⚠️ For performance reasons, quotes are fetched from this repo using [jsDelivr CDN](https://www.jsdelivr.com/github). This will cause problem when forking this repo.

## Run and deploy

This API can easily be deployed as a Cloudflare Worker.

```bash
deno install --global npm:wrangler

# ✅ Successfully installed wrangler

# test
deno test --allow-net

# ok | 3 passed (9 steps) | 0 failed (1s)

# dev
wrangler dev

# ⎔ Starting local server...
# Ready on http://127.0.0.1:8787

# deploy
deno run deploy --allow-net

# Total Upload: 1.96 KiB / gzip: 0.89 KiB
# Uploaded i18n-quotes (8.39 sec)
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
  }
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
  }
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
  }
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
  }
  // ...
]
```

### The Office

Returns 20 quotes from a list of The Office quotes shamelessly stolen from [AkashRajpurohit/the-office-api](https://github.com/AkashRajpurohit/the-office-api).

```HTTP
GET /office
```

```jsonc
[
  {
      "author": "Dwight Schrute",
      "content": "When someone smiles at me, all I see is a chimpanzee begging for its life."
  },
  {
      "author": "Michael Scott",
      "content": "An office is not for dying. An office is a place for living life to the fullest, to the max, to… an office is a place where dreams come true."
  },
  // ...
]
```