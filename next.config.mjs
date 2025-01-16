import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["btvwztqtmfjxvpmvtjue.supabase.co", "uvp7aohymm.ufs.sh"],
  },
};

export default withNextIntl(nextConfig);
