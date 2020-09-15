#!/usr/bin/env python
# Tests function library
# author: spollock@forescout.com

# Copyright © 2020 Forescout Technologies, Inc.
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.

import counteract as ct

# Return JWT
token = ct.getToken()
# print("Token returned: " + str(token))

# Pull all hosts from CounterACT
hosts = ct.getHosts(token)
# print(hosts)                # All hosts json object
# print(len(hosts["hosts"]))  # Total number of active hosts

# Pull all policies from CounterACT
policies = ct.getPolicies(token)
# print(policies)                # All policies json object

# Find policy ID with policy name
policyid = ct.getPoliciesMainID(token, "HVAC")
# print(policyid)

# Get all Host fields
hostfields = ct.getHostFields(token)
# print(hostfields)

# Get all properites for a host
props = ct.getHostProps(token, "10.80.100.100")
# print(props)
