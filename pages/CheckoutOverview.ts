import { Page } from "@playwright/test";
import { checkoutOverviewLocators } from "../locators/checkoutOverviewLocators";

export class CheckoutOverviewPage{

    constructor(private page:Page){}

async getCheckoutOverviewElements(){

    return{
        pageInfo : this.page.locator(checkoutOverviewLocators.pageInfo),
        cancelButton : this.page.locator(checkoutOverviewLocators.cancelButton),
        finishButton : this.page.locator(checkoutOverviewLocators.finishButton),
    }
}

async getOverviewProduct(){
    const allNames = await this.page.locator(checkoutOverviewLocators.productNames).allTextContents();
        const allDescriptions = await this.page.locator(checkoutOverviewLocators.productDescription).allTextContents();
        const allPrices = await this.page.locator(checkoutOverviewLocators.productPrices).allTextContents();
        
        const allOverviewProducts = allNames.map((_,i)=>
        ({
            name : allNames[i].trim(),
            description : allDescriptions[i].trim(),
            price : allPrices[i].trim(),
        })
        )
        return allOverviewProducts;
}

async getItemTotal(){

    const text =await this.page.locator(checkoutOverviewLocators.itemtotal).textContent();
    return parseFloat(text!.replace("Item total: $","").trim());
    //?:value can be nill,Call this method only if the value is not null or undefined,!:I am sure this value is not null or undefined

}

async getTax(){

    const text =await this.page.locator(checkoutOverviewLocators.tax).textContent();
    return parseFloat(text!.replace("Tax: $","").trim());

}

async getTotal(){

    const text =await this.page.locator(checkoutOverviewLocators.total).textContent();
    return parseFloat(text!.replace("Total: $","").trim());

}

async clickCancelButton(){
    await this.page.locator(checkoutOverviewLocators.cancelButton).click();
}

async clickFinishlButton(){
    await this.page.locator(checkoutOverviewLocators.finishButton).click();
}

}
