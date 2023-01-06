#!/bin/bash
export FLASK_APP=main.py
PYTHONPATH=$PWD/.. flask db migrate -m "$(echo $1)"
PYTHONPATH=$PWD/.. flask db upgrade
