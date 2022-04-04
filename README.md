### `/`
A single random english quote
```json
  {
    "author": "Joseph Campbell",
    "content": "Find a place inside where there's joy, and the joy will burn out the pain."
  }
```

### `/:lang`
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

### `/:lang/count`
Number of quotes for each language
```HTTP
GET /en/count
```
```json
  {
    "lang": "en",
    "length": 1556
  }
```

### `/:lang/all`
All quotes from a specified language
```HTTP
GET /ru/all
```
```json
[
  { "author": "Наполеон Хилл", "content": "Что разум человека может постигнуть и во что может поверить, то он может достичь" },
  { "author": "Малкольм Икс", "content": "Если вы не стоите за что-то, вы упадете ни за что" },
  { "author": "Уинстон Черчилль", "content": "Если вы идете сквозь ад, не останавливайтесь" },
  { "author": "Кристофер Рив", "content": "Как только вы выберете надежду, все станет возможным" },
  { "author": "не прекращать задавать вопросы", "content": "Учитесь у вчера, живите сегодня, надейтесь на завтра. Главное" },
  "etc": "..."
]
```


### `?amount=`
Amount of quotes to return
```HTTP
GET /fr?amount=3
```
```json
[
  { "author": "Alphonse Karr", "content": "C'est ma part de bonheur dans la vie que je vais confier à ton coeur : Je t'aime." },
  { "author": "Socrate", "content": "Existe-t-il pour l'Homme un bien plus précieux que la Santé ?" },
  { "author": "Confucius", "content": "Examine si ce que tu promets est juste et possible, car la promesse est une dette." }
]
```
