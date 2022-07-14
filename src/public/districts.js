(async function() {
  const res = await fetch('/top/25');
  const top10 = await res.json();
  for (const { state_abbr: abbr, district_name: name, geojson: geoJSON } of top10) {
    const mapTarget = document.getElementById('district-target');
    const id = `${abbr.toLowerCase()}-${name.toLowerCase().replaceAll(' ', '-')}`;

    const mapCaption = document.createElement('p');
    mapCaption.setAttribute('class', 'map-caption');
    const mapCaptionContent = document.createTextNode(`${abbr} ${name}`);
    mapCaption.append(mapCaptionContent);
    mapTarget.append(mapCaption);

    const mapDiv = document.createElement('div');
    mapDiv.setAttribute('id', id);
    mapDiv.setAttribute('class', 'map');
    mapTarget.append(mapDiv);

    const map = L.map(id).fitWorld();
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(map);
    const feature = L.geoJSON(geoJSON).addTo(map);
    map.fitBounds(feature.getBounds());
  }
})();
