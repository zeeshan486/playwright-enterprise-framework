import {test,expect} from "../fixtures/pageFixture"
import {users} from "../test-data/users"

test("TC-01 Successful Login",async({loginPage,inventoryPage})=>{

    await loginPage.navigate("/")
    await loginPage.login(users.standardUser.username,users.standardUser.password)
    await expect(inventoryPage.productsTitle).toHaveText("Products")
    

})

test("TC-02 Locked User Login",async({loginPage})=>{

    await loginPage.navigate("/");
    await loginPage.login(users.lockedOutUser.username,users.lockedOutUser.password)
    const errorMessage = await loginPage.getErrorMessage()
    expect(errorMessage).toBe("Epic sadface: Sorry, this user has been locked out.")


})

test("TC-03 Invalid Login",async({loginPage})=>{

    await loginPage.navigate("/");
    await loginPage.login(users.invaidUser.username,users.invaidUser.password)
    const errorMessage = await loginPage.getErrorMessage()
    expect(errorMessage).toBe("Epic sadface: Username and password do not match any user in this service")


})