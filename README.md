# tw-play

A lightweight loader for Twine/Twee stories compiled in the browser via [Extwee](https://github.com/videlais/extwee) and [SugarCube](https://www.motoslave.net/sugarcube/).

This repository contains:

* `src/tw-play.js` — source loader script. It automatically compiles Twee content on page load using Extwee and a Twine story format.
* `dist/tw-play.min.js` — minified version suitable for CDN distribution.
* `examples/` — sample HTML and Twee to demonstrate usage.

## Usage

Include the loader script on your page. Write your story in a `<script type="text/twee">` block or store it in an external `.twee` file. By default the loader fetches SugarCube 2.37.3 and Extwee 2.3.2 from jsDelivr, then compiles your story and displays it in an iframe with `id="play"`.

### Inline example

```html
<!doctype html>
<meta charset="utf-8" />
<script type="text/twee" id="twee">
:: StoryTitle
My Game
:: StoryData
{"ifid":"DEMO-IFID","start":"start","format":"SugarCube","format-version":"2.37.3"}
:: start
Hello! [[Next->next]]
:: next
Bye.
</script>
<script src="https://cdn.jsdelivr.net/gh/Snuux/tw-play@v1.0.0/dist/tw-play.min.js" defer></script>
```

### External story example

```html
<!doctype html>
<meta charset="utf-8" />
<div id="play"></div>
<script
  src="https://cdn.jsdelivr.net/gh/YOURUSER/tw-play@v0.1.0/dist/tw-play.min.js"
  data-src="story.twee"
  defer></script>
```

Replace `YOURUSER` and version tag with your own GitHub username and release. See the `examples/` folder for working demos.
