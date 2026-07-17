import {useState} from "react";
import api from "../services/api";


function Register(){


const [form,setForm]=useState({

name:"",
email:"",
password:""

});



const submit=(e)=>{

e.preventDefault();


api.post("/auth/register",form)

.then(()=>{

alert("Account created");

});


};



return(

<div className="container mt-5">


<h2>
Create Account
</h2>


<form onSubmit={submit}>


<input

className="form-control mb-3"

placeholder="Name"

onChange={
e=>setForm({
...form,
name:e.target.value
})
}

/>



<input

className="form-control mb-3"

placeholder="Email"

onChange={
e=>setForm({
...form,
email:e.target.value
})
}

/>



<input

className="form-control mb-3"

type="password"

placeholder="Password"

onChange={
e=>setForm({
...form,
password:e.target.value
})
}

/>



<button className="btn btn-warning">

Register

</button>


</form>


</div>

)


}


export default Register;