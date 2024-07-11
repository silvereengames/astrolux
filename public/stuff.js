
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

document.addEventListener('DOMContentLoaded', function() {
  var selectedTransport = localStorage.getItem('transport');
  if (selectedTransport) {
    document.getElementById('transportsel').value = selectedTransport;
  }
});

document.getElementById('transportsel').addEventListener('change', function () {
  localStorage.setItem('transport', this.value);
  registerSW(this.value);
})