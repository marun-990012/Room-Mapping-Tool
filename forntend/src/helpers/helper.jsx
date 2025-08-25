// helpers.js
export const coordsFromLayer = (layer) => {
  const geo = layer.toGeoJSON();
  return geo.geometry.coordinates; // polygon: [ [ [x,y], ... ] ]
};
