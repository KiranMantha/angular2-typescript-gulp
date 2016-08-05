export class CarModal {
    id: number = 0;
    name: string = "";
    type: string = "";
    company: string = "";
    constructor(id: number = 0, name: string = '', type: string = '', company: string = '') {
        this.id = id;
        this.name = name;
        this.type = type;
        this.company = company;
    }
}