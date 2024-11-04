import Link from "next/link";

export default function SignUp() {
  const signUpField =
    "text-base p-4 border rounded-md border-light-heading bg-light-main text-light dark:border-dark-heading dark:bg-dark-main dark:text-dark hover:bg-light-hover transition placeholder:text-light placeholder:dark:text-dark";

  return (
    <div className="flex flex-col justify-center my-50vh mx-auto max-w-[30rem] p-6 -translate-y-1/2 rounded-xl bg-light-card dark:bg-dark-card text-light dark:text-dark">
      <div className="p-3 rounded-md text-center">
        <h5 className="text-4xl uppercase text-light dark:text-dark">
          Sign Up
        </h5>
      </div>
      <form className="my-6 mx-0 flex flex-col gap-2">
        <label htmlFor="username"></label>
        <input
          type="text"
          className={signUpField}
          placeholder="Username"
          required
          name="username"
          id="username"
        />
        <label htmlFor="email"></label>
        <input
          type="email"
          className={signUpField}
          placeholder="Email"
          required
          name="email"
          id="email"
        />
        <label htmlFor="password"></label>
        <input
          type="password"
          className={signUpField}
          placeholder="Password"
          required
          name="password"
          id="password"
        />
        <label htmlFor="confirm_password"></label>
        <input
          type="password"
          className={signUpField}
          placeholder="Confirm Password"
          required
          name="confirm_password"
          id="confirm_password"
        />
        <div className="flex justify-center mt-5">
          <button
            className="border-0 py-3 px-5 text-base cursor-pointer rounded-md bg-light-heading text-light dark:bg-dark-heading dark:text-dark hover:bg-light-hover-whole hover:dark:bg-dark-hover-whole transition"
            id="submit"
            type="submit"
            htmlFor="submit"
          >
            Sign Up
          </button>
        </div>
        <div className="text-center mt-5 text-base">
          <p className="text-light dark:text-dark">
            Already have an account?{" "}
            <Link href="/signIn" className="no-underline hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
