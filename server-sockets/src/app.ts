import * as express from 'express';
import {Socket} from 'socket.io';
import {Model} from "./classes/Model";

const PORT = process.env.PORT || 5000;
const app = express();
app.set('port', PORT);

const http = require('http').Server(app);
const io = require('socket.io')(http);

const models: any = {};

io.on("connection", (socket: Socket) => {
    console.log(`A new client connected. ID: ${socket.id}`);
    socket.emit('connected', { success: true });
    let training: number;
    socket.on('train', (inputSize: number, layerSizes: Array<number>) => {
        console.log(`Client ${socket.id} requesting training of model with input size ${inputSize}`);
        console.log('Starting model training...');
        if (!models[socket.id]) {
            models[socket.id] = new Model(inputSize, layerSizes);
        }
        training = setInterval(() => {
            socket.emit('epoch', {});
        });
    });

    socket.on('disconnect', () => {
        if (training) {
            console.log('Stopping training...');
            clearInterval(training);
        }
        delete models[socket.id];
        console.log(`A client disconnected. ID: ${socket.id}`);
    });
});

http.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});
