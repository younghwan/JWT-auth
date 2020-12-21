const express = require('express');
const router = express.Router();
const connection = require('../db/db.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

router.get('/', (req, res) => {
    res.render('signup')
});

router.post('/register', async (req, res) => {

    const {user_id,name,password,confirm,gender,phone_number,grade} = req.body['user_info'];

    if(password != confirm){
        return res.json({
            code: 201,
            message: '패스워드가 일치하지 않습니다.',
        })
    }

    const sql_check_uid = 'select EXISTS (select * from user_info where user_id= ? ) as success'
    const [isId_row,isId_fields] = await connection.query(sql_check_uid,user_id);
 
    if(isId_row[0]['success'] > 0 ){
        return res.json({
            code: 201,
            message: '중복된 아이디가 존재합니다.',
        })
    }else{
        bcrypt.hash(password, saltRounds, async (err, hash) => {
            const sql_signup = 'INSERT INTO user_info (user_id,name,password,gender,phone_number,grade) VALUES(?,?,?,?,?,?)';
            const params_signup = [user_id, name, hash, gender, phone_number, grade]
            await connection.query(sql_signup,params_signup)
        })
        return res.json({
            code: 200,
            message: '회원가입이 완료되었습니다.',
        })
    }
})

module.exports = router;