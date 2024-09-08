
import React from 'react';
import{ useForm } from 'react-hook-form';
// import { DevTool } from '@hookform/devtools';


const Youtube = () => {
    const form = useForm({
      defaultValues:{
        // defaultValues:async () =>{
        //   const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
        //   const data = await response.json();
        //   return {
        //     username: data.username,
        //     email: "",
        //     channel:"",
        //   }
        // }
        username:"fahad",// this is for default values we use this in the date country 
        email:"",
        channel:"",
        phonenumber:["", ""],
        dob: new Date(),
      }
    });
    const { register, control,handleSubmit, formState, isDirty,isValid} = form
    const {errors } = formState;
    const onSubmit = (data) => {
        console.log("Form Submited",data) 
    }
    
  

   
  return (
    <div className="flex justify-center items-center h-screen bg-gray-500">
      <form className="bg-white px-10 py-2 rounded shadow-md" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            {...register("username",{required:"username is required"})}
            className="w-full pr-30 py-1 pl-1 border rounded-md"
          />
       
        </div>
        <p className="text-red-500 text-sm text-left">{errors.username?.message}</p> 
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="text"
            id="email"
            {...register("email",{
                pattern:{
                    value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Invalid email"
                },
              validate:(fieldValue) => {
                return fieldValue !=="fahad@gmail.com" || "enter a different email address"
            }
            }
            )}
            className="w-full pr-36 py-1 pl-1 border rounded-md"
          />
        
        </div>
        <p className="text-red-500 text-sm text-left">{errors.email?.message}</p>

        <div className="mb-4">
          <label htmlFor="channel" className="block text-gray-700 text-sm font-bold mb-2">
            Channel
          </label>
          <input
            type="text"
            id="channel"
            {...register("channel")}
            className="w-full pr-20 py-1 pl-1 border rounded-md"
          />
          
        </div>
        <div className="mb-4">
          <label htmlFor="phonenumber" className="block text-gray-700 text-sm font-bold mb-2">
            PhoneNumber1
          </label>
          <input
            type="text"
            id="phonenumber"
            {...register("phoneNumber.0")}
            className="w-full pr-20 py-1 pl-1 border rounded-md"
          />
          
        </div>
        <div className="mb-4">
          <label htmlFor="phonenumber" className="block text-gray-700 text-sm font-bold mb-2">
            PhoneNumber2
          </label>
          <input 
            type="text"
            id="phonenumber"
            {...register("phoneNumber.1")}
            className="w-full pr-20 py-1 pl-1 border rounded-md"
          />
          
        </div>
        <div className="mb-4">
          <label htmlFor="dateofbirth" className="block text-gray-700 text-sm font-bold mb-2">
            DateOfBirth
          </label>
          <input 
            type="date"
            id="dob"
            {...register("dob",{
              valueAsDate:true,
            })}
            className="w-full pr-20 py-1 pl-1 border rounded-md"
          />
          
        </div>
        {/* <p>{errors.channel?.message}</p> */}
        <button disabled ={!isDirty || !isValid}
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
      {/* <DevTool control ={control} /> */}
    </div>
  );
};

export default Youtube;
