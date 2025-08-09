(() => {
  const DEFAULT_FORMAT_URL =
    'https://cdn.jsdelivr.net/gh/tmedwards/sugarcube-2@v2.37.3/dist/format.js';
  const DEFAULT_EXTWEE_URL =
    'https://cdn.jsdelivr.net/gh/videlais/extwee@v2.3.2/build/extwee.web.min.js';

  // Selects a single element using a CSS selector.
  const qs = (sel, root = document) => root.querySelector(sel);
  // Dynamically loads a script and resolves when it finishes.
  const loadScript = (src) =>
    new Promise((res, rej) => {
      const s = document.createElement('script');
      s.src = src;
      s.onload = res;
      s.onerror = () => rej(new Error('Load fail ' + src));
      document.head.appendChild(s);
    });

  async function run() {
    const current = document.currentScript;
    // Allow overriding the story format URL and external Twee source via data attributes.
    const formatURL = current?.dataset?.format || DEFAULT_FORMAT_URL;
    const tweeSrc = current?.dataset?.src;

    // Ensure we have a target container: an iframe with id="play" or an existing element.
    let target = qs('#play');
    if (!target) {
      target = document.createElement('iframe');
      target.id = 'play';
      target.setAttribute('sandbox', 'allow-scripts allow-same-origin');
      target.style.cssText = 'width:100%;height:100vh;border:0;';
      document.body.appendChild(target);
    }

    // Load Extwee if it isn't already present.
    if (!window.Extwee) await loadScript(DEFAULT_EXTWEE_URL);

    // Obtain the Twee content: either from an inline <script type="text/twee"> or from an external file via data-src.
    let twee = '';
    const inline = qs('script[type="text/twee"], script[type="text/plain"]#twee');
    if (inline) {
      twee = inline.textContent.trim();
    } else if (tweeSrc) {
      const resp = await fetch(tweeSrc, { cache: 'no-store' });
      twee = await resp.text();
    } else {
      document.body.insertAdjacentHTML(
        'afterbegin',
        '<p style="color:red">No Twee found. Add &lt;script type="text/twee"&gt;…&lt;/script&gt; or use data-src</p>'
      );
      return;
    }

    // Fetch the SugarCube story format file as raw text and parse it.
    const fmtResp = await fetch(formatURL, { cache: 'no-store' });
    const fmtText = await fmtResp.text();
    const sf = window.Extwee.parseStoryFormat(fmtText);

    // Parse the Twee source into a story and compile it into Twine 2 HTML.
    const story = window.Extwee.parseTwee(twee);
    const html = await window.Extwee.compileTwine2HTML(story, sf);

    // Display the compiled story inside the target element.
    if (target.tagName === 'IFRAME') target.srcdoc = html;
    else target.innerHTML = html;
  }

  // Execute once the DOM is ready.
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();