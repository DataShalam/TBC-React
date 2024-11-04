import Link from "next/link";

import { authenticate } from "../../lib/actions.js";

export default function SignIn() {
  return (
    <div className="flex flex-col justify-center my-50vh mx-auto max-w-[30rem] p-6 -translate-y-1/2 rounded-xl bg-light-card dark:bg-dark-card text-light dark:text-dark">
      <div className="p-3 rounded-md text-center">
        <h5 className="text-4xl uppercase text-light dark:text-dark">LogIn</h5>
      </div>
      <form action={authenticate}>
        <div className="my-6 mx-0 flex flex-col">
          <label htmlFor="email"></label>
          <input
            type="text"
            className="text-base p-4 border rounded-md border-light-heading bg-light-main text-light dark:border-dark-heading dark:bg-dark-main dark:text-dark hover:bg-light-hover transition placeholder:text-light placeholder:dark:text-dark"
            placeholder="Email"
            required
            name="email"
            id="email"
          />
        </div>
        <div className="my-6 mx-0 flex flex-col">
          <label htmlFor="pass"></label>
          <input
            type="password"
            className="text-base p-4 border rounded-md border-light-heading bg-light-main text-light dark:border-dark-heading dark:bg-dark-main dark:text-dark hover:bg-light-hover transition placeholder:text-light placeholder:dark:text-dark"
            placeholder="Password"
            required
            id="pass"
            name="password"
          />
        </div>
        <div className="flex justify-between items-center text-base text-light dark:text-dark">
          <section>
            <input type="checkbox" />
            <label
              htmlFor="check"
              className="ml-1 no-underline text-light dark:text-dark"
            >
              Remember me
            </label>
          </section>
          <section>
            <Link
              href="/forgot-password"
              className="no-underline text-light dark:text-dark hover:underline"
            >
              Forgot password
            </Link>
          </section>
        </div>
        <div className="flex justify-center mt-5">
          <button
            className="border-0 py-2 px-5 text-base cursor-pointer rounded-md bg-light-heading text-light dark:bg-dark-heading dark:text-dark hover:bg-light-hover-whole hover:dark:bg-dark-hover-whole transition"
            id="submit"
            type="submit"
            htmlFor="submit"
          >
            Sign In
          </button>
        </div>
        <div className="text-center mt-5 text-base">
          <p className="text-light dark:text-dark">
            Do not have account ?{" "}
            <Link href="/signUp" className="hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
