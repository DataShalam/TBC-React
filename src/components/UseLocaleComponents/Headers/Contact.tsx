"use client";

import React from "react";
import { useTranslations } from "next-intl";

export function ContactHeader() {
  const t = useTranslations("Headers");
  return (
    <h1 className="text-center text-4xl md:text-5xl lg:text-6xl mb-3 md:mb-4 lg:mb-5 text-light dark:text-dark drop-shadow-[0_0_1rem_rgba(236,223,204,0.8)]">
      {t("contact")}
    </h1>
  );
}

export function BeInTouch() {
  const t = useTranslations("Headers");
  return (
    <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-light dark:text-dark">
      {t("beInTouch")}
    </div>
  );
}
