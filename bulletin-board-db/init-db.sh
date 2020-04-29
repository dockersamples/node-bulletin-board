sleep 30s

/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P 'D0cker2*2*' -i init-db.sql