// Web Services API to eyeSight function library - spollock@forescout.com

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


// LosslessJSON fixes the issue with json returned from CT with large numbers
var LosslessJSON = require('lossless-json')
var https = require('https')

const CTIP = '10.80.100.149' // CounterACT IP
const CTPWSTRING = 'username={username}}&password=4Scout123' // Creds for WS-API

var options = {
  hostname: CTIP,
  path: '/api/login',
  method: 'POST',
  port: 443,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  rejectUnauthorized: false
}

// ==Exports==
module.exports.getPolicies = getPolicies
module.exports.options = options
module.exports.getHostMatchRule = getHostMatchRule
module.exports.getHostMatchRuleCount = getHostMatchRuleCount
module.exports.getToken = getToken
module.exports.getHostFields = getHostFields
module.exports.getHosts = getHosts
module.exports.getHostProps = getHostProps
module.exports.getHostMatchRuleIP = getHostMatchRuleIP
module.exports.getPoliciesMainID = getPoliciesMainID
module.exports.getPoliciesSubID = getPoliciesSubID
module.exports.getHostMatchRuleCountName = getHostMatchRuleCountName

// ==Functions==
// Get all hosts that match a rule
function getHostMatchRule (options, ruleID, eventCallback) {
  getToken(options, function (token) {
    options.path = '/api/hosts?matchRuleId=' + ruleID
    options.method = 'GET'
    options.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': token
    }
    getData(options, function (data) {
      eventCallback(data)
    })
  })
}

// Get the ip addresses of all hosts that match a rule
function getHostMatchRuleIP (ruleID, eventCallback) {
  getHostMatchRule(options, ruleID, function (hosts) {
    // console.log(hosts.hosts)  //json object returned
    // var count = hosts.hosts.length;
    // if we need to return the actual values...
    // for (var i = 0; i < hosts.hosts.length; i++) {
    //    var key = hosts.hosts[i];
    //    var value = hosts.hosts[i].ip;
    //    console.log(value)
    // }
    eventCallback(hosts.hosts) // just return the total
  })
}

// Return total number of hosts that match a rule
function getHostMatchRuleCount (ruleID, eventCallback) {
  getHostMatchRule(options, ruleID, function (hosts) {
    // console.log(hosts.hosts)  //json object returned
    var count = hosts.hosts.length
    // if we need to return the actual values, do so as follows
    for (var i = 0; i < hosts.hosts.length; i++) {
      // var key = hosts.hosts[i]
      // var value = hosts.hosts[i].ip //
      // console.log(value);  //lists all returned ip
    }
    eventCallback(count) // just return the total
  })
}

// Get the total number of hosts that match a rule by name (parse policies)
function getHostMatchRuleCountName (mainrulen, subrulen, eventCallback) {
  getPoliciesSubID(mainrulen, subrulen, function (ruleid) {
    console.log(ruleid)
    getHostMatchRuleCount(ruleid, function (count) {
      console.log(count)
    })
  })
}

// Get all properites for a host
function getHostProps (options, ip, eventCallback) {
  getToken(options, function (token) {
    // console.log(token)
    options.path = '/api/hosts/ip/' + ip
    options.method = 'GET'
    options.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': token
    }
    getData(options, function (data) {
      eventCallback(data)
    })
  })
}

// Get Host fields
function getHostFields (options, eventCallback) {
  getToken(options, function (token) {
    // console.log(token)
    options.path = '/api/hostfields'
    options.method = 'GET'
    options.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': token
    }
    getData(options, function (data) {
      eventCallback(data)
    })
  })
}

// Pull all policies from CounterACT
function getPolicies (options, eventCallback) {
  getToken(options, function (token) {
    // console.log(token)
    options.path = '/api/policies'
    options.method = 'GET'
    options.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': token
    }
    getData(options, function (data) {
      eventCallback(data)
    })
  })
}

// Get Policies, match main rule and return policy ID
function getPoliciesMainID (mainrulen, eventCallback) {
  getPolicies(options, function (policies) {
    for (var i = 0; i < policies.policies.length; i++) {
      var mainrule = policies.policies[i]
      // console.log(mainrule)   //list of main rules
      if (mainrule.name === mainrulen) {
        // console.log(mainrule.policyId.value)
        eventCallback(mainrule.policyId.value)
      }
    }
  })
};

// Get policies, match main rule, sub-rule, return ruleID
function getPoliciesSubID (mainrulen, subrulen, eventCallback) {
  getPolicies(options, function (policies) {
    for (var i = 0; i < policies.policies.length; i++) {
      var mainrule = policies.policies[i]
      // console.log(mainrule.name)   //list of main rules
      if (mainrule.name === mainrulen) {
        // console.log(mainrule.rules)  // list of sub-rules
        for (var j = 0; j < mainrule.rules.length; j++) {
          var subrule = mainrule.rules[j]
          // console.log(subrule) //list of sub-rule names
          if (subrule.name === subrulen) {
            // console.log(subrule.ruleId)   //Return ruleID (required)
            eventCallback(subrule.ruleId.value)
          }
        }
      }
    }
  })
};

// Pull all hosts from CounterACT
function getHosts (options, eventCallback) {
  getToken(options, function (token) {
    // console.log(token)
    options.path = '/api/hosts'
    options.method = 'GET'
    options.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': token
    }
    getData(options, function (data) {
      eventCallback(data)
    })
  })
}

// Get JWT from CounterACT
function getToken (options, eventCallback) {
  options.path = '/api/login'
  options.method = 'POST'
  options.headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  var req = https.request(options, function (res) {
    var body = ''
    res.on('data', function (chunk) {
      body += chunk
    })
    res.on('end', function () {
      var stringResult = body
      // console.log(stringResult);
      eventCallback(stringResult)
    })
  }).on('error', function (e) {
    console.log('Got error: ', e)
  })
  req.write(CTPWSTRING) // pass creds in the body
  req.end()
}

// Get requests to CounterACT, returns JSON object
function getData (options, eventCallback) {
  var req = https.request(options, function (res) {
    var body = ''
    res.on('data', function (chunk) {
      body += chunk
    })
    res.on('end', function () {
      // var jsonResult = JSON.parse(body);
      var jsonResult = LosslessJSON.parse(body)
      // console.log(body)
      eventCallback(jsonResult)
    })
  }).on('error', function (e) {
    console.log('Got error: ', e)
  })
  req.end()
}
