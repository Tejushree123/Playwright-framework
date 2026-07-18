import { Page } from "@playwright/test";
import { checkoutPageLocators } from "../locators/CheckoutPageLocators";

export class CheckoutPage{

constructor(private page :Page){}

async getCheckoutElements(){

    return{ 
        pageInfo:this.page.locator(checkoutPageLocators.pageInfo),
        cancelButton:this.page.locator(checkoutPageLocators.continueButton),
        continueButton:this.page.locator(checkoutPageLocators.continueButton)
    }
}

async fillCheckoutDetails(firstName:string,lastName:string,postalCode:string){

await this.page.fill(checkoutPageLocators.firstName,firstName);
await this.page.fill(checkoutPageLocators.lastName,lastName);
await this.page.fill(checkoutPageLocators.postalCode,postalCode);
//or
//await this.page.locator(checkoutPageLocators.firstName).fill(firstName);
//await this.page.locator(checkoutPageLocators.lastName).fill(lastName);
//await this.page.locator(checkoutPageLocators.postalCode).fill(postalCode);
}

async clickCancel(){
    await this.page.click(checkoutPageLocators.cancelButton);
    //await this.page.locator(checkoutPageLocators.cancelButton).click();
}

async clickOnContinue(){
    await this.page.locator(checkoutPageLocators.continueButton).click();
}

async getErrorMessage(){
return await this.page.locator(checkoutPageLocators.errorMsg).textContent()

}



}