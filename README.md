# A Quotes API used by Bonjourr

This API returns quotes in multiple languages, and other type of quotes:

-   Random quotes found on the internet
-   Inspirational quotes by inspirobot
-   Famous quotes from the tv show kaamelott
-   Chinese quotes from Hikotoko
-   Quotes from the office US
-   Stoic quotes

## API

└── quotes
├── classic
│ ├── en
│ ├── fr
│ ├── de
│ ├── nl
│ ├── it
│ ├── es
│ ├── pt-PT
│ ├── pt-BR
│ ├── sv
│ ├── fi
│ ├── pl
│ ├── uk
│ ├── ru
│ ├── tr
│ ├── ar
│ ├── fa
│ ├── id
│ ├── zh-CN
│ ├── zh-HK
│ └── zh-TW
├── stoic
├── hitokoto
├── kaamelott
└── inspirobot

### JSON

```json
[
	{
		"author": "Author",
		"content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
	},
	{
		"author": "Author",
		"content": "Nam ut accumsan leo. Maecenas lobortis nunc ac vulputate efficitur."
	}
]
```

### CSV

```plaintext
Author
Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Author
Nam ut accumsan leo. Maecenas lobortis nunc ac vulputate efficitur.
```

## Run and deploy

This API can easily be deployed as a Cloudflare Worker.

⚠️ For performance reasons, quotes are fetched from this repo using [jsDelivr CDN](https://www.jsdelivr.com/github). This will cause problem when forking this repo.

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
