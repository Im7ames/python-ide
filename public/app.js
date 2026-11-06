<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Help – Minimal Python IDE</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <div class="page">
    <h1>Help & Limitations</h1>
    <p><a href="index.html">← Back to IDE</a></p>

    <h2>How it works</h2>
    <p>
      This IDE runs entirely in your browser using <strong>Pyodide</strong>, a Python 3
      runtime compiled to WebAssembly. No Python code is sent to a server.
    </p>

    <h2>Running code</h2>
    <p>Write Python 3 code in the editor and press <strong>Run</strong> (or <kbd>Ctrl+Enter</kbd>).</p>

    <h2>Terminal output</h2>
    <p>
      <code>print()</code> and errors appear in the terminal panel. ANSI colour codes are
      stripped for readability.
    </p>

    <h2>Input</h2>
    <p>
      <code>input()</code> opens a browser prompt. This is a minimal implementation; for a
      richer terminal experience you would run Pyodide in a Web Worker and build a custom
      input queue.
    </p>

    <h2>Installing packages</h2>
    <p>
      Click <strong>Install</strong> and enter a package name. Pure‑Python packages and
      packages with pre‑built Pyodide wheels (e.g. <code>numpy</code>, <code>pandas</code>,
      <code>matplotlib</code>) can be installed with <code>micropip</code>.
    </p>
    <p>
      Packages that require compiling C extensions for your local operating system
      <strong>cannot</strong> be installed in the browser.
    </p>

    <h2>Stopping execution</h2>
    <p>
      The <strong>Stop</strong> button resets the UI state. True interruption requires
      running Pyodide in a separate Web Worker, which can be terminated.
    </p>

    <h2>Deployment</h2>
    <p>
      This site is designed to be deployed to Cloudflare Workers using static assets.
      See the project <code>README.md</code> for instructions.
    </p>
  </div>
</body>
</html>
