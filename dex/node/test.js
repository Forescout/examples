
// Sample send data to eyesight via DEX - spollock@forescout.com

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


const CT = require('./forescout');

var oktadata = {
  okta_ip: '10.10.10.10',
  okta_zoneinfo: 'America/Los_Angeles',
  okta_email: 'jacksonp@example.com',
  okta_access_token_exp: '1592581115',
  okta_access_token: 'eyJraWQiOiJOTk1HZ19BUFNLeHU5N0l2dXRTNjRZdk5VTDU3cl8zRFpSV0xzLVA2MmV3IiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULndVR1hhM2M1bnc0TVBTM0x3VTJ2NWRNRGZFb0p2azVuOVF3a1pxOGlUNlEiLCJpc3MiOiJodHRwczovL2Rldi0xNzE3MTMub2t0YS5jb20vb2F1dGgyL2RlZmF1bHQiLCJhdWQiOiJhcGk6Ly9kZWZhdWx0IiwiaWF0IjoxNTkyNTc3NTE1LCJleHAiOjE1OTI1ODExMTUsImNpZCI6IjBvYWZkd2FweVVlb0o2ZHZVNHg2IiwidWlkIjoiMDB1ZjNxZml3b1ZNWTQ4d2Y0eDYiLCJzY3AiOlsicHJvZmlsZSIsIm9wZW5pZCIsImVtYWlsIl0sInN1YiI6ImphY2tzb25wMjAwOEBnbWFpbC5jb20ifQ.SltLUxqR37p2kP6SYk1ZsGLuRG07uWHw5wrp9uJVYltMuXMgOq4m2eUN6aN99Cplgg4tCHw8p4TWL5Drx5poDdgp2hG4kxVfGa6MMabaATQ-u5GCZQNZZL_Mb25kymfour0yA_ptmNYpNkMbMUv3sDVIapNzQcxuzJ2SZ7PczDo6vVdWdSmzcBuz6jR8V3-q7oyg_19xXdPqR1p95IwffCFKpZC3NAeXGyzSfocPQDx9buwEWp584oX21e0E1JBbdTcuXMBOXK_WCeze0T5gJmrfAcWuefG5mG1dYEx38HKl7EBAr9pzZal29hCkcxRuuIUnc23DrBX2315p35MZ5A',
  okta_id_token: 'eyJraWQiOiJOTk1HZ19BUFNLeHU5N0l2dXRTNjRZdk5VTDU3cl8zRFpSV0xzLVA2MmV3IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiIwMHVmM3FmaXdvVk1ZNDh3ZjR4NiIsIm5hbWUiOiJTdGV2ZW4gUG9sbG9jayIsImVtYWlsIjoiamFja3NvbnAyMDA4QGdtYWlsLmNvbSIsInZlciI6MSwiaXNzIjoiaHR0cHM6Ly9kZXYtMTcxNzEzLm9rdGEuY29tL29hdXRoMi9kZWZhdWx0IiwiYXVkIjoiMG9hZmR3YXB5VWVvSjZkdlU0eDYiLCJpYXQiOjE1OTI1Nzc1MTUsImV4cCI6MTU5MjU4MTExNSwianRpIjoiSUQudkIyWWEtU1Fmd0lYY1c3UDZLWWpGaVd4X1VLRHUyTnpJSXphRDZWQXpuUSIsImFtciI6WyJwd2QiXSwiaWRwIjoiMDBvZjBzb29uNkNQSWpPNjA0eDYiLCJub25jZSI6IjU1ZTZmNDFkLWQ4OTAtNDczNi05NzIxLTQxMTRjYTZmODUzZiIsInByZWZlcnJlZF91c2VybmFtZSI6ImphY2tzb25wMjAwOEBnbWFpbC5jb20iLCJhdXRoX3RpbWUiOjE1OTI1Nzc1MTQsImF0X2hhc2giOiJVaTVlTC10eERQNTI4Y2I0N2h1dXRBIn0.ReXjugIrx963vXMS2gX896STEx7HGJH6PyxkJnFK1v6oEfIscsuif_VQz5Oi1tHXTo04sVCFTuBkaCBWKF67NAvad1ThPC0jfSOrB3aBVz74cLvVFYQV4v9c1oqBcpsCDy004Xm1BNNU2acsN7Cv5-U21xqUeq-odl7syInSRczxMTtZfpC_Kaj1T0aVID5DIbvv99knJgo8O04Nm8-cTjIIFsL4bBcz-5Nn53nhtU8cDc-n57MqBgfVdal2cd5bFKZC-mZuBW1mDwHs-tnI399PA6HrHmLosqsYA_sd__3EVV4k-m3GwGi6MMLLC20Y4_gcvifYhYeSd5Z2PVpHpA',
  okta_sub: '00uf3qfiwoVMY48wf4x6'
};

console.log('Sending Endpoint Data to CounterACT!');
const CTransaction = CT.makeXML(oktadata);
console.log(CTransaction);
console.log(CT.CTauths);
CT.okta_updateCT(CT.options, CTransaction, function (status) {
  console.log(status);
});
