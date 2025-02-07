"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export function ContactForm() {
  const t = useTranslations("Contact");
  const supabase = createClientComponentClient();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    number: "",
    text: "",
  });

  const [errors, setErrors] = useState({
    username: false,
    email: false,
    number: false,
    text: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: false })); // Remove error when user starts typing
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      username: !formData.username.trim(),
      email: !formData.email.trim() || !validateEmail(formData.email),
      number: !formData.number.trim(),
      text: !formData.text.trim(),
    };

    setErrors(newErrors);

    if (!Object.values(newErrors).some((error) => error)) {
      try {
        const { data, error } = await supabase
          .from("Messages") // Your Supabase table name
          .insert([
            {
              UserName: formData.username,
              Email: formData.email,
              Number: formData.number,
              Message: formData.text,
              created_at: new Date(),
            },
          ]);

        if (error) {
          console.error("Error uploading message:", error.message);
          alert("Failed to send message. Please try again.");
        } else {
          alert("Message sent successfully!");
          setFormData({ username: "", email: "", number: "", text: "" }); // Reset form
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        alert("Something went wrong. Please try again.");
      }
    }
  };

  const inputStyles =
    "w-full p-3 text-base md:text-lg lg:text-xl outline-none border placeholder-light dark:placeholder-dark text-light dark:text-dark rounded-lg bg-light-heading dark:bg-dark-heading transition";
  const errorStyles = "border-red-500";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="relative w-full">
        <label htmlFor="username"></label>
        <input
          type="text"
          id="username"
          className={`${inputStyles} ${
            errors.username
              ? errorStyles
              : "border-light-hover-whole dark:border-dark-hover-whole"
          }`}
          placeholder={t("userName")}
          value={formData.username}
          onChange={handleChange}
        />
        {errors.username && (
          <p className="text-red-500 text-sm mt-1">{t("errorUserName")}</p>
        )}
      </div>

      <div className="relative w-full">
        <label htmlFor="email"></label>
        <input
          type="text"
          id="email"
          placeholder={t("email")}
          className={`${inputStyles} ${
            errors.email
              ? errorStyles
              : "border-light-hover-whole dark:border-dark-hover-whole"
          }`}
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{t("errorEmail")}</p>
        )}
      </div>

      <div className="relative w-full">
        <label htmlFor="number"></label>
        <input
          type="tel"
          id="number"
          placeholder={t("number")}
          className={`${inputStyles} ${
            errors.number
              ? errorStyles
              : "border-light-hover-whole dark:border-dark-hover-whole"
          }`}
          value={formData.number}
          onChange={handleChange}
        />
        {errors.number && (
          <p className="text-red-500 text-sm mt-1">{t("errorNumber")}</p>
        )}
      </div>

      <div className="relative w-full">
        <label htmlFor="text"></label>
        <textarea
          id="text"
          placeholder={t("text")}
          className={`${inputStyles} resize-y ${
            errors.text
              ? errorStyles
              : "border-light-hover-whole dark:border-dark-hover-whole"
          }`}
          value={formData.text}
          onChange={handleChange}
        />
        {errors.text && (
          <p className="text-red-500 text-sm mt-1">{t("errorText")}</p>
        )}
      </div>

      <button
        type="submit"
        className="border-none py-3 px-5 mt-7 text-base md:text-lg lg:text-xl cursor-pointer font-bold rounded-lg text-white bg-light-hover-whole dark:bg-dark-hover-whole hover:bg-light-hover hover:dark:bg-dark-hover transition"
      >
        {t("send")}
      </button>
    </form>
  );
}
