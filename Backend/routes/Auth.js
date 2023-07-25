const router = require('express').Router();
const conn = require('../db/dbConnection');
const {body, validationResult} = require('express-validator');
const util = require('util');
const bcrypt = require('bcrypt');

// LOGIN [ADMIN , PATIENT]
router.post("/login",
    body("email").isEmail().withMessage("pleaser enter a valid email!"),
    async (req, res) => {
    try{
        // 1- Validation Request
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json( {errors: errors.array()});
        }

        const query = util.promisify(conn.query).bind(conn);

        
        const user = await query("select * from users where email = ?", [req.body.email]);

        // Check if you logged as your type
        if(req.body.type != user[0].type) {
            return res.status(400).json({
                errors: [
                    {
                        msg: "you are not allowed to login as " + req.body.type
                    }
                ]
            })
        }

        // 2- Check if wrong email or password
        if(user.length == 0) {
            res.status(400).json({
                errors: [
                    {
                        msg: "wrong email or password"
                    }
                ]
            })
        }
        else {
            const checkPassword = await bcrypt.compare(req.body.password, user[0].password)

            if(checkPassword) {
                delete user[0].password;
                await query("update users set status = 'online' where id = ?", [user[0].id]);
                user[0].status = "online";
                res.status(200).json(user[0]);
            } 
            else {
                res.status(400).json({
                    errors: [
                        {
                            msg: "wrong email or password"
                        }
                    ]
                })
            }
        }

    } catch(err) {
        res.status(500).json({ err: err})
    }
});


// LOGOUT [ADMIN , PATIENT]
router.post("/logout",
    async (req, res) => {
    try{
        // 2- Check If User Online
        const query = util.promisify(conn.query).bind(conn);
        const user = await query("select * from users where id = ?", [req.body.id])

        if(user[0]) {
            if(user[0].status == 'online') {
                await query("update users set status = 'offline' where id = ?", [user[0].id]);
            }

            if(user[0].status == 'offline') {
                return res.status(400).json({
                    errors: [
                        {
                            msg: "you are already logged out"
                        }
                    ]
                })
            }

            return res.status(200).json({
                msg: "logged out successfully"
            })
        }

        res.status(400).json({
            errors: [
                {
                    msg: "user not found"
                }
            ]
        })

    } catch(error) {
        console.log(error)
        res.status(500).json({ err: error})
    }
});


module.exports = router;