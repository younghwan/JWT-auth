const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secret = require('../config/secret.js')
const connection = require('../db/db.js');


router.get('/', (req, res) => {
    res.render('login')
});

router.post('/login', async (req, postRes) => {

    const {user_id,password} = req.body['account']

    const sql_check_uid = 'select EXISTS (select * from user_info where user_id= ? ) as success'
    const sql_find_pw = 'select password,grade from user_info where user_id=?'

    const [isId_row,isId_fields] = await connection.query(sql_check_uid,user_id);
    const [pw_row,pw_fields] = await connection.query(sql_find_pw,user_id);

    const onError = () => {
        postRes.json({
            code:201,
            message: '아이디와 패스워드를 확인해주세요.'
        })
    }

    if(isId_row[0]['success'] == 0 ){
        return onError()
    }else{
            var grade = pw_row[0]['grade']
            // input password bcrypt로 검증
            bcrypt.compare(password, pw_row[0]['password'], (err, res) => {
                // 비밀번호가 정확하면 JWT 발행
                if (res) {
                    let payload = {
                        grade: grade
                    }
                    let options = {
                        expiresIn: '10h'
                    }
                    const token = jwt.sign(payload, secret.SECRET_KEY, options);
                    postRes.cookie(
                        'token', token
                    ).json({
                        code: 200,
                        message: '로그인 성공!',
                        token: token
                    })
                } else {
                    onError()
                }
            })
    }
})

module.exports = router;