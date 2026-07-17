const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// REGISTER

exports.register = async (req,res)=>{

    const {
        name,
        email,
        password
    } = req.body;


    try {

        const hashedPassword =
        await bcrypt.hash(password,10);


        User.create(
            {
                name,
                email,
                password: hashedPassword
            },

            (err,result)=>{

                if(err){

                    return res.status(500).json({
                        error:err.message
                    });

                }


                res.json({
                    message:"User registered successfully"
                });


            }
        );


    } catch(error){

        res.status(500).json({
            error:error.message
        });

    }

};




// LOGIN

exports.login = (req,res)=>{


    const {
        email,
        password
    } = req.body;



    User.findByEmail(
        email,

        async(err,result)=>{


            if(err){

                return res.status(500).json({
                    error:err.message
                });

            }



            if(result.length===0){

                return res.status(404).json({
                    message:"User not found"
                });

            }



            const user=result[0];


            const match =
            await bcrypt.compare(
                password,
                user.password
            );



            if(!match){

                return res.status(401).json({
                    message:"Wrong password"
                });

            }



           const token = jwt.sign(
  {
    id: user.id,
    role: user.role,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "1d",
  }
);



            res.json({

                message:"Login successful",

                token,

                user:{
                    id:user.id,
                    name:user.name,
                    email:user.email,
                    role:user.role
                }

            });



        }
    );


};