import {useState,useContext} from "react";
import api from "../services/api";
import {AuthContext} from "../context/AuthContext";


function Login(){


const {login}=useContext(AuthContext);



const [form,setForm]=useState({

email:"",
password:""

});



const submit=(e)=>{

e.preventDefault();



api.post("/auth/login",form)

.then(res=>{


login(
    res.data.user,
    res.data.token
);



alert("Login successful");


})


.catch(err=>{


alert(
"Login failed"
);


});


};




return(


<div className="container mt-5">


<div className="row justify-content-center">


<div className="col-md-5">


<h2 className="mb-4">
Login
</h2>



<form onSubmit={submit}>


<input

className="form-control mb-3"

type="email"

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



<button className="btn btn-warning w-100">

Login

</button>



</form>


</div>


</div>


</div>


)


}


export default Login;