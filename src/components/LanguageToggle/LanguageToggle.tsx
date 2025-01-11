import { useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import useClickOutside from "../../hooks/useClickOutside";

const LanguageToggle = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentLocale = pathname.split("/")[1];
  const languages = [
    {
      code: "en",
      label: "EN",
      flag: "https://cdn.britannica.com/79/4479-050-6EF87027/flag-Stars-and-Stripes-May-1-1795.jpg",
    },
    {
      code: "ka",
      label: "KA",
      flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Flag_of_Georgia.svg/1200px-Flag_of_Georgia.svg.png",
    },
  ];

  const currentLanguage = languages.find((lang) => lang.code === currentLocale);

  useClickOutside(dropdownRef, () => setIsDropdownOpen(false));

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleLanguageChange = (newLocale: string) => {
    if (newLocale !== currentLocale) {
      const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
      router.push(newPath);
      setIsDropdownOpen(false);
    }
  };

  return (
    <div
      className="relative text-xl font-bold cursor-pointer text-light dark:text-dark"
      ref={dropdownRef}
    >
      <button
        className="flex items-center bg-none border-none cursor-pointer"
        onClick={toggleDropdown}
        aria-expanded={isDropdownOpen}
        aria-haspopup="listbox"
        aria-controls="language-options"
      >
        <img
          src={currentLanguage?.flag}
          alt={`${currentLanguage?.label} Flag`}
          width={20}
          height={14}
        />
        <span className="text-xl px-2">{currentLanguage?.label}</span>
        <svg
          className="dark:fill-white"
          width="14"
          height="14"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10.1025513,12.7783485 L16.8106554,6.0794438 C17.0871744,5.80330401 17.5303978,5.80851813 17.8006227,6.09108986 C18.0708475,6.37366159 18.0657451,6.82658676 17.7892261,7.10272655 L10.5858152,14.2962587 C10.3114043,14.5702933 9.87226896,14.5675493 9.60115804,14.2901058 L2.2046872,6.72087106 C1.93149355,6.44129625 1.93181183,5.98834118 2.20539811,5.7091676 C2.47898439,5.42999401 2.92223711,5.43031926 3.19543076,5.70989407 L10.1025513,12.7783485 Z" />
        </svg>
      </button>

      {isDropdownOpen && (
        <div
          id="language-options"
          className="absolute top-full left-0 z-10 bg-white dark:bg-gray-700 mt-2 shadow-lg rounded-md"
        >
          {languages.map(({ code, label, flag }) => (
            <button
              key={code}
              className={`flex items-center p-2 w-24 hover:bg-gray-200 dark:hover:bg-gray-600 ${
                currentLocale === code ? "font-semibold" : "font-normal"
              }`}
              onClick={() => handleLanguageChange(code)}
            >
              <img
                className="mr-2"
                src={flag}
                alt={`${label} Flag`}
                width={20}
                height={14}
              />
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageToggle;
