const express = require("express");
const db = require("../db/operations");

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/colleges_by_state", async (req, res) => {
  try {
    const collegeGroups = await db.groupCollegesByLocation();
  } catch (err) {
    return res.sendStatus(500);
  }
  res.send(collegeGroups);
});

app.get("/api/colleges_by_courses", async (req, res) => {
  try {
    const collegeGroups = await db.groupCollegesByCourses();
  } catch (err) {
    return res.sendStatus(500);
  }
  res.send(collegeGroups);
});

app.post("/api/college_details", async (req, res) => {
  const { college } = req.body;
  try {
    const similarColleges = await db.findSimilarCollegesTo(college);
    const collegeDetails = await db.findCollegeById(college._id.$oid);
    const collegeStudents = await db.getStudentsInCollege(college._id.$oid);
  } catch (err) {
    return res.sendStatus(500);
  }
  const resObject = {
    details: collegeDetails,
    similar: similarColleges,
    students: collegeStudents,
  };
  res.send(resObject);
});

app.post("/api/student_details", async (req, res) => {
  const { student_id } = req.body;
  try {
    const studentDetails = await db.getStudentDetails(student_id);
  } catch (err) {
    return res.sendStatus(500);
  }
  res.send(studentDetails);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
