import { DBService} from "./../database/database";

describe("O serviço de banco de dados", () => {
    var db: DBService;
    var teste = {nome: "Jose", curso:"Astrofisica", faculdade:"USP", id:0}

    beforeAll(() => {
      process.stdout.write("database tests: ");
    });
    beforeEach(() => db = new DBService('teste'));
    afterAll(() => {
      console.log('\n')
    });
  
    function addObj(obj: any){
      db.add(obj);
    }
  
    function deleteObj(index: any) {
      db.delete(index);
    }

    it("esta inicialmente vazia", () => {
        expect(db.getIdCount()).toBe(0)
    })

    it("podemos adicionar objetos", () => {
        db.add(teste)
        teste['novo atributo'] = "abacate"
        db.add(teste);

        expect(db.getIdCount()).toBe(2);

        deleteObj(1);
        deleteObj(0);
    })

    it("podemos remover objetos", () =>{
        addObj(teste);
        db.delete(0);
        expect(db.getIdCount()).toBe(0)
    })
  
  })