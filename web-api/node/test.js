// Web Services API to eyeSight - spollock@forescout.com
// Examples of how to call the functions in the library

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

// CounterACT library
var CT = require('./counteract')

// ==Examples==

// Return JWT
CT.getToken(CT.options, function (token) {
  console.log(token)
})

// ==POLICIES==
// Get all policies object
CT.getPolicies(CT.options, function (policies) {
  console.log(policies.policies) // returns policy object
})

// Get a policy ID from policy tree
CT.getPoliciesMainID('Linux Status', function (policyid) {
  console.log(policyid)
})

// Get Policies, pass main & sub-rule names, returns sub-rule ID
CT.getPoliciesSubID('Asset Classification - FS AVR', 'Windows', function (ruleid) {
  console.log(ruleid)
})

// ====

// ==HOSTS==

// Pull all hosts (object) from eyeSight
CT.getHosts(CT.options, function (hosts) {
  console.log(hosts)
})

// Return total number of active hosts
CT.getHosts(CT.options, function (hosts) {
  console.log(hosts.hosts.length)
})

// Get all host fields
CT.getHostFields(CT.options, function (hostfields) {
  console.log(hostfields)
})

// Get all properties for a particular IP
CT.getHostProps(CT.options, '10.80.100.148', function (hostfields) {
  console.log(hostfields.host.fields)
})

// Get the total number of hosts that match a sub-rule (static)
// var ruleID = '-938917631257243803'
// CT.getHostMatchRuleCount(ruleID, function (count) {
//   console.log(count)
// })

// Get the ip addresses of all hosts that match a rule.
var ruleID = '-938917631257243803'
CT.getHostMatchRuleIP(ruleID, function (hosts) {
  for (var i = 0; i < hosts.length; i++) {
    // var key = hosts[i]
    var value = hosts[i].ip
    console.log(value) // returns the ip addresses
  }
})
