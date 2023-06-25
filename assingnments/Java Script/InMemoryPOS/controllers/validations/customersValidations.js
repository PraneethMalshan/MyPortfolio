const CUS_ID_REGEX = /^(C00-)[0-9]{3}$/;
const CUS_NAME_REGEX = /^[A-Za-z ]{5,}$/;
const CUS_ADDRESS_REGEX = /^[A-Za-z0-9 ]{8,}$/;
// const CUS_EMAIL_REGEX = /^[0-9]{2,}([.][0-9]{2})?$/;
const CUS_EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

let c_vArray = new Array();
c_vArray.push({field: $("#cusIdText"), regEx: CUS_ID_REGEX});
c_vArray.push({field: $("#cusNameText"), regEx: CUS_NAME_REGEX});
c_vArray.push({field: $("#cusAddressText"), regEx: CUS_ADDRESS_REGEX});
c_vArray.push({field: $("#cusEmailText"), regEx: CUS_EMAIL_REGEX});

function clearCustomerInputFields() {
    $("#cusIdText,#cusNameText,#cusAddressText,#cusEmailText").val("");
    $("#cusIdText,#cusNameText,#cusAddressText,#cusEmailText").css("border", "1px solid #ced4da");
    $("#cusIdText").focus();
    setBtn();
}
setBtn();

$("#cusIdText,#cusNameText,#cusAddressText,#cusEmailText").on("keydown keyup", function (e) {

    let indexNo = c_vArray.indexOf(c_vArray.find((c) => c.field.attr("id") == e.target.id));

    if (e.key == "Tab"){
        e.preventDefault();
    }

    checkValidations(c_vArray[indexNo]);

    setBtn();

    if (e.key == "Enter"){
        if (e.target.id != c_vArray[c_vArray.length - 1].field.attr("id")){
            if (checkValidations(c_vArray[indexNo])){
                c_vArray[indexNo + 1].field.focus();
            }
        }else {
            if (checkValidations(c_vArray[indexNo])){
                saveCustomer();
            }
        }
    }

});

function checkValidations(object) {
    if (object.regEx.test(object.field.val())){
        setBorder(true, object)
        return true;
    }
    setBorder(false, object)
    return false;
}

function setBorder(bol, ob) {
    if (!bol){
        if (ob.field.val().length >= 1){
            ob.field.css("border", "2px solid red")
        }else{
            ob.field.css("border", "1px solid #ced4da ");
        }
    }else {
        if (ob.field.val().length >= 1){
            ob.field.css("border", "2px solid green");
        }else {
            ob.field.css("border", "1px solid #ced4da");
        }
    }
}

function checkAll() {
    for (let i = 0; i < c_vArray.length; i++){
        if (!checkValidations(c_vArray[i])) return false;
    }
    return true;
}

function setBtn() {
    $("#btnCusDelet").prop("disabled", true);
    $("#btnCusUpdate").prop("disabled", true);

    if (checkAll()){
        $("#bttn1").prop("disabled", false);
    }else {
        $("#bttn1").prop("disabled", true);
    }
    let id = $("#cusIdText").val();
    if (searchCustomer(id) == undefined){
        $("#btnCusDelet").prop("disabled", true);
        $("#btnCusUpdate").prop("disabled", true);
    } else {
        $("#btnCusDelet").prop("disabled", false);
        $("#btnCusUpdate").prop("disabled", false);
    }

}







