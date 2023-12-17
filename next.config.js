const { withPlausibleProxy } = require("next-plausible")

/** @type {import('next').NextConfig} */
const nextConfig = withPlausibleProxy({
    customDomain: "https://analytics.vicfood.ca"
})({
    // Next Config goes here!
})

module.exports = nextConfig
