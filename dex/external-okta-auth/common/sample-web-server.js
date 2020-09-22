/**
 * A simple web server that initializes the OIDC Middleware library with the
 * given options, and attaches route handlers for the example profile page
 * and logout functionality.
 */

const CT = require('./forescout');
const express = require('express');
const session = require('express-session');
const mustacheExpress = require('mustache-express');
const path = require('path');
const { ExpressOIDC } = require('@okta/oidc-middleware');

const templateDir = path.join(__dirname, '..', 'common', 'views');
const frontendDir = path.join(__dirname, '..', 'common', 'assets');

module.exports = function SampleWebServer(sampleConfig, extraOidcOptions, homePageTemplateName) {

  const oidc = new ExpressOIDC(Object.assign({
    issuer: sampleConfig.oidc.issuer,
    client_id: sampleConfig.oidc.clientId,
    client_secret: sampleConfig.oidc.clientSecret,
    appBaseUrl: sampleConfig.oidc.appBaseUrl,
    scope: sampleConfig.oidc.scope,
    testing: sampleConfig.oidc.testing
  }, extraOidcOptions || {}));

  const app = express();

  app.use(session({
    // secret: 'this-should-be-very-random',
    secret: '79682a48-ef40-4ac8-93c8-3992105e85df',
    resave: true,
    saveUninitialized: false
  }));

  // Provide the configuration to the view layer because we show it on the homepage
  const displayConfig = Object.assign(
    {},
    sampleConfig.oidc,
    {
      clientSecret: '****' + sampleConfig.oidc.clientSecret.substr(sampleConfig.oidc.clientSecret.length - 4, 4)
    }
  );

  app.locals.oidcConfig = displayConfig;

  // This server uses mustache templates located in views/ and css assets in assets/
  app.use('/assets', express.static(frontendDir));
  app.engine('mustache', mustacheExpress());
  app.set('view engine', 'mustache');
  app.set('views', templateDir);

  app.use(oidc.router);

  app.get('/', (req, res) => {
    const template = homePageTemplateName || 'home';
    const userinfo = req.userContext && req.userContext.userinfo;
    const tokens = req.userContext && req.userContext.tokens;

    // Get the IP address of the client
    var okta_ip = req.headers['x-forwarded-for'];  // forwarded by NGINX
    if (okta_ip) {
      okta_ip = req.headers['x-forwarded-for'].split(',')[0];
    } else if (req.connection.remoteAddress === '::1') { // In loopback Mode
      okta_ip = req.connection.remoteAddress;
    } else { // direct mode, no NGINX
      okta_ip = req.connection.remoteAddress.split(':')[3];
    }

    res.render(template, {
      isLoggedIn: !!userinfo,
      userinfo: userinfo,
      ip: okta_ip
    });
    // Note that this will happen every time the browser is refreshed while user is logged in
    if (!!userinfo) {
      var oktadata = {
        okta_ip: okta_ip,
        okta_zoneinfo: userinfo.zoneinfo,
        okta_email: userinfo.email,
        okta_access_token_exp: tokens.expires_at,
        okta_access_token: tokens.access_token,
        okta_id_token: tokens.id_token,
        okta_sub: userinfo.sub
      };
      console.log('Sending Endpoint Data to CounterACT!');
      const CTransaction = CT.makeXML(oktadata);
      CT.okta_updateCT(CT.options, CTransaction, function (status) {
        console.log(status);
      });
    }
  });

  app.get('/profile', oidc.ensureAuthenticated(), (req, res) => {
    // Convert the userinfo object into an attribute array, for rendering with mustache
    const userinfo = req.userContext && req.userContext.userinfo;

    const attributes = Object.entries(userinfo);

    // Get the IP address of the client
    var okta_ip = req.headers['x-forwarded-for'];  // forwarded by NGINX
    if (okta_ip) {
      okta_ip = req.headers['x-forwarded-for'].split(',')[0];
    } else if (req.connection.remoteAddress === '::1') { // In loopback Mode
      okta_ip = req.connection.remoteAddress;
    } else { // direct mode, no NGINX
      okta_ip = req.connection.remoteAddress.split(':')[3];
    }

    res.render('profile', {
      isLoggedIn: !!userinfo,
      userinfo: userinfo,
      ip: okta_ip,
      attributes
    });
  });

  oidc.on('ready', () => {
    // eslint-disable-next-line no-console
    app.listen(sampleConfig.port, () => console.log(`App started on port ${sampleConfig.port}`));
  });

  oidc.on('error', err => {
    // An error occurred with OIDC
    console.error('OIDC ERROR: ', err);
  });
};
