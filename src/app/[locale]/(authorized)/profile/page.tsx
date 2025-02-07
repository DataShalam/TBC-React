import { createClient } from "../../../../utils/supabase/server";
import { UserIcon } from "@heroicons/react/solid";
import { User } from "@supabase/supabase-js";

export default async function profile() {
  const supabase = await createClient();
  const userResponse = await supabase.auth.getUser();

  const user: User = userResponse.data?.user;
  console.log(user.id);

  return (
    <div className="flex flex-col items-center p-4 md:p-6 rounded-lg shadow-lg w-full max-w-md mx-auto mt-6 md:mt-10 bg-light-card dark:bg-dark-card text-light dark:text-dark">
      {/* Avatar or User Icon */}
      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden flex items-center justify-center bg-gray-200 dark:bg-gray-700">
        {user?.user_metadata?.avatar_url ? (
          <img
            src={user?.user_metadata?.avatar_url}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        ) : (
          <UserIcon className="w-12 h-12 md:w-16 md:h-16 text-gray-500 dark:text-gray-400" />
        )}
      </div>

      {/* Full Name */}
      <h1 className="text-2xl md:text-3xl font-semibold mt-4 text-center">
        {user?.user_metadata?.full_name || "Anonymous User"}
      </h1>

      {/* Divider */}
      <div className="w-full h-px border-b my-2 md:my-4 border-light-navigation-border dark:border-dark-navigation-border"></div>

      {/* Email */}
      <p className="mt-2 md:mt-3 text-base md:text-xl text-light dark:text-dark text-center">
        <span className="font-semibold">Email:</span>{" "}
        {user.email || "Not provided"}
      </p>

      {/* Username */}
      <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
        {user.user_metadata?.user_name || "Username not set"}
      </p>

      {/* Email Verification Status */}
      <p className="mt-2 md:mt-3 text-base md:text-xl text-center">
        <span className="font-semibold">Email Verified:</span>{" "}
        {user.email && user.email_confirmed_at ? (
          <span className="text-green-500">Yes</span>
        ) : (
          <span className="text-red-500">No</span>
        )}
      </p>

      {/* Last Updated */}
      <p className="mt-3 md:mt-4 text-sm md:text-base text-gray-500 dark:text-gray-400 text-center">
        Last updated on: {new Date(user.updated_at).toLocaleString()}
      </p>
    </div>
  );
}
