
var fullscreen = false;

// document.body.addEventListener('mousemove', function (e) {
//   var windowHeight = window.innerHeight;
//   var y = e.clientY;

//   // Calculate how far the gradient should move based on mouse Y position
//   // Mapping mouseY position to a range from -100px to +100px from the bottom
//   var moveRange = -100; // Total movement range in pixels
//   var offset = (y / windowHeight * moveRange) - (moveRange / 2);

//   // Apply the gradient style to the body with constrained movement
//   document.body.style.backgroundImage =
//       'linear-gradient(to bottom, #000000 ' + (80 - (offset / windowHeight * 100)) + '%, #101010 100%)';
// });

function closeProxy() {
  if (fullscreen) {
    document.getElementById('fullscreen-exit').style.display = 'none';
    document.getElementById('fullscreen-icon').style.display = 'block';
    document.getElementById('proxy-container').classList.remove('proxy-full-animation');
    document.getElementById('proxy-container').classList.add('proxy-fullclose-animation');
  } else {
    document.getElementById('proxy-container').classList.add('proxy-close-animation');
    document.getElementById('proxy-container').classList.remove('proxy-normal-animation');
  }
  document.getElementById('close-icon').style.display = 'none';
  document.getElementById('fullscreen-icon').style.display = 'none';
  fullscreen = false;
  setTimeout(hideproxy, 1000);
}

function hideproxy() {
  document.getElementById('proxy-outer-container').style.display = 'none';
  document.getElementById('close-icon').style.display = 'block';
  document.getElementById('fullscreen-icon').style.display = 'block';
  document.getElementById('settingsButton').style.display = 'block';
  document.getElementById('iframe').src = "";
}

function openAboutBlank() {
  var win = window.open()
  var url = window.location.href
  var iframe = win.document.createElement('iframe')
  iframe.style.position = "fixed"
  iframe.style.width = "100%"
  iframe.style.height = "100%"
  iframe.style.border = "none"
  iframe.style.top = "0"
  iframe.style.bottom = "0"
  iframe.style.left = "0"
  iframe.style.right = "0"
  iframe.style.margin = "0"
  iframe.style.padding = "0"
  iframe.style.overflow = "hidden"
  iframe.src = url
  win.document.body.appendChild(iframe)
}

document.getElementById('close-icon').addEventListener('click', closeProxy);

document.getElementById('fullscreen-icon').addEventListener('click', function () {
  document.getElementById('proxy-container').classList.remove('proxy-normal-animation');
  document.getElementById('proxy-container').classList.remove('proxy-open-animation');
  document.getElementById('proxy-container').classList.add('proxy-full-animation');
  document.getElementById('fullscreen-icon').style.display = 'none';
  document.getElementById('fullscreen-exit').style.display = 'block';
  fullscreen = true;
});

document.getElementById('fullscreen-exit').addEventListener('click', function () {
  document.getElementById('proxy-container').classList.remove('proxy-full-animation');
  document.getElementById('proxy-container').classList.add('proxy-normal-animation');
  document.getElementById('fullscreen-exit').style.display = 'none';
  document.getElementById('fullscreen-icon').style.display = 'block';
  fullscreen = false;
});

document.getElementById('settingsButton').addEventListener('click', function () {
  document.getElementById('settings-container').classList.remove('proxy-close-animation');
  document.getElementById('settings-outer-container').style.display = 'flex';
  document.getElementById('settings-container').classList.add('proxy-open-animation');
  document.getElementById('settingsButton').style.display = 'none';
});

function hideSettings() {
  document.getElementById('settings-outer-container').style.display = 'none';
  document.getElementById('settings').style.display = 'block';
  document.getElementById('close-icon').style.display = 'block';
  document.getElementById('settingsButton').style.display = 'block';
}

document.getElementById('close-icon2').addEventListener('click', function () {
  document.getElementById('settings').style.display = 'none';
  document.getElementById('settings-container').classList.remove('proxy-normal-animation');
  document.getElementById('settings-container').classList.add('proxy-close-animation');
  setTimeout(hideSettings, 1000);
})

document.addEventListener('DOMContentLoaded', function () {
  var selectedTransport = localStorage.getItem('transport');
  if (selectedTransport) {
    document.getElementById('transportsel').value = selectedTransport;
  }
});

document.getElementById('transportsel').addEventListener('change', function () {
  localStorage.setItem('transport', this.value);
  registerSW(this.value);
})


function changetitle(title) {
  if (title == "") {
    document.title = "Astrolux";
    localStorage.setItem('title', "Astrolux");
  } else {
    document.title = title;
    localStorage.setItem('title', title);
  }

}

function changeicon(icon) {
  if (icon == "") {
    document.getElementById('icon').href = "1.png";
    localStorage.setItem('icon', "1.png");
  } else {
    document.getElementById('icon').href = icon;
    localStorage.setItem('icon', icon);
  }

}

if (localStorage.getItem('title')) {
  document.title = localStorage.getItem('title');
}

if (localStorage.getItem('icon')) {
  document.getElementById('icon').href = localStorage.getItem('title');
}

document.getElementById('imageUpload').addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById('icon').href = e.target.result;
      localStorage.setItem('icon', e.target.result);
    }
    reader.readAsDataURL(file);
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key == localStorage.getItem('panickey')) {
    window.location.replace(localStorage.getItem('panicsite'));
  }
});
const url = new URL(window.location.href);

if (url.searchParams.get('title')) {
  document.getElementById('astrolux').innerHTML = url.searchParams.get('title');
  localStorage.setItem('astrolux', url.searchParams.get('title'));
}

if (url.searchParams.get('titlecloak')) {
  changetitle(url.searchParams.get('titlecloak'));
}

if (url.searchParams.get('imgcloak')) {
  changeicon(url.searchParams.get('imgcloak'));
}

if (url.searchParams.get('panickey')) {
  localStorage.setItem('panickey', url.searchParams.get('panickey'))
}

if (url.searchParams.get('panicsite')) {
  localStorage.setItem('panicsite', url.searchParams.get('panicsite'))
}

if (localStorage.getItem('panickey')==null) {
  localStorage.setItem('panickey', '`')==null
}

if (localStorage.getItem('panicsite')==null) {
  localStorage.setItem('panicsite', 'https://classroom.google.com')==null
}












function setCSSVariables(variables) {
  for (const [key, value] of Object.entries(variables)) {
      document.documentElement.style.setProperty(key, value);
  }
}

function serializeObjectToQueryParam(obj) {
  return encodeURIComponent(JSON.stringify(obj));
}

function deserializeQueryParamToObject(queryParam) {
  return JSON.parse(decodeURIComponent(queryParam));
}

// Function to change colors directly
function changeColors() {
  const cssVariables = {
      '--main-bg-color': 'green',
      '--main-text-color': 'blue'
  };
  
  setCSSVariables(cssVariables);
}

// Check if there's a 'css' query parameter and apply the styles if found
const urlParams = new URLSearchParams(window.location.search);
const cssQueryParam = urlParams.get('css');

if (cssQueryParam) {
  const cssVariablesFromQuery = deserializeQueryParamToObject(cssQueryParam);
  setCSSVariables(cssVariablesFromQuery);
}

// Example of setting CSS variables via a search query
// You can generate the URL with the query string like this:
const cssVariables = { '--main-bg-color': 'green', '--main-text-color': 'blue' };
const serializedCSS = serializeObjectToQueryParam(cssVariables);
