import withTM from "next-transpile-modules";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withTM(["react-use", "@storefront-ui/react"])(nextConfig);
