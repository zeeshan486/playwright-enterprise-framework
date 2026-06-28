export const checkoutUsers = {

    validUser: {
        firstName: "Zeeshan",
        lastName: "Ali",
        postalCode: "45256"
    },

    missingFirstName: {
        firstName: "",
        lastName: "Ali",
        postalCode: "45256"
    },

    missingLastName: {
        firstName: "Zeeshan",
        lastName: "",
        postalCode: "45256"
    },

    missingPostalCode: {
        firstName: "Zeeshan",
        lastName: "Ali",
        postalCode: ""
    },

    allFieldsEmpty: {
        firstName: "",
        lastName: "",
        postalCode: ""
    }

};