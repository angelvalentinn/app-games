export function cambiarFormatoFecha(fechaString) {

    const fecha = new Date(fechaString);

    const meses = [
        "ene", "feb", "mar", "abr", "may", "jun",
        "jul", "ago", "sep", "oct", "nov", "dic"
    ];

    const dia = fecha.getDate();
    const mes = meses[fecha.getMonth()];
    const año = fecha.getFullYear();

    const formatoDeseado = dia  + " " +  mes + " " + año;

    return formatoDeseado;
}