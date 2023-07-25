const router = require('express').Router();
const conn = require('../db/dbConnection');
const {body, validationResult} = require('express-validator');
const util = require('util');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const adminAuthorize = require('../middleware/adminAuthorize');
const adminORpatientAuthorize = require('../middleware/adminORpatientAuthorize');

// CREATE CATEGORY [ADMIN]
router.post("",
    adminAuthorize,
    body("name").isString().withMessage("pleaser enter a valid name!"),
    body("description").isString().withMessage("pleaser enter a valid description!"),
    async(req, res) => {
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json( {errors: errors.array() });
            }

            const medicine = {
                name: req.body.name,
                description: req.body.description,
            }

            const query = util.promisify(conn.query).bind(conn);

            const checkCategoryExists = await query("select * from categories where name = ?", [medicine.name]);

            if(checkCategoryExists.length > 0) {
                return res.status(400).json({
                    errors: [
                        {
                            msg: "category is already existed !"
                        }
                    ]
                })
            }

            await query("insert into categories set ?", medicine);

            res.status(200).json({
                msg: "category added successfully"
            });

        } catch(err) {
            console.log(err);
            res.status(500).json({ err: err});
        }
    }
);



// UPDATE CATEGORY [ADMIN]
router.put("/:id",
    adminAuthorize,
    body("name").isString().withMessage("pleaser enter a valid name!"),
    body("description").isString().withMessage("pleaser enter a valid description!"),
    async(req, res) => {
        try{
            const query = util.promisify(conn.query).bind(conn);
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json( {errors: errors.array() });
            }

            const category = await query("select * from categories where id = ?", [req.params.id]);

            if(!category[0]) {
                return res.status(400).json({
                    errors: [
                        {
                            msg: "category not found !"
                        }
                    ]
                })
            }

            const categoryData = {
                name: req.body.name,
                description: req.body.description,
            }

            const checkCategoryExists = await query("select * from categories where name = ? and id != ?", [categoryData.name, req.params.id]);

            if(checkCategoryExists.length > 0) {
                return res.status(400).json({
                    errors: [
                        {
                            msg: "category is already existed !"
                        }
                    ]
                })
            }

            await query("update categories set ? where id = ?", [categoryData, category[0].id]);

            res.status(200).json({
                msg: "category updated successfully"
            });
        } catch(err) {
            console.log(err);
            res.status(500).json({ err: err});
        }
    }
);



//DELETE CATEGORY [ADMIN]
router.delete("",
    adminAuthorize,
    async (req, res) => {
        try {
            //1- CHECK IF Medicine EXISTS OR NOT
            const query = util.promisify(conn.query).bind(conn);
            const category = await query("select * from categories where id = ?", [req.query.id]);

            if (!category[0]) {
                return res.status(400).json({
                    errors: [
                        {
                            msg: "category not found"
                        }
                    ]
                })
            }

            await query("delete from categories where id = ?", [category[0].id]);
            res.status(200).json({
                msg: "category deleted successfully",
            });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
);




// VIEW CATEGORY [ADMIN , PATIENT]
router.get("",
    adminORpatientAuthorize,
    async (req, res) => {
        try{
            const query = util.promisify(conn.query).bind(conn);

            if(req.query.id) {
                const selectCategory = await query("select * from categories where id = ?", [req.query.id]);
                return res.status(200).json(selectCategory);
            }

            const category = await query("select * from categories");

            if (!category[0]) {
                return res.status(400).json({
                    errors: [
                        {
                            msg: "no categories found !"
                        }
                    ]
                });
            }

            res.status(200).json(category);
        } catch(err) {
            console.log(err);
        }
    }
);




module.exports = router;