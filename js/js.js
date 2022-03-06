$(document).ready(function() {
    $('#tablPro').DataTable();
});


PrintTable = (el) => {

    let body = document.body.innerHTML;

    let x = document.getElementById(el).innerHTML;

    document.body.innerHTML = x;

    print();

    document.body.innerHTML = body;



};