function Categories(){

const categories=[
    "Electronics",
    "Fashion",
    "Home & Kitchen",
    "Books",
    "Sports",
    "Beauty"
];


return(

<div className="container mt-5">

<h2 className="mb-4">
Shop By Category
</h2>


<div className="row">


{
categories.map((category,index)=>(

<div 
className="col-md-2 col-6 mb-3"
key={index}
>

<div className="card text-center shadow-sm p-3">

<h6>
{category}
</h6>

</div>


</div>


))
}


</div>

</div>

)


}


export default Categories;