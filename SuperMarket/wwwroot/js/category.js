﻿var dataTable;

$(document).ready(function () {
    loadDataTable();
});

function loadDataTable() {
    dataTable = $('#tblData').DataTable({
        "ajax": {
            "url": "https://localhost:7050/Admin/Category/GetAll"
        },
        "columns": [
            { "data": "name", "width": "15%" },
            { "data": "id",
                "render": function (data) {
                    return `
                    <a href="/Admin/Category/Upsert/${data}" 
                    class="btn btn-primary mx-2">
                        <i class="bi bi-pencil-square"></i> Edit
                    </a>

                    <a onClick=Delete(${data}) class="btn btn-danger mx-2">
                        <i class="bi bi-trash"></i> Delete
                    </a> 
                    `
                },
                "width": "30%"
            }

        ]
    });
}


function Delete(_id) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            var _url = "https://localhost:7050/Admin/Category/Delete/" + _id;
            $.ajax({
                url: _url,
                type: "DELETE",
                success: function (data) {
                    if (data.success) {
                        dataTable.ajax.reload();
                        toastr.success(data.message);
                    }
                    else {
                        toastr.error(data.message);
                    }
                }
            });
        }
    })
}



