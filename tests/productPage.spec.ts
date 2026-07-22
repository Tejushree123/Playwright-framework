import {test ,expect} from "@playwright/test";
import { BASE_URL,USERNAME,PASSWORD } from "../utils/envConfig";
import { ProductPage } from "../pages/productPage";
import { LoginPage } from "../pages/LoginPage";
import { LoginLocators } from "../locators/LoginLocators";
import { productPageLocators } from "../locators/productPageLocators";
import { productsToCart } from "../test-data/products";

test.describe("Product Page Validation",()=>{              //test() = one test case //describe() = a folder/group of related test cases


let loginPage: LoginPage                                   /*We declare the variable first so it has a scope that's shared across all tests in the describe() block. Then, inside beforeEach(), we initialize it with a fresh LoginPage object before every test.*/
let productPage : ProductPage

test.beforeEach(async({page})=>                            //before each means test under this block that is login test will execute before every test block i.e.before logout and aboutpage

{
loginPage = new LoginPage(page)
productPage = new ProductPage(page)

 await page.goto(BASE_URL);
 await loginPage.login(USERNAME,PASSWORD); //calling login method
await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
})

test("@smoke @regression verify logout functionality",async({page})=>{
    await productPage.logout();
    await expect(page.locator(LoginLocators.loginButton)).toBeVisible;

    
})

test("@regression verify about page",async({page})=>{
await productPage.openAboutPage();
await expect(page.locator(productPageLocators.bookDemoLink)).toBeVisible;
await expect(page.locator(productPageLocators.tryItFreeButton)).toBeVisible;
await page.goBack();
await expect(page.locator(productPageLocators.settingIcon)).toBeVisible;

})

test("@smoke @regression validate product page",async({page})=>{

await productPage.validateAllProductsDisplayed();
await productPage.addFirstProductToCart();
await productPage.addAllProductsToCart();
})

test("@regression validate adding some or specific products to cart",async({page})=>{

  await productPage.addSpecificProductsToCart(productsToCart);  
})

test("@regression Filter By Name A to Z",async({page})=>{

  await productPage.filterByNameAtoZ();
  const names = await productPage.getProductNames();
  const sorted = [...names].sort();  //sort in ascending order //the three dots (...) create a copy of the names array.
  expect(names).toEqual(sorted);

})

test("@regression Filter By Name Z to A",async({page})=>{

  await productPage.filterByNameZtoA();
  const names = await productPage.getProductNames();
  const sorted = [...names].sort().reverse();  //sort in descending order
  expect(names).toEqual(sorted);
  
})

test("@regression Filter By Price Low to High",async({page})=>{

  await productPage.filterByPriceLowtoHigh();
   const prices=await productPage.getProductPrices();
   const sortedPrices = [...prices].sort((a,b)=>(a-b)); //for number we have to give to values i.e.a and b,and a-b will sort in ascending order
   expect(prices).toEqual(sortedPrices);

})

test("@regression Filter By Name High to Low",async({page})=>{

  await productPage.filterByPriceHightoLow();
   const prices=await productPage.getProductPrices();
   const sortedPrices = [...prices].sort((a,b)=>(b-a));
   expect(prices).toEqual(sortedPrices);
  
})



})