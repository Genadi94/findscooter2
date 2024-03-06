import express from "express";
const router = express.Router();
import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import Account from '../models/accountModel.js';

router.post('/signup',(req,res) => {
   
    const {firstName,lastName,email,password} = req.body;

   
    Account.findAll({where: {email:email}})
    .then(async results => {
        if(results.length == 0) {
          const hash = await bcryptjs.hash(password, 10);
          const code = Math.floor(1000 + Math.random() * 9000);
          Account.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hash,
            verificationCode: code,
            isVerified: false
          })
         
          .then(account_created => {
            return res.status(200).json({
                message: account_created
            })
          })
          .catch(error => {
            return res.status(500).json({
                message: error
            })
          })
        } else {
            return res.status(401).json({
                message: 'Username is not available, please try another email'
            })
        }
    })
    .catch(error =>{
        return res.status(500).json({
            message: error
        })
    })
});

router.get('/users', (req,res) => {
    Account.findAll()
    .then(results =>{
      return res.status(200).json({
        message: results
      })
    })
    .catch(error => {
      return res.status(500).json({
        message: error
    })
    })
})

router.post('/verify',(req,res) => {});

router.post('/login', (req,res) => {});

router.get('/getAccounts',(req,res) => {});



export default router;