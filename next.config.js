const { withPlausibleProxy } = require("next-plausible")

/** @type {import('next').NextConfig} */
const nextConfig = withPlausibleProxy()({
    // Next Config goes here!
})

module.exports = nextConfig
