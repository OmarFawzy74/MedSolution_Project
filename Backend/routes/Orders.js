const router = require('express').Router();
const conn = require('../db/dbConnection');
const adminAuthorize = require('../middleware/adminAuthorize');
const patientAuthorize = require('../middleware/patientAuthorize');
const util = require('util');


// CREATE ORDER REQUEST [PATIENT]
router.post("",
    patientAuthorize,
    async (req, res) => {
        try{
            const query = util.promisify(conn.query).bind(conn);

            if(req.body.medicine_id && req.body.patient_id) {
                const checkMedicineExists = await query("select * from medicines where id = ?", [req.body.medicine_id])

                if(checkMedicineExists.length == 0) {
                    return res.status(400).json({
                        errors: [
                            {
                                msg: "medicine is not found !"
                            }
                        ]
                    });
                }

                const checkPatientExists = await query("select * from users where id = ?", [req.body.patient_id])

                if(checkPatientExists.length == 0) {
                    return res.status(400).json({
                        errors: [
                            {
                                msg: "patient is not found !"
                            }
                        ]
                    });
                }

                const order = {
                    patient_id: req.body.patient_id,
                    medicine_id: req.body.medicine_id
                }
    
                // 3- Check if Order is already exists
                const checkOrderExists = await query("select * from orders where patient_id = ? and medicine_id = ? and status = 'pending'", [order.patient_id, order.medicine_id])
    
                if(checkOrderExists.length == 1) {
                    return res.status(400).json({
                        errors: [
                            {
                                msg: "order is already requested !"
                            }
                        ]
                    });
                }
    
                await query("insert into orders set ?", order);
    
                return res.status(200).json({
                    msg: "order created successfully"
                });
            }

        } catch(err) {
            res.status(500).json({ err: err});
        }
    }
);



// VIEW ORDERS REQUESTS [PATIENT]
router.get("/patient",
    patientAuthorize,
    async (req, res) => {
        try{
            const query = util.promisify(conn.query).bind(conn);

            const orders = await query("select orders.*, medicines.name as medicine_name, medicines.price, users.name, users.email, users.phone from orders inner join medicines on medicines.id = orders.medicine_id inner join users on users.id = orders.patient_id where patient_id = ?", [req.query.id]);

            if (!orders[0]) {
                return res.status(400).json({
                    errors: [
                        {
                            msg: "no orders found !"
                        }
                    ]
                })
            }

            res.status(200).json(orders);
        } catch(err) {
            console.log(err);
        }
    }
);



// VIEW ALL ORDERS REQUESTS [ADMIN]
router.get("/admin",
    adminAuthorize,
    async (req, res) => {
        try{
            const query = util.promisify(conn.query).bind(conn);

            const orders = await query("select orders.*, medicines.name as medicine_name, medicines.price, users.name, users.email, users.phone from orders inner join medicines on medicines.id = orders.medicine_id inner join users on users.id = orders.patient_id");

            if (!orders[0]) {
                return res.status(400).json({
                    errors: [
                        {
                            msg: "no orders found !"
                        }
                    ]
                })
            }

            res.status(200).json(orders);
        } catch(err) {
            console.log(err);
        }
    }
);



// SUBMIT OREDER REQUEST STATUS [ADMIN]
router.post("/submitStatus",
    adminAuthorize,
    async (req, res) => {
        try{
            const query = util.promisify(conn.query).bind(conn);
            const order = await query("select * from orders where id = ?", [req.body.id]);

            if(!order[0]) {
                return res.status(404).json({
                    msg: "order not found !"
                });
            }

            const statusData = {
                status: req.body.status
            }

            await query("update orders set ? where id = ?", [statusData, order[0].id]);

            res.status(200).json({
                msg: "order request " + req.body.status
            });

        } catch(err) {
            console.log(err);
            res.status(500).json({ err: err});
        }
    }
);


module.exports = router;