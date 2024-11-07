import React from "react";

export default function contact() {
  const inputStyles =
    "w-full p-3 text-xl outline-none border-light-hover-whole placeholder-light dark:placeholder-dark text-light dark:text-dark dark:border-dark-hover-whole rounded-lg bg-light-heading dark:bg-dark-heading focus:bg-light-hover focus:dark:bg-dark-hover hover:bg-light-hover hover:dark:bg-dark-hover transition";

  return (
    <main className="w-[50rem] min-h-[40rem] p-12 rounded-2xl my-0 mx-auto text-light dark:text-dark bg-light-card dark:bg-dark-card">
      <div className="rounded-xl p-5 mb-9 bg-light-heading dark:bg-dark-heading">
        <h1 className="text-5xl text-center">Contact</h1>
      </div>
      <section className="flex flex-col items-center px-8 pt-8 pb-16">
        <div className="mb-5">
          <div className="text-3xl font-bold text-center text-light dark:text-dark">
            Let’s Be in Touch
          </div>
        </div>
        <div className="w-full">
          <form className="flex flex-col gap-5 w-full">
            <div className="relative w-full">
              <label htmlFor="username"></label>
              <input
                type="text"
                id="username"
                className={inputStyles}
                placeholder="UserName"
              />
            </div>

            <div className="relative w-full">
              <label htmlFor="email"></label>
              <input
                type="text"
                id="email"
                placeholder="Email"
                className={inputStyles}
              />
            </div>

            <div className="relative w-full">
              <label htmlFor="tel"></label>
              <input
                type="tel"
                id="secondname"
                placeholder="Number"
                className={inputStyles}
                required
              />
            </div>

            <div className="relative w-full">
              <label htmlFor="text"></label>
              <textarea
                id="text"
                placeholder="Text"
                className={`${inputStyles} resize-y`}
                required
              />
            </div>

            <button
              type="submit"
              className="border-none py-3 px-5 mt-7 text-base cursor-pointer font-bold rounded-lg text-white bg-light-hover-whole dark:bg-dark-hover-whole hover:bg-light-hover hover:dark:bg-dark-hover transition"
            >
              Send
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
