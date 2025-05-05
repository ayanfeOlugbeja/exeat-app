export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Set Space Grotesk as the default sans font
        sans: ['Space Grotesk', 'sans-serif'],
        // Keep other fonts available as utility classes
        poppins: ['Poppins', 'sans-serif'],
        'dm-sans': ['DM Sans', 'sans-serif'],
        'work-sans': ['Work Sans', 'sans-serif'],
        'public-sans': ['Public Sans', 'sans-serif'],
        // Define the custom font used in the RegisterComponent
        myfont: ['Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
