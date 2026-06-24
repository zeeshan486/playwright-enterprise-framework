import { BasePage } from "./BasePage";
import {Page,Locator} from "@playwright/test"
export class LoginPage extends BasePage{

    private readonly usernameTextbox : Locator;
    private readonly passwordTextbox : Locator;
    private readonly loginButton  : Locator;
    private readonly errorMessage : Locator;


    constructor(page:Page){
        super(page)
        this.usernameTextbox = page.getByTestId('username')
        this.passwordTextbox = page.getByTestId('password')
        this.loginButton = page.getByTestId('login-button')
        this.errorMessage = page.getByTestId("error")

    }

    async login(username:string,password:string):Promise<void>{
        await this.usernameTextbox.fill(username)
        await this.passwordTextbox.fill(password)
        await this.loginButton.click();
    }

    async getErrorMessage():Promise<string>{
        
        if(!(await this.errorMessage.isVisible())){
            return ""
        }
        return ((await this.errorMessage.textContent())?.trim()??"")
    }




}