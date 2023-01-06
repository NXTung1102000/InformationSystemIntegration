#!/bin/bash

export FLASK_APP=main.py
PYTHONPATH=$PWD/.. flask db upgrade
