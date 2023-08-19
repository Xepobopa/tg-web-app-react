import {Subject} from "./enum/subject";
import {Abstract} from "./abstract";

export interface Homework extends Abstract {
    title: string;
    subject: Subject;
    date: Date;
    files: Array<string>
}
