import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
import { stringify } from 'querystring';
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

async function logOut(){
    await goTo('dashboard');
    await element(by.buttonText('Sair')).click();
}

async function login(email: string, senha:string){
    await goTo('login');
    if ((await browser.getCurrentUrl()) !== `http://localhost:4200/login`){
        await logOut();
    }
    await $("input[name='email']").sendKeys(<string>email);
    await $("input[name='password']").sendKeys(<string>senha);
    await element(by.buttonText('Entrar')).click();
    const curr_url = String(await browser.getCurrentUrl());
    await expect(curr_url === 'http://localhost:4200/dashboard').equal(true);
}

async function delete_user(email: string, senha: string) {
    await login(<string>email, <string> senha);
    await goTo('confirm-delete');
    await $("input[name='email']").sendKeys(<string>email);
    await $("input[name='senha']").sendKeys(<string>senha);
    await element(by.buttonText('EXCLUIR CONTA')).click();
    await browser.switchTo().alert().accept();
    const curr_url = String(await browser.getCurrentUrl());
    await expect(curr_url === 'http://localhost:4200/').equal(true);
}

async function create_user(email: string, psw: string, cpf: string){
    await goTo('register-pf');
    
    await $("input[name='nome']").sendKeys('Testando');
    await $("input[name='cpf']").sendKeys(<string>cpf);
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
    console.log("url atual dps de criar fornecedor: " + curr_url);
    await expect(curr_url == 'http://localhost:4200/finish-registration').equal(true);
}

var curr_email = "";
var curr_senha = "";

var TESTE_EMAIL = "roberval@gmail.com"
var TESTE_SENHA = "abacaxi123"

defineSupportCode(function ({ Given, When, Then, Before, setDefaultTimeout }) {

    setDefaultTimeout(10 * 1000);

    Given(/^um usuário que ainda não se cadastrou está na página final de cadastro como PJ$/, async()=>{
        await goTo('register-pj');
        await expect($("input[name='razao_social']").isPresent()).to.eventually.equal(true);
    })

    Given(/^um usuário que ainda não se cadastrou está na página final de cadastro como PF$/, async()=> {
        await goTo('register-pf');
        await expect($("input[name='nome']").isPresent()).to.eventually.equal(true);
    });

    Given(/^um usuário está na página final de cadastro como PF$/, async() => {
        await goTo('register-pf');
        await expect($("input[name='nome']").isPresent()).to.eventually.equal(true);
    });

    Given(/^o usuário preencheu o campo "([^\"]*)" como "([^\"]*)"$/, async(field, value)=> {
        if(field == "email"){
            curr_email = String(value);
        }
        else if(field == "senha"){
            curr_senha = String(value);
        }

        await expect($("input[name='" + String(field) +"']").isPresent()).to.eventually.equal(true);
        await fill_input_field(<string>field, <string>value);
    });

    Given(/^o usuário preencheu o campo descricao como "([^\"]*)"$/, async(value) => {
        await expect($("textarea[name='descricao']").isPresent()).to.eventually.equal(true);
        await fill_textarea_field("descricao", <string>value);
    });

    Given(/^o usuário preencheu o campo cpf como "([^\"]*)" que ja existe no banco de dados$/, async(value) => {
        await create_user(TESTE_EMAIL, TESTE_SENHA, <string>value);
        await goTo('register-pf');
        const curr_url = String(await browser.getCurrentUrl());
        console.log("TCHAMA: " + curr_url);
        await expect($("input[name='cpf']").isPresent()).to.eventually.equal(true);
        await fill_input_field("cpf", <string>value);
    });

    When(/^o usuário clicar no botão "([^\"]*)"$/, async(button)=>{
        await element(by.buttonText('CONTINUAR')).click();

    });

    Then(/^o usuário será direcionado para uma página de cadastro realizado com sucesso$/, async()=>{
        const curr_url = String(await browser.getCurrentUrl());
        await expect(curr_url == 'http://localhost:4200/finish-registration').equal(true);
        await delete_user(curr_email, curr_senha);
    });

    Then(/^o usuário nao será direcionado para uma página de cadastro realizado com sucesso$/, async()=>{
        await browser.switchTo().alert().accept();
        const curr_url = String(await browser.getCurrentUrl());
        await expect(curr_url == 'http://localhost:4200/finish-registration').equal(false);
        await delete_user(TESTE_EMAIL, TESTE_SENHA);
    });

    Then(/^ocorrera uma mensagem de erro de validacao por terem sido encontrados caracteres especiais$/, async()=>{
        await expect($("p[name='error_message']").isPresent()).to.eventually.equal(true);
        const curr_url = String(await browser.getCurrentUrl());
        await expect(curr_url == 'http://localhost:4200/finish-registration').equal(false);
    })

});