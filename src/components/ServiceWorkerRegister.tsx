"use client";

import { useEffect } from "react";

export function ServiceWorkerRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    // Reload silently when a new SW takes control (sw.js calls skipWaiting on install).
    // Guard against first-install: only listen if a controller is already active,
    // so a brand-new visitor doesn't get an immediate double-reload.
    if (navigator.serviceWorker.controller) {
      let reloading = false;
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (reloading) return;
        reloading = true;
        window.location.reload();
      });
    }

    navigator.serviceWorker.register("/sw.js", { scope: "/", updateViaCache: "none" });
  }, []);
  return null;
}
