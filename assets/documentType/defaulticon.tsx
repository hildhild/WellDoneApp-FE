import React, { memo } from 'react';
import Svg, { G, Path, Rect, SvgProps } from 'react-native-svg';

function DefaultIcon(props: SvgProps) {
    return (
  <Svg width="213" height="216" viewBox="0 0 213 216" fill="none" {...props}>
    <G opacity="0.3">
      <Path
        opacity="0.3"
        d="M187.38 49.24C181.913 49.2347 176.671 47.0606 172.805 43.1947C168.939 39.3288 166.765 34.0871 166.76 28.62V1.85821e-06H74.63C71.0953 -0.00131167 67.5949 0.693768 64.3289 2.04553C61.0628 3.3973 58.0952 5.37928 55.5953 7.87824C53.0955 10.3772 51.1124 13.3442 49.7594 16.6097C48.4064 19.8752 47.71 23.3753 47.71 26.91V189.13C47.7206 196.262 50.5618 203.098 55.6094 208.136C60.657 213.174 67.4982 216.003 74.63 216H185.23C188.764 216 192.263 215.304 195.528 213.952C198.793 212.599 201.759 210.617 204.258 208.118C206.757 205.619 208.739 202.653 210.092 199.388C211.444 196.123 212.14 192.624 212.14 189.09V49.24H187.38Z"
        fill="#5B5B5B"
      />
    </G>
    <Path
      d="M212.14 49.24H187.38C181.913 49.2347 176.671 47.0606 172.805 43.1947C168.939 39.3288 166.765 34.0871 166.76 28.62V0L212.14 49.24Z"
      fill="#5B5B5B"
    />
    <Rect y="117" width="167" height="69" rx="20" fill="#5B5B5B" />
    <Path
      d="M52.2101 160.94H40.9301L39.0601 166.43H31.41L42.41 136.57H50.79L61.79 166.43H54.05L52.2101 160.94ZM50.3301 155.41L46.5901 144.36L42.8101 155.41H50.3301Z"
      fill="white"
    />
    <Path
      d="M79.5699 136.465L86.9299 159.095L94.29 136.465H102.07L91.61 166.535H82.21L71.79 136.465H79.5699Z"
      fill="white"
    />
    <Path
      d="M135.59 136.465V142.245H127.43V166.535H120.15V142.245H112.07V136.465H135.59Z"
      fill="white"
    />
  </Svg>
    )
}
export default memo(DefaultIcon);