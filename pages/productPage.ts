import { Page } from "@playwright/test";
import { productPageLocators } from "../locators/productPageLocators";
import { productsToCart } from "../test-data/products";

export class ProductPage {
  constructor(private page: Page) {}

  async logout() {
    await this.page.click(productPageLocators.settingIcon);
    await this.page.click(productPageLocators.logoutLink);
  }

  async openAboutPage() {
    await this.page.click(productPageLocators.settingIcon);
    await this.page.click(productPageLocators.aboutLink);
  }

  async validateAllProductsDisplayed() {
    const names = await this.page.locator(productPageLocators.productNames).allTextContents();
    const description = await this.page.locator(productPageLocators.productDescription).allTextContents();
    const prices = await this.page.locator(productPageLocators.productPrices).allTextContents();
    const buttonCount = await this.page.locator(productPageLocators.addToCartButton).count();

    if (names.length === 0) {
      throw new Error("No Products Displayed");
    }
    if (
      names.length !== description.length ||
      names.length !== prices.length ||
      names.length !== buttonCount
    ) {
      throw new Error("Mismatch between the product details");
    }
  }

  async addFirstProductToCart() {
    await this.page
      .locator(productPageLocators.addToCartButton)
      .first()
      .click(); //clicks first matching addtocart button
  }

  async addAllProductsToCart() {
    const buttons = this.page.locator(productPageLocators.addToCartButton);
    const count = await buttons.count();

    for (let i: number = 0; i < count; i++) {
      await buttons.first().click(); //clicks first matching button,then after iteration 2nd button becomes 1stand cycle continues
      await this.page.waitForTimeout(500);
    }
  }

  async addSpecificProductsToCart(productsToCart: string[]) {
    for (let product of productsToCart) {
      //Take one item at a time from the productsToCart array and store it in the variable product


      await this.page
        .locator(productPageLocators.productCard)
        .filter({ hasText: product })
        .locator(productPageLocators.addToCartButton)
        .click();
    }
  }

  async filterByNameAtoZ() {
    await this.page.selectOption(productPageLocators.filterDropdown, "az"); //syntax=page.selectOption(locator, value);
  }
  async filterByNameZtoA() {
    await this.page.selectOption(productPageLocators.filterDropdown, "za");
  }
  async filterByPriceLowtoHigh() {
    await this.page.selectOption(productPageLocators.filterDropdown, "lohi");
  }
  async filterByPriceHightoLow() {
    await this.page.selectOption(productPageLocators.filterDropdown, "hilo");
  }
  async getProductNames() {
    return await this.page.locator(productPageLocators.productNames).allTextContents();
  }
  async getProductPrices() {
    const prices = await this.page.locator(productPageLocators.productPrices).allTextContents();
    return prices.map((price) => parseFloat(price.replace("$", ""))); //map() goes through every element of the prices array one by one.map() creates a new array:
    //parseFloat()=Now each string is converted into a number.
  }

  async clickOnCartLink() {
    await this.page.locator(productPageLocators.cartLink).click();
  }

  async getFirstProductDetails() {
    const name = await this.page.locator(productPageLocators.productNames).first().textContent();
    const description = await this.page.locator(productPageLocators.productDescription).first().textContent();
    const price = await this.page.locator(productPageLocators.productPrices).first().textContent();
    
    return {
      name: name?.trim(),
      description: description?.trim(),
      price: price?.trim(),
    };
  }

  async getAllProductsDetails() {
    const allNames = await this.page.locator(productPageLocators.productNames).allTextContents();
    const allDescriptions = await this.page.locator(productPageLocators.productDescription).allTextContents();
    const allPrices = await this.page.locator(productPageLocators.productPrices).allTextContents();
    
    const allProducts = allNames.map((_,i)=>
    ({
        name : allNames[i].trim(),
        description : allDescriptions[i].trim(),
        price : allPrices[i].trim(),
    })
    )
    return allProducts;
    //array of the object[{name,description,prices},{},{}]
    
  }

  async getSpecificProductDetails(productName: string[],) {

    const allNames = await this.page.locator(productPageLocators.productNames).allTextContents();
    const allDescriptions = await this.page.locator(productPageLocators.productDescription).allTextContents();
    const allPrices = await this.page.locator(productPageLocators.productPrices).allTextContents();
    
    const allProducts = allNames.map((_,i)=>
    ({
        name : allNames[i].trim(),
        description : allDescriptions[i].trim(),
        price : allPrices[i].trim(),
    })
    )
    return allProducts.filter(p=>productName.includes(p.name))
  }
}
