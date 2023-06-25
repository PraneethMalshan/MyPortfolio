let customerIdAutoGenerator = 1;
$('#cusIdText').val("C00-00"+customerIdAutoGenerator);

getAllCustomers();

$("#bttn1").click(function () {
    if (checkAll()){
        saveCustomer();
    }else {
        alert("Error");
    }

});

$("#btnGetAll").click(function () {
    getAllCustomers();
});

function bindTrEvents(){
    $('#tblCustomer>tr').click(function(){

        let id = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let address = $(this).children().eq(2).text();
        let email = $(this).children().eq(3).text();

        $("#cusIdText").val(id);
        $("#cusNameText").val(name);
        $("#cusAddressText").val(address);
        $("#cusEmailText").val(email);
    })
}

$("#btnCusDelet").click(function (){
    let id = $("#cusIdText").val();

    let consent = confirm("Do you want to delete.?");
    if (consent) {
        let response = deleteCustomer(id);
        if (response){
            alert("Customer Deleted");
            clearCustomerInputFields();
            getAllCustomers();
        }else{
            alert("Customer Not Removed..!");
        }
    }
});

$("#btnCusUpdate").click(function (){
    let id = $("#cusIdText").val();
    updateCustomer(id);
    clearCustomerInputFields();
    $('#cusIdText').val("C00-00"+customerIdAutoGenerator);
});

$("#btnClear").click(function () {
    clearCustomerInputFields();
});

function saveCustomer() {
    let customerID = $("#cusIdText").val();
    if (searchCustomer(customerID.trim()) == undefined){
        let customerName = $("#cusNameText").val();
        let customerAddress = $("#cusAddressText").val();
        let customerEmail = $("#cusEmailText").val();

        let newCustomer = Object.assign({}, customer);
        newCustomer.id = customerID;
        newCustomer.name = customerName;
        newCustomer.address = customerAddress;
        newCustomer.email = customerEmail;

        /*let customerOb = {
            id: customerID,
            name: customerName,
            address: customerAddress,
            email: customerEmail
        }*/


        customerDB.push(newCustomer);
        clearCustomerInputFields();
        getAllCustomers();

        customerIdAutoGenerator++;
        $('#cusIdText').val("C00-00"+customerIdAutoGenerator);
        loadAllCustomersToCombo();

    }else {
        alert("Customer already exits.!");
        clearCustomerInputFields();
    }

}

function getAllCustomers(){
    $("#tblCustomer").empty();

    for (let i = 0; i < customerDB.length; i++) {
        let id = customerDB[i].id;
        let name = customerDB[i].name;
        let address = customerDB[i].address;
        let email = customerDB[i].email;

        let row = `<tr>
                     <td>${id}</td>
                     <td>${name}</td>
                     <td>${address}</td>
                     <td>${email}</td>
                    </tr>`;

        $("#tblCustomer").append(row);

        bindTrEvents();

    }
}


function deleteCustomer(id){
    for (let i = 0; i < customerDB.length; i++) {
        if (customerDB[i].id == id) {
            customerDB.splice(i,1);
            return true;
        }
    }
    return false;
}


function searchCustomer(id){
    return customerDB.find(function (customer){
        return  customer.id == id;
    });
}

function updateCustomer(id){
    if (searchCustomer(id) == undefined) {
        alert("No such Customer..please check the ID");
    }else{
        let consent= confirm("Do you really want to update this customer.?");
        if (consent) {
            let customer = searchCustomer(id);

            let customerName = $("#cusNameText").val();
            let customerAddress = $("#cusAddressText").val();
            let customerEmail = $("#cusEmailText").val();

            customer.name=customerName;
            customer.address=customerAddress;
            customer.email=customerEmail;

            getAllCustomers();
        }
    }
}
























