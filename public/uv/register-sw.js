const stockSW = "/uv/sw.js";
const swAllowedHostnames = ["localhost", "127.0.0.1"];
var transport = localStorage.getItem("transport");
if (!transport) {
  transport = "epoxy";
  localStorage.setItem("transport", transport);
}

async function registerSW(transportsel) {
  if (!navigator.serviceWorker) {
    if (
      location.protocol !== "https:" &&
      !swAllowedHostnames.includes(location.hostname)
    )
      throw new Error("Service workers cannot be registered without https.");

    throw new Error("Your browser doesn't support service workers.");
  }

  await navigator.serviceWorker.register(stockSW);

  if (transportsel == "epoxy") {
    let wispUrl = (location.protocol === "https:" ? "wss" : "ws") + "://" + location.host + "/wisp/";
    await BareMux.SetTransport("EpxMod.EpoxyClient", { wisp: wispUrl });
  } else if (transportsel == "bare") {
    let bareUrl = location.protocol + "//" + location.host + "/bare/";
    await BareMux.SetTransport("BareMod.BareClient", bareUrl);
  }

//  When testing proxy support CLEAR service workers from 8080 (or whatever current port you are using)

//  navigator.serviceWorker.register(stockSW).then(register => register.unregister().then(bool => console.log("Unregistered: " + bool)));

}
registerSW(transport);