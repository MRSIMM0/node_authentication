import express from 'express'
const router = express.Router();

router.get('/confirm',(req,res)=>{
    res.send("confirm endpoint");
})

export default router;