const Student = require("../models/student");

const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;

    const firstName = req.body.first_name;
    const lastName = req.body.last_name;

    const user = await Student.find({ _id: id });

    if (!user) {
      throw { status: 404, message: "User not found" };
    }

    const newUserFirstName = firstName || user.first_name;
    const newUserLastName = lastName || user.last_name;
    const options = { new: true };
    const updatedUser = await Student.findByIdAndUpdate(
      id,
      { first_name: newUserFirstName, last_name: newUserLastName },
      options
    );
    if (!updatedUser) {
      throw res.status(500).send("Error updating students");
    }

    res.status(200).json({ status: "udated ", code: 200, data: updatedUser });
  } catch (err) {
    next(err);
  }
};

const getAllStudents = async (req, res, next) => {
  try {
    const result = await Student.find();

    if (result.length === 0) {
      throw { status: 404, message: "No student found" };
    }
    res.status(200).json({
      status: "success",
      code: 200,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const postStudentData = async (req, res, next) => {
  try {
    const { first_name, last_name, email } = req.body;
    //save
    const newStudent = new Student({
      last_name,
      first_name,
      email,
    });
    const postResult = await newStudent.save();
    if (!postResult) {
      throw { status: 500, message: "Failed to create student" };
    }
    //res.send(newStudent);
    res.status(201).json({ status: "Created ", code: 201, data: postResult });

    // end of save

    // create
    // const postResult = await Student.create({
    //   first_name,
    //   last_name,
    //   email,
    // });
    // res.status(201).json({ status: "Created ", code: 201, data: postResult });
    //end of create
  } catch (err) {
    next(err);
  }
};

module.exports = { postStudentData, getAllStudents, updateUser };
