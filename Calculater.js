"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const dictionary = {
    "pi": 3.14
};
app.get('/api/add', (req, res) => {
    const num1 = req.query.num1;
    const num2 = req.query.num2;
    if (getNumber(num1) == 0) {
        res.status(400).json("error: invalid value");
    }
    if (getNumber(num2) == 0) {
        res.status(400).json("error: invalid value");
    }
    const result = addNumbers(getNumber(num1), getNumber(num2));
    res.send(`${num1} + ${num2} = ${result}`);
});
app.get('/api/minus', (req, res) => {
    const num1 = req.query.num1;
    const num2 = req.query.num2;
    if (getNumber(num1) == 0) {
        res.status(400).json("error: invalid value");
    }
    if (getNumber(num2) == 0) {
        res.status(400).json("error: invalid value");
    }
    const result = minusNumbers(getNumber(num1), getNumber(num2));
    res.send(`${num1} - ${num2} = ${result}`);
});
app.get('/api/multiplication', (req, res) => {
    const num1 = req.query.num1;
    const num2 = req.query.num2;
    if (getNumber(num1) == 0) {
        res.status(400).json("error: invalid value");
    }
    if (getNumber(num2) == 0) {
        res.status(400).json("error: invalid value");
    }
    const result = multiplicationNumbers(getNumber(num1), getNumber(num2));
    res.send(`${num1} * ${num2} = ${result}`);
});
app.get('/api/Division', (req, res) => {
    const num1 = req.query.num1;
    const num2 = req.query.num2;
    if (getNumber(num1) == 0) {
        res.status(400).json("error: invalid value");
    }
    if (getNumber(num2) == 0) {
        res.status(400).json("error: invalid value");
    }
    const result = DivisionNumbers(getNumber(num1), getNumber(num2));
    res.send(`${num1} / ${num2} = ${result}`);
});
function addNumbers(num1, num2) {
    return num1 + num2;
}
function minusNumbers(num1, num2) {
    return num1 - num2;
}
function multiplicationNumbers(num1, num2) {
    return num1 * num2;
}
function DivisionNumbers(num1, num2) {
    return num1 / num2;
}
function check(num) {
    const parsed = parseInt(num, 10);
    return !isNaN(parsed) && parsed.toString() === num.trim();
}
function getNumber(value) {
    let number1 = 0;
    if (check(value)) {
        number1 = Number(value);
    }
    else {
        const exists = dictionary.has("name");
        if (exists) {
            number1 = dictionary.get(value);
        }
    }
    return number1;
}
app.post('/api/addDictionary', (req, res) => {
    const { key, value } = req.body;
    if (typeof key != 'string' || typeof value != 'number') {
        res.status(400).json("error: invalid value");
    }
    else {
        if (dictionary[key] != null) {
            dictionary[key] = value;
            res.send("updated");
        }
        else {
            dictionary.set(key, value);
            res.send("added");
        }
    }
});
app.delete('/api/deleteDictionary', (req, res) => {
    const key = req.body.key;
    if (typeof key !== 'string') {
        res.status(400).send({ error: 'Invalid key' });
    }
    if (dictionary[key] == null) {
        res.status(400).send({ error: 'Key not found!' });
    }
    else {
        delete dictionary[key];
        res.send({ message: 'deleted' });
    }
});
app.get('/api/value/:key', (req, res) => {
    const key = req.params.key;
    if (typeof key !== 'string') {
        res.status(400).send({ error: 'Invalid key' });
    }
    else {
        if (dictionary[key] == null) {
            res.status(400).send({ error: 'Key not found!' });
        }
        else {
            res.send(`the value is: ${dictionary[key]}`);
        }
    }
});
app.get('/api/allValues', (req, res) => {
    let result = [];
    for (const [key, value] of dictionary.entries()) {
        result.push(`${key}: ${value}`);
    }
    console.log(result.join(', '));
    res.send(result);
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
