"use client";

import React from "react";
import { useTranslations } from "next-intl";

export default function ProductsHeader() {
  const t = useTranslations("Headers");
  return (
    <h1 className="text-3xl md:text-4xl lg:text-6xl mb-3 md:mb-4 lg:mb-5 text-light dark:text-dark drop-shadow-[0_0_1rem_rgba(236,223,204,0.8)]">
      {t("products")}
    </h1>
  );
}
