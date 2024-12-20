import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            screens: {
                device: "700px",
            },
            fontFamily: {
                lingo: "var(--font-lingo) sanserif",
            },
            colors: {
                background: "hsl(var(--background))",
                "background-hover": "hsl(var(--background-hover))",
                foreground: "hsl(var(--foreground))",
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                wolf: {
                    DEFAULT: "hsl(var(--wolf))",
                    foreground: "hsl(var(--wolf-foreground))",
                },
                polar: {
                    DEFAULT: "hsl(var(--polar))",
                    foreground: "hsl(var(--polar-foreground))",
                },
                frog: {
                    DEFAULT: "hsl(var(--frog))",
                    foreground: "hsl(var(--frog-foreground))",
                },
                ant: {
                    DEFAULT: "hsl(var(--ant))",
                    foreground: "hsl(var(--ant-foreground))",
                },
                swan: {
                    DEFAULT: "hsl(var(--swan))",
                    foreground: "hsl(var(--swan-foreground))",
                },
                eel: {
                    DEFAULT: "hsl(var(--eel))",
                    foreground: "hsl(var(--eel-foreground))",
                },
                bee: {
                    DEFAULT: "hsl(var(--bee))",
                    foreground: "hsl(var(--bee-foreground))",
                },
                fox: {
                    DEFAULT: "hsl(var(--fox))",
                    foreground: "hsl(var(--fox-foreground))",
                },
                steak: {
                    DEFAULT: "hsl(var(--steak))",
                    foreground: "hsl(var(--steak-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                    border: "hsl(var(--primary-border))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                    border: "hsl(var(--secondary-border))",
                },
                disable: {
                    DEFAULT: "hsl(var(--disable))",
                    foreground: "hsl(var(--disable-foreground))",
                },
                "secondary-hover": {
                    DEFAULT: "hsl(var(--secondary-hover))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                chart: {
                    "1": "hsl(var(--chart-1))",
                    "2": "hsl(var(--chart-2))",
                    "3": "hsl(var(--chart-3))",
                    "4": "hsl(var(--chart-4))",
                    "5": "hsl(var(--chart-5))",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "accordion-down": {
                    from: {
                        height: "0",
                        opacity: "0",
                        transform: "translateY(40px)",
                    },
                    to: {
                        height: "var(--radix-accordion-content-height)",
                        opacity: "1",
                        transform: "translateY(0px)",
                    },
                },
                "accordion-up": {
                    from: {
                        height: "var(--radix-accordion-content-height)",
                        opacity: "1",
                        transform: "translateY(0px)",
                    },
                    to: {
                        height: "0",
                        opacity: "0",
                        transform: "translateY(40px)",
                    },
                },
                "effect-cube": {
                    from: {
                        transform: "translateY(0) rotateY(0deg)",
                    },
                    to: {
                        transform: "translateY(0) rotateY(360deg)",
                    },
                },
                "slide-down": {
                    from: {
                        transform: "translateY(-20px)",
                        opacity: "0",
                    },
                    to: {
                        transform: "translateY(0)",
                        opacity: "1",
                    },
                },
                "slide-up": {
                    from: {
                        transform: "translateY(0px)",
                        opacity: "1",
                    },
                    to: {
                        transform: "translateY(-20px)",
                        opacity: "0",
                    },
                },
                "slide-up-visible": {
                    "0%": {
                        transform: "translateY(-30px)",
                        opacity: "0",
                    },
                    "50%": {
                        transform: "translateY(-30px)",
                        opacity: "0",
                    },
                    "100%": {
                        transform: "translateY(0px)",
                        opacity: "1",
                    },
                },
                "slide-up-visible-background": {
                    "0%": {
                        transform: "translateY(-30px)",
                        backgroundColor: "hsl(var(--background))",
                    },
                    "50%": {
                        transform: "translateY(-30px)",
                        backgroundColor: "hsl(var(--background))",
                    },
                    "100%": {
                        transform: "translateY(0px)",
                    },
                },
                fly: {
                    from: {
                        transform: "translate(var(--start-x), var(--start-y))",
                    },
                    to: {
                        transform: "translate(var(--end-x), var(--end-y))",
                    },
                },
                "zoom-border-in": {
                    "0%": {
                        transform: "scale(0)",
                        opacity: "0",
                        backgroundColor: "hsl(var(--background))",
                    },
                    "50%": {
                        borderColor: "hsl(var(--background))",
                        opacity: "1",
                    },
                    "100%": {
                        borderColor: "hsl(var(--bee))",
                    },
                },
                "slide-left": {
                    from: {
                        transform: "translateX(20px) translateY(0)",
                        opacity: "0",
                    },
                    to: {
                        transform: "translateX(0px) translateY(0)",
                        overflow: "hidden",
                        opacity: "1",
                    },
                },
                "zoom-fade": {
                    from: {
                        transform: "scale(1.3)",
                        opacity: "0",
                    },
                    to: {
                        transform: "scale(1)",
                        opacity: "1",
                    },
                },
                "zoom-in": {
                    from: {
                        transform: "scale(0)",
                        opacity: "0",
                    },
                    to: {
                        transform: "scale(1)",
                        opacity: "1",
                    },
                },
                "zoom-out": {
                    from: {
                        transform: "scale(1)",
                        opacity: "1",
                    },
                    to: {
                        transform: "scale(0)",
                        opacity: "0",
                    },
                },
                "ride-up": {
                    from: {
                        transform: "translateY(120%)",
                        opacity: "1",
                    },
                    to: {
                        transform: "translateY(0px)",
                        opacity: "1",
                    },
                },
                "transform-up": {
                    from: {
                        transform: "translateY(-120%)",
                        opacity: "1",
                    },
                    to: {
                        transform: "translateY(0px)",
                        opacity: "1",
                    },
                },
                "transform-left": {
                    from: {
                        transform: "translateX(var(--start-x))",
                    },
                    to: {
                        transform: "translateX(var(--end-x))",
                        opacity: "1",
                    },
                },
                "fade-in": {
                    from: {
                        opacity: "0",
                    },
                    to: {
                        opacity: "1",
                    },
                },
                shine: {
                    to: {
                        left: "-200%",
                    },
                },
                loading: {
                    "0%": {
                        strokeDasharray: "1, 150",
                        strokeDashoffset: "0",
                    },
                    "50%": {
                        strokeDasharray: "90, 150",
                        strokeDashoffset: "-35",
                    },
                    "100%": {
                        strokeDasharray: "90, 150",
                        strokeDashoffset: "-124",
                    },
                },
                bounce: {
                    "0% 100%": {
                        transform: "translateY(-25%)",
                    },
                    "50%": {
                        transform: "translateY(0)",
                    },
                },
                expand: {
                    "0%": { transform: "translateY(-20%)" },
                    "100%": { transform: "translateY(0)" },
                },
                collapse: {
                    "0%": { maxHeight: "100%" },
                    "100%": { maxHeight: "0" },
                },
                "loading-first": {
                    "0%": {
                        opacity: "1",
                        transform: "scale(1)",
                    },
                    "33.3333%": {
                        opacity: ".25",
                        transform: "scale(.8)",
                    },
                    "66.6667%": {
                        opacity: ".5",
                        transform: "scale(.8)",
                    },
                    "100%": {
                        opacity: "1",
                        transform: "scale(1)",
                    },
                },
                "loading-second": {
                    "0%": {
                        opacity: ".5",
                        transform: "scale(.8)",
                    },
                    "33.3333%": {
                        opacity: "1",
                        transform: "scale(1)",
                    },
                    "66.6667%": {
                        opacity: ".25",
                        transform: "scale(.8)",
                    },
                    "100%": {
                        opacity: ".5",
                        transform: "scale(.8)",
                    },
                },
                "loading-third": {
                    "0%": {
                        opacity: ".25",
                        transform: "scale(.8)",
                    },
                    "33.3333%": {
                        opacity: ".5",
                        transform: "scale(.8)",
                    },
                    "66.6667%": {
                        opacity: "1",
                        transform: "scale(1)",
                    },
                    "100%": {
                        opacity: ".25",
                        transform: "scale(.8)",
                    },
                },
            },
            animation: {
                bounce: "bounce 2s cubic-bezier(0, 0, 0.2, 1) infinite",
                "accordion-down": "accordion-down .4s cubic-bezier(.25,.46,.45,.94)",
                "accordion-up": "accordion-up .4s cubic-bezier(.25,.46,.45,.94)",
                shine: "shine .75s cubic-bezier(.01,.56, 1, 1)",
                "effect-cube": "effect-cube 1.2s infinite linear",
                "slide-down": "slide-down 0.5s ease forwards",
                "slide-up": "slide-up 0.5s ease forwards",
                "slide-up-visible": "slide-up-visible .2s ease-in-out",
                "slide-up-visible-background": "slide-up-visible-background .2s ease-in-out",
                fly: "fly .2s ease-in-out forwards",
                "zoom-border-in": "zoom-border-in .1s ease-in-out",
                "slide-left": "slide-left .5s linear",
                "zoom-fade": "zoom-fade 2.5s cubic-bezier(.26, .54, .57, 1) forwards",
                "zoom-in": "zoom-in .8s cubic-bezier(.26, .54, .57, 1) forwards",
                "zoom-out": "zoom-out 2.5s cubic-bezier(.26, .54, .57, 1) forwards",
                "ride-up": "ride-up .8s cubic-bezier(.26, .54, .32, 1) forwards",
                "transform-up": "transform-up .4s cubic-bezier(.165,.84,.46, 1)",
                "transform-left": "transform-left .5s cubic-bezier(.165,.84,.46, 1)",
                "fade-in": "fade-in 1s cubic-bezier(.26,.54,.32,1) 0s forwards",
                loading: "loading 1.5s ease-in-out infinite",
                "spin-slow": "spin 1.5s linear infinite",
                expand: "expand 0.3s ease-in-out",
                collapse: "collapse 0.3s ease-in-out",
                "loading-first": "loading-first 1.2s ease-in-out infinite",
                "loading-second": "loading-second 1.2s ease-in-out infinite",
                "loading-third": "loading-third 1.2s ease-in-out infinite",
            },
            transitionProperty: {
                "max-height": "max-height",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
export default config;
