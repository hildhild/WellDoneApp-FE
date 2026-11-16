import App from "./src";
import "./global.css"
import * as Sentry from "@sentry/react-native";

Sentry.init({
  dsn: "https://941c4ae12cccb242e29bc9c8b3f5a52b@o4508507008598016.ingest.us.sentry.io/4508507025702912",
  enabled: !__DEV__,
});

export default Sentry.wrap(App);

