// Mongoose load from library
const mongoose=require("mongoose");
// Lets connect to mongo
mongoose.connect("mongodb://localhost:27017/testdb")
.then(async()=>{
    const Person=mongoose.model(
        "Person",{name:String,age:Number},"person"
    )
    // Insert
    await Person.create({name:"Sanjay",age:20});
    await Person.create({name:"Kanishk",age:17});
    await Person.create({name:"Kishore",age:20});
    await Person.create({name:"Kamal",age:20});
    console.log("Persons Inserted Succesfully.")

    // // Read
    // const allpeople =await Person.find();
    // console.log("All People: ",allpeople);


    // // update
    // await Person.updateOne({name:"Sanjay"},{age:19});
    // console.log("Sanjay's age updated");
    // delete

    // await Person.deleteOne({name:"Sanjay"});
    // console.log("Sanjay deleted");
})
.catch(err=>console.error(err));