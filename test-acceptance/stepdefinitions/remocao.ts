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

var curr_email = "";
var curr_senha = "";
var curr_cnpj = "02300800001234";
var curr_cpf = "";

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

    Given(/^o fornecedor de email "([^\"]*)", senha "([^\"]*)" e CPF "([^\"]*)" esta logado no sistema$/, async(email, senha, cpf)=>{
        await create_user_pf(<string> email, <string> senha, <string> cpf);
        await login(<string> email, <string> senha);
        curr_email = <string> email;
        curr_senha = <string> senha
    });

    Given(/^o usuário está na página de confirmar a remoção da conta$/, async()=> {
        await goTo('confirm-delete');
        const curr_url = String(await browser.getCurrentUrl());
        await expect(curr_url == 'http://localhost:4200/confirm-delete').equal(true);
    });

    Given(/^o usuário confirmou seu email como "([^\"]*)" e sua senha como "([^\"]*)"$/, async (email, senha)=> {
        await $("input[name='email']").sendKeys(<string>email);
        await $("input[name='senha']").sendKeys(<string>senha); 
    });

    When(/^o usuário clica no botão excluir conta$/, async()=>{
        await element(by.buttonText('EXCLUIR CONTA')).click();
    });

    Then(/^o usuário é redirecionado para a pagina inicial do sistema$/, async()=>{
        await browser.switchTo().alert().accept();
        const curr_url = String(await browser.getCurrentUrl());
        await expect(curr_url === 'http://localhost:4200/').equal(true);
    });

    Then(/^os dados do usuário são apagados do sistema$/, async()=>{
        goTo('/login');
        await $("input[name='email']").sendKeys(<string>curr_email);
        await $("input[name='password']").sendKeys(<string>curr_senha);
        await element(by.buttonText('Entrar')).click();
        await expect($("div[name='errorMsg']").isPresent()).to.eventually.equal(true);
    });

    Then(/^uma mensagem de erro vai aparecer informando que houve um erro na validacao das credenciais do fornecedor$/, async ()=>{
        await browser.switchTo().alert().accept();
    });

    Then(/^o usuário permanecerá na mesma página de confirmar remoção de conta$/, async ()=>{
        const curr_url = String(await browser.getCurrentUrl());
        await expect(curr_url == 'http://localhost:4200/confirm-delete').equal(true);
        await logOut();
        await delete_user(<string>curr_email, <string>curr_senha)
    });

});