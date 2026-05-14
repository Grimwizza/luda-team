"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [platform, setPlatform] = useState<"ios" | "android" | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showFab, setShowFab] = useState(false);
  const [showSteps, setShowSteps] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) return;

    const dismissed = !!localStorage.getItem("pwa-banner-dismissed");
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

    if (ios) {
      setPlatform("ios");
      dismissed ? setShowFab(true) : setShowBanner(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setPlatform("android");
      dismissed ? setShowFab(true) : setShowBanner(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (platform === "ios") {
      setShowSteps(true);
      return;
    }
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setShowBanner(false);
      setShowFab(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowBanner(false);
    setShowSteps(false);
    localStorage.setItem("pwa-banner-dismissed", "1");
    setShowFab(true);
  };

  const handleFabClick = () => {
    setShowSteps(false);
    setShowFab(false);
    setShowBanner(true);
  };

  if (!showBanner && !showFab) return null;

  return (
    <>
      {showBanner && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.10)]">
          <div className="p-4 max-w-sm mx-auto">
            {showSteps ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-sm">Add to Home Screen</p>
                  <button
                    onClick={handleDismiss}
                    className="text-gray-400 p-1 -mr-1"
                    aria-label="Dismiss"
                  >
                    ✕
                  </button>
                </div>
                <ol className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="font-bold text-[#D00000] shrink-0 w-4">1.</span>
                    Tap the <strong>Share</strong> button at the bottom of Safari
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="font-bold text-[#D00000] shrink-0 w-4">2.</span>
                    Scroll down and tap <strong>"Add to Home Screen"</strong>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="font-bold text-[#D00000] shrink-0 w-4">3.</span>
                    Tap <strong>"Add"</strong> in the top-right corner
                  </li>
                </ol>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icon-192.png" alt="" className="w-12 h-12 rounded-xl shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm leading-tight">LUDA</p>
                  <p className="text-xs text-gray-500 mt-0.5">Add to your home screen for quick access</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleInstall}
                    className="bg-[#D00000] text-white text-sm font-semibold px-4 py-1.5 rounded-full"
                  >
                    Install
                  </button>
                  <button
                    onClick={handleDismiss}
                    className="text-gray-400 p-1 -mr-1"
                    aria-label="Dismiss"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {showFab && (
        <button
          onClick={handleFabClick}
          className="md:hidden fixed bottom-6 right-4 z-50 flex items-center gap-2 bg-[#D00000] text-white text-sm font-semibold px-4 py-2.5 rounded-full shadow-lg"
          aria-label="Add to Home Screen"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4 shrink-0"
            aria-hidden="true"
          >
            <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
            <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
          </svg>
          Install App
        </button>
      )}
    </>
  );
}
