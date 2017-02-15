export class Post{

    constructor(t:string, b:string, uid: string) {
          this.title = t;
          this.body = b;
          this.userId = uid;
    }


    public title: string;
    public body: string;
    public userId: string;
    public id: string;


    toPostString(): string{
        return JSON.stringify(this);
    }

}