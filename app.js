const editor = document.querySelector("#code-editor");
const lineNumbers = document.querySelector("#line-numbers");
const output = document.querySelector("#output-text");
const outputMeta = document.querySelector(".output-meta span:nth-child(2)");
const outputTime = document.querySelector(".output-time");
const files = {
  "main.py": editor.value,
  "notes.md": "# pico project\n\nA small Python experiment.",
  "requirements.txt": "# Add packages here\n",
};

function refreshLineNumbers() {
  const count = editor.value.split("\n").length;
  lineNumbers.innerHTML = Array.from({ length: count }, (_, index) => index + 1).join("<br />");
}

function saveCurrentFile() {
  const current = document.querySelector(".file-item.active")?.dataset.file;
  if (current) files[current] = editor.value;
  localStorage.setItem("pico-files", JSON.stringify(files));
}

function loadFiles() {
  try {
    const saved = JSON.parse(localStorage.getItem("pico-files"));
    if (saved && typeof saved === "object") Object.assign(files, saved);
  } catch {
    localStorage.removeItem("pico-files");
  }
}

function selectFile(button) {
  saveCurrentFile();
  document.querySelectorAll(".file-item").forEach((item) => item.classList.remove("active"));
  button.classList.add("active");
  const name = button.dataset.file;
  editor.value = files[name] || "";
  document.querySelector("#active-tab").textContent = name;
  document.querySelector("#breadcrumb-file").textContent = name;
  refreshLineNumbers();
}

function previewRun() {
  saveCurrentFile();
  const source = editor.value;
  const printLines = [...source.matchAll(/print\((["'`])([\s\S]*?)\1\)/g)].map((match) => match[2]);
  const variables = Object.fromEntries([...source.matchAll(/^(\w+)\s*=\s*(["'])(.*?)\2$/gm)].map((match) => [match[1], match[3]]));
  const outputLines = printLines.map((line) => line.replace(/\{(\w+)\}/g, (_, key) => variables[key] ?? `{${key}}`));
  output.textContent = outputLines.length ? outputLines.join("\n") : "No console output.";
  outputMeta.textContent = "Finished successfully";
  outputTime.textContent = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

document.querySelectorAll(".file-item").forEach((button) => button.addEventListener("click", () => selectFile(button)));
editor.addEventListener("input", refreshLineNumbers);
document.querySelector("#run-button").addEventListener("click", previewRun);
document.querySelector("#clear-output").addEventListener("click", () => {
  output.innerHTML = '<span class="muted">Run your Python file to see output here.</span>';
  outputMeta.textContent = "Ready to run";
});
document.querySelector("#theme-toggle").addEventListener("click", () => document.body.classList.toggle("dark"));
document.querySelector("#new-file").addEventListener("click", () => {
  const name = window.prompt("New file name", "scratch.py");
  if (!name || document.querySelector(`[data-file="${name}"]`)) return;
  files[name] = "";
  const button = document.createElement("button");
  button.className = "file-item";
  button.dataset.file = name;
  button.innerHTML = `<span class="text-icon">≡</span> ${name}`;
  button.addEventListener("click", () => selectFile(button));
  document.querySelector(".file-list").append(button);
  selectFile(button);
});
document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
    event.preventDefault();
    previewRun();
  }
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "s") {
    event.preventDefault();
    saveCurrentFile();
  }
});

loadFiles();
refreshLineNumbers();
