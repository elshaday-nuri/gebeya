import {useEffect,useState} from "react";
import {useParams} from "react-router-dom";
import api from "../services/api";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";


function ProductDetails(){
const {user}=useContext(AuthContext);

const {id}=useParams();

const [product,setProduct]=useState(null);


// Add this function HERE
const addToCart = ()=>{


api.post("/cart",{

user_id:user.id,

product_id:product.id,

quantity:1

})

.then(()=>{

    alert("Added to cart 🛒");

});


};



useEffect(()=>{


api.get(`/products/${id}`)

.then(res=>{

setProduct(res.data);

})


},[id]);



if(!product){

return (

<h3 className="text-center mt-5">
Loading...
</h3>

)

}



return(

<div className="container mt-5">

<div className="row">


<div className="col-md-6">

<img

src={
product.image ||
"https://via.placeholder.com/500"
}

className="img-fluid rounded"

/>

</div>



<div className="col-md-6">


<h1>
{product.name}
</h1>


<h4>
${product.price}
</h4>


<p>
Category: {product.category}
</p>


<p>
{product.description}
</p>


<p>
Stock: {product.stock}
</p>



{
user ?

<button

className="btn btn-warning btn-lg"

onClick={addToCart}

>

Add To Cart 🛒

</button>


:

<a 
href="/login"
className="btn btn-warning btn-lg"
>

Login to Buy

</a>

}



</div>


</div>

</div>

)


}


export default ProductDetails;