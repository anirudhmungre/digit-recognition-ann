"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const Model_1 = require("./classes/Model");
const PORT = process.env.PORT || 5000;
const app = express();
app.set('port', PORT);
const http = require('http').Server(app);
const io = require('socket.io')(http);
const models = {};
io.on("connection", (socket) => {
    console.log(`A new client connected. ID: ${socket.id}`);
    socket.emit('connected', { success: true });
    let training;
    socket.on('train', (inputSize, layerSizes) => {
        console.log(`Client ${socket.id} requesting training of model with input size ${inputSize}`);
        console.log('Starting model training...');
        if (!models[socket.id]) {
            models[socket.id] = new Model_1.Model(inputSize, layerSizes);
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
//# sourceMappingURL=app.js.map