FROM mcr.microsoft.com/mssql/server:2017-latest

ENV ACCEPT_EULA=Y \
    MSSQL_SA_PASSWORD=D0cker2*2*

WORKDIR /init
COPY init-db.* ./

RUN chmod +x ./init-db.sh
RUN /opt/mssql/bin/sqlservr & ./init-db.sh