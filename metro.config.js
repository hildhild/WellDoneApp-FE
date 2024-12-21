const { withNativeWind } = require('nativewind/metro');
const {
  getSentryExpoConfig
} = require("@sentry/react-native/metro");

const config = getSentryExpoConfig(__dirname, { isCSSEnabled: true })

module.exports = withNativeWind(config, { input: './global.css' })