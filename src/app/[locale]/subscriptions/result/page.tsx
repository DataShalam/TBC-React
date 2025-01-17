import type { Stripe } from "stripe";
import { stripe } from "../../../../lib/stripe/stripe";

export default async function ProductResultPage({
  searchParams,
}: {
  searchParams: { session_id: string };
}): Promise<JSX.Element> {
  if (!searchParams.session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.retrieve(searchParams.session_id, {
      expand: ["line_items", "payment_intent"],
    });

  const paymentIntent = checkoutSession.amount_total;

  if (!paymentIntent) {
    throw new Error("PaymentIntent not found");
  }

  return (
    <div className="flex flex-col items-center justify-center h-50vh">
      <div className="text-center">
        <h1 className="text-4xl font-semibold text-light dark:text-dark mb-4">
          🎉 Your Order is Confirmed
        </h1>
        <p className="text-4xl text-light/70 dark:text-dark/70 mb-6">
          You will be charged{" "}
          <span className="font-bold text-light dark:text-dark">
            {(paymentIntent - (paymentIntent % 100)) / 100}.
            {paymentIntent % 100} $
          </span>
        </p>
        <p className="text-light dark:text-dark mb-8">
          For any questions, please contact our support team.
        </p>

        <a
          href="/"
          className="inline-block bg-light-hover hover:bg-light-hover-whole dark:bg-dark-hover hover:dark:bg-dark-hover-whole text-base text-white font-semibold py-6 px-8 rounded-full transition-all"
        >
          Go to the homepage
        </a>
      </div>
    </div>
  );
}
