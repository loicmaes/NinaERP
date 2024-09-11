// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "nuxt-mailer",
    "@nuxt/eslint",
    "@nuxtjs/google-fonts",
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
  ],
  eslint: {
    checker: true,
    config: {
      stylistic: {
        indent: 2,
        semi: true,
        quotes: "double",
      },
    },
  },
  runtimeConfig: {
    mailerUser: "",
    mailerPass: "",
    mailerFromAddress: "",
    mailerFromName: "",
    mailerHost: "",
    mailerPort: "",
  },
  vite: {
    optimizeDeps: {
      exclude: ["vee-validate"],
    },
  },
  googleFonts: {
    families: {
      Poppins: true,
    },
  },
  tailwindcss: {
    cssPath: ["assets/css/tailwind.css", { injectPosition: "first" }],
    configPath: "tailwind.config.ts",
    exposeConfig: false,
    viewer: true,
  },
});
