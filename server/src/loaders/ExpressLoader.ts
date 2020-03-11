import {Application} from 'express';
import {MicroframeworkLoader, MicroframeworkSettings} from 'microframework-w3tec';
import {createExpressServer} from 'routing-controllers';

import {env} from '../env';
import logger from "../util/Log";
// Middleware
import {LogMiddleware} from "../middleware/LogMiddleware";
import {SecurityMiddleware} from "../middleware/SecurityMiddleware";
import {ErrorMiddleware} from "../middleware/ErrorMiddleware";
// Controllers
import {MainController} from "../api/Controllers/MainController";
import {ModelController} from "../api/Controllers/ModelController";
import {TrainingController} from "../api/Controllers/TrainingController";

export const ExpressLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    if (settings) {
        logger.info("[START] Loading Express");

        const expressApp: Application = createExpressServer({
            cors: true,
            classTransformer: true,
            routePrefix: env.app.routePrefix,
            defaultErrorHandler: false,
            controllers: [
                MainController,
                ModelController,
                TrainingController
            ],
            middlewares: [
                LogMiddleware,
                SecurityMiddleware,
                ErrorMiddleware
            ]
        });

        if (!env.isTest) {
            const server = expressApp
                .listen(env.app.port, () => logger.info(`[START] Server Listening ${env.app.port}`));
            settings.setData('express_server', server);
        }
        settings.setData('express_app', expressApp);
    }
};
