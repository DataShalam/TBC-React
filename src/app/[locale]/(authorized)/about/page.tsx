"use client";

import React from "react";
import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations("About");

  return (
    <main className="w-[50rem] min-h[40rem] p-12 rounded-2xl my-0 mx-auto text-light dark:text-dark bg-light-card dark:bg-dark-card">
      <section className="p-6 rounded-xl mb-9 bg-light-heading dark:bg-dark-heading">
        <h1 className="text-5xl text-center">{t("aboutUs")}</h1>
      </section>
      <section className="">
        <p className="text-2xl">{t("aboutUsContent")}</p>
      </section>
    </main>
  );
}
