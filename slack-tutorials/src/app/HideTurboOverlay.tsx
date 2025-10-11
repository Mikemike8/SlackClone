"use client";
import { useEffect } from "react";

export default function HideTurboOverlay() {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      const overlay = document.querySelector('[data-turbo-overlay]');
      if (overlay) overlay.remove();
    }
  }, []);

  return null;
}
