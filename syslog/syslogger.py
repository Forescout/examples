#!/usr/bin/env python
# syslog simulator

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

import argparse
import logging
import logging.handlers

parser = argparse.ArgumentParser(__file__,
                                 description="A syslog message generator")

parser.add_argument("--address",
                    "-a",
                    default="localhost",
                    help="The syslog message recipient address")

parser.add_argument("--port",
                    "-p",
                    type=int,
                    default=5514,
                    help="The syslog message recipient port")

parser.add_argument("--level",
                    "-l",
                    default="DEBUG",
                    help="The syslog message log level")

parser.add_argument("--message",
                    "-m",
                    required=True,
                    help="The syslog message")


def string_to_level(log_level):
    """ Convert a commandline string to a proper log level
    @param string log_level     command line log level argument
    @return logging.LEVEL       the logging.LEVEL object to return
    """
    if log_level == "CRITICAL":
        return logging.CRITICAL
    if log_level == "ERROR":
        return logging.ERROR
    if log_level == "WARNING":
        return logging.WARNING
    if log_level == "INFO":
        return logging.INFO
    if log_level == "DEBUG":
        return logging.DEBUG
    return logging.NOTSET


if __name__ == "__main__":
    args = parser.parse_args()
    syslogger = logging.getLogger('SyslogLogger')
    level = string_to_level(args.level)
    syslogger.setLevel(level)
    handler = logging.handlers.SysLogHandler(address=(args.address, args.port),
                                             facility=19)

    syslogger.addHandler(handler)
    syslogger.log(level, args.message)
