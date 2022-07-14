const db = require('./db');
const express = require('express');
const app = express();
const { join } = require('path');

const PKG_ROOT = join(__dirname, '..', 'node_modules');
const PKG_PATHS = {
  'bulma.css': 'bulma/css/bulma.css',
  'bulma.css.map': 'bulma/css/bulma.css.map',
  'leaflet.css': 'leaflet/dist/leaflet.css',
  'leaflet.js': 'leaflet/dist/leaflet.js',
  'leaflet.js.map': 'leaflet/dist/leaflet.js.map',
};

app.use(express.static(__dirname + '/public'));
for (const [uri, path] of Object.entries(PKG_PATHS)) {
  app.get(`/${uri}`, (req, res) => res.sendFile(path, { root: PKG_ROOT }));
}

app.get('/top/:count', async (req, res, next) => {
  try {
    const { count } = req.params;
    const sql = `
      SELECT state_abbr, district_name, geojson 
      FROM mv_districts 
      ORDER BY shape_complexity_index DESC LIMIT $1
    `;
    res.json(await db.query(sql, count))
  } catch (err) {
    next(err);
  }
});

app.listen(3000, () => {
  console.log('Listening on 3000...');
});
