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

try {
  registerSW();
} catch (err) {
  console.log(err.toString());
  throw err;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const url = search(address.value, searchEngine.value);
  document.getElementById('proxy-container').classList.remove('proxy-close-animation');
  document.getElementById('proxy-outer-container').style.display='flex';
  document.getElementById('proxy-container').classList.add('proxy-open-animation');
  document.getElementById('iframe').src = __uv$config.prefix + __uv$config.encodeUrl(url);
  //ocation.href = 
});
