import { defineSupportCode } from 'cucumber';
import { browser, $, element, by, protractor, logging } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let taURL = 'http://localhost:4200/'; 
let testEmail = '';
let testPassword = '';

let testpsw1 = "valor_default1";
let testpsw2 = "valor_default2";

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

    if(testpsw1 !== testpsw2 || testpsw1.length < 8 || testpsw2.length < 8) await $("input[name='password']").sendKeys(testPassword);
    else await $("input[name='password']").sendKeys(testpsw1);

    await element(by.buttonText('Entrar')).click();
    await goToPage('account');
    await goToPage('confirm-delete');
    await $("input[name='email']").sendKeys(testEmail);

    if(testpsw1 !== testpsw2 || testpsw1.length < 8 || testpsw2.length < 8) await $("input[name='senha']").sendKeys(testPassword);
    else await $("input[name='senha']").sendKeys(testpsw1);

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

    // Já tem no login.ts
    // Given(/^não estou logado com nenhum usuário$/, async () => {
    //     await goToPage('');
    //     if ((await browser.getCurrentUrl()) !== taURL){
    //         await logOut();
    //     }
    // });

    Given(/^tem um usuário cadastrado com o e-mail "([^\"]*)" e senha "([^\"]*)"$/, async (email, senha) => {
        testEmail = <string>email;
        testPassword = <string>senha;
        await createUser(<string>email, <string>senha);
    });
    
    // Já tem no login.ts
    // Given(/^estou na página de "([^\"]*)"$/, async (page) => {
    //     await goToPage(<string>page);
    //     const curr_url = String(await browser.getCurrentUrl());
    //     await expect(curr_url === taURL + page).equal(true);
    // });

    // Já tem no login.ts
    // When(/^o campo de e-mail é preenchido por "([^\"]*)"$/, async (email) => {
    //     await $("input[name='email']").sendKeys(<string>email);
    // });

    When(/^confirmo o envio$/, async () => {
        await element(by.buttonText('Enviar')).click();
    });

    Then(/^aparece uma mensagem de confirmação do envio$/, async () => {
        await browser.driver.sleep(5000);
        await browser.waitForAngular();
        await expect(element(by.buttonText('Continuar')).isEnabled()).to.eventually.equal(true);
        await deleteUser();
    });

    When(/^decido voltar$/, async () => {
        await element(by.buttonText('Voltar')).click();
    });

    Then(/^eu vou para a página de "([^\"]*)"$/, async (page) => {
        const curr_url = String(await browser.getCurrentUrl());
        await expect(curr_url === taURL + page).equal(true);
    });

    Then(/^eu consigo ver uma mensagem de erro$/, async () => {
        await browser.driver.sleep(5000);
        await browser.waitForAngular();
        await expect($("div[name='errorMsg']").isPresent()).to.eventually.equal(true);
    });

    Then(/^eu continuo na página de "([^\"]*)"$/, async (page) => {
        const curr_url = String(await browser.getCurrentUrl());
        await expect(curr_url === taURL + page).equal(true);
    });

    Given(/^estou na página de "([^\"]*)" com email "([^\"]*)"$/, async (page, email) => {
        var page_adress: string = `${page}?email=${email}`;
        await goToPage(page_adress);
        const curr_url = String(await browser.getCurrentUrl());
        await expect(curr_url === taURL + page_adress).equal(true);
    });

    When(/^eu coloco a senha "([^\"]*)" no campo de "([^\"]*)"$/, async (senha, campo) => {
        if(campo === "psw1") testpsw1 = <string> senha;
        if(campo === "psw2") testpsw2 = <string> senha;
        await $("input[name=" + campo + "]").sendKeys(<string>senha);
    });

    When(/^eu confirmo a redefinição$/, async () => {
        await element(by.buttonText('Redefinir')).click();
    });

    Then(/^aparece uma mensagem de senha modificada com sucesso$/, async () => {
        await expect($("form[name='msg-success']").isPresent()).to.eventually.equal(true);
        await deleteUser();
    });

    Then(/^eu recebo uma notificação de erro$/, async () => {
        await expect($("span[name='errorMsg']").isPresent()).to.eventually.equal(true);
    });

    Then(/^eu permaneço na página de "([^\"]*)"$/, async (page) => {
        const curr_url = String(await browser.getCurrentUrl());
        var page_adress: string = `${page}?email=${testEmail}`;
        await expect(curr_url === taURL + page_adress).equal(true);
        await deleteUser();
    });

});