export const validarFecha = (fecha_hora = '') => {
    if (fecha_hora === '') {
        throw new Error('La fecha y hora es requerida');
    }

    const regexFechaHora = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

    if (!regexFechaHora.test(fecha_hora)) {
        throw new Error('La fecha y hora, está mal formada (EJ: 2024-01-28 12:30:45)');
    }

    return true;
};