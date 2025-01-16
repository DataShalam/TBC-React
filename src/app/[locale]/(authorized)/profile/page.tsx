import { createClient } from "../../../../utils/supabase/server";
import { UserIcon } from "@heroicons/react/solid";

export default async function profile() {
  const supabase = await createClient();
  const userResponse = await supabase.auth.getUser();

  const user = userResponse.data?.user;

  return (
    <div className="flex flex-col items-center p-6 rounded-lg shadow-lg max-w-xl mx-auto mt-10 bg-light-card dark:bg-dark-card text-light dark:text-dark">
      {user?.user_metadata?.avatar_url ? (
        <img
          src={user?.user_metadata?.avatar_url}
          alt="Avatar"
          className="w-full h-full object-cover rounded-full"
        />
      ) : (
        <UserIcon className="w-24 h-24 text-gray-500" />
      )}

      <h1 className="text-5xl font-semibold ">
        {user?.user_metadata?.full_name || "User"}
      </h1>

      <div className="w-full h-1 border-b-2 my-2 border-light-navigation-border dark:border-dark-navigation-border"></div>

      <p className="mt-3 text-xl text-light dark:text-dark">
        <span className="font-semibold">Email:</span>{" "}
        {user.email || "Not provided"}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {user.user_metadata?.user_name || "Username not set"}
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
