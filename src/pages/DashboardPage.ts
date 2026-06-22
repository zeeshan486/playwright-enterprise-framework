import {Page,expect,Locator} from "@playwright/test"
import {BasePage} from "./BasePage"

export class DashboardPage extends BasePage{

    public productsTitle : Locator;


    constructor(page:Page){
        super(page)
        this.productsTitle =  page.getByTestId('title')
    }



}