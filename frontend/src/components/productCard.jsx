import {Link} from "react-router-dom";
function ProductCard({product}){


return(

<div className="card h-100 shadow-sm">


<img

src={
product.image ||
"https://via.placeholder.com/300"
}

className="card-img-top"

/>


<div className="card-body">


<Link 
to={`/product/${product.id}`}
className="text-decoration-none"
>

<h5>
{product.name}
</h5>

</Link>

<p className="text-muted">
{product.category}
</p>


<h4>
${product.price}
</h4>


<button className="btn btn-warning">
Add To Cart
</button>


</div>


</div>

)


}


export default ProductCard;