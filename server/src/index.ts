import * as express      from 'express';
import * as http         from 'http';
import { createClient }  from 'redis';
import * as session      from 'express-session';
import * as connectRedis from 'connect-redis';
import * as io           from 'socket.io';
import * as cookieParser from 'cookie-parser';
import * as bodyParser   from 'body-parser';
import { v4 as uuidv4 }  from 'uuid';
import { Todo }          from '@interfaces';

// Set up express instance
const app = express();
const server = http.createServer(app);

// Set up websocket instance
const socket = io(server);

// Set up redis store
const secret = 'redis-secret';
const redisClient = createClient();
const redisStore = connectRedis(session);

redisClient.on('error', (err) => {
    console.error('Redis error: ', err);
});

app.use(session({
    secret,
    name: '_fullStackTest',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    store: new redisStore({ host: 'localhost', port: 6379, client: redisClient, ttl: 86400 })
}));

// Express config
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser(secret));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

// Todo Handlers
const getTodos = (): Promise<any[] | any> => {
    return new Promise((resolve, reject) => {
        redisClient.lrange('todos', 0, -1, (err, todos) => {
            if(err) reject(err);
            resolve(todos.map(todo => JSON.parse(todo)));
        });
    });
};

const createTodo = async(todo: Todo): Promise<void> => {
    const id = uuidv4();
    todo.id = id;
    redisClient.rpush('todos', JSON.stringify(todo));
}


// Route handlers
app.get('/', async (req: express.Request, res: express.Response) => {
    try {
        const todos = await getTodos();
        res.json(todos);
    } catch(e) {
        res.statusCode = 500;
        res.send('Error fetching todos');
    }
});

app.post('/', async (req: express.Request, res: express.Response) => {
    try {
        if(!req.body?.text) {
            res.statusCode = 400;
            res.send('Todo must have a description');
        } else {
            const todo: Todo = req.body;
            await createTodo(todo);
            socket.emit('updated', req.sessionID);
            res.json('Todo added successfully');
        }
        
    } catch(e) {
        res.statusCode = 500;
        res.send(e);
    }
});


// HTTP & Socket Listeners
app.listen(3000, () => console.log('REST listening on port 3000'));

socket.on('connection', () => {
    console.log('A user connected');
});