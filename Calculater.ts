import express, { Request, Response as Resp } from 'express';

const app = express();
app.use(express.json());
const dictionary: { [key: string]: any } = {
    "pi" : 3.14
};

app.get('/api/add',
    (req: Request, res: Resp) => {
        const num1 = req.query.num1 as string
        const num2 = req.query.num2 as string
        if (getNumber(num1) == 0) {
            res.status(400).json("error: invalid value");
        }
        if (getNumber(num2) == 0) {
            res.status(400).json("error: invalid value");
        }
        const result = addNumbers(getNumber(num1), getNumber(num2))
        res.send(`${num1} + ${num2} = ${result}`);
    });

app.get('/api/minus',
    (req: Request, res: Resp) => {
        const num1 = req.query.num1 as string
        const num2 = req.query.num2 as string
        if (getNumber(num1) == 0) {
            res.status(400).json("error: invalid value");
        }
        if (getNumber(num2) == 0) {
            res.status(400).json("error: invalid value");
        }
        const result = minusNumbers(getNumber(num1), getNumber(num2))
        res.send(`${num1} - ${num2} = ${result}`);
    });

app.get('/api/multiplication',
    (req: Request, res: Resp) => {
        const num1 = req.query.num1 as string
        const num2 = req.query.num2 as string
        if (getNumber(num1) == 0) {
            res.status(400).json("error: invalid value");
        }
        if (getNumber(num2) == 0) {
            res.status(400).json("error: invalid value");
        }
        const result = multiplicationNumbers(getNumber(num1), getNumber(num2))
        res.send(`${num1} * ${num2} = ${result}`);
    });

app.get('/api/Division',
    (req: Request, res: Resp) => {
        const num1 = req.query.num1 as string
        const num2= req.query.num2 as string
        if (getNumber(num1) == 0) {
            res.status(400).json("error: invalid value");
        }
        if (getNumber(num2) == 0) {
            res.status(400).json("error: invalid value");
        }
        const result = DivisionNumbers(getNumber(num1), getNumber(num2))
        res.send(`${num1} / ${num2} = ${result}`);
    });

function addNumbers(num1: number, num2: number): number {
    return num1 + num2;
}

function minusNumbers(num1: number, num2: number): number {
    return num1 - num2;
}

function multiplicationNumbers(num1: number, num2: number): number {
    return num1 * num2;
}

function DivisionNumbers(num1: number, num2: number): number {
    return num1 / num2;
}

function check(num: string): Boolean {
    const parsed = parseInt(num, 10);
    return !isNaN(parsed) && parsed.toString() === num.trim();
}
function getNumber(value: string): number {
    let number1: number = 0;
    if (check(value)) {
        number1 = Number(value)
    } else {
        const exists = dictionary.has("name");
        if (exists) {
            number1 = dictionary.get(value);
        }
    }
    return number1;
}


app.post('/api/addDictionary',
    (req: Request, res: Resp) => {
        const { key, value } = req.body;
        if (typeof key != 'string' || typeof value != 'number') {
            res.status(400).json("error: invalid value");
        }
        else{
            if (dictionary[key]!= null) {
                dictionary[key] = value 
                res.send("updated");
            }
        }
    });

    app.put('/api/putDictionary',
    (req: Request, res: Resp) => {
        const { key, value } = req.body;
        if (typeof key !== 'string' || typeof value !== 'number') {
            res.status(400).send({ error: 'Invalid key or value' });
        }
        if (dictionary[key] != null) {
            res.send({ message: 'The key exists!' });
        }
        else {
            dictionary[key] = value;
            res.send({ message: 'added' });
        }
    });


app.delete('/api/deleteDictionary',
    (req: Request, res: Resp) => {
    const  key= req.body.key;
    if (typeof key !== 'string' ) {
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
    
app.get('/api/value/:key',
(req: Request, res: Resp) => {
    const key = req.params.key;
    if (typeof key !== 'string' ) {
        res.status(400).send({ error: 'Invalid key' });
    }else{
        if (dictionary[key] == null) {
            res.status(400).send({ error: 'Key not found!' });
        }else{
            res.send(`the value is: ${dictionary[key]}`)
        }
    }
});

app.get('/api/allValues', (req: Request, res: Resp) => {
    const result: string[] = []; 

    for (const [key, value] of Object.entries(dictionary)) {
        result.push(`${key}: ${value}`);
    }

    console.log(result.join(', ')); 
    res.send(result); 
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

