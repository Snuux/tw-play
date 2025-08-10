# tw-play

A lightweight, zero-build loader for [Twine](https://twinery.org/) / Twee stories that compiles directly in the browser using [Extwee](https://github.com/videlais/extwee) and [SugarCube](https://www.motoslave.net/sugarcube/). Designed specifically for AI-assisted story creation in **ChatGPT** and other generative AI tools.

With **tw-play**, you can write and instantly play interactive fiction without installing any compilation tools. Simply drop your Twee content into an HTML page, and the loader will fetch SugarCube, compile the story, and render it.

## Features
- **Instant play**: Write Twee and see it run immediately in your browser.
- **AI workflow ready**: Perfect for generating stories in ChatGPT or similar LLMs and playing them instantly.
- **No build step**: Everything happens client-side—no Tweego, no Twine app.
- **Single file portability**: One HTML file + the loader script.
- **CDN friendly**: Use via [jsDelivr](https://www.jsdelivr.com/) or self-host.

## Repository Contents
- `src/tw-play.js` — Readable source loader.
- `dist/tw-play.min.js` — Minified loader for production/CDN.
- `examples/` — Demo HTML and `.twee` examples for inline usage.

## Usage
Include the loader script and your story in a `<script type="text/twee">` block.

```html
<script type="text/twee" id="twee">
:: StoryTitle
My Game
:: StoryData
{"ifid":"145F3C37-A08E-4BAF-967A-60759074DB43","start":"start","format":"SugarCube","format-version":"2.37.3"}
:: start
Hello! [[Next->next]]
:: next
Bye.
</script>
<script src="https://cdn.jsdelivr.net/gh/Snuux/tw-play@v1.0.0/dist/tw-play.min.js" defer></script>
```

## Example Prompt for AI
````
You are to generate a complete playable interactive fiction story in **Twee** format, wrapped inside an HTML `<script type="text/twee" id="twee">` block, so it can be run directly in the browser with the **tw-play** loader. Don't change script src and StoryData of this story.

**Story theme:** [Describe the theme you want, e.g., “a post-apocalyptic mystery” or “a comedic fantasy tavern scene”]

Use this template as output:
```html
<script type="text/twee" id="twee">
:: StoryTitle
[TITLE HERE]
:: StoryData
{"ifid":"145F3C37-A08E-4BAF-967A-60759074DB43","start":"start","format":"SugarCube","format-version":"2.37.3"}
:: start
[OPENING PASSAGE CONTENT]
</script>
<script src="https://cdn.jsdelivr.net/gh/Snuux/tw-play@v1.0.0/dist/tw-play.min.js" defer></script>
```
````

## Ready-to-use GPT
Here: https://chatgpt.com/g/g-6897dcc481c081918220635b51b4fd79-twine-inline

## Please use canvas and canvas "run code" button!

<p align="center">
  <img src="https://github.com/Snuux/tw-play/blob/main/examples/use-canvas.jpg?raw=true">
</p>

<p align="center">
  <img src="https://github.com/Snuux/tw-play/blob/main/examples/twine-inline.jpg?raw=true">
</p>

## Why for ChatGPT or other AI?
In AI chat tools, you can:
1. Prompt the AI to generate Twee story code.
2. Paste it into this template with `tw-play`.
3. Open it in your browser and instantly play.

This is perfect for **rapid prototyping**, **live storytelling**, and sharing interactive fiction ideas.
