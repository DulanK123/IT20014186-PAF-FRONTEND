$("#submitForm").submit(function (e) {
  e.preventDefault();
  var frm = $("#submitForm");
  var data = {};
  var that = this;
  $.each(this, function (i, v) {
    var input = $(v);
    data[input.attr("name")] = input.val();
    delete data["undefined"];
  });

  $.ajax({
    contentType: "application/json; charset=utf-8",
    type: frm.attr("method"),
    url: frm.attr("action"),
    dataType: 'json',
    data: JSON.stringify(data),
    // success: function (data) {
    //   alert(data);
    // },
    // error: function (data) {
    //   alert("error occured!!");
    //   console.log(data)
    // },
    complete: function (data) {
      loadCustomer('http://localhost:8080/ElectroGrid/rest/bills')
      alert('Bill Added Successfully!!')
      //form reset
      that.reset();
    }
  });
});

function loadCustomer(url) {
  $("tr:has(td)").remove();
  $.ajax({
    type: 'GET',
    url: url,
    dataType: 'json',
    success: function (response) {
      $.each(response, function (i, item) {
        var $tr = $('<tr  class="table-light">').append(
          $('<th>').text(item.units),
          $('<td>').text(item.tax),
          $('<td>').text(item.billid),
          $('<td>').text(item.amount),
          $('<td>').text(item.customerid),
          $('<td>').append('<ul class="flexList"><li><a href="customeredit.html?id=' + item.billId + '"><button><i class="far fa-pen"></i></button></a></li><li><button onClick="deleteitem(' + item.billId + ')"><i class="far fa-trash-alt"></i></button></li></ul>')
        )
          .appendTo('#tbody');
      });
    }
  });
}

function deleteitem(id) {
 if(confirm('Are You Sure You Want To Delete This Customer ?')){
    $.ajax({
    type: 'DELETE',
    url: 'http://localhost:8080/ElectroGrid/rest/bills/' + id,
    dataType: 'json',
    complete: function (response) {
      loadCustomer('http://localhost:8080/ElectroGrid/rest/bills')
    }
  });
  }
}
function getAUser(url) {
  let searchParams = new URLSearchParams(window.location.search)
  let id = searchParams.get('id')
  $.ajax({
    type: 'GET',
    url: url + '/' + id,
    dataType: 'json',
    success: function (item) {
      if (item.customerId == id) {
        $('#id').val(item.billId);
        $('#unit').val(item.unit);
        $('#tax').val(item.tax);
        $('#amount').val(item.amount);
        $('#cusid').val(item.cusid);
        
      }
    }
  })
}


$("#submitEditForm").submit(function (e) {
  e.preventDefault();
  var frm = $("#submitEditForm");
  var data = {};
  var that = this;
  $.each(this, function (i, v) {
    var input = $(v);
    data[input.attr("name")] = input.val();
    delete data["undefined"];
  });

  $.ajax({
    contentType: "application/json; charset=utf-8",
    type: frm.attr("method"),
    url: frm.attr("action") + '/' + $('#id').val(),
    dataType: 'json',
    data: JSON.stringify(data),
    complete: function (data) {
      alert('Bill Updated Successfully!!')
       window.location.replace("bill.html");
    }
  });
});