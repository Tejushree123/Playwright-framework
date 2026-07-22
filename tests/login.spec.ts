import {test ,expect} from "@playwright/test";
import { LoginLocators } from "../locators/LoginLocators";
import { BASE_URL,USERNAME,PASSWORD } from "../utils/envConfig";
import { LoginPage } from "../pages/LoginPage";

test("@smoke @regression login to sauceDemo application with valid credentials",async({page})=>{

//create an object for loginpage
const loginPage=new LoginPage(page);

 await page.goto(BASE_URL);
 await loginPage.login(USERNAME,PASSWORD); //calling login method i.e.username becomes USERNAME and pulls value stored frm envconfig viz:standard_user
await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")

})