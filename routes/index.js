const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const vacantesController = require('../controllers/vacantesController');
const usuariosController = require('../controllers/usuariosController');
const authController = require('../controllers/authController');

module.exports = () => {
    router.get('/', homeController.mostrarTrabajos);

    //Crear vacantes
    router.get('/vacantes/nueva', authController.verificarUsuario,
        vacantesController.formularioNuevaVacante);
    router.post('/vacantes/nueva', authController.verificarUsuario,
        vacantesController.validarVacante,
        vacantesController.agregarVacante);

    //Mostar una vacante
    router.get('/vacantes/:url', vacantesController.mostrarVacante);

    //editar vacante
    router.get('/vacantes/editar/:url', authController.verificarUsuario,
        vacantesController.formEditarVacante);
    router.post('/vacantes/editar/:url', authController.verificarUsuario,
        vacantesController.validarVacante,
        vacantesController.editarVacante);

    //Eliminar Vacante
    router.delete('/vacantes/eliminar/:id', vacantesController.eliminarVacante);



    //Crear cuentas
    router.get('/crear-cuenta', usuariosController.formCrearCuenta);
    router.post('/crear-cuenta',
        usuariosController.validarRegistro,
        usuariosController.crearUsuario);

    //Autentificar de usuarios
    router.get('/iniciar-sesion', usuariosController.formIniciarSesion);
    router.post('/iniciar-sesion', authController.autenticarUsuario);

    //Resetear Password (emails)
    router.get('/reestablecer-password', authController.formReestablecerPassword);
    router.post('/reestablecer-password', authController.enviarToken);

    //Reesetaer password y almacenar en BD
    router.get('/reestablecer-password/:token', authController.reestablecerPassword);
    router.post('/reestablecer-password/:token', authController.guardarPassword);


    //Cerrar sesion
    router.get('/cerrar-sesion', authController.verificarUsuario,
        authController.cerrarSesion);

    //Panel de control
    router.get('/administracion', authController.verificarUsuario,
        authController.mostrarPanel);

    //Editar Perfil
    router.get('/editar-perfil', authController.verificarUsuario,
        usuariosController.formEditarPerfil);
    router.post('/editar-perfil', authController.verificarUsuario,
        //usuariosController.validarPerfil,
        usuariosController.subirImagen,
        usuariosController.editarPerfil);

    //Recibir mensajes de candidatos
    router.post('/vacantes/:url', vacantesController.subirCV,
        vacantesController.contactar);



    // Muestra los candidatos por vacante
    router.get('/candidatos/:id',
        authController.verificarUsuario,
        vacantesController.mostrarCandidatos
    );

    //Buscador de vacantes
    router.post('/buscador', vacantesController.buscarVacantes);

    return router;
}