import withTM from "next-transpile-modules";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
};

export default withTM(["react-use", "@storefront-ui/react"])(nextConfig);
