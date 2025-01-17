import React from "react";
import CheckoutForm from "../../../components/stripe/CheckoutForm";

export default async function subscriptions({
  params,
}: {
  params: { locale?: string };
}): Promise<JSX.Element> {
  const locale = (await params?.locale) || "en";
  return (
    <div>
      <CheckoutForm uiMode="hosted" locale={locale} />
    </div>
  );
}
