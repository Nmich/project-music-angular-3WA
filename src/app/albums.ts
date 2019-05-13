export class Album {
    id: string;
    ref: string;
    name: string;
    title: string;
    description: string;
    duration: number;
    status : string;
    url?: string;
    like?: string;
    tags?: Array<string>
}

export class List {
    id : string;
    list: Array<string>;
}

// Position.Down 0 et Position.Top 1 par défaut sur les enums (liste de constantes)
//  Position.Down "Down",  Position.Top "Top"
export enum Position {
    Down = "Down",
    Top = "Top"
}