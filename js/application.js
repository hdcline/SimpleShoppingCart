var getItemTotal = function (ele) {
  var price = parseFloat($(ele).find('.price span').text());

  //price = parseFloat(price);

  var quantity = parseFloat($(ele).find('.quantity input').val());
  // market value is shares times market price per share
  var itemTotal = price * quantity;
  $(ele).children('.item-total').html('$' + itemTotal);
  return itemTotal;
}

var sum = function (acc, x) { return acc + x; };

var updateTotal = function (subtract) {
  var itemTotals = [];
  $('tbody tr').each(function (i, ele) {
    var itemTotal = getItemTotal(ele);
    itemTotals.push(itemTotal);
  });
  var total = itemTotals.reduce(sum) - subtract;
  $('#total').html(total);
  return total;
}

$(document).ready(function () {
  updateTotal(0);

  //This is event propagation. It is so that html elements dynamically added to the DOM are passed the same event handlers.
  $(document).on('click', '.btn.cancel', function (event) {
    var subtract = $(this).parent().siblings('.price').children().text();
    console.log(subtract);
    updateTotal(subtract);
    //console.log(updateTotal);
    $(this).closest('tr').remove();
    // $(this).parent().parent().remove();
    // The above also works
  });

  var timeout;
  $(document).on('input', 'tr input', function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      updateTotal(0);
    }, 800);
  });
  //.on('input', function () {}) sets an handler function for the 'input' event, which is fired synchronously as the value of an input element changes.

  $('#addItem').on('submit', function (event) {
    event.preventDefault();
    var item = $(this).children('[name=item]').val();
    var price = $(this).children('[name=price]').val();
    var quantity = $(this).children('[name=quantity]').val();
    //console.log(name, shares, cost, marketPrice);
    $('tbody').append('<tr>' +
    '<td class="item">' + item + '</td>' +
    '<td class="price">$<span>' + price + '</span></td>' +
    '<td class="quantity"><input type="number" value="' + quantity + '" /></td>' +
    '<td class="item-total"></td>' +
    '<td><button class="btn btn-light btn-sm cancel">Cancel</button></td>' +
  '</tr>');

  updateTotal(0);
  $(this).children('[name=item]').val('');
  $(this).children('[name=price]').val('');
  $(this).children('[name=quantity]').val('');
  });
});
