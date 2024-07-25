"use strict";
/**
 * @type {HTMLFormElement}
 */
const form = document.getElementById("proxy-form");
/**
 * @type {HTMLInputElement}
 */
const address = document.getElementById("proxy-address");
/**
 * @type {HTMLInputElement}
 */
const searchEngine = document.getElementById("proxy-search-engine");
/**
 * @type {HTMLParagraphElement}
 */
const error = document.getElementById("proxy-error");
/**
 * @type {HTMLPreElement}
 */
const errorCode = document.getElementById("proxy-error-code");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const url = search(address.value, searchEngine.value);
  document.getElementById('proxy-container').classList.remove('proxy-close-animation');
  document.getElementById('proxy-container').classList.remove('proxy-fullclose-animation');
  document.getElementById('proxy-outer-container').style.display = 'flex';
  document.getElementById('proxy-container').classList.add('proxy-open-animation');
  document.getElementById('settingsButton').style.display = 'none';
  document.getElementById('iframe').src = __uv$config.prefix + __uv$config.encodeUrl(url);
});

const astroluxurl = new URL(window.location.href);

if (url.searchParams.get('search')) {
  const searchurl = search(url.searchParams.get('search'), 'Google');
  document.getElementById('proxy-container').classList.remove('proxy-close-animation');
  document.getElementById('proxy-container').classList.remove('proxy-fullclose-animation');
  document.getElementById('proxy-outer-container').style.display = 'flex';
  document.getElementById('proxy-container').classList.add('proxy-open-animation');
  document.getElementById('settingsButton').style.display = 'none';
  document.getElementById('iframe').src = __uv$config.prefix + __uv$config.encodeUrl(searchurl);
}