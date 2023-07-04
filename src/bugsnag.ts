import Bugsnag from "@bugsnag/js";
import BugsnagPluginReact from "@bugsnag/plugin-react";

export const bugsnagClient = Bugsnag.start({
  apiKey: "04dea7c947cf1afad86d4d9cedf78a32",
  plugins: [new BugsnagPluginReact()],
});
