import * as React from "react"
import Svg, { SvgProps, G, Rect, Defs } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */
import { memo } from "react"
const HeaderBackground = (props: SvgProps) => (
  <Svg
    width={333}
    height={135}
    fill="none"
    {...props}
  >
    <G filter="url(#a)">
      <Rect
        width={243.871}
        height={121.265}
        fill="#4D7C0F"
        rx={26}
        transform="matrix(.97355 .22846 -.29256 .95625 93.579 -48)"
      />
    </G>
    <G filter="url(#b)">
      <Rect
        width={227.236}
        height={121.265}
        fill="#ECFCCB"
        rx={26}
        transform="matrix(.97355 .22846 -.29256 .95625 14.478 -32.874)"
      />
    </G>
    <Defs></Defs>
  </Svg>
)
export default memo(HeaderBackground)
