/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors:{
              "dark-purple":"#301934",
              "dark-red":"#7F0000",
              "dark-grey":"#F3F3F3",
              "lite-wite":"#FAFAFA",
              "primaryColor": "#7F0000",
              "buttonblue":"#2563EA",
              "buttonorange":"#C81E1E",
              "buttongreen":"#28B765",
              "buttoncancel" : "#FAB5B5",
              "buttoncomplete" : "#68d391",
              "buttonpending" : "#F6e05e",
             
            }
          },
    },
    plugins: [],
};
