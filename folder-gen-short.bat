  REM ================== GEN NEW FOLDER WORKING ====================

  setlocal EnableDelayedExpansion
  REM for %%e in ("Documents" "Report" "Source" "SVN" "Temp" "_bk") do (
  for /F "tokens=*" %%A in (myfile.txt) do [process] %%A
    REM ------- Create folder -----
    if not exist "%%e" mkdir %%e
  )
  pause