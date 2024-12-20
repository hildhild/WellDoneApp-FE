import * as React from "react"
import Svg, { Rect, Path, SvgProps } from "react-native-svg"

function StatusIcon(props: SvgProps) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Rect width={24} height={24} rx={5} fill="#84CC16" />
      <Path
        d="M14.06 10.69L12 9.75l2.06-.94.94-2.06.94 2.06 2.06.94-2.06.94-.94 2.06-.94-2.06zM4 14.75l.94-2.06L7 11.75l-2.06-.94L4 8.75l-.94 2.06-2.06.94 2.06.94.94 2.06zm4.5-5l1.09-2.41L12 6.25 9.59 5.16 8.5 2.75 7.41 5.16 5 6.25l2.41 1.09L8.5 9.75zm-4 11.5l6-6.01 4 4L23 9.68l-1.41-1.41-7.09 7.97-4-4L3 19.75l1.5 1.5z"
        fill="#365314"
      />
    </Svg>
  )
}

export default React.memo(StatusIcon)
