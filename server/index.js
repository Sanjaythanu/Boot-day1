// Mongoose load from library
const mongoose = require("mongoose");

// Lets connect to mongo
mongoose.connect("mongodb://localhost:27017/testdb")
  .then(async () => {
    // Create Student Schema
    const studentSchema = new mongoose.Schema({
      name: String,
      age: Number,
      city: String,
      course: String,
      marks: Number
    });

    // Create Student Model
    const Student = mongoose.model("Student", studentSchema, "students");

    // Clear existing data
    await Student.deleteMany({});

    const studentsData = [
      { name: "Manoj", age: 22, city: "Coimbatore", course: "MERN", marks: 78 },
      { name: "Ragul", age: 25, city: "Chennai", course: "Java", marks: 66 },
      { name: "Priya", age: 19, city: "Coimbatore", course: "Python", marks: 88 },
      { name: "Karthik", age: 28, city: "Bangalore", course: "MERN", marks: 52 },
      { name: "Divya", age: 21, city: "Coimbatore", course: "AI", marks: 91 },
      { name: "Sneha", age: 18, city: "Chennai", course: "Python", marks: 73 },
      { name: "Arjun", age: 24, city: "Hyderabad", course: "Java", marks: 35 },
      { name: "Meena", age: 20, city: "Bangalore", course: "MERN", marks: 60 },
      { name: "Santhosh", age: 23, city: "Chennai", course: "AI", marks: 47 },
      { name: "Kavya", age: 26, city: "Coimbatore", course: "Java", marks: 84 }
    ];

    await Student.insertMany(studentsData);
    console.log("\n✅ Inserted 10 students\n");


    console.log("===== A) READ QUERIES =====\n");

    // A1: Print all students
    console.log("A1. All Students:");
    let result = await Student.find();
    console.log(result);
    console.log();

    // A2: Print only students who live in "Coimbatore"
    console.log("A2. Students from Coimbatore:");
    result = await Student.find({ city: "Coimbatore" });
    console.log(result);
    console.log();

    // A3: Print students with age >= 21
    console.log("A3. Students with age >= 21:");
    result = await Student.find({ age: { $gte: 21 } });
    console.log(result);
    console.log();

    // A4: Print students with marks > 80
    console.log("A4. Students with marks > 80:");
    result = await Student.find({ marks: { $gt: 80 } });
    console.log(result);
    console.log();

    // A5: Find one student whose name is "Priya"
    console.log("A5. Find Priya (findOne):");
    result = await Student.findOne({ name: "Priya" });
    console.log(result);
    console.log();

    // A6: Find students who are in MERN course
    console.log("A6. Students in MERN course:");
    result = await Student.find({ course: "MERN" });
    console.log(result);
    console.log();

    // A7: Find students who are from Chennai AND marks >= 60
    console.log("A7. Students from Chennai AND marks >= 60:");
    result = await Student.find({ city: "Chennai", marks: { $gte: 60 } });
    console.log(result);
    console.log();

    // A8: Find students who are from Bangalore OR age < 20
    console.log("A8. Students from Bangalore OR age < 20:");
    result = await Student.find({ $or: [{ city: "Bangalore" }, { age: { $lt: 20 } }] });
    console.log(result);
    console.log();

    // // ============================================
    // // B) SORT / LIMIT / PROJECTION
    // // ============================================
    // console.log("===== B) SORT / LIMIT / PROJECTION =====\n");

    // // B11: Sort students by age ascending (youngest → oldest)
    // console.log("B11. Students sorted by age (ascending):");
    // result = await Student.find().sort({ age: 1 });
    // console.log(result);
    // console.log();

    // // B12: Sort students by marks descending (topper first)
    // console.log("B12. Students sorted by marks (descending - toppers first):");
    // result = await Student.find().sort({ marks: -1 });
    // console.log(result);
    // console.log();

    // // B13: Print top 3 students based on marks
    // console.log("B13. Top 3 students by marks:");
    // result = await Student.find().sort({ marks: -1 }).limit(3);
    // console.log(result);
    // console.log();

    // // B14: Print youngest 2 students
    // console.log("B14. Youngest 2 students:");
    // result = await Student.find().sort({ age: 1 }).limit(2);
    // console.log(result);
    // console.log();

    // // B15: Print only name and city (hide _id) using projection
    // console.log("B15. Only name and city (hide _id):");
    // result = await Student.find({}, { name: 1, city: 1, _id: 0 });
    // console.log(result);
    // console.log();


    console.log("===== C) UPDATE QUERIES =====\n");

    // C16: Update "Karthik" city to "Hyderabad"
    await Student.updateOne({ name: "Karthik" }, { city: "Hyderabad" });
    console.log("C16. Updated Karthik city to Hyderabad - Updated successfully");

    // C17: Update "Sneha" marks to 80
    await Student.updateOne({ name: "Sneha" }, { marks: 80 });
    console.log("C17. Updated Sneha marks to 80 - Updated successfully");

    // C18: Increase "Meena" marks by +10 (use $inc)
    await Student.updateOne({ name: "Meena" }, { $inc: { marks: 10 } });
    console.log("C18. Increased Meena marks by +10 - Updated successfully");

    // C19: Update all Chennai students course to "MERN"
    await Student.updateMany({ city: "Chennai" }, { course: "MERN" });
    console.log("C19. Updated all Chennai students course to MERN - Updated successfully");

    // C20: Add +5 marks to all Coimbatore students
    await Student.updateMany({ city: "Coimbatore" }, { $inc: { marks: 5 } });
    console.log("C20. Added +5 marks to all Coimbatore students - Updated successfully\n");

   
    console.log("===== D) DELETE QUERIES =====\n");

    // D21: Delete one student whose name is "Arjun"
    let deleteResult = await Student.deleteOne({ name: "Arjun" });
    console.log(`D21. Deleted Arjun - ${deleteResult.deletedCount} student(s) deleted`);

    // D22: Delete all students whose marks are below 50
    deleteResult = await Student.deleteMany({ marks: { $lt: 50 } });
    console.log(`D22. Deleted all students with marks < 50 - ${deleteResult.deletedCount} student(s) deleted`);

    // D23: Delete all students whose age is less than 20
    deleteResult = await Student.deleteMany({ age: { $lt: 20 } });
    console.log(`D23. Deleted all students with age < 20 - ${deleteResult.deletedCount} student(s) deleted\n`);

    
    console.log("===== E) FINAL OUTPUT =====\n");

    // E24: Print the final list of students after all updates & deletes
    console.log("E24. Final list of students after all updates & deletes:");
    result = await Student.find();
    console.log(result);
    console.log();

    // E25: Print the total count of remaining students
    const count = await Student.countDocuments();
    console.log(`E25. Total remaining students: ${count}\n`);

    process.exit(0);
  })
  .catch(err => console.error(err));