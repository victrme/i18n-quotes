# i18n-quotes

[![Netlify Status](https://api.netlify.com/api/v1/badges/fd641d8d-e6a3-40cb-9f42-47ca4cdef95b/deploy-status)](https://app.netlify.com/sites/incandescent-pavlova-36bd49/deploys)

### `/classic`

A single random english quote

```json
{
	"author": "Joseph Campbell",
	"content": "Find a place inside where there's joy, and the joy will burn out the pain."
}
```

### `classic/?lang=`

A single random quote from a specified language

```HTTP
GET /fr
```

```json
{
	"author": "Socrate",
	"content": "Tout ce que je sais, c'est que je ne sais rien."
}
```
