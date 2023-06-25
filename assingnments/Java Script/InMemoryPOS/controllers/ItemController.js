let itemIdAutoGenerator = 1;
$('#itemCodeText').val("I00-00" + itemIdAutoGenerator);

getAllItems();

$("#buttn1").click(function () {
    if (checkAllItems()){
        saveItem();
    }

});

$("#GetItemAll").click(function () {
    getAllItems();
});

function bindTrEventsItem(){
    $('#tblItem>tr').click(function(){
        //get the selected rows data
        let code=$(this).children().eq(0).text();
        let name=$(this).children().eq(1).text();
        let qty=$(this).children().eq(2).text();
        let price=$(this).children().eq(3).text();

        $("#itemCodeText").val(code);
        $("#itemNameText").val(name);
        $("#itemQTYText").val(qty);
        $("#itemPriceText").val(price);
    })
}

$("#btnItemDelete").click(function (){
    let code= $("#itemCodeText").val();

    let consent= confirm("Do you want to delete.?");
    if (consent) {
        let response= deleteItem(code);
        if (response){
            alert("Item Deleted");
            clearItemInputFields();
            getAllItems();
        }else{
            alert("Item Not Removed..!");
        }
    }
});

$("#btnItemUpdate").click(function (){
    let code= $("#itemCodeText").val();
    updateItem(code);
    clearItemInputFields();
    $('#itemCodeText').val("I00-00" + itemIdAutoGenerator);

});

$("#btnItemClear").click(function () {
    clearItemInputFields();
});

function saveItem() {
    let itemCode = $("#itemCodeText").val();
    if (searchItem(itemCode.trim()) == undefined){
        let itemName = $("#itemNameText").val();
        let itemQty = $("#itemQTYText").val();
        let itemPrice = $("#itemPriceText").val();

        let newItem = Object.assign({}, item);
        newItem.code = itemCode;
        newItem.name = itemName;
        newItem.qty = itemQty;
        newItem.price = itemPrice;

        ItemDB.push(newItem);
        clearItemInputFields();
        getAllItems();

        itemIdAutoGenerator++;
        $('#itemCodeText').val("I00-00" + itemIdAutoGenerator);
        loadAllItemToCombo();


    } else {
        alert("Item alredy exits.!")
        clearItemInputFields();
    }

}

function getAllItems(){
    $("#tblItem").empty();

    for (let i = 0; i < ItemDB.length; i++) {
        let code = ItemDB[i].code;
        let name = ItemDB[i].name;
        let qty = ItemDB[i].qty;
        let price = ItemDB[i].price;

        let row=`<tr>
                    <td>${code}</td>
                    <td>${name}</td>
                    <td>${qty}</td>
                    <td>${price}</td>
                   </tr>`;
        $("#tblItem").append(row);

        bindTrEventsItem();

    }
}

function deleteItem(code){
    for (let i = 0; i < ItemDB.length; i++) {
        if (ItemDB[i].code == code) {
            ItemDB.splice(i,1);
            return true;
        }
    }
    return false;
}

function searchItem(code){
    return ItemDB.find(function (item){
        return  item.code==code;
    });
}


function updateItem(code){
    if (searchItem(code)==undefined) {
        alert("No such Customer..please check the CODE");
    }else{
        let consent= confirm("Do you really want to update this item.?");
        if (consent) {
            let item= searchItem(code);

            let itemName = $("#itemNameText").val();
            let itemQty = $("#itemQTYText").val();
            let itemPrice = $("#itemPriceText").val();

            item.name=itemName;
            item.qty=itemQty;
            item.price=itemPrice;

            getAllItems();
        }
    }

}

function clearItemInputFields() {
    $("#itemCodeText,#itemNameText,#itemQTYText,#itemPriceText").val("");
    $("#itemCodeText,#itemNameText,#itemQTYText,#itemPriceText").css("border", "1px solid #ced4da");
    $("#itemCodeText").focus();
    setItemBtn();

}