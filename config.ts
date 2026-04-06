const config = {
  appName: "PromptVault",
  appDescription:
    "Best AI Prompts for ChatGPT, Gemini, Claude & More",
  domainName:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3001"
      : "https://aitrendinsights.com",
};

export default config;