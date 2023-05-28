const Student = require('../models/Student');

exports.getAllStudents = async (req, res) => {
    const students = await Student.find();
    res.status(200).json(students);
}

exports.getStudentById = async (req, res) => {
    const student = await Student.findById(req.params.id);
    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
}

exports.createStudent = async (req, res) => {
    const newStudent = new Student(req.body);
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
}

exports.updateStudent = async (req, res) => {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedStudent) {
        return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(updatedStudent);
}

exports.deleteStudent = async (req, res) => {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
        return res.status(404).json({ message: "Student not found" });
    }
    res.status(204).json(deletedStudent);
}
