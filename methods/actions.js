var User = require('../models/user')
var jwt = require('jwt-simple')
var config = require('../config/dbconfig')

var functions = {
    addNew: function(req,res){
        if ((!Request.body.name)||(!req.body.password)){
            res.json({sucess:false,msg:'Enter All Fields'})
        }
        else{
            var newUser = User({
                name: req.body.name,
                password: req.body.password 
            });
            if(err){
                res.json({sucess:false,msg: 'Faild to Save'})
            }
            else{
                res.json({sucess:true,msg:'Succesefully Saved'})
            }
        }
    },
    authenticate: function(req,res){
        User.findOne({
            name: req.body.name
        },function(err,user){
            if(err) throw err
            if(!user){
                res.status(403).send({sucess:false, msg:'Authintication Faild User Not Found'})
            }
            else{
                user.comparePassword(req.body.password,function(err,isMatch){
                    if(isMatch && !err){
                        var token = jwt.encode(user,config.secret)
                        res.json({sucess:true , token:token})
                    }
                    else{
                        return res.status(403).send({sucess:false, msg:'Authintication Faild,Wrong Password'})
                    }
                })
            }
        })
    },
    getinfo: function(req,res){
        if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'){
            var token = req.headers.authorization.split(' ')[1]
            var decodedtoken = jwt.decode(token,config.secret)
            return res.json({sucess:true , msg:'Hello' + decodedtoken.name})
        }
        else{
            return res.json({sucess:false, msg: 'No Headers'})
        }
    }
}



module.exports = functions