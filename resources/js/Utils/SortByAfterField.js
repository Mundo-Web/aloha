const SortByAfterField = (items, after_field = 'after_item') => {
  // Crear un mapa con los itemes por ID para búsquedas rápidas
  const itemMap = Object.fromEntries(items.map(c => [c.id, c]));

  // Conjunto para almacenar los IDs de los itemes ya procesados
  const processedIds = new Set();

  // Listas para almacenar los itemes ordenados y los de referencia faltante
  const ordered = [];
  const missingReferences = new Set();

  // Función recursiva para agregar un iteme y sus dependencias
  function addComponent(item) {
    if (processedIds.has(item.id)) return; // Evitar duplicados

    if (item[after_field]) {
      const dependency = itemMap[item[after_field]];
      if (dependency) {
        addComponent(dependency); // Agregar la dependencia primero
      } else {
        // Si la referencia no existe, marcarlo para procesarlo al final
        missingReferences.add(item);
        return;
      }
    }

    // Agregar el iteme actual al orden y marcarlo como procesado
    ordered.push(item);
    processedIds.add(item.id);
  }

  // Procesar todos los itemes
  items.forEach(item => {
    addComponent(item);
  });

  // Ordenar los itemes con referencias faltantes por `created_at`
  const sortedMissingReferences = Array.from(missingReferences)
    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    .filter(x => !processedIds.has(x.id)); // Filtrar los que ya se han procesado

  // Combinar el orden principal con los faltantes
  return [...ordered, ...sortedMissingReferences];
}

export default SortByAfterField;

