import express from 'express';
import socketIO from 'socket.io';
import http from 'http';

export default class Server {
    private static _instance: Server;
    public app: express.Application;
    public port: number;

    public io: socketIO.Server;

    public httpServer: http.Server;
    private constructor(){
        this.app = express();
        this.port = Number(process.env.PORT) || 5000;
        this.httpServer = http.createServer(this.app);
        this.io = new socketIO.Server(
            this.httpServer,
            {
                cors: {
                    origin: true,
                    credentials: true
                }
            }
        );
    }

    public static get instance(): Server{
        return this._instance || (this._instance = new this());
    }

    start(callback: () => void): void {
        this.httpServer.listen(this.port, callback);
    }

    listenSockets(){
        this.io.on('connection', client => {
            
        });
    }
}