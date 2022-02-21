import {MessageOutlet,MessageType, PlainMessage} from 'src/types'

const DEFAULT_MESSAGE_TIMER = 10000;

export class Message 
{
    private timer;

    get outlet()
    {
        return this._description.outlet
    }

    get type()
    {
        return this._description.type
    }

    get message()
    {
        return this._description.message
    }

    constructor(
        public readonly id : number,
        private readonly _description : PlainMessage,
        private destroy: (id:number) => void  )
    {
        this.timer = setTimeout(
            this.close,
            DEFAULT_MESSAGE_TIMER
        )
    }
        
    close = () => 
    {
        this.destroy(this.id)
        clearTimeout(this.timer)
    }
}