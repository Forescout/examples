// DEX API to CounterACT - spollock@forescout.com

// Copyright © 2020 Forescout Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

var https = require('https');

const CTIP = 'eyesight.example.com'; // Forescout Appliance IP
const CTuserName = 'fscout@bigfish'; // service username  - needs the @
const CTpassWord = 'xxxxxxx';      // service password
const CTauths = CTuserName + ':' + CTpassWord;

var options = {
  hostname: CTIP,
  path: '/fsapi/niCore/Hosts?',
  method: 'POST',
  port: 443,
  headers: {
    //'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + Buffer.from(CTauths).toString('base64')
  },
  rejectUnauthorized: false
};

// ==Exports==
module.exports.okta_updateCT = okta_updateCT;
module.exports.makeXML = makeXML;
module.exports.options = options;

// ==Functions==
function makeXML(oktadata) {
  var header =
    `<?xml version="1.0" encoding="UTF-8"?><FSAPI TYPE="request" API_VERSION="1.0"><TRANSACTION TYPE="update"><OPTIONS CREATE_NEW_HOST="true"/><HOST_KEY NAME="ip" VALUE="${oktadata.okta_ip}"/><PROPERTIES>`;

  var props = '';
  for (const property in oktadata) {
    props = props + `<PROPERTY NAME="${property}"><VALUE>${oktadata[property]}</VALUE></PROPERTY>`;
  }

  var trailer =
  '</PROPERTIES></TRANSACTION></FSAPI>';

  return (header + props + trailer);
}

// Send OKTA login details to CT
function okta_updateCT(options, CTransaction, eventCallback) {

  var req = https.request(options, function (res) {
    var body = '';
    res.on('data', function (chunk) {
      body += chunk;
      //console.log(body)
    });
    res.on('end', function () {
      var stringResult = body;
      // console.log(stringResult);
      eventCallback(stringResult);
    });
  }).on('error', function (e) {
    console.log('Got error: ', e);
  });
  // console.log(CTransaction)
  req.write(CTransaction); // pass transaction XML
  req.end();
}
