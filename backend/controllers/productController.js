const Product = require("../models/Product");


exports.getProducts = (req, res) => {

    Product.getAll((err, results) => {

        if(err){
            return res.status(500).json({
                error: err.message
            });
        }


        res.json(results);

    });

};
exports.getProductById=(req,res)=>{


const id=req.params.id;


Product.getById(

id,

(err,result)=>{


if(err){

return res.status(500)
.json({
error:err.message
});

}


res.json(result[0]);


}

);


};