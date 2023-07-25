const conn = require('../db/dbConnection');
const util = require('util');


const patientAuthorize = async(req, res, next) => {

    const query = util.promisify(conn.query).bind(conn);
    const {token} = req.headers;

    const user = await query("select * from users where token = ?", [token]);

    if (!user[0]) {
        return res.status(403).json({
            msg: "you are not authorized to access this route !"
        })
    }
    else if(user[0].type != "patient"){
        return res.status(403).json({
            msg: "you are not authorized to access this route !"
        })
    }
    else {
        next();
    }

}

module.exports = patientAuthorize;