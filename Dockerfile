FROM postgis/postgis:13-master
ENV PGUSER=postgres
WORKDIR /app
RUN apt update && apt install unzip ca-certificates
RUN curl -LRO https://www2.census.gov/geo/docs/reference/state.txt
RUN curl -LRO ftp://ftp.census.gov/geo/tiger/TIGER2021/CD/tl_2021_us_cd116.zip
RUN unzip -d shapefiles tl_2021_us_cd116.zip
RUN shp2pgsql -s 4326 -I shapefiles/tl_2021_us_cd116.shp > districts.sql
COPY db/initdb.sh /docker-entrypoint-initdb.d/
