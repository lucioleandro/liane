import { Schedule } from "./schedule";

export interface Discipline {
    name: string;
    code: string;
    semester: number;
    requiredsDiscipline: Discipline[];
    status: string;
    schedules: Schedule[];
}