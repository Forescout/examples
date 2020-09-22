const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();

// Read environment variables from "testenv". Override environment vars if they are already set. https://www.npmjs.com/package/dotenv
const TESTENV = path.resolve(__dirname, 'testenv');
if (fs.existsSync(TESTENV)) {
  const envConfig = dotenv.parse(fs.readFileSync(TESTENV));
  Object.keys(envConfig).forEach((k) => {
    process.env[k] = envConfig[k];
  });
}

var ISSUER = process.env.ISSUER || 'https://{yourOktaDomain}.com/oauth2/default';
var CLIENT_ID = process.env.CLIENT_ID || '{clientId}';
var CLIENT_SECRET = process.env.CLIENT_SECRET || '{clientSecret}';
// var SPA_CLIENT_ID = process.env.SPA_CLIENT_ID || '{spaClientId}';
var OKTA_TESTING_DISABLEHTTPSCHECK = process.env.OKTA_TESTING_DISABLEHTTPSCHECK ? true : false;

module.exports = {
  webServer: {
    port: 8088,
    oidc: {
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      issuer: ISSUER,
      appBaseUrl: 'http://localhost:8088',  // must match URL of the app, eg. http://localhost:8088
      scope: 'openid profile email',
      testing: {
        disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK
      }
    },
  }
};
