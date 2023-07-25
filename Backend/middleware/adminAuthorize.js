const conn = require('../db/dbConnection');
const util = require('util');


const adminAuthorize = async(req, res, next) => {
    const query = util.promisify(conn.query).bind(conn);
    const {token} = req.headers;
    const admin = await query("select * from users where token = ?", [token]);
    if (admin[0] && admin[0].type == 'admin') {
        next();
    }
    else {
        res.status(403).json({
            msg: "you are not authorized to access this route !"
        })
    }
}

module.exports = adminAuthorize;