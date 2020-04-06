export class Mail {
    public id: string;
    public sender: string;
    public subject: string;
    public body: string;
    public date: string;

    constructor(id: string, sender: string, body: string, subject: string, date: string){
        this.sender = sender;
        this.id = id;
        this.subject = subject;
        this.body = body;
        this.date = date;
    }
}
