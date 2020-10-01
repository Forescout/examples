#!/bin/bash
# Send a syslog message

# this will create the endpoint if it does not exist in the database
MSG='%M3SP-6-722051: Group LabVPN User jacksonp IP 10.0.1.99 IPv4 Address 10.0.1.101 IPv6 Address 2001:0db8:85a3:0000:0000:8a2e:0370:7334'
python syslogger.py --address 10.80.100.49 --port 514 --level WARNING --message "$MSG"
