export function formatDate(fecha) {
  const meses = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Obtener el día, mes y año de la fecha
  const dia = fecha.getDate();
  const mes = meses[fecha.getMonth()];
  const anio = fecha.getFullYear();

  // Formatear la fecha al estilo "MMM DD, YYYY"
  return `${mes} ${dia}, ${anio}`;
}

export const parseDateNotes = (rawNotes = []) =>
  rawNotes.map(({ lastEdit, ...rest }) => ({
    ...rest,
    lastEdit: formatDate(new Date(lastEdit)),
  }));

export const x = 1;
