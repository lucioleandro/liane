import { Schedule } from "./schedule";

export interface Discipline {
    name: string;
    code: string;
    semester: number;
    requiredDisciplines?: Discipline[];
    status?: string;
    schedules?: Schedule[];
}