/* Badge count: add one for every notification. The app clears it when opened. */
var RD_BADGE = "https://garrettleake.com/robot-duty/__badge";
self.addEventListener("push", function (e) {
  try {
    e.waitUntil(caches.open("rd-badge").then(function (c) {
      return c.match(RD_BADGE).then(function (r) { return r ? r.text() : "0"; }).then(function (t) {
        var n = (parseInt(t, 10) || 0) + 1;
        return c.put(RD_BADGE, new Response(String(n))).then(function () {
          if (self.navigator && self.navigator.setAppBadge) return self.navigator.setAppBadge(n);
        });
      });
    }).catch(function () {}));
  } catch (x) {}
});
importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");
