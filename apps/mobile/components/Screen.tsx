import { PropsWithChildren } from 'react';
import { ScrollView, StyleProp, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/styles/theme';
import { useResponsive } from '@/hooks/useResponsive';

export function Screen({ children, scroll = true, style, bottomSpace = 96 }: PropsWithChildren<{ scroll?: boolean; style?: StyleProp<ViewStyle>; bottomSpace?: number }>) {
  const responsive=useResponsive();
  const body=<View style={[{width:'100%',maxWidth:responsive.contentMaxWidth,alignSelf:'center',paddingHorizontal:responsive.pagePadding,flex:1,paddingBottom:bottomSpace},style]}>{children}</View>;
  return <SafeAreaView style={{flex:1,backgroundColor:colors.canvas}} edges={['top','left','right']}>{scroll?<ScrollView contentContainerStyle={{flexGrow:1}} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>{body}</ScrollView>:body}</SafeAreaView>;
}
