import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
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


defineSupportCode(function ({ Given, When, Then, Before, setDefaultTimeout }) {

    setDefaultTimeout(10 * 1000);

    // Before(async () => {
    //   await goTo('login');
    //   if ((await browser.getCurrentUrl()) !== `http://localhost:4200/login`) {
    //     await $("svg[name='menu']").click();
    //     await $("a[name='signOut']").click();
    //   }
    // });

    Given(/^um usuário que ainda não se cadastrou está na página final de cadastro como PJ$/, async()=>{
        await goTo('register-pj');
        await expect($("input[name='razao_social']").isPresent()).to.eventually.equal(true);
    })

    Given(/^um usuário que ainda não se cadastrou está na página final de cadastro como PF$/, async()=> {
        await goTo('register-pf');
        await expect($("input[name='nome']").isPresent()).to.eventually.equal(true);
    });

    Given(/^o usuário preencheu o campo "([^\"]*)" como "([^\"]*)"$/, async(field, value)=> {
        await expect($("input[name='" + String(field) +"']").isPresent()).to.eventually.equal(true);
        await fill_input_field(<string>field, <string>value);
    });

    Given(/^o usuário preencheu o campo descricao como "([^\"]*)"$/, async(value) => {
        await expect($("textarea[name='descricao']").isPresent()).to.eventually.equal(true);
        await fill_textarea_field("descricao", <string>value);
    })

    When(/^o usuário clicar no botão "([^\"]*)"$/, async(button)=>{
        await element(by.buttonText('CONTINUAR')).click();

    });

    Then(/^o usuário será direcionado para uma página de cadastro realizado com sucesso$/, async()=>{
        const curr_url = String(await browser.getCurrentUrl());
        await expect(curr_url === 'http://localhost:4200/finish-registration').equal(true);
    });

    Then(/^o usuário nao será direcionado para uma página de cadastro realizado com sucesso$/, async()=>{
        const curr_url = String(await browser.getCurrentUrl());
        await expect(curr_url === 'http://localhost:4200/finish-registration').equal(false);
    });

});