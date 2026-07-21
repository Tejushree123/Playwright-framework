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

test.describe("CheckoutOverview Page Validation",()=>{              //test() = one test case //describe() = a folder/group of related test cases


let loginPage: LoginPage                                   /*We declare the variable first so it has a scope that's shared across all tests in the describe() block. Then, inside beforeEach(), we initialize it with a fresh LoginPage object before every test.*/
let productPage : ProductPage
let cartPage : CartPage
let checkoutPage : CheckoutPage
let checkoutOveriew : CheckoutOverviewPage

test.beforeEach(async({page})=>                            //before each means test under this block that is login test will execute before every test block i.e.before logout and aboutpage

{
loginPage = new LoginPage(page)
productPage = new ProductPage(page)
cartPage = new CartPage(page)
checkoutPage = new CheckoutPage(page)
checkoutOveriew = new CheckoutOverviewPage(page)

 await page.goto(BASE_URL);
 await loginPage.login(USERNAME,PASSWORD); //calling login method
await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")

await productPage.getSpecificProductDetails(productsToCart);
await productPage.clickOnCartLink();
await cartPage.clickCheckoutButton();
await checkoutPage.fillCheckoutDetails(checkoutData.firstName,checkoutData.lastName,checkoutData.postalCode);
await checkoutPage.clickOnContinue();
})

test("Validate checkout overview,UI and URL",async({page})=>{
    await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-two.html")
    const elements = await checkoutOveriew.getCheckoutOverviewElements();
    await expect(elements.pageInfo).toBeVisible();
    await expect(elements.cancelButton).toBeVisible();
    await expect(elements.finishButton).toBeVisible();
})

test("Validate cancel button functionality",async({page})=>{
    await checkoutOveriew.clickCancelButton();
    expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
})

test("validate item total calculator",async({page})=>{
    const overviewProducts = await checkoutOveriew.getOverviewProduct();
    //reduce() is an Array method that reduces all array elements into a single value.
    const calculatedTotal = overviewProducts.reduce((sum,{price})=>sum+parseFloat(price.replace("$","")),0);
    const UIitemTotal = await checkoutOveriew.getItemTotal();
    expect(calculatedTotal).toBe(UIitemTotal);

})

test("Validate final total(item total+tax)",async({page})=>{

    const itemTotal = await checkoutOveriew.getItemTotal();
    const tax = await checkoutOveriew.getTax();
    const finalTotal = await checkoutOveriew.getTotal();
    const expectedFinalTotal = await itemTotal + tax;

    expect(finalTotal).toBe(expectedFinalTotal);

})



})

