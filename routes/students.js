const express = require("express");

studentsRouter = express.Router();

const {
  postStudentData,
  getAllStudents,
  updateUser,
} = require("../controllers/studentController");

studentsRouter.get("/", getAllStudents);
studentsRouter.post("/", postStudentData);

studentsRouter.put("/:id", updateUser);

module.exports = studentsRouter;
