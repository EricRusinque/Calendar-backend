/* 

    Auth Routes

    host + /api/auth
*/


const { Router } = require('express');
const { check } = require('express-validator');
const { fieldsValidation } = require('../middlewares/field-validation')
const { createUser, loginUser, revalidarToken } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post(
    '/new', 
    [//middlewares
        check('name', 'The name is required').not().isEmpty(),
        check('email', 'The email is required').isEmail(),
        check('password', 'The password must have 6 characters').isLength({min: 6}),
        fieldsValidation
    ],
    createUser,
);

router.post(
    '/', 
    [
        check('email', 'The email is required').isEmail(),
        // check('password', 'The password must have 6 characters').isLength({min: 6}),
        fieldsValidation
    ],
    loginUser
    );

router.get('/renew', validarJWT, revalidarToken);


module.exports = router;