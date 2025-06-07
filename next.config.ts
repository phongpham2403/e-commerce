import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['cdn.sanity.io','img.tripi.vn', 'gcs.tripi.vn']
  }
};

export default nextConfig;
