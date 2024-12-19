import React from 'react';
import { Animated, View, StyleSheet, ViewStyle } from 'react-native';

interface SemiCircleProgressProps {
  progressShadowColor?: string;
  progressColor?: string;
  interiorCircleColor?: string;
  circleRadius?: number;
  progressWidth?: number;
  percentage?: number;
  exteriorCircleStyle?: ViewStyle;
  interiorCircleStyle?: ViewStyle;
  animationSpeed?: number;
  initialPercentage?: number;
  minValue?: number;
  maxValue?: number;
  currentValue?: number;
  children?: React.ReactNode;
}

interface SemiCircleProgressState {
  rotationAnimation: Animated.Value;
}

export default class SemiCircleProgress extends React.PureComponent<
  SemiCircleProgressProps,
  SemiCircleProgressState
> {
  static defaultProps: SemiCircleProgressProps = {
    progressShadowColor: 'silver',
    progressColor: 'steelblue',
    interiorCircleColor: 'white',
    circleRadius: 100,
    progressWidth: 10,
    animationSpeed: 2,
    initialPercentage: 0,
  };

  constructor(props: SemiCircleProgressProps) {
    super(props);

    this.state = {
      rotationAnimation: new Animated.Value(props.initialPercentage || 0),
    };
  }

  componentDidMount() {
    this.animate();
  }

  componentDidUpdate(prevProps: SemiCircleProgressProps) {
    if (prevProps.percentage !== this.props.percentage || prevProps.currentValue !== this.props.currentValue) {
      this.animate();
    }
  }

  animate = () => {
    const toValue = this.getPercentage();
    const speed = this.props.animationSpeed || 2;

    Animated.spring(this.state.rotationAnimation, {
      toValue,
      speed,
      useNativeDriver: true,
    }).start();
  };

  getPercentage = (): number => {
    const { percentage, minValue, maxValue, currentValue } = this.props;
    if (percentage !== undefined) return Math.max(Math.min(percentage, 100), 0);

    if (currentValue !== undefined && minValue !== undefined && maxValue !== undefined) {
      const newPercent = ((currentValue - minValue) / (maxValue - minValue)) * 100;
      return Math.max(Math.min(newPercent, 100), 0);
    }

    return 0;
  };

  getStyles = () => {
    const { circleRadius, progressShadowColor, progressColor, progressWidth, interiorCircleColor } = this.props;
    const interiorCircleRadius = (circleRadius || 100) - (progressWidth || 10);

    return StyleSheet.create({
      exteriorCircle: {
        width: (circleRadius || 100) * 2,
        height: circleRadius || 100,
        borderRadius: circleRadius || 100,
        backgroundColor: progressShadowColor,
      },
      rotatingCircleWrap: {
        width: (circleRadius || 100) * 2,
        height: circleRadius || 100,
        top: circleRadius || 100,
      },
      rotatingCircle: {
        width: (circleRadius || 100) * 2,
        height: circleRadius || 100,
        borderRadius: circleRadius || 100,
        backgroundColor: progressColor,
        transform: [
          { translateY: -(circleRadius || 100) / 2 },
          {
            rotate: this.state.rotationAnimation.interpolate({
              inputRange: [0, 100],
              outputRange: ['0deg', '180deg'],
            }),
          },
          { translateY: (circleRadius || 100) / 2 },
        ],
      },
      interiorCircle: {
        width: interiorCircleRadius * 2,
        height: interiorCircleRadius,
        borderRadius: interiorCircleRadius,
        backgroundColor: interiorCircleColor,
        top: progressWidth || 10,
      },
    });
  };

  render() {
    const styles = this.getStyles();

    return (
      <View style={[defaultStyles.exteriorCircle, styles.exteriorCircle, this.props.exteriorCircleStyle]}>
        <View style={[defaultStyles.rotatingCircleWrap, styles.rotatingCircleWrap]}>
          <Animated.View style={[defaultStyles.rotatingCircle, styles.rotatingCircle]} />
        </View>
        <View style={[defaultStyles.interiorCircle, styles.interiorCircle, this.props.interiorCircleStyle]}>
          {this.props.children}
        </View>
      </View>
    );
  }
}

const defaultStyles = StyleSheet.create({
  exteriorCircle: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    alignItems: 'center',
    overflow: 'hidden',
  },
  rotatingCircleWrap: {
    position: 'absolute',
    left: 0,
  },
  rotatingCircle: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  interiorCircle: {
    overflow: 'hidden',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
});
