//Declaration

let ddlcategorys = document.getElementById('ddlcategory');
let product = document.getElementById('product');
let quntity = document.getElementById('quntity');
let price = document.getElementById('price');
let descount = document.getElementById('descount');
let total = document.getElementById('total');
let btnSave = document.getElementById('btnSave');
let btnRestPro = document.getElementById('btnRestPro');
let bodyProduct = document.getElementById('bodyProduct');
let countpro = document.getElementById('countpro');

let btnStatus = 'Create';
let proId;


let UrlPro = 'http://192.168.1.2/api/Products';

//GetTotal
GetTotal = () => {

    if (price.value != 0) {

        let getTotal = (quntity.value * price.value) - descount.value;
        total.value = getTotal;
        total.className.replace = 'form-control bg-danger text-center';
        total.className = 'form-control bg-success text-center';


    } else {
        total.value = 0;
        total.className.replace = 'form-control bg-success text-center';
        total.className = 'form-control bg-danger text-center';
    }


};


//Save
SaveProduct = () => {

    let objProduct = {

        categoryId: ddlcategorys.value,
        name: product.value,
        quntity: quntity.value,
        price: price.value,
        descount: descount.value,
        total: total.value
    };

    let data = JSON.stringify(objProduct);

    if (btnStatus == 'Create') {
        Helper.AjaxCallPost(UrlPro, data, (data) => {

            if (data != null) {

                toastr.success('Save the New Product' + " " + data.name, 'Successfuly');
                RestProduct();
                ShowTable();
                CountProduct();

            } else {

                toastr.error(`Not Save the Product  ${data.name}`, 'Error');

            }

        });
    } else {
        Helper.AjaxCallPut(`${UrlPro}/${proId}`, data, (data) => {

            if (data != null) {

                toastr.warning('Edit the  Product' + " " + data.name, 'Successfuly');
                RestProduct();
                ShowTable();
                CountProduct();

            } else {

                toastr.error(`Not Save the Product  ${data.name}`, 'Error');

            }

        });
    }


};



//Rest

RestProduct = () => {
    ddlcategorys.value = '';
    product.value = '';
    price.value = 0;
    quntity.value = 0;
    descount.value = 0;
    total.value = 0;

    total.className.replace = 'form-control bg-success text-center';
    total.className = 'form-control bg-danger text-center';
};

//Show Table

ShowTable = () => {

    let TableProduct = '';

    Helper.AjaxCallGet(UrlPro, (data) => {

        data.forEach(data => {

            TableProduct += `
            <tr>
            <td>${data.id}</td>
            <td>${data.category.name}</td>
            <td>${data.name}</td>
            <td>${data.quntity}</td>
            <td>${data.price}</td>
            <td>${data.descount}</td>
            <td>${data.total}</td>
            <td>
                <button class="btn btn-info" onclick="EditProduct(${data.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger" onclick="DeleteProduct(${data.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>

        </tr>
            `;

        });
        bodyProduct.innerHTML = TableProduct;
    });

};


//Count

CountProduct = () => {

    Helper.AjaxCallGet(UrlPro, (data) => {

        if (data != null) {
            countpro.innerHTML = `-ToalPro (${data.length})`;
        }
    });

};


//Edit

EditProduct = (id) => {

    Helper.AjaxCallGet(`${UrlPro}/${id}`, (data) => {

        if (data != null) {
            ddlcategorys.value = data.categoryId;
            product.value = data.name;
            quntity.value = data.quntity;
            price.value = data.price;
            descount.value = data.descount;
            total.value = data.total;
            btnSave.className.replace = 'btn btn-success w-25';
            btnSave.className = 'btn btn-primary w-25';

            btnStatus = 'Edit';
            proId = id;
        };

    });

};



//Delete

DeleteProduct = (id) => {

    if (confirm('Are You Sur From Deleted') == true) {

        Helper.AjaxCallDelete(`${UrlPro}/${id}`, (data) => {
            if (data != null) {
                ShowTable();
                CountProduct();
                toastr.error('Delete the Category is Name  ' + data.name, 'Deleted');
            }

        });
    }

};


//Print

//Validation


//Event Run Time
price.addEventListener('keyup', GetTotal);
quntity.addEventListener('keyup', GetTotal);
descount.addEventListener('keyup', GetTotal);

price.addEventListener('change', GetTotal);
quntity.addEventListener('change', GetTotal);
descount.addEventListener('change', GetTotal);

btnSave.addEventListener('click', SaveProduct);
btnRestPro.addEventListener('click', RestProduct);



$(document).ready(() => {
    ShowTable();
    CountProduct();
});