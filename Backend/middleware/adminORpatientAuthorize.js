const conn = require('../db/dbConnection');
const util = require('util');


const adminORpatientAuthorize = async(req, res, next) => {
    const query = util.promisify(conn.query).bind(conn);
    const {token} = req.headers;
    const checkToken = await query("select * from users where token = ?", [token]);
    if (checkToken[0]) {
        next();
    }
    else {
        res.status(403).json({
            msg: "you are not authorized to access this route !"
        })
    }
}

module.exports = adminORpatientAuthorize;