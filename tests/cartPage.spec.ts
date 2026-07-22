import {test ,expect} from "@playwright/test";
import { BASE_URL,USERNAME,PASSWORD } from "../utils/envConfig";
import { ProductPage } from "../pages/productPage";
import { LoginPage } from "../pages/LoginPage";
import { LoginLocators } from "../locators/LoginLocators";
import { productPageLocators } from "../locators/productPageLocators";
import { productsToCart } from "../test-data/products";
import { CartPage } from "../pages/CartPage";

test.describe("Cart Page Validation",()=>{              //test() = one test case //describe() = a folder/group of related test cases


let loginPage: LoginPage                                   /*We declare the variable first so it has a scope that's shared across all tests in the describe() block. Then, inside beforeEach(), we initialize it with a fresh LoginPage object before every test.*/
let productPage : ProductPage
let cartPage : CartPage

test.beforeEach(async({page})=>                            //before each means test under this block that is login test will execute before every test block i.e.before logout and aboutpage

{
loginPage = new LoginPage(page)
productPage = new ProductPage(page)
cartPage = new CartPage(page)

 await page.goto(BASE_URL);
 await loginPage.login(USERNAME,PASSWORD); //calling login method
await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
})

test("@sanity @regression Validate cart page URL and UI elements",async({page})=>{

    await productPage.addFirstProductToCart();
    await productPage.clickOnCartLink();
    await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
    const ui=await cartPage.getCartPageElements();
    expect((ui).cartTitle).toBeVisible();
    expect((ui).shoppingCart).toBeVisible();
    expect ((ui).checkOut).toBeVisible();
})

test("@regression Continue shopping functionality",async({page})=>{
    await productPage.addFirstProductToCart();
    await productPage.clickOnCartLink();
    await cartPage.clickOnContinueShopping();
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

})

test("@smoke @regressionvalidate first product added to the cart",async({page})=>{

    const firstproduct= await productPage.getFirstProductDetails();
    await productPage.addFirstProductToCart();
    await productPage.clickOnCartLink();
    const cartproducts =await cartPage.getCartProducts();
    expect(cartproducts[0]).toEqual(firstproduct);    //[0]-first product from cart array

})

test("@regression validate all products added to the cart",async({page})=>{

    const allProductDetails = await productPage.getAllProductsDetails();
    await productPage.addAllProductsToCart();
    await productPage.clickOnCartLink();
    const cartproducts=await cartPage.getCartProducts();

    expect(cartproducts).toEqual(allProductDetails);
    
})

test("@regression validate specific products added to the cart",async({page})=>{

    const specificproducts=await productPage.getSpecificProductDetails(productsToCart)
    await productPage.addSpecificProductsToCart(productsToCart);
    await productPage.clickOnCartLink();
     const cartproducts=await cartPage.getCartProducts();

    expect(cartproducts).toEqual(specificproducts);

})

test("@regression valiadte remove button functionality",async({page})=>{
await productPage.addAllProductsToCart();
await productPage.clickOnCartLink();

const initialproducts=await cartPage.getCartProducts();
expect(initialproducts.length).toBeGreaterThan(0);

await cartPage.removeFirstProduct();

const updatedcartproducta=await cartPage.getCartProducts();
expect(updatedcartproducta.length).toBe(initialproducts.length-1);
})





})

