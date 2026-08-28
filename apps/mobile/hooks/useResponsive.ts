import { useWindowDimensions } from 'react-native';
import { breakpoints } from '@/styles/theme';

export function useResponsive() {
  const { width, height } = useWindowDimensions();

  return {
    width,
    height,
    isSmallPhone: width < breakpoints.phoneSmall,
    isPhone: width < breakpoints.tablet,
    isLargePhone: width >= breakpoints.phoneLarge && width < breakpoints.tablet,
    isTablet: width >= breakpoints.tablet && width < breakpoints.tabletLarge,
    isLargeTablet: width >= breakpoints.tabletLarge && width < breakpoints.desktop,
    isDesktop: width >= breakpoints.desktop,
    contentMaxWidth: width >= breakpoints.tablet ? 760 : undefined,
    pagePadding: width < breakpoints.phoneSmall ? 16 : 20,
  };
}
