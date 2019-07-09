import {Topic} from "../topics/topic";

export class Program {
    id: number;
    name: string;
    description: string;
    url: string;
    topic: Topic;  
    
    constructor(topic?:Topic){
        this.topic = topic;
    }

}