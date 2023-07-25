const router = require('express').Router();
const conn = require('../db/dbConnection');
const adminAuthorize = require('../middleware/adminAuthorize');
const adminORpatientAuthorize = require('../middleware/adminORpatientAuthorize');
const patientAuthorize = require('../middleware/patientAuthorize');
const {body, validationResult} = require('express-validator');
const upload = require('../middleware/uploadImages');
const util = require('util');
const fs = require("fs");


// CREATE MEDICINE [ADMIN]
router.post("",
    adminAuthorize,
    upload.single("image"),
    body("name").isString().withMessage("pleaser enter a valid name!"),
    body("description").isString().withMessage("pleaser enter a valid description!"),
    body("price").isNumeric().withMessage("please enter a valid price number"),
    body("exp_date").isString().withMessage("pleaser enter a valid date!"),
    body("category_id").notEmpty().withMessage("please select category"),
    async(req, res) => {
        try{
            const query = util.promisify(conn.query).bind(conn);

            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json( {errors: errors.array() });
            }
            
            if(!req.file) {
                return res.status(400).json({
                    errors: [
                        {
                            msg: "image is required"
                        }
                    ]
                })
            }

            const medicine = {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                exp_date: req.body.exp_date,
                category_id: req.body.category_id,
                image_url: req.file.filename,
            }

            const checkMedicineExists = await query("select * from medicines where name = ?", [req.body.name]);

            if(checkMedicineExists.length > 0) {
                return res.status(400).json({
                    errors: [
                        {
                            msg: "medicine is already existed !"
                        }
                    ]
                })
            }

            

            await query("insert into medicines set ?", medicine);

            res.status(200).json({
                msg: "medicine added successfully"
            });

        } catch(err) {
            res.status(500).json({ err: err});
        }
    }
);



// UPDATE MEDICINE [ADMIN]
router.put("/:id",
    adminAuthorize,
    upload.single("image_url"),
    body("name").isString().withMessage("pleaser enter a valid name!"),
    body("description").isString().withMessage("pleaser enter a valid description!"),
    body("price").isNumeric().withMessage("please"),
    body("exp_date").isString().withMessage("pleaser enter a valid date!"),
    body("category_id").notEmpty().withMessage("please select category"),
    async(req, res) => {
        try{
            const query = util.promisify(conn.query).bind(conn);
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json( {errors: errors.array() });
            }

            const medicine = await query("select * from medicines where id = ?", [req.params.id]);

            if(!medicine[0]) {
                return res.status(400).json({
                    errors: [
                        {
                            msg: "medicine not found !"
                        }
                    ]
                })
            }

            const checkMedicineExists = await query("select * from medicines where name = ? and id != ?", [req.body.name, req.params.id]);

            if(checkMedicineExists.length > 0) {
                return res.status(400).json({
                    errors: [
                        {
                            msg: "medicine is already existed !"
                        }
                    ]
                })
            }

            const medicineData = {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                exp_date: req.body.exp_date,
                category_id: req.body.category_id
            }

            if(req.file){
                medicineData.image_url = req.file.filename;

                fs.unlinkSync("./upload/" + medicine[0].image_url);
            }

            await query("update medicines set ? where id = ?", [medicineData, medicine[0].id]);

            res.status(200).json({
                msg: "medicine updated successfully"
            });
        } catch(err) {
            res.status(500).json({ err: err});
        }
    }
);




//DELETE MEDICINE [ADMIN]
router.delete("",
    adminAuthorize,
    async (req, res) => {
        try {
            //1- CHECK IF Medicine EXISTS OR NOT
            const query = util.promisify(conn.query).bind(conn);
            const medicine = await query("select * from medicines where id = ?", [req.query.id]);

            if (!medicine[0]) {
                return res.status(400).json({
                    errors: [
                        {
                            msg: "medicine not found !"
                        }
                    ]
                })
            }

            //2- REMOVE Old Medicine IMAGE
            fs.unlinkSync("./upload/" + medicine[0].image_url);

            await query("delete from medicines where id = ?", [medicine[0].id]);
            
            res.status(200).json({
                msg: "medicine deleted successfully",
            });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
);




// VIEW AND SEARCH AND FILTER MEDICINE [ADMIN, PATIENT]
router.get("",
    adminORpatientAuthorize,
    async (req, res) => {
        try{
            const query = util.promisify(conn.query).bind(conn);

            if(req.query.medicine_id) {
                const selectMedicine = await query("select * from medicines where id = ?", [req.query.medicine_id]);
                return res.status(200).json(selectMedicine);
            }

            let search = "";

            if(req.query.category_id) {
                search = `where category_id LIKE '%${req.query.category_id}%'`;
            }
            
            if(req.query.search) {
                search = `where name LIKE '%${req.query.search}%' or description LIKE '%${req.query.search}%'`;
            }

            const medicine = await query(`select * from medicines ${search}`);

            if(req.query.id && medicine[0] && req.query.search) {
                const searched = await query("select * from search_history where patient_id = ? and search_query = ?", [req.query.id, req.query.search]);
                
                if(!searched[0]) {
                    await query("insert into search_history set patient_id = ?, search_query = ?", [req.query.id, req.query.search]);
                }
            }

            medicine.map((medicine) => {
                medicine.image_url = "http://" + req.hostname + ":4000/" + medicine.image_url;
            });

            res.status(200).json(medicine);

        } catch(err) {
            console.log(err);
        }
    }
);



module.exports = router;