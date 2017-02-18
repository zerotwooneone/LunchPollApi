import { INomination, nominationId } from './INomination';
export class NominationRepository {
    private nominations: { [id: number]: INomination };
    private nextId: number;

    constructor() {
        this.nominations = {};
        this.nextId = 0;
    }

    public getAll(): INomination[] {
        let keys = Object.keys(this.nominations);
        return keys.map((key) => this.nominations[key]);
    }

    public create(name: string): INomination {
        let id = this.nextId;
        this.nextId++;
        let nomination: INomination = {
            approves: 0,
            id: id,
            name: name,
            vetoes: 0
        }
        this.nominations[id] = nomination;
        return nomination;
    }

    public approve(id: nominationId): INomination {
        return this.modifyById(id, (n) => n.approves++);
    }

    public unapprove(id: nominationId): INomination {
        return this.modifyById(id, (n) => n.approves--);
    }

    public veto(id: nominationId): INomination {
        return this.modifyById(id, (n) => n.vetoes++);
    }

    public unveto(id: nominationId): INomination {
        return this.modifyById(id, (n) => n.vetoes--);
    }

    public clear(): INomination[] {
        this.nominations = {};
        return this.getAll();
    }

    private modifyById(id: nominationId, modifier: (nomination: INomination) => any): INomination {
        let nomination = this.nominations[id];
        modifier(nomination);
        return nomination;
    }
}