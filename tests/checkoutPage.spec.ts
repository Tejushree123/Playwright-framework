import {test ,expect} from "@playwright/test";
import { BASE_URL,USERNAME,PASSWORD } from "../utils/envConfig";
import { ProductPage } from "../pages/productPage";
import { LoginPage } from "../pages/LoginPage";
import { LoginLocators } from "../locators/LoginLocators";
import { CartPage } from "../pages/CartPage";
import { checkoutData } from "../test-data/checkoutData";
import { CheckoutPage } from "../pages/CheckoutPage";

test.describe("Checkout Page Validation",()=>{              //test() = one test case //describe() = a folder/group of related test cases


let loginPage: LoginPage                                   /*We declare the variable first so it has a scope that's shared across all tests in the describe() block. Then, inside beforeEach(), we initialize it with a fresh LoginPage object before every test.*/
let productPage : ProductPage
let cartPage : CartPage
let checkoutPage : CheckoutPage

test.beforeEach(async({page})=>                            //before each means test under this block that is login test will execute before every test block i.e.before logout and aboutpage

{
loginPage = new LoginPage(page)
productPage = new ProductPage(page)
cartPage = new CartPage(page)
checkoutPage = new CheckoutPage(page)

 await page.goto(BASE_URL);
 await loginPage.login(USERNAME,PASSWORD); //calling login method
await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")

await productPage.addFirstProductToCart();
await productPage.clickOnCartLink();
})

test("@sanity @regression validate checkoutPage UI elements and URL",async({page})=>{
await cartPage.clickCheckoutButton();
await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html");
const elements = await checkoutPage.getCheckoutElements();

expect(elements.pageInfo).toBeVisible();
expect(elements.cancelButton).toBeVisible();
expect(elements.continueButton).toBeVisible();

})

test("@sanity @regression validate cancel button functionality",async({page})=>{
    await cartPage.clickCheckoutButton();
    await checkoutPage.clickCancel();
    expect(page).toHaveURL("https://www.saucedemo.com/cart.html");

})
 test("@sanity @regression validate continue button",async({page})=>{

    await cartPage.clickCheckoutButton();
    await checkoutPage.fillCheckoutDetails(checkoutData.firstName,checkoutData.lastName,checkoutData.postalCode);
    await checkoutPage.clickOnContinue();
 })

 test("@regression Valiadet error message when continue without entering any data",async({page})=>{
    await cartPage.clickCheckoutButton();
    await checkoutPage.clickOnContinue();
    const error= await checkoutPage.getErrorMessage();
    expect(error).toBe("Error: First Name is required");
 })




})

