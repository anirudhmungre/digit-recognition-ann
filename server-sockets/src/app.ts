import * as express from 'express';
import {Socket} from 'socket.io';
import {Pool} from 'pg';
import {Model} from "./classes/Model";

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const db = new Pool({
    connectionString: process.env.APP_DB_URI
});
let trainingData: { input: Array<number>, output: Array<number> }[];
db.query('SELECT input, output FROM TrainingData;')
    .then((res: any) => {
        trainingData = res.rows.map((td: any) => {
            const outputArray: number[] = Array<number>(10).fill(0);
            outputArray[td.output] = 1;
            return {input: JSON.parse(td.input), output: outputArray}
        });
    })
    .catch(e => console.error(e.stack));

const PORT = process.env.APP_PORT || 5000;
const app = express();
app.set('port', PORT);

const http = require('http').Server(app);
const io = require('socket.io')(http);

const models: any = {};
const training: any = {};

io.on("connection", (socket: Socket) => {
    console.log(`A new client connected. ID: ${socket.id}`);
    socket.emit('connected', {success: true});

    socket.on('train', ({inputSize, layerSizes}) => {
        console.log(`Client ${socket.id} requesting training of model with input size ${inputSize}`);
        console.log('Starting model training...');
        if (!models[socket.id]) {
            models[socket.id] = new Model(inputSize, layerSizes);
        }
        training[socket.id] = setInterval(() => {
            let sumOfSquaredErrors: number = 0;
            trainingData.forEach(d => {
                models[socket.id].forwardpropagation(d.input);
                sumOfSquaredErrors += Math.pow(models[socket.id].error(d.output), 2);
                models[socket.id].backpropagation(d.output);
            });
            const data = {
                data: {
                    model: models[socket.id],
                    sumOfSquaredErrors: sumOfSquaredErrors
                },
                success: true
            };
            socket.emit('epoch', data);
        }, 0);
    });

    socket.on('pause', () => {
        if (training[socket.id]) {
            console.log(`A client paused the training. ID: ${socket.id}`);
            console.log('Pausing training...');
            clearInterval(training[socket.id]);
        }
    });

    socket.on('predict', (input: Array<number>) => {
        if (models[socket.id]) {
            models[socket.id].forwardpropagation(input);
            socket.emit('prediction', models[socket.id].prediction());
        }
    });

    socket.on('disconnect', () => {
        if (training[socket.id]) {
            console.log('Stopping training...');
            clearInterval(training[socket.id]);
        }
        delete models[socket.id];
        console.log(`A client disconnected. ID: ${socket.id}`);
    });
});

http.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});
