#!/bin/sh

echo "[+] Starting frontend server on port 5001"

cd /opt/front

yarn serve -s build -p 5001

echo "[+] Frontend started on 5001"
