import {test ,expect} from "@playwright/test";
import { BASE_URL,USERNAME,PASSWORD } from "../utils/envConfig";
import { ProductPage } from "../pages/productPage";
import { LoginPage } from "../pages/LoginPage";
import { LoginLocators } from "../locators/LoginLocators";
import { CartPage } from "../pages/CartPage";
import { checkoutData } from "../test-data/checkoutData";
import { CheckoutPage } from "../pages/CheckoutPage";
import { CheckoutOverviewPage } from "../pages/CheckoutOverview";
import { productsToCart } from "../test-data/products";
import { FinalPage } from "../pages/FinalPage";

test.describe("Final Page Validation",()=>{              //test() = one test case //describe() = a folder/group of related test cases


let loginPage: LoginPage                                   /*We declare the variable first so it has a scope that's shared across all tests in the describe() block. Then, inside beforeEach(), we initialize it with a fresh LoginPage object before every test.*/
let productPage : ProductPage
let cartPage : CartPage
let checkoutPage : CheckoutPage
let checkoutOveriew : CheckoutOverviewPage
let finalPage : FinalPage

test.beforeEach(async({page})=>                            //before each means test under this block that is login test will execute before every test block i.e.before logout and aboutpage

{
loginPage = new LoginPage(page)
productPage = new ProductPage(page)
cartPage = new CartPage(page)
checkoutPage = new CheckoutPage(page)
checkoutOveriew = new CheckoutOverviewPage(page)
finalPage = new FinalPage(page)

 await page.goto(BASE_URL);
 await loginPage.login(USERNAME,PASSWORD); //calling login method
await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")

await productPage.getSpecificProductDetails(productsToCart);
await productPage.clickOnCartLink();
await cartPage.clickCheckoutButton();
await checkoutPage.fillCheckoutDetails(checkoutData.firstName,checkoutData.lastName,checkoutData.postalCode);
await checkoutPage.clickOnContinue();
await checkoutOveriew.clickFinishlButton();
})

test("Valiadet final page UI and URL",async({page})=>{

    await expect(page).toHaveURL("https://www.saucedemo.com/checkout-complete.html");

    const elements = await finalPage.getPageElements();  //finalPage: is an object 

    await expect(elements.pageInfo).toBeVisible();
    await expect(elements.successMsg).toBeVisible();
    await expect(elements.backHomeBtn).toBeVisible();

})

test("Validate success message",async({page})=>{

    const message = await finalPage.getSuccessMessageText();
    expect(message).toBe("Thank you for your order!");
})

test("Validate back to home button functionality",async({page})=>{
await finalPage.clickOnBackToHomeButton();
expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

})


})

