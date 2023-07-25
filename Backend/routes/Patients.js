const router = require('express').Router();
const conn = require('../db/dbConnection');
const {body, validationResult} = require('express-validator');
const util = require('util');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const adminAuthorize = require('../middleware/adminAuthorize');
const patientAuthorize = require('../middleware/patientAuthorize');


// CREATE PATIENT [ADMIN]
router.post("",
    adminAuthorize,
    body("name").isString().withMessage("pleaser enter a valid name!"),
    body("email").isEmail().withMessage("pleaser enter a valid email!"),
    body("password").isLength({min: 8, max: 12}).withMessage("password should between (8-12) character"),
    body("phone").isMobilePhone().withMessage("pleaser enter a valid phone number!"),
    async (req, res) => {
        try{
            const query = util.promisify(conn.query).bind(conn);

            // 1- Validation Request
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array()});
            }

            // 2- Check If Email Exists
            const checkEmailExists = await query("select * from users where email = ?", [req.body.email]);

            if(checkEmailExists.length > 0) {
                return res.status(400).json({
                    errors: [
                        {
                            msg: "email is already existed!"
                        }
                    ]
                })
            }

            const checkPhoneExists = await query("select * from users where phone = ?", [req.body.phone]);

            if(checkPhoneExists.length > 0) {
                return res.status(400).json({
                    errors: [
                        {
                            msg: "phone is already existed!"
                        }
                    ]
                })
            }

            const userData = {
                name: req.body.name,
                email: req.body.email,
                password: await bcrypt.hash(req.body.password, 10),
                phone: req.body.phone,
                token: crypto.randomBytes(16).toString('hex'),
            }

            await query("insert into users set ?", userData);

            delete userData.password;

            res.status(200).json({
                msg: "patient added successfully"
            });

        } catch(err) {
            console.log(err);
            res.status(500).json({ err: err});
        }
    }
);



// UPDATE PATIENT [ADMIN]
router.put("/:id",
    adminAuthorize,
    body("name").isString().withMessage("pleaser enter a valid name!"),
    body("email").isEmail().withMessage("pleaser enter a valid email!"),
    body("password").isLength({min: 8, max: 12}).withMessage("password should between (8-12) character"),
    body("phone").isMobilePhone().withMessage("pleaser enter a valid phone number!"),
    async(req, res) => {
        try{
            const query = util.promisify(conn.query).bind(conn);
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json( {errors: errors.array() });
            }

            const patient = await query("select * from users where id = ?", [req.params.id]);

            if(!patient[0]) {
                return res.status(400).json({
                    errors: [
                        {
                            msg: "patient not found !"
                        }
                    ]
                })
            }

            const patientData = {
                name: req.body.name,
                email: req.body.email,
                password: await bcrypt.hash(req.body.password, 10),
                phone: req.body.phone,
                token: crypto.randomBytes(16).toString('hex'),
            }

            // 2- Check If Email Exists
            const checkEmailExists = await query("select * from users where email = ? and id != ?", [req.body.email, req.params.id]);

            if(checkEmailExists.length > 0) {
                return res.status(400).json({
                    errors: [
                        {
                            msg: "email is already exists !"
                        }
                    ]
                })
            }

            // 2- Check If Phone Exists
            const checkPhoneExists = await query("select * from users where phone = ? and id != ?", [req.body.phone, req.params.id]);

            if(checkPhoneExists.length > 0) {
                return res.status(400).json({
                    errors: [
                        {
                            msg: "phone is already exists !"
                        }
                    ]
                })
            }


            await query("update users set ? where id = ?", [patientData, patient[0].id]);

            res.status(200).json({
                msg: "patient updated successfully"
            });
        } catch(err) {
            console.log(err);
            res.status(500).json({ err: err});
        }
    }
);



// DELETE PATIENT [ADMIN]
router.delete("",
    adminAuthorize,
    async (req, res) => {
        try {
            //1- CHECK IF Patient EXISTS OR NOT
            const query = util.promisify(conn.query).bind(conn);
            const patient = await query("select * from users where id = ?", [req.query.id]);

            if (!patient[0]) {
                return res.status(400).json({
                    errors: [
                        {
                            msg: "patient not found"
                        }
                    ]
                })
            }

            await query("delete from users where id = ?", [patient[0].id]);
            res.status(200).json({
                msg: "patient deleted successfully",
            });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
);



// VIEW PATIENT [ADMIN]
router.get("",
    adminAuthorize,
    async (req, res) => {
        try{

            const query = util.promisify(conn.query).bind(conn);

            if(req.query.id) {
                const selectPatientById = await query("select * from users where id = ?", [req.query.id]);
                if(selectPatientById[0]){
                    return res.status(200).json(selectPatientById);
                }
                else {
                    return res.status(400).json({
                        errors: [
                            {
                                msg: "no patients found !"
                            }
                        ]
                    });
                }
            }
            
            const Patients = await query("select * from users where type = ?", ['patient']);
            if (!Patients[0]) {
                return res.status(400).json({
                    errors: [
                        {
                            msg: "no patients found !"
                        }
                    ]
                });
            }

            res.status(200).json(Patients);
        } catch(err) {
            console.log(err);
        }
    }
);



// VIEW SEARCH HISTORY [PATIENT]
router.get("/searches",
    patientAuthorize,
    async (req, res) => {
        try{
            const query = util.promisify(conn.query).bind(conn);

            const searches = await query("select * from search_history where patient_id = ?", [req.query.id]);

            if(!searches[0]) {
                return res.status(400).json({
                    errors: [
                        {
                            msg: "no searches found !"
                        }
                    ]
                });
            }

            res.status(200).json(searches);

        } catch(err) {
            console.log(err);
        }
    }
);



module.exports = router;