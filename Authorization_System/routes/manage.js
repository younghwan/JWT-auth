const express = require('express');
const { JsonWebTokenError } = require('jsonwebtoken');
const router = express.Router();;
const jwt = require('jsonwebtoken');
const connection = require('../db/db.js');
const secret = require('../config/secret.js')

router.get('/', function (req, res) {
    const token = req.cookies.token

    jwt.verify(token, secret.SECRET_KEY, (err, decoded) => {
        if (!decoded) {
            return res.status(401).json(
                {
                    msg: '인증실패'
                }
            )
        }
        if (decoded['grade'] == 'admin') {
            return res.render('manage')
        }
        res.send(decoded)
    })
})

// 사용자 전체보기
router.get('/total', async (req, res) => {
    const sql_total = "SELECT * FROM user_info"
    const [total_row,total_fields] = await connection.query(sql_total);

    res.json(total_row)
})

// 사용자 삭제
router.get('/delete', async(req, res) => {
    const sql_delete = "DELETE FROM user_info WHERE user_id = ?"
    const params = req.query.user_id

    const [delete_row,delete_fields] = await connection.query(sql_delete,params);
    if(delete_row.affectedRows>0){
        return res.send("정상 처리 되었습니다.")
    }else{
        return res.send("해당 아이디가 존재하지 않습니다.")
    }
})

// 사용자 권한 변경
router.get('/alter', async(req,res) => {
    const sql_alter = "UPDATE user_info SET grade = ? WHERE user_id = ?"
    const params = [req.query.user_grade,req.query.user_id]

    const [alter_row,alter_fields] = await connection.query(sql_alter,params);

    if(alter_row.affectedRows>0){
        return res.send("정상 처리 되었습니다.")
    }else{
        return res.send("해당 아이디가 존재하지 않습니다.")
    }
})

module.exports = router;