export type nominationId = number;
export interface INomination {
    id: nominationId;
    name: string,
    approves: number,
    vetoes: number
}