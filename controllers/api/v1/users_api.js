
const userDataBase = require('../../../models/user');
const jwt = require('jsonwebtoken');

module.exports.createSession = async function(req,res) {
    try{
        let user = await userDataBase.findOne({email: req.body.email});

        if(!user || user.password != req.body.password) {
            console.log('Invalid email or password');
            return res.status(422).json({
                message: 'Invalid email or password'
            })
        }
        
            return res.status(200).json({
                message: 'Sign In successful, here is your token, please keep it safe',
                data: {
                    token: jwt.sign(user.toJSON(), 'engage', {expiresIn :1000000})
                }
            })
        
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}
