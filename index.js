const express = require("express");
const dotEnv = require("dotenv");
const cors = require("cors");
const server = express();
const { default: mongoose } = require("mongoose");
const Questions = require("./Models/questionModel");
dotEnv.config({ path: "./.env" });
const PORT = process.env.PORT || 5000;
server.use(express.json());
server.use(cors({ origin: "*" }));
mongoose
  .connect(
    "mongodb+srv://prakash:TA0alWy2gV550ExP@cluster0.gc3ko.mongodb.net/write-exam2"
  )
  .then(() => console.log("db connected"));
const questions = [
  {
    question: "What is Node.js?",
    options: [
      "A front-end JavaScript framework",
      "An open-source JavaScript platform for server-side programming",
      "A multi-threaded server-side platform",
      "A database management system",
    ],
    answer: 1,
  },
  {
    question: "Which engine powers Node.js?",
    options: ["SpiderMonkey", "JavaScriptCore", "V8", "Nashorn"],
    answer: 2,
  },
  {
    question: "Who created Node.js?",
    options: ["Brendan Eich", "Ryan Dahl", "James Gosling", "Guido van Rossum"],
    answer: 1,
  },
  {
    question: "When was Node.js created?",
    options: ["2008", "2009", "2010", "2011"],
    answer: 1,
  },
  {
    question: "What kind of architecture does Node.js follow?",
    options: [
      "Multi-threaded",
      "Event-driven",
      "Synchronous",
      "None of the above",
    ],
    answer: 1,
  },
  {
    question: "What problem does Node.js solve?",
    options: [
      "Slow database access",
      "Synchronous I/O blocking",
      "Difficulties in styling UI components",
      "Dependency injection issues",
    ],
    answer: 1,
  },
  {
    question: "What is the role of the Event Loop in Node.js?",
    options: [
      "Processes blocking operations synchronously",
      "Compiles JavaScript into bytecode",
      "Handles incoming events and delegates them",
      "Manages connections with databases",
    ],
    answer: 2,
  },
  {
    question: "What is the purpose of the Thread Pool in Node.js?",
    options: [
      "Executes non-blocking I/O operations",
      "Processes blocking operations in the background",
      "Handles synchronous requests",
      "Compiles JavaScript into machine code",
    ],
    answer: 1,
  },
  {
    question: "What is libuv in Node.js?",
    options: [
      "A package management tool",
      "A JavaScript engine",
      "A library for asynchronous I/O",
      "A front-end framework",
    ],
    answer: 2,
  },
  {
    question: "What is Node Package Manager (NPM)?",
    options: [
      "A file upload manager",
      "A package library for Node.js applications",
      "A threading tool",
      "An event handler",
    ],
    answer: 1,
  },
  {
    question: "What does non-blocking I/O mean?",
    options: [
      "Operations are processed in a queue synchronously",
      "Input and output are handled asynchronously",
      "Data buffers are used for better performance",
      "Threads are used to handle operations",
    ],
    answer: 1,
  },
  {
    question: "What is the primary programming language used for Node.js?",
    options: ["Python", "JavaScript", "C++", "Ruby"],
    answer: 1,
  },
  {
    question: "Which companies use Node.js?",
    options: ["Netflix", "Uber", "PayPal", "All of the above"],
    answer: 3,
  },
  {
    question: "Why is Node.js considered scalable?",
    options: [
      "It uses multiple threads for all operations",
      "It handles requests asynchronously with low resource usage",
      "It buffers all data to improve performance",
      "It can only handle one client at a time",
    ],
    answer: 1,
  },
  {
    question: "What does the Event Queue do in Node.js?",
    options: [
      "Executes blocking operations",
      "Queues incoming events for the Event Loop",
      "Stores JavaScript code",
      "Handles synchronous tasks",
    ],
    answer: 1,
  },
  {
    question: "Which feature of Node.js allows it to avoid buffering?",
    options: [
      "Single-threaded architecture",
      "Event-driven architecture",
      "Chunk-based data output",
      "Thread Pool",
    ],
    answer: 2,
  },
  {
    question:
      "Which library powers the multi-threaded capabilities of Node.js?",
    options: ["Express.js", "libuv", "Socket.io", "NPM"],
    answer: 1,
  },
  {
    question:
      "What does the term 'lightweight' mean in the context of Node.js?",
    options: [
      "It uses minimal JavaScript",
      "It consumes low memory and resources",
      "It can only handle small applications",
      "It runs on lightweight hardware",
    ],
    answer: 1,
  },
  {
    question: "How does Node.js improve performance in web applications?",
    options: [
      "By using synchronous operations",
      "By blocking all inputs and outputs",
      "By handling multiple requests concurrently",
      "By requiring more hardware",
    ],
    answer: 2,
  },
  {
    question: "What is the core language of the libuv library?",
    options: ["Python", "C++", "JavaScript", "Java"],
    answer: 1,
  },
];

server.get("/", async (req, res) => {
  try {
    await Questions.insertMany(questions);
    return res.statusCode(200);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});
server.get("/getQuestion", async (req, res) => {
  try {
    const questions = await Questions.find({}, { answer: 0, __v: 0 });
    res.status(200).json({ data: questions, message: "total questions" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

server.get("/", (req, res) => res.status(200).json({ m: "j" }));

server.post("/updateQuestion", async (req, res) => {
  try {
    const bulkUpdate = Object.entries(req.body).map(([_id, userAnswer]) => ({
      updateOne: {
        filter: { _id },
        update: { $set: { userAnswer } },
      },
    }));
    await Questions.bulkWrite(bulkUpdate);
    res.status(200).json({ message: "answer updated success" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

server.get("/submittedStatus", async (req, res) => {
  try {
    const questions = await Questions.find({});
    const withoutAnswer = questions.filter(
      (element) => element["userAnswer"] || element["userAnswer"] === 0
    );
    console.log(withoutAnswer.length, questions.length);
    if (withoutAnswer.length === questions.length) {
      res.status(200).json({
        data: true,
      });
    } else {
      res.status(200).json({
        data: false,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "hai" });
  }
});

server.listen(PORT, () => {
  console.log(`Server working ${PORT}`);
});
