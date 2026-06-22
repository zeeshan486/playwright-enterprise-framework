import {test,expect} from "../fixtures/pageFixture"
import {users} from "../test-data/users"
test("user should login successfully",async({loginPage,dashboardPage})=>{

    await loginPage.navigate("/")
    await loginPage.login(users.standardUser.username,users.standardUser.password)
    await expect(dashboardPage.productsTitle).toHaveText("Products")

})