import { Page } from "@playwright/test";
import { finalPageLocators } from "../locators/FinalPageLocators";

export class FinalPage{

constructor(private page:Page){}

async getPageElements(){
return{
    pageInfo : this.page.locator(finalPageLocators.pageInfo),
    successMsg : this.page.locator(finalPageLocators.successMessage),
    backHomeBtn : this.page.locator(finalPageLocators.backHomeButton),
}
}

async getSuccessMessageText(){

    const text = this.page.locator(finalPageLocators.successMessage).textContent();
    return text;
}

async clickOnBackToHomeButton(){
    await this.page.locator(finalPageLocators.backHomeButton).click();
}
}