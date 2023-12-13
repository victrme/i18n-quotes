# Quotes API used by Bonjourr Startpage

[![Netlify Status](https://api.netlify.com/api/v1/badges/fd641d8d-e6a3-40cb-9f42-47ca4cdef95b/deploy-status)](https://app.netlify.com/sites/incandescent-pavlova-36bd49/deploys)  [![Tests](https://github.com/victrme/i18n-quotes/actions/workflows/test.yaml/badge.svg?event=push)](https://github.com/victrme/i18n-quotes/actions/workflows/test.yaml)

### `/classic`

A single random english quote

```HTTP
GET /classic
```

```json
{
  "author": "Joseph Campbell",
  "content": "Find a place inside where there's joy, and the joy will burn out the pain."
}
```

### `/classic/:lang`

A single random quote from a specified language

```HTTP
GET /classic/fr
```

```json
{
  "author": "Socrate",
  "content": "Tout ce que je sais, c'est que je ne sais rien."
}
```

### `/inspirobot`

A CORS enabled proxy for Inspirobot API 

```HTTP
GET /inspirobot
```

```json
{
  "data": [
    {
      "duration": 2,
      "image": "q3rUTmpZB-Q",
      "type": "transition",
      "time": 0
    },
    {
      "duration": 1.7,
      "text": "Sheep are hurting society.",
      "type": "quote",
      "time": 4
    },
    {
      "duration": 2,
      "image": "aOuy0kyXszo",
      "type": "transition",
      "time": 10
    },
    {
      "duration": 3.2,
      "text": "Don't forget that past lives make people look awful.",
      "type": "quote",
      "time": 15
    },
    {
      "duration": 2,
      "image": "ilfsT5p_qvA",
      "type": "transition",
      "time": 22
    },
    {
      "duration": 1.2,
      "text": "Pigs are stressed.",
      "type": "quote",
      "time": 27
    },
    {
      "type": "stop",
      "time": 32
    }
  ],
  "mp3": "https://generated.inspirobot.me/flow012/b9b1a2cf.mp3"
}
```

### `/kaamelott`

A CORS enabled proxy for Kaamelott quotes API

```HTTP
GET /kaamelott
```

```json
{
  "status": 1,
  "citation": {
    "citation": "Faut arrêter ces conneries de nord et de sud ! Une fois pour toutes, le nord, suivant comment on est tourné, ça change tout !",
    "infos": {
      "auteur": "Alexandre Astier",
      "acteur": "Franck Pitiot",
      "personnage": "Perceval",
      "saison": "Livre I ",
      "episode": "Ambidextrie "
    }
  }
}
```
