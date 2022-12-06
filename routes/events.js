/* 

    Events Routes

    host + /api/events
*/



// Todas tiene que pasar por la validacion del JWT
// OBtener eventos
const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT } = require('../middlewares/validar-jwt')
const { getEventos, createEvents, updateEvent, deleteEvent } = require('../controllers/events');
const { fieldsValidation } = require('../middlewares/field-validation');
const { isDate } = require('../helpers/isDate');

const router = Router();


router.use( validarJWT );

router.get('/', getEventos );

router.post(
    '/', 
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatorio').custom( isDate ),
        check('end', 'Fecha de filnalizacion es obligatorio').custom( isDate ),
        fieldsValidation
    ],
    createEvents 
);

router.put('/:id', updateEvent );

router.delete('/:id', deleteEvent );


module.exports = router