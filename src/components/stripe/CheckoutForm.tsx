"use client";

import React, { useState } from "react";
import { createCheckoutSession } from "../../app/actions/stripe-subscription";
import { CheckIcon, XIcon } from "@heroicons/react/solid";

interface CheckoutFormProps {
  uiMode: "hosted";
  locale: string;
}

export default function CheckoutForm({
  uiMode,
  locale,
}: CheckoutFormProps): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);

  const formAction = async (): Promise<void> => {
    setLoading(true);

    const formData = new FormData();
    formData.append("uiMode", uiMode);
    formData.append("priceId", "price_1QhzpULKaMjfXF40xQLB1BGZ");
    formData.append("locale", locale);

    const { url } = await createCheckoutSession(formData);

    if (url) {
      window.location.assign(url);
    }

    setLoading(false);
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="shadow-2xl shadow-black/40 dark:shadow-dark/30 p-10 flex flex-col justify-center items-center border-solid border-4 border-light-card dark:border-dark-card rounded-lg text-light dark:text-dark transition-shadow duration-300">
          <header className="text-center mb-10">
            <p className="text-3xl font-bold uppercase mb-6">Starter</p>
            <p className="text-2xl mb-3">
              $ <span className="text-7xl font-bold">19.99</span>
            </p>
            <p className="text-lg opacity-80">What You'll Get</p>
          </header>
          <ul className="text-center space-y-4 mb-4">
            <li className="flex items-center justify-start">
              <CheckIcon width={25} height={25} className="mr-2" />
              <span className="text-lg">Workout Plans</span>
            </li>
            <li className="flex items-center justify-start">
              <CheckIcon width={25} height={25} className="mr-2" />
              <span className="text-lg">Nutrition Guidance</span>
            </li>
            <li className="flex items-center justify-start">
              <CheckIcon width={25} height={25} className="mr-2" />
              <span className="text-lg">Online Coaching</span>
            </li>
            <li className="flex items-center justify-start">
              <XIcon width={25} height={25} className="mr-2" />
              <span className="text-lg">In-Person Training Sessions</span>
            </li>
            <li className="flex items-center justify-start">
              <XIcon width={25} height={25} className="mr-2" />
              <span className="text-lg">Customized Equipment</span>
            </li>
          </ul>
          <button
            className="rounded-md px-10 py-4 mt-6 bg-light-hover dark:bg-dark-hover hover:bg-light-hover-whole hover:dark:bg-dark-hover-whole text-xl transition-colors"
            onClick={formAction}
            disabled={loading}
          >
            Join Now
          </button>
        </div>
      </div>
    </>
  );
}
