import {test,expect} from "../fixtures/pageFixture"
import {users} from "../test-data/users"
test.use({storageState: { cookies: [], origins: [] }})


test("TC-01 Successful Login",async({loginPage,inventoryPage})=>{

    await loginPage.navigate("/")
    await loginPage.login(users.standardUser.username,users.standardUser.password)
     expect(await inventoryPage.getProductsTitle()).toBe("Products")
    

})

test("TC-02 Locked User Login",async({loginPage})=>{

    await loginPage.navigate("/inventory.html");
    await loginPage.login(users.lockedOutUser.username,users.lockedOutUser.password)
    expect(await loginPage.getErrorMessage()).toBe("Epic sadface: Sorry, this user has been locked out.")


})

test("TC-03 Invalid Login",async({loginPage})=>{

    await loginPage.navigate("/");
    await loginPage.login(users.invalidUser.username,users.invalidUser.password)
    const errorMessage = await loginPage.getErrorMessage()
    expect(errorMessage).toBe("Epic sadface: Username and password do not match any user in this service")


})

test("TC-05 Protected Route Without Login", async ({loginPage,page}) => {

    await loginPage.accessProtectedInventory();

    await expect(page).toHaveURL("/");

});
