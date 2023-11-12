import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { Survey } from '../classes/survey';

export const router = Router();

const survey = new Survey("Prefered Color");

survey.addOption("Green");
survey.addOption("Blue");
survey.addOption("Pink");
survey.addOption("Red");
survey.addOption("Purple");
survey.addOption("Black");

router.post('/vote', (req: Request, res: Response) => {
    const id: number = Number(req.body.id);

    survey.plusOneVote(id);

    const server = Server.instance;

    server.io.emit('updated-votes', survey.optionValues);

    res.json(
        {
            ok: true,
            actualVotes: survey.optionValues
        }
    )
});

router.get('/survey', (req: Request, res: Response) =>{
    console.log('Survey petition');
    res.json(
        {
            ok: true,
            survey: survey.toArray()
        }
    );
});