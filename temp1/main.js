var app = new Vue({
  el: '#app',
  data: {
    product: 'Socks',
    brand: 'Vue-Reebok',
    image_src: './images/vmSocks-green.jpg',
    altText: 'A pair of socks',
    imageLink: 'http://elitasoft.com',
    instock: true,
    onSale: true,
    details: ["80% cotton", "20% polyester", "Male"],
    variants: [
      {
        variantID: 1,
        variantColor: "green"
      },
      {
        variantID: 2,
        variantColor: "blue"
      }
    ],
    sizes: [
      "M", "L", "XL", "XXL"
    ],
    cart: 0
  },

  methods: {
    incrementCart() {
      this.cart += 1;
      if (this.cart >= 3) {
        this.instock = false;
      }
    },
    decrementCart() {
      if (this.cart > 0) {
        this.cart -= 1;
        this.instock = true;
      }
    },
    getSocksImgByColor: function(color) {
      if (color == 'green') {
        this.image_src = './images/vmSocks-green.jpg';
      } else {
        this.image_src = './images/vmSocks-blue.jpg';
      }
    }
  },
  computed: {
    product_title() {
       return this.brand + ' ' + this.product
     }
  }
});
