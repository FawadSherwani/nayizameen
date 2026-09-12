const properties = new Map();

export function listProperties() {
  return Array.from(properties.values());
}

export function saveProperty(property) {
  const id = String(property.id || Date.now());
  const next = { ...property, id, status: property.status || "Published" };
  properties.set(id, next);
  return next;
}