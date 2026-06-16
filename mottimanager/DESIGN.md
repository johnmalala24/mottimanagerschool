---
name: MottiManager
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#3e4a3d'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#6e7b6c'
  outline-variant: '#bdcaba'
  surface-tint: '#006e2d'
  primary: '#006b2c'
  on-primary: '#ffffff'
  primary-container: '#00873a'
  on-primary-container: '#f7fff2'
  inverse-primary: '#62df7d'
  secondary: '#545f73'
  on-secondary: '#ffffff'
  secondary-container: '#d5e0f8'
  on-secondary-container: '#586377'
  tertiary: '#00628d'
  on-tertiary: '#ffffff'
  tertiary-container: '#007cb1'
  on-tertiary-container: '#fcfcff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#7ffc97'
  primary-fixed-dim: '#62df7d'
  on-primary-fixed: '#002109'
  on-primary-fixed-variant: '#005320'
  secondary-fixed: '#d8e3fb'
  secondary-fixed-dim: '#bcc7de'
  on-secondary-fixed: '#111c2d'
  on-secondary-fixed-variant: '#3c475a'
  tertiary-fixed: '#c9e6ff'
  tertiary-fixed-dim: '#89ceff'
  on-tertiary-fixed: '#001e2f'
  on-tertiary-fixed-variant: '#004c6e'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
---

## Brand & Style
The design system is engineered for the East African educational landscape, prioritizing reliability, clarity, and the unique requirements of Competency-Based Education (CBE). The brand personality is **authoritative yet accessible**, functioning as a steady partner for school administrators and parents alike.

The aesthetic follows a **Modern SaaS** direction: a high-utility interface that feels lightweight despite the complexity of school data. It utilizes a predominantly white and "neutral-cool" workspace to reduce cognitive load during long administrative tasks. To differentiate from global SaaS products, the design system incorporates subtle local motifs through iconography and a color palette that reflects the vibrancy and growth associated with the Kenyan educational sector.

## Colors
The palette is anchored by **Forest Green (#16A34A)**, symbolizing growth, stability, and the "Green City in the Sun" heritage. This is the primary action color.

- **Primary Green:** Reserved for primary actions, success states, and key navigational highlights.
- **Deep Slate:** Used for typography and structural elements to provide a grounded, professional contrast.
- **Sky Blue:** An accent color specifically for educational milestones and student growth tracking.
- **Neutral Grays:** A sophisticated range of cool grays used for borders, subtle backgrounds, and secondary information.
- **Financial Context:** When displaying M-Pesa transactions, a specific variant of green is used to align with user mental models of the payment platform, reinforcing trust in the financial module.

## Typography
The design system utilizes **Inter** for its exceptional legibility on digital screens and its neutral, systematic character. 

The type scale is designed to handle dense data—such as student grades and financial ledgers—without sacrificing readability. **Display** and **Headline** levels use slightly tighter letter spacing and heavier weights to establish a clear hierarchy. **Labels** utilize a medium weight to remain distinct when placed inside form fields or as table headers. For CBE progress reports, the typography remains clean and unadorned to ensure that qualitative feedback is easily digestible for parents.

## Layout & Spacing
The layout employs a **12-column fluid grid** for desktop, collapsing to a **4-column grid** on mobile devices. 

A strict **8px spacing system** governs all spatial relationships. 
- **Dashboards:** Use a "sidebar-and-canvas" model where the canvas is split into cards representing different modules (Fees, Attendance, CBE).
- **Forms:** Utilize a single-column layout for mobile to ensure focus, moving to multi-column on desktop for efficient data entry.
- **Density:** The system provides two density modes: "Standard" for general use and "Compact" for data-heavy administrative tables.

## Elevation & Depth
Depth is created through **Tonal Layering** supplemented by soft, ambient shadows. This approach ensures the UI feels "light" and modern while clearly defining clickable areas.

- **Level 0 (Base):** Background color (`#F8FAFC`).
- **Level 1 (Cards):** White background with a 1px border (`#E2E8F0`) and a very subtle shadow (0px 1px 3px rgba(0,0,0,0.05)).
- **Level 2 (Modals/Dropdowns):** White background with a more pronounced, diffused shadow (0px 10px 15px -3px rgba(0,0,0,0.1)) to indicate focus.
- **M-Pesa Integration:** Elements related to payments use a slight inner shadow to simulate a "secure slot" or "vault," differentiating financial inputs from standard text fields.

## Shapes
The shape language is **Rounded**, utilizing an 8px (0.5rem) base radius. This creates a friendly and safe environment suitable for an education-focused product.

- **Standard Elements:** Buttons, input fields, and small cards use the base 8px radius.
- **Large Containers:** Dashboard widgets and main content areas use a 16px (1rem) radius (`rounded-lg`).
- **Status Pills:** Student status tags (e.g., "Paid," "Present," "CBE Level 3") use a fully rounded/pill shape to distinguish them from interactive buttons.

## Components
### Buttons
- **Primary:** Solid Forest Green with white text. High-contrast, used for "Save," "Submit," or "Pay via M-Pesa."
- **Secondary:** White background with a Slate border. Used for "Cancel" or "Print Report."
- **Tertiary:** Text-only with an icon, used for low-emphasis actions within lists.

### CBE Progress Trackers
Custom components for Competency-Based Education. These use a 4-step horizontal progress bar with color coding from light green to deep green to show student mastery levels.

### Financial Cards
Specific cards for fee management. They feature a prominent "M-Pesa" logo and a simplified payment flow. The "Amount Due" is always highlighted in a bold, Deep Slate font for maximum visibility.

### Data Tables
Tables are the heart of the system. They feature sticky headers, zebra-striping on hover for row tracking, and inline status chips for student performance and payment status.

### Input Fields
Inputs use a 1px Slate border that transitions to Forest Green on focus. Error states are clearly marked with a Red border and a small descriptive icon.