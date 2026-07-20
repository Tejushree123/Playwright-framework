import { LoginLocators } from "../locators/LoginLocators";
import { Page} from "@playwright/test";

export class LoginPage{
//constructor:special method inside the class and it runs automatically when we create an object for the class
//launch the page or browser tab/initialize the object
//opening the page once not for every method,and all the methods inside the login page will use that one page or browser
 constructor(private page:Page)
{
}

async login(username:string,password:string){
    await this.page.fill(LoginLocators.userNameInput,username);
    // or await this.page.locator(LoginLocators.userNameInput).fill(username);
    await this.page.fill(LoginLocators.passwordInput,password);
    await this.page.locator(LoginLocators.loginButton).click();
}

}

// QA-101 Login automation updated
// Rahul updated LoginPage
