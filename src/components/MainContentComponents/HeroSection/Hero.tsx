"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "../../../i18n/routing";
import bgimage from "../../../assets/pexels-victorfreitas-949129.jpg";

export default function Hero() {
  const t = useTranslations("HeroSection");

  const backgroundImageStyle = {
    backgroundImage: `url(${bgimage.src})`,
  };

  return (
    <div className="h-[400px] lg:h-[750px] container mx-auto pt-10">
      <div
        style={backgroundImageStyle}
        className="relative bg-cover bg-center container mx-auto h-full flex flex-col items-center justify-center"
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="z-10 max-w-screen-xl mx-auto p-4 flex flex-col items-start justify-between gap-6 lg:gap-12 w-full lg:min-w-[1280px]">
          <div className="text-left flex flex-col justify-center space-y-4 lg:space-y-6">
            <h1 className="text-2xl lg:text-3xl font-bold text-dark">{`${t(
              "heroTitle"
            )}`}</h1>
            <p className="text-base lg:text-lg max-w-xl text-dark">
              {t("heroSectionContent")}
            </p>
            <Link href="/subscriptions">
              <button className="border-none bg-light-navigation-border dark:bg-dark-navigation-border text-light dark:text-dark text-sm lg:text-base px-4 lg:px-5 py-2 lg:py-3 rounded-lg shadow-md hover:bg-opacity-80 dark:hover:bg-opacity-80 transition-colors">
                {t("subscription")}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
