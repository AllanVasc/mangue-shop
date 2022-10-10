var fs = require("fs");

export class DBService {
    name: string;
    path: string;
    data: any;

    constructor(name: string) {
        this.name = name;
        this.path = __dirname + '/files/' + name + '.json';
        this.read();
    }

    read() {
        this.data = JSON.parse(
            fs.readFileSync(this.path, "utf8", (err: any) => {
                if (err) throw err;
            })
        );
    }

    write() {
        fs.writeFileSync(this.path, JSON.stringify(this.data), (err: any) => {
            if (err) throw err;
        });
    }

    getData() {
        return this.data[this.name];
    }

    add(data: any) {
        this.data[this.name].push(data);
        this.write();
    }

    delete(index: any) {
        this.data[this.name].splice(index, 1);
        this.write();
    }

    update(index: any, item: any) {
        this.data[this.name].splice(index, 1, item);
        this.write();
    }
}

exports.DBService = DBService;