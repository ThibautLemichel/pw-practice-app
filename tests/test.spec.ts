import {test, expect} from "@playwright/test";
import {faker} from '@faker-js/faker'

test('Fill form with checkbox and submit', async({page}) => {
    const emailValue = 'test@example.com';
    const passwordValue = 'password123';

    await page.goto("http://localhost:4200/pages/forms/layouts");
  
    // Remplir le champ email
    await page.fill('#exampleInputEmail1', emailValue);

    // Remplir le champ mot de passe
    await page.fill('#exampleInputPassword1', passwordValue);

    // Cocher la case à cocher
    await page.getByRole('checkbox', {name: 'Check me out'}).check({force: true});

    // Récupérer les valeurs des champs
    const filledEmail = await page.inputValue('#exampleInputEmail1');
    const filledPassword = await page.inputValue('#exampleInputPassword1');

    // Vérifier que les valeurs sont correctement remplies
    expect(filledEmail).toBe(emailValue);
    expect(filledPassword).toBe(passwordValue);

    // Cliquer sur le bouton Submit
    await page.locator('nb-card').filter({hasText: 'Basic formEmail'}).getByRole('button').click();

});

test('Check item in list', async({page}) => {
    await page.goto("http://localhost:4200/pages/iot-dashboard");

    const dropDownMenu = page.locator('ngx-header nb-select');
    await dropDownMenu.click();

    page.getByRole('list')
    page.getByRole('listitem')

    const optionLists = page.locator('nb-option-list nb-option');
    await expect(optionLists).toHaveText(["Light", "Dark", "Cosmic", "Corporate"]);
    await optionLists.filter({hasText: 'Cosmic'}).click();

    const header = page.locator('nb-layout-header');
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)');
})