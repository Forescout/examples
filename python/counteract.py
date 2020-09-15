#!/usr/bin/env python
# Web Services API to eyeSight function library
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

import json
import ssl
import urllib.request

# Needs to be manually set
CTIP = "10.80.100.149"  # CounterACT IP
CTPWSTRING = "username=spollock&password=4Scout123"  # Creds for WS-API

base_url = "https://" + CTIP + "/api"
headers = {
    'Content-Type': "application/x-www-form-urlencoded",
    'charset': 'utf-8',
    'User-Agent': "FSCT/7.20.2020",
    }

# Create ssl context
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

# --- Functions ---


# Return JWT from Counteract
def getToken():
    launch_url = base_url + "/login"
    payload = CTPWSTRING

    try:
        request = urllib.request.Request(launch_url, headers=headers, data=bytes(payload, 'utf-8'))
        resp = urllib.request.urlopen(request, context=ctx)
        return(resp.read().decode("utf-8"))

    except Exception as err:
        print("getToken() ERROR: " + str(err))


# Pull all hosts from CounterACT
def getHosts(token):
    launch_url = base_url + "/hosts"
    headers["Authorization"] = token

    try:
        request = urllib.request.Request(launch_url, headers=headers)
        resp = urllib.request.urlopen(request, context=ctx)
        request_response = json.loads(resp.read())
        return(request_response)

    except Exception as err:
        print("getHosts() ERROR:" + str(err))


# Pull all policies from CounterACT
def getPolicies(token):
    launch_url = base_url + "/policies"
    headers["Authorization"] = token

    try:
        request = urllib.request.Request(launch_url, headers=headers)
        resp = urllib.request.urlopen(request, context=ctx)
        request_response = json.loads(resp.read())
        return(request_response)

    except Exception as err:
        print("getPolicies() ERROR:" + str(err))


# Find policy ID with policy name
def getPoliciesMainID(token, policyname):
    # Pull all policies from CounterACT
    policies = getPolicies(token)

    # Find policy ID of a rule named "HVAC", will return the first if there are multiple
    for rule in policies["policies"]:
        for ruleid in rule["rules"]:
            if policyname in ruleid["name"]:
                return(ruleid["ruleId"])


# Get all Host fields
def getHostFields(token):
    launch_url = base_url + "/hostfields"
    headers["Authorization"] = token

    try:
        request = urllib.request.Request(launch_url, headers=headers)
        resp = urllib.request.urlopen(request, context=ctx)
        request_response = json.loads(resp.read())
        return(request_response)

    except Exception as err:
        print("getPolicies() ERROR:" + str(err))


# Get all properites for a host
def getHostProps(token, ip):
    launch_url = base_url + "/hosts/ip/" + ip
    headers["Authorization"] = token

    try:
        request = urllib.request.Request(launch_url, headers=headers)
        resp = urllib.request.urlopen(request, context=ctx)
        request_response = json.loads(resp.read())
        return(request_response)

    except Exception as err:
        print("getPolicies() ERROR:" + str(err))
