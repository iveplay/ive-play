export default {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  outputFileTracingExcludes: {
    '*': ['node_modules/react-textarea-autosize'],
  },
};
