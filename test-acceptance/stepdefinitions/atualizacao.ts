import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by} from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

async function goTo(page: string) {
    await browser.driver.get(`http://localhost:4200/${page}`);
}

async function fill_input_field(field: string, value: string){
    console.log("Campo: " + field);
    console.log("value: " + value);
    await $("input[name='" + field + "']").sendKeys(value);
}

async function fill_textarea_field(field: string, value: string){
    console.log("Campo: " + field);
    console.log("value: " + value);
    await $("textarea[name='" + field + "']").sendKeys(value);
}

async function create_user(email: string, psw: string){
    await goTo('register-pf');

    await $("input[name='nome']").sendKeys('Testando');
    await $("input[name='cpf']").sendKeys('12341234123');
    await $("input[name='pais']").sendKeys('Brasil');
    await $("input[name='estado']").sendKeys('Pernambuco');
    await $("input[name='bairro']").sendKeys('Um lugar ai');
    await $("input[name='rua']").sendKeys('Rua 1');
    await $("input[name='numero']").sendKeys('666');
    await $("input[name='complemento']").sendKeys('ao lado da rua 2');
    await $("input[name='nome_exibicao']").sendKeys('Teste');
    await $("textarea[name='descricao']").sendKeys('Vamos ver se pega');
    await $("input[name='email']").sendKeys(<string>email);
    await $("input[name='senha']").sendKeys(<string>psw);
    await $("input[name='confirmar_senha']").sendKeys(<string>psw);
    await element(by.buttonText('CONTINUAR')).click();
    const curr_url = String(await browser.getCurrentUrl());
    await expect(curr_url === 'http://localhost:4200/finish-registration').equal(false);
}

async function delete_user(email: string, password: string) {
    await goTo('login');
    await $("input[name='email']").sendKeys(email);
    await $("input[name='password']").sendKeys(password);
    await element(by.buttonText('Entrar')).click();
    await goTo('account');
    await goTo('confirm-delete');
    await $("input[name='email']").sendKeys(email);
    await $("input[name='senha']").sendKeys(password);
    await element(by.buttonText('EXCLUIR CONTA')).click();
    await expect(window.alert).toHaveBeenCalledWith("Sua conta foi deletada com sucesso. Estamos tristes de te ver partir. Esperamos ver você de volta!");
}

defineSupportCode(function ({ Given, When, Then, Before, setDefaultTimeout }) {

    setDefaultTimeout(10 * 1000);

    // Given(/^um usuário que ja tem sua loja cadastrada está na página de atualizar conta$/)

    // Before(async () => {
    //   await goTo('login');
    //   if ((await browser.getCurrentUrl()) !== `http://localhost:4200/login`) {
    //     await $("svg[name='menu']").click();
    //     await $("a[name='signOut']").click();
    //   }
    // });

    

});