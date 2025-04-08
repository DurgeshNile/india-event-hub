
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Custom colors for India Event Hub
				india: {
					red: '#E63946',
					orange: '#F77F00',
					yellow: '#FCBF49',
					blue: '#0077B6',
					darkblue: '#1D3557',
					cream: '#FFF1E6',
					gold: '#D4AF37',
					green: '#2A9D8F',
					purple: '#9b87f5',
					magenta: '#D946EF',
					brightOrange: '#F97316'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0)',
					},
					'50%': {
						transform: 'translateY(-10px)',
					},
				},
				'pulse-slow': {
					'0%, 100%': {
						opacity: '0.5',
					},
					'50%': {
						opacity: '1',
					},
				},
				'shimmer': {
					'0%': {
						backgroundPosition: '-200% 0',
					},
					'100%': {
						backgroundPosition: '200% 0',
					},
				},
				'rotate-3d': {
					'0%': { transform: 'rotateY(0deg)' },
					'100%': { transform: 'rotateY(360deg)' }
				},
				'float-3d': {
					'0%': { transform: 'translateZ(0px)' },
					'50%': { transform: 'translateZ(20px)' },
					'100%': { transform: 'translateZ(0px)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'spin-slow': 'spin 4s linear infinite',
				'bounce-slow': 'bounce 2s infinite',
				'float': 'float 3s ease-in-out infinite',
				'pulse-slow': 'pulse-slow 3s infinite',
				'shimmer': 'shimmer 2s infinite linear',
				'rotate-3d': 'rotate-3d 8s infinite linear',
				'float-3d': 'float-3d 4s ease-in-out infinite',
			},
			backgroundImage: {
				'gradient-shimmer': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-gold': 'linear-gradient(90deg, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)',
				'gradient-dark': 'linear-gradient(to bottom, #171717, #0f0f0f)',
				'gradient-card': 'linear-gradient(145deg, rgba(20,20,20,0.8), rgba(10,10,10,0.9))',
				'gradient-blue': 'linear-gradient(135deg, #1a237e 0%, #000051 100%)',
			},
			boxShadow: {
				'3d': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
				'3d-hover': '0 20px 40px -15px rgba(0, 0, 0, 0.6)',
				'neon': '0 0 10px rgba(74, 222, 229, 0.5), 0 0 20px rgba(74, 222, 229, 0.3)',
				'neon-hover': '0 0 15px rgba(74, 222, 229, 0.6), 0 0 30px rgba(74, 222, 229, 0.4)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
