const windmill = require("@windmill/react-ui/config");

module.exports = windmill({
  purge: ["./pages/**/*.tsx", "./components/**/*.tsx"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"]
      },
      typography: theme => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.900"),
            code: {
              color: theme("colors.pink.600")
            },
            a: {
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline"
              }
            }
          }
        },

        dark: {
          css: {
            color: theme("colors.gray.300"),
            strong: {
              color: theme("colors.gray.300")
            },
            h1: {
              color: theme("colors.gray.300")
            },
            h2: {
              color: theme("colors.gray.300")
            },
            h3: {
              color: theme("colors.gray.300")
            },
            h4: {
              color: theme("colors.gray.300")
            },
            h5: {
              color: theme("colors.gray.300")
            },
            p: {
              color: theme("colors.gray.300")
            },
            pre: {
              background: "#33353e"
            },
            a: {
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline"
              }
            },
            code: {
              color: theme("colors.pink.600")
            }
          }
        }
      })
    }
  },
  variants: { typography: ["dark"] },
  // eslint-disable-next-line global-require
  plugins: [require("@tailwindcss/typography")]
});
