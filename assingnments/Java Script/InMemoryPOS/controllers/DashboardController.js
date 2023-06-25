initiateUI();

function initiateUI() {
    clearAll();
    $("#Dashboard").css("display", "block");
    setTheLastView();
}

function saveLastView(clickedID) {
    switch (clickedID) {
        case "Dashboard":
            localStorage.setItem("view", "HOME");
            break;
        case "Customer":
            localStorage.setItem("view", "CUSTOMER");
            break;
        case "Item":
            localStorage.setItem("view", "ITEM");
            break;
        case "PlaceOrder":
            localStorage.setItem("view", "PLACE_ORDER");
            break;
        case "OrderDetails":
            localStorage.setItem("view", "ORDER_DETAILS");
            break;
    }
}

function setTheLastView() {
    let view = localStorage.getItem("view");
    switch (view) {
        case "HOME":
            setView($("#Dashboard"));
            break;
        case "CUSTOMER":
            setView($("#Customer"));
            break;
        case "ITEM":
            setView($("#Item"));
            break;
        case "PLACE_ORDER":
            setView($("#PlaceOrder"));
            break;
        case "ORDER_DETAILS":
            setView($("#OrderDetails"));
            break;
        default:
            setView($("#Dashboard"))
    }
}

function clearAll() {
    $("#Dashboard, #Customer, #Item, #PlaceOrder, #OrderDetails").css('display', 'none');
}

function setView(viewOb) {
    clearAll();
    viewOb.css("display", "block");
    saveLastView(viewOb.get(0).id);
    console.log(viewOb.get(0).id);
}

$("#DashboardForm").click(function () {
    setView($("#Dashboard"));
});

$("#CustomerForm").click(function () {
    setView($("#Customer"));
});

$("#ItemForm").click(function () {
    setView($("#Item"));
});

$("#PlaceOrderForm").click(function () {
    setView($("#OrderDetails"));
});

$("#OrderDetailsform").click(function () {
    setView($("#PlaceOrder"));
});


