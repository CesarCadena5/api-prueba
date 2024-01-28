import 'dotenv/config';

export const obtenerTrm = async (req, res, next) => {
    try {
        const response = await fetch(process.env.URL_TRM);

        if (!response.ok) {
            return res.status(response.status).json({
                error: 'Hubo un error al consultar la TRM.',
                icon: 'error'
            });
        };

        const data = await response.text();

        return res.json({
            msg: 'Valor de la TRM actual',
            icon: 'success',
            data
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Hubo un error al consultar la TRM.',
            icon: 'error'
        });
    }
};