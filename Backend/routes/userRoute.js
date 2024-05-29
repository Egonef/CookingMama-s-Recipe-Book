import * as ctr from "../controllers/userController.js";
import express from 'express'
const router = express.Router()


router.route('/').get(ctr.getUsers)
router.route('/:id').get(ctr.getUserById)

router.route('/login').post(ctr.login)
router.route('/register').post(ctr.register)


//Funciones adicionales de logout y comprobacion de usuario
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed' });
        }
        res.clearCookie('connect.sid');
        res.json({ message: 'Logout successful' });
    });
});

router.get('/status', (req, res) => {
    if (req.session.user) {
        res.json({ loggedIn: true, user: req.session.user });
    } else {
        res.json({ loggedIn: false });
    }
});


export default router
