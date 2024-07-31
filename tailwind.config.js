/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx,ts,jsx}"],
  theme: {
    extend: {
      maxWidth: {
        768: "768px",
        786: "786px",
        800: "800px",
      },

      width: {
        custom: "1000px",
        px50: "50px",
        px75: "75px",
        px100: "100px",
        px150: "150px",
        px200: "200px",
        px250: "250px",
        px300: "300px",
        px350: "350px",
        px400: "400px",
        px415: "415px",
        px445: "445px",
        px655: "655px",
        px670: "670px",
        px700: "700px",
      },
      height: {
        custom: "900px",
        px70: "70px",
        px85: "85px",
        px100: "100px",
        px120: "120px",
        px200: "200px",
        px250: "250px",
        px300: "300px",
        px350: "350px",
        px500: "500px",
      },
      gap: {
        px10: "10px",
        px20: "20px",
      },
      colors: {
        skipDB: "#0A3677",
        skipMB: "#0078B3",
        skipLB: "#00BBCC",
        skipM: "#6EFACC",
        npLG: "#F0FBFF",
      },
      fontSize: {
        px26: "26px",
        px32: "32px",
      },
      margin: {
        px10: "10px",
        px20: "20px",
        px30: "30px",
      },
    },
  },
  plugins: [],
};
