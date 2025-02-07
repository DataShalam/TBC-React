import React from "react";
import {
  ContactHeader,
  BeInTouch,
} from "../../../../components/UseLocaleComponents/Headers/Contact";
import { ContactForm } from "../../../../components/UseLocaleComponents/Form/ContactForm";

export default async function Contact({
  params,
}: {
  params: { locale: string };
}) {
  return (
    <main className="w-[50rem] min-h-[40rem] p-12 rounded-2xl my-0 mx-auto text-light dark:text-dark bg-light-card dark:bg-dark-card">
      <div className="rounded-xl p-5 mb-9 bg-light-heading dark:bg-dark-heading">
        <ContactHeader />
      </div>
      <section className="flex flex-col items-center px-8 pt-8 pb-16">
        <div className="mb-5">
          <BeInTouch />
        </div>
        <div className="w-full">
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
