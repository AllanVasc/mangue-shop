import { defineSupportCode } from 'cucumber';
import { browser, $, element, by, protractor } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let taURL = 'http://localhost:4200/'; 
let testEmail = '';
let testPassword = '';

async function goToPage(page: string){
    await browser.driver.get(taURL + page);
}

// Criar usuario de testes!
async function createUser(email: string, psw: string){
    await goToPage('register-pf');
    
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
}

// Deleta usuário que foi usado para os testes!
async function deleteUser() {
    await goToPage('login');
    if ((await browser.getCurrentUrl()) !== `http://localhost:4200/login`){
        await logOut();
    }
    await goToPage('login');
    await $("input[name='email']").sendKeys(testEmail);
    await $("input[name='password']").sendKeys(testPassword);
    await element(by.buttonText('Entrar')).click();
    await goToPage('account');
    await goToPage('confirm-delete');
    await $("input[name='email']").sendKeys(testEmail);
    await $("input[name='senha']").sendKeys(testPassword);
    await element(by.buttonText('EXCLUIR CONTA')).click();

    await browser.switchTo().alert().accept();
    const curr_url = String(await browser.getCurrentUrl());
    await expect(curr_url === 'http://localhost:4200/').equal(true);
}

async function logOut(){
    await goToPage('dashboard');
    await element(by.buttonText('Sair')).click();
}

defineSupportCode(function ({ Given, When, Then, Before, setDefaultTimeout}){
    setDefaultTimeout(10 * 1000);

    // Dando logout antes de iniciar os testes
    Before(async () => {
        await goToPage('');
        if ((await browser.getCurrentUrl()) !== taURL) {
            await logOut();
        }
    });
    
    Given(/^não estou logado com nenhum usuário$/, async () => {
        await goToPage('');
        if ((await browser.getCurrentUrl()) !== taURL){
            await logOut();
        }
    });

    Given(/^existe um usuário cadastrado com o e-mail "([^\"]*)" e senha "([^\"]*)"$/, async (email, senha) => {
        testEmail = <string>email;
        testPassword = <string>senha;
        await createUser(<string>email, <string>senha);
    });

    Given(/^estou na página de "([^\"]*)"$/, async (page) => {
        await goToPage(<string>page);
        const curr_url = String(await browser.getCurrentUrl());
        await expect(curr_url === taURL + page).equal(true);
    });

    // Given(/^estou na página de login$/, async () => {
    //     await goToPage('login');
    //     if ((await browser.getCurrentUrl()) !== `http://localhost:4200/login`){
    //         await logOut();
    //     }
    //     await goToPage('login');
    //     await expect($("form[name='login']").isPresent()).to.eventually.equal(true);
    // });

    When(/^o campo de e-mail é preenchido por "([^\"]*)"$/, async (email) => {
        await $("input[name='email']").sendKeys(<string>email);
    });

    When(/^o campo da senha é preenchido por "([^\"]*)"$/, async (senha) => {
        await $("input[name='password']").sendKeys(<string>senha);
    });

    When(/^tento entrar no sistema$/, async () => {
        await element(by.buttonText('Entrar')).click();
    });

    Then(/^eu sou encaminhado para a página de dashboard$/, async () => {
        const curr_url = String(await browser.getCurrentUrl());
        await expect(curr_url === 'http://localhost:4200/dashboard').equal(true);
        await deleteUser();
    });

    Then(/^eu recebo uma mensagem de erro$/, async () => {
        await expect($("div[name='errorMsg']").isPresent()).to.eventually.equal(true);
    });

    Then(/^eu continuo na página de login$/, async () => {
        await expect($("form[name='login']").isPresent()).to.eventually.equal(true);
        await deleteUser();
    });

    Then(/^não consigo pressionar o botão de entrar$/, async () => {
        await expect(element(by.buttonText('Entrar')).isEnabled()).to.eventually.equal(false);
    });

    Then(/^permaneço na página de login$/, async () => {
        const curr_url = String(await browser.getCurrentUrl());
        await expect(curr_url === 'http://localhost:4200/login').equal(true);
    });

});