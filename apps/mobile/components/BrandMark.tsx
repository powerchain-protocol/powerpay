import { Image, type ImageStyle, type StyleProp } from 'react-native';
import { MOBILE_ASSETS } from '@/assets';

export type BrandMarkTone = 'green' | 'white' | 'dark';

export function BrandMark({ size = 48, tone = 'green', style }: { size?: number; tone?: BrandMarkTone; style?: StyleProp<ImageStyle> }) {
  const source = tone === 'white' ? MOBILE_ASSETS.brand.markWhite : tone === 'dark' ? MOBILE_ASSETS.brand.markDark : MOBILE_ASSETS.brand.markGreen;
  return <Image source={source} resizeMode="contain" style={[{ width: size, height: size }, style]} accessibilityLabel="PowerPay mark" />;
}
