export const colors = {
  canvas: '#F7F9F7',
  surface: '#FFFFFF',
  text: '#0A120D',
  muted: '#667069',
  border: '#E2E7E3',
  primary: '#0B6B38',
  primaryPressed: '#08552D',
  success: '#0B6B38',
  warning: '#B7791F',
  danger: '#B42318',
  info: '#175CD3',
  black: '#0A120D',
  white: '#FFFFFF',
} as const;

export const radius = {
  sm: 8,
  md: 12,
  card: 14,
  sheet: 18,
} as const;

export const space = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const breakpoints = {
  phoneSmall: 360,
  phone: 390,
  phoneLarge: 430,
  tablet: 768,
  tabletLarge: 1024,
  desktop: 1280,
} as const;
