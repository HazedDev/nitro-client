import { RoomObjectUpdateMessage } from '../../../../../room/messages/RoomObjectUpdateMessage';
import { Nitro } from '../../../../Nitro';
import { ObjectDataUpdateMessage } from '../../../messages/ObjectDataUpdateMessage';
import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

export class FurnitureScoreLogic extends FurnitureMultiStateLogic
{
    private _score: number;
    private _scoreIncreaser: number;
    private _scoreTimer: number;

    constructor()
    {
        super();

        this._score             = 0;
        this._scoreIncreaser    = 50;
        this._scoreTimer        = 0;
    }

    public update(totalTimeRunning: number): void
    {
        super.update(totalTimeRunning);

        const currentScore = this.object.getState(0);

        if(currentScore !== this._score) this.object.setState(this._score, 0);

        // if((currentScore !== this._score) && (this.totalTimeRunning >= (this._scoreTimer + this._scoreIncreaser)))
        // {
        //     let difference    = delta - this._scoreTimer;
        //     let total         = difference / this._scoreIncreaser;
        //     let stepper       = 1;

        //     if(this._score < currentScore) stepper = -1;

        //     if(total > (stepper * (this._score - currentScore)))
        //     {
        //         total = (stepper * (this._score - currentScore));
        //     }

        //     this.object.setState(currentScore + (stepper * total));

        //     this._scoreTimer = (delta - (difference - (total * this._scoreIncreaser)));
        // }
    }

    public processUpdateMessage(message: RoomObjectUpdateMessage): void
    {
        if(message instanceof ObjectDataUpdateMessage) return this.updateScore(message.state);

        super.processUpdateMessage(message);
    }

    private updateScore(count: number): void
    {
        this._score = count;

        const currentScore = this.object.getState(0);

        if(this._score !== currentScore)
        {
            let difference = this._score - currentScore;

            if(difference < 0) difference = -Math.abs(difference);

            if((difference * 50) > 3000) this._scoreIncreaser = 3000 / difference;
            else this._scoreIncreaser = 50;

            this._scoreTimer = Nitro.instance.time + 0;
        }
    }
}