#!/bin/bash
psql -f /app/districts.sql
psql <<-EOSQL
  CREATE TABLE states (
    state_fp VARCHAR(2) NOT NULL PRIMARY KEY,
    abbr VARCHAR(2) NOT NULL,
    state_name TEXT NOT NULL,
    gnis_id TEXT NOT NULL
  );
  COPY states FROM '/app/state.txt' WITH (FORMAT CSV, DELIMITER '|', HEADER TRUE)";
  CREATE VIEW v_districts AS
  SELECT gid      AS id,
         abbr     AS state_abbr,
         namelsad AS district_name,
         aland    AS land_area,
         awater   AS water_area,
         intptlat AS lat,
         intptlon AS lon,
         geom
  FROM tl_2021_us_cd116 t
  JOIN states s ON (s.state_fp = t.statefp);
EOSQL
