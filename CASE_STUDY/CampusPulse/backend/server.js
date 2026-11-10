const express = require("express");
const path = require("node:path");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;
const frontendPath = path.join(__dirname, "..", "frontend");

app.use(express.json());
app.use(express.static(frontendPath));

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    course: { type: String, required: true, trim: true },
    year: { type: Number, required: true, min: 1, max: 4 },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" }
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);

let demoStudents = [
  { _id: "demo-1", name: "Aarav Sharma", email: "aarav@example.com", course: "Computer Science", year: 3, status: "Active" },
  { _id: "demo-2", name: "Diya Reddy", email: "diya@example.com", course: "Artificial Intelligence", year: 2, status: "Active" },
  { _id: "demo-3", name: "Vikram Singh", email: "vikram@example.com", course: "Information Technology", year: 4, status: "Inactive" }
];

let databaseReady = false;

function useDatabase() {
  return databaseReady && mongoose.connection.readyState === 1;
}

function validateStudent(body) {
  const { name, email, course, year, status = "Active" } = body;
  if (!name || !email || !course || year === undefined || year === "") {
    return "Name, email, course and year are required.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Please provide a valid email address.";
  }
  if (![1, 2, 3, 4].includes(Number(year))) {
    return "Year must be between 1 and 4.";
  }
  if (!["Active", "Inactive"].includes(status)) {
    return "Status must be Active or Inactive.";
  }
  return null;
}

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", database: useDatabase() ? "MongoDB Atlas" : "Demo memory store" });
});

app.get("/api/students", async (req, res, next) => {
  try {
    const students = useDatabase()
      ? await Student.find().sort({ createdAt: -1 }).lean()
      : demoStudents;
    res.json(students);
  } catch (error) {
    next(error);
  }
});

app.post("/api/students", async (req, res, next) => {
  try {
    const validationError = validateStudent(req.body);
    if (validationError) return res.status(400).json({ error: validationError });

    if (useDatabase()) {
      const student = await Student.create({ ...req.body, year: Number(req.body.year) });
      return res.status(201).json(student);
    }

    if (demoStudents.some((student) => student.email === req.body.email.toLowerCase())) {
      return res.status(409).json({ error: "A student with this email already exists." });
    }
    const student = {
      _id: `demo-${Date.now()}`,
      name: req.body.name.trim(),
      email: req.body.email.toLowerCase().trim(),
      course: req.body.course.trim(),
      year: Number(req.body.year),
      status: req.body.status || "Active"
    };
    demoStudents = [student, ...demoStudents];
    res.status(201).json(student);
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ error: "A student with this email already exists." });
    next(error);
  }
});

app.put("/api/students/:id", async (req, res, next) => {
  try {
    const validationError = validateStudent(req.body);
    if (validationError) return res.status(400).json({ error: validationError });

    if (useDatabase()) {
      const student = await Student.findByIdAndUpdate(
        req.params.id,
        { ...req.body, year: Number(req.body.year) },
        { new: true, runValidators: true }
      );
      if (!student) return res.status(404).json({ error: "Student not found." });
      return res.json(student);
    }

    const index = demoStudents.findIndex((student) => student._id === req.params.id);
    if (index === -1) return res.status(404).json({ error: "Student not found." });
    const updatedStudent = {
      ...demoStudents[index],
      name: req.body.name.trim(),
      email: req.body.email.toLowerCase().trim(),
      course: req.body.course.trim(),
      year: Number(req.body.year),
      status: req.body.status
    };
    demoStudents[index] = updatedStudent;
    res.json(updatedStudent);
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ error: "A student with this email already exists." });
    next(error);
  }
});

app.delete("/api/students/:id", async (req, res, next) => {
  try {
    if (useDatabase()) {
      const student = await Student.findByIdAndDelete(req.params.id);
      if (!student) return res.status(404).json({ error: "Student not found." });
    } else {
      const originalLength = demoStudents.length;
      demoStudents = demoStudents.filter((student) => student._id !== req.params.id);
      if (demoStudents.length === originalLength) return res.status(404).json({ error: "Student not found." });
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api/")) {
    return res.sendFile(path.join(frontendPath, "index.html"));
  }
  next();
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: "An unexpected server error occurred." });
});

async function connectToDatabase() {
  if (!process.env.MONGODB_URI) {
    console.warn("MONGODB_URI is not set. Running with the demo memory store.");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
    databaseReady = true;
    console.log("Connected to MongoDB Atlas.");
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    console.warn("Continuing with the demo memory store so the application remains usable.");
  }
}

if (require.main === module) {
  connectToDatabase().finally(() => {
    app.listen(PORT, () => console.log(`CampusPulse running on port ${PORT}`));
  });
}

module.exports = { app, validateStudent };
