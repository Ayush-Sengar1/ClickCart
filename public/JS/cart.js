function changeQty(btn, delta) {
  const input = btn.parentElement.querySelector('input[name="productQuantity"]');
  let val = parseInt(input.value) || 1;
  val = Math.max(1, val + delta);
  input.value = val;
}
  document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const input = document.getElementById('category').value.trim().toLowerCase();
    const mapping = {
      tshirt: 'shirts',
      tshirts: 'shirts',
      shirts: 'shirts',
      jeans: 'jeans',
      footwear: 'footwear',
      appliance: 'appliances',
      appliances: 'appliances',
      mobile: 'mobiles',
      mobiles: 'mobiles',
      book: 'book',
      books: 'book',
      cosmetics: 'cosmetics',
      cosmetic: 'cosmetics',
      sports: 'sports',
      'sports item': 'sports',
      furniture: 'furniture',
      kitchen: 'kitchen',
      kitchenware: 'kitchen'
    };
    const route = mapping[input];
    if (route) {
      window.location.href = '/' + route;
    } else {
      alert('Category not found');
    }
  });