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

async function erase_and_fill_input_field(field: string, value: string){
    await $("input[name='" + field + "']").clear()
    .then( () => {
        $("input[name='" + field + "']").sendKeys(value);
    });
    console.log("SHDFHASLIFUH AHHAHA\n");
    console.log($("input[name='" + field + "']").getText());
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

async function create_user_pf(email: string, psw: string, cpf: string){
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

async function create_user_pj(email: string, psw: string, cnpj: string){
    await goTo('register-pj');
    
    await $("input[name='razao_social']").sendKeys('Testando');
    await $("input[name='cnpj']").sendKeys(<string>cnpj);
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
    await expect(curr_url == 'http://localhost:4200/finish-registration').equal(true);
}

var aux_email = "";
var aux_cnpj = "02300800001234";

var TESTE_EMAIL = "roberval@gmail.com"
var TESTE_SENHA = "abacaxi123"
var TESTE_CNPJ = "00000000001234" 

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

    Given(/^um usuário que ja tem sua loja cadastrada está na página de atualizar conta$/, async()=>{
        await create_user_pj(TESTE_EMAIL, TESTE_SENHA, TESTE_CNPJ);
        await login(TESTE_EMAIL, TESTE_SENHA);
        await goTo('/update-account');
        const curr_url = String(await browser.getCurrentUrl());
        await expect(curr_url == 'http://localhost:4200/update-account').equal(true);
    });

    Given(/^o usuário havia preenchido que o campo "([^\"]*)" de sua loja tem o valor "([^\"]*)"$/, async(field, value) =>{
        await erase_and_fill_input_field(<string>field, <string>value);
    });

    Given(/^o usuario confirmou sua senha$/, async () => {
        await fill_input_field('confirmar_senha', TESTE_SENHA);
    });

    Given(/^o usuário havia preenchido que o campo email tem o valor "([^\"]*)" que ja existe no banco de dados do servidor$/, async(email)=>{
        await logOut();
        await create_user_pj(<string>email, TESTE_SENHA, aux_cnpj);
        aux_email = <string>email;
        await login(TESTE_EMAIL, TESTE_SENHA);
        await goTo('/update-account');
        const curr_url = String(await browser.getCurrentUrl());
        await expect(curr_url == 'http://localhost:4200/update-account').equal(true);
        await erase_and_fill_input_field('email', <string>email);
    });

    When(/^o usuário clicar no botão salvar$/, async ()=> {
        await element(by.buttonText('SALVAR')).click();
    });

    Then(/^sera exibida uma mensagem informando que a atualização foi realizada com sucesso$/, async () => {
        await browser.switchTo().alert().accept();
        const curr_url = String(await browser.getCurrentUrl());
        await expect(curr_url == 'http://localhost:4200/account').equal(true);
        await logOut();
        await delete_user(TESTE_EMAIL, TESTE_SENHA);
    });

    Then(/^será exibida uma mensagem de erro informando que a atualizacao nao foi realizada no sistema$/, async()=>{
        await browser.switchTo().alert().accept();
        const curr_url = String(await browser.getCurrentUrl());
        await expect(curr_url == 'http://localhost:4200/update-account').equal(true);
        await logOut();
        await delete_user(TESTE_EMAIL, TESTE_SENHA);
        await delete_user(aux_email, TESTE_SENHA);
    });

});