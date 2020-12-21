const express = require('express');
const { JsonWebTokenError } = require('jsonwebtoken');
const router = express.Router();;
const jwt = require('jsonwebtoken');
const secret = require('../config/secret.js')

router.get('/',function(req,res){
    var token = req.cookies.token

    jwt.verify(token, secret.SECRET_KEY, (err, decoded) => {
        if (!decoded) {
            return res.status(401).json(
                {
                    msg: '비로그인 상태입니다.'
                }
            )
        }else{
            return res.render('home')
        }
    })
})

router.get('/check', function (req, res) {
    var token = req.cookies.token

    jwt.verify(token,secret.SECRET_KEY,(err,decoded) => {
        if(decoded['grade'] == 'admin'){
            return res.json({
                    code : 200,
                    message: 'Welcome master'
                })
        }else{
            return res.json({
                code : 201,
                message: '관리자 권한이 없습니다.'
            })
        }
    })
})

module.exports = router;