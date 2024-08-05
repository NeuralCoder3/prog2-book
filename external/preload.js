function toggleDarkmodeCSS() {
  document.documentElement.classList.toggle('dark-mode');
}

let lastActivation = -1;

function applyDarkmodeToggle() {
  // prevent double activation
  if (lastActivation > Date.now() - 1000) {
    return;
  }
  lastActivation = Date.now();
  darkmode = !darkmode;
  localStorage.darkmode = darkmode;
  console.log("store darkmode: " + localStorage.darkmode);
  toggleDarkmodeCSS();
  $(".toggle").each(function (idx) { $(this).prop("checked", !darkmode); });
}
var darkmode;
function loadDarkmode() {
  darkmode = JSON.parse(localStorage['darkmode']) === true;
  console.log("loaded " + localStorage['darkmode']);
}

loadDarkmode();
if (darkmode) {
  console.log("Toggle Darkmode on");
  toggleDarkmodeCSS();
}

