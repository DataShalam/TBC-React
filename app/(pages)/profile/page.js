import { getSession } from "@auth0/nextjs-auth0";

export default async function profile() {
  const sessionAuth = await getSession();

  const { user } = sessionAuth;

  return (
    <div className="flex flex-col items-center p-6 rounded-lg shadow-lg max-w-xl mx-auto mt-10 bg-light-card dark:bg-dark-card text-light dark:text-dark">
      <img
        src={user.picture}
        alt={`${user.given_name}'s profile`}
        className="w-32 h-32 rounded-full mb-4"
      />

      <h1 className="text-5xl font-semibold ">
        {user.given_name} {user.family_name}
      </h1>

      <div className="w-full h-1 border-b-2 my-2 border-light-navigation-border dark:border-dark-navigation-border"></div>

      <p className="mt-3 text-xl text-light dark:text-dark">
        <span className="font-semibold">Email:</span>{" "}
        {user.email || "Not provided"}
      </p>

      <p className="mt-2 text-xl">
        <span className="font-semibold">Email Verified:</span>{" "}
        {user.email_verified ? (
          <span className="text-green-500">Yes</span>
        ) : (
          <span className="text-red-500">No</span>
        )}
      </p>

      <p className="mt-4 text-base text-gray-500">
        Last updated on: {new Date(user.updated_at).toLocaleString()}
      </p>
    </div>
  );
}
