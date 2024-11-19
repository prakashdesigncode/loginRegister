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
    "mongodb+srv://prakash:TA0alWy2gV550ExP@cluster0.gc3ko.mongodb.net/write-exam"
  )
  .then(() => console.log("db connected"));
const questions = [
  {
    question: "What is a callback function in JavaScript?",
    options: [
      "A function called immediately after another function",
      "A function passed as an argument to another function",
      "A function that is called only once",
      "A function that cannot accept arguments",
    ],
    answer: 1,
  },
  {
    question:
      "Which of the following is true about JavaScript's execution order?",
    options: [
      "Functions are executed in the order they are defined",
      "Functions are executed in the order they are called",
      "Functions are executed at random",
      "Functions are executed in reverse order",
    ],
    answer: 1,
  },
  {
    question: "Which symbol is used to concatenate strings in JavaScript?",
    options: ["&", "+", "-", "*"],
    answer: 1,
  },
  {
    question:
      "Which of the following is the correct way to pass a function as an argument?",
    options: [
      "callback()",
      "callback",
      "function(callback())",
      "function(callback)",
    ],
    answer: 3,
  },
  {
    question: "In JavaScript, what is a method?",
    options: [
      "A property of an object",
      "A type of object",
      "A function inside an object",
      "A variable inside a class",
    ],
    answer: 2,
  },
  {
    question:
      "Which of the following best describes JavaScript's object-oriented nature?",
    options: [
      "It is class-based",
      "It is prototype-based",
      "It does not support OOP",
      "It only supports primitive types",
    ],
    answer: 1,
  },
  {
    question: "What is a constructor function in JavaScript?",
    options: [
      "A function that initializes an object",
      "A function that executes without a return value",
      "A function used for mathematical calculations",
      "A function that is called in the global scope",
    ],
    answer: 0,
  },
  {
    question:
      "Which of the following is used to create an object in JavaScript?",
    options: [
      "{} Object literal",
      "[] Array literal",
      "function() constructor",
      "All of the above",
    ],
    answer: 3,
  },
  {
    question: "Which is a correct way to define an object in JavaScript?",
    options: [
      "var obj = {a1: 1, a2: 2};",
      "var obj = new Object(a1: 1, a2: 2);",
      "var obj = (a1, a2) => {a1: 1, a2: 2};",
      "None of the above",
    ],
    answer: 0,
  },
  {
    question: "What does 'this' refer to in JavaScript?",
    options: [
      "The global object",
      "The function calling the method",
      "The object calling the method",
      "None of the above",
    ],
    answer: 2,
  },
  {
    question:
      "How do you create an instance of a constructor function in JavaScript?",
    options: [
      "new Constructor()",
      "Constructor()",
      "Constructor[]",
      "new Constructor{}",
    ],
    answer: 0,
  },
  {
    question:
      "Which of the following methods can be used to concatenate strings in JavaScript?",
    options: [
      "string.concat()",
      "string.add()",
      "string.join()",
      "string.merge()",
    ],
    answer: 0,
  },
  {
    question: "In JavaScript, what is inheritance?",
    options: [
      "A way to reuse code through objects",
      "A way to hide code details",
      "A process of copying objects",
      "A way to create new functions",
    ],
    answer: 0,
  },
  {
    question:
      "Which of the following is an example of a falsy value in JavaScript?",
    options: ["0", "NaN", "undefined", "All of the above"],
    answer: 3,
  },
  {
    question:
      "Which of the following is used to add a new property to an object in JavaScript?",
    options: [
      "object.addProperty()",
      "object['newProperty'] = value;",
      "object.property = value;",
      "Both b and c",
    ],
    answer: 3,
  },
  {
    question: "What does 'undefined' represent in JavaScript?",
    options: [
      "A variable that has been explicitly set to no value",
      "A variable that does not exist",
      "A variable that has been declared but not initialized",
      "A variable with a value of null",
    ],
    answer: 2,
  },
  {
    question: "What is the value of 'typeof null' in JavaScript?",
    options: ["'null'", "'object'", "'undefined'", "'string'"],
    answer: 1,
  },
  {
    question: "What is 'NaN' in JavaScript?",
    options: ["Not a Name", "Not a Number", "Null and None", "Not an Object"],
    answer: 1,
  },
  {
    question: "How do you define a class in JavaScript ES6?",
    options: [
      "class ClassName {}",
      "function ClassName {}",
      "var ClassName = {}",
      "object ClassName {}",
    ],
    answer: 0,
  },
  {
    question: "What does the 'Array.prototype.push()' method do?",
    options: [
      "Adds one or more elements to the end of an array",
      "Removes the first element from an array",
      "Reverses the order of elements in an array",
      "Sorts the elements of an array",
    ],
    answer: 0,
  },
  {
    question:
      "Which method is used to find the index of a specific element in an array?",
    options: ["indexOf()", "findIndex()", "searchIndex()", "getIndex()"],
    answer: 0,
  },
  {
    question:
      "What is the default value of a variable declared without initialization in JavaScript?",
    options: ["null", "undefined", "0", "false"],
    answer: 1,
  },
  {
    question: "What is the output of 'console.log(2 + '2')' in JavaScript?",
    options: ["'22'", "4", "Error", "NaN"],
    answer: 0,
  },
  {
    question:
      "Which of the following statements about JavaScript objects is true?",
    options: [
      "Objects can hold multiple properties",
      "Objects can hold multiple methods",
      "Objects can hold both properties and methods",
      "All of the above",
    ],
    answer: 3,
  },
  {
    question: "What does the 'call' method do in JavaScript?",
    options: [
      "Invokes a method with a specific 'this' value",
      "Creates a copy of an object",
      "Creates a function constructor",
      "None of the above",
    ],
    answer: 0,
  },
  {
    question: "What is the purpose of the 'bind' method in JavaScript?",
    options: [
      "It permanently binds a function to a specific object",
      "It binds a function to the window object",
      "It is used to create an alias for a function",
      "It is used to call a function immediately",
    ],
    answer: 0,
  },
  {
    question: "What does the 'split' method do in JavaScript?",
    options: [
      "Joins multiple strings together",
      "Splits a string into an array of substrings",
      "Replaces characters in a string",
      "Converts a string into a number",
    ],
    answer: 1,
  },
  {
    question:
      "Which of the following is used to convert a string into an integer in JavaScript?",
    options: ["parseInt()", "parseFloat()", "Number()", "All of the above"],
    answer: 0,
  },
  {
    question:
      "Which method would you use to check if an object is an array in JavaScript?",
    options: [
      "Array.isArray()",
      "isArray()",
      "Object.isArray()",
      "ArrayType()",
    ],
    answer: 0,
  },
  {
    question:
      "Which keyword is used to define a constant variable in JavaScript?",
    options: ["let", "var", "const", "final"],
    answer: 2,
  },
  {
    question: "Which of the following is a primitive data type in JavaScript?",
    options: ["Object", "Array", "String", "Function"],
    answer: 2,
  },
  {
    question: "Which operator is used to check strict equality in JavaScript?",
    options: ["==", "===", "=", "!="],
    answer: 1,
  },
  {
    question: "What does the 'delete' operator do in JavaScript?",
    options: [
      "Removes a property from an object",
      "Removes a variable",
      "Deletes an entire object",
      "None of the above",
    ],
    answer: 0,
  },
  {
    question:
      "What is the result of 'console.log(10 == \"10\")' in JavaScript?",
    options: ["true", "false", "Error", "NaN"],
    answer: 0,
  },
  {
    question: "What does 'console.log(1 + 2 + \"3\")' output in JavaScript?",
    options: ["123", "33", "6", "NaN"],
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
