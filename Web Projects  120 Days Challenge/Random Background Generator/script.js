let genBtn = document.getElementById("gen");
let copyBtn = document.getElementById("copy");
let mode = document.getElementById("mode");
let c1 = document.getElementById("c1");
let c2 = document.getElementById("c2");

let rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
var toHex = (n) => n.toString(16).padStart(2, "0");
let randomColor = () =>
  `#${toHex(rand(0, 255))}${toHex(rand(0, 255))}${toHex(rand(0, 255))}`;

function setReadableTextAgainst(bg1, bg2 = null) {
  // compute perceived luminance; if gradient, average two
  const lum = (hex) => {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;
    // relative luminance approximation
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  let L = bg2 ? (lum(bg1) + lum(bg2)) / 2 : lum(bg1);
  document.documentElement.style.setProperty(
    "--fg",
    L > 0.5 ? "#111" : "#f9f9f9"
  );
  document.documentElement.style.setProperty(
    "--chip-bg",
    L > 0.5 ? "rgba(255,255,255,.6)" : "rgba(0,0,0,.35)"
  );
}

function generate() {
  let color1 = randomColor();
  if (mode.checked) {
    let color2 = randomColor();
    let angle = rand(0, 360);
    document.body.style.background = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
    c1.textContent = color1;
    c2.textContent = color2;
    c2.style.display = "";
    setReadableTextAgainst(color1, color2);
  } else {
    document.body.style.background = color1;
    c1.textContent = color1;
    c2.style.display = "none";
    setReadableTextAgainst(color1);
  }
}

function copyColors() {
  const text = mode.checked
    ? `${c1.textContent} ${c2.textContent} `
    : c1.textContent;
  navigator.clipboard.writeText(text).then(() => {
    copyBtn.textContent = "Copied!";
    setTimeout(() => (copyBtn.textContent = "Copy"), 900);
  });
}

genBtn.addEventListener("click", generate);
copyBtn.addEventListener("click", copyColors);
window.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    generate();
  }
});

// first paint
generate();
