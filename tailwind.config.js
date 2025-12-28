/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./about.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "primary": "#6B46C1", // Primary Solid Purple
                "primary-accent": "#F08080", // Accent Coral
                "secondary-blue": "#1E90FF", // Secondary Blue for links
                "secondary-violet": "#805AD5", // Secondary Violet for subheadings
                "brand-dark": "#1a1233", // Primary Dark Background
                "neutral-50": "#F9FAFB",
                "neutral-100": "#F3F4F6",
                "neutral-200": "#E5E7EB",
                "neutral-600": "#4B5563",
                "neutral-800": "#1F2937",
                "surface-dark": "#231a42",
            },
            fontFamily: {
                "display": ["Plus Jakarta Sans", "sans-serif"],
                "body": ["Noto Sans", "sans-serif"],
            },
            backgroundImage: {
                'brand-gradient': 'linear-gradient(to right, #1E90FF, #6B46C1, #F08080)',
                'brand-gradient-hover': 'linear-gradient(to right, #38A0FF, #805AD5, #F59595)',
                'hero-gradient': 'linear-gradient(135deg, #1a1233 0%, #2D1B5E 40%, #6B46C1 100%)',
            },
            borderRadius: { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px" },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/container-queries'),
    ],
}
