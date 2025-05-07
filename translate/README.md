# Translate classic quotes

## First

-   Make sure to have Node and NPM installed
-   Download Ollama here: https://ollama.com/
-   Install a good translating model like `Phi4 Mini`

## Tweak before use

-   Modify the `Modelfile` with the parameters you want
-   Start Ollama with `ollama serve`
-   Create or modify the translator model

```bash
ollama serve

# level=INFO source=routes.go:1238 msg="Listening on 127.0.0.1:11434 (version 0.5.7)"

ollama create translator-model -f ./Modelfile

# writing manifest
# success
```

## Use

-   Start both Ollama and an HTTP server
-   Go to http://127.0.0.1:8080
-   Click on `generate` to test

```bash
ollama serve

# level=INFO source=routes.go:1238 msg="Listening on 127.0.0.1:11434 (version 0.5.7)"
```

```bash
npx http-server

# Available on:
# http://127.0.0.1:8080
```

Generated response should be in this format:

```
Author
Quote
```
