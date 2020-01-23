Vue.component('product-details', {
  props: {
    details: {
      type: Array,
      required: true
    }
  },
  template:
  `
  <div class="product-details">
    <h3>Details: </h3>
    <ul>
      <li v-for="detail in details">
        {{ detail }}
      </li>
    </ul>
  </div>
  `
});


Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template:
    `
    <div class="product">

      <div class="product-image">

        <a :href="imageLink">
          <img :src="image_src" :title="altText">
        </a>

      </div>

      <div class="product-info">

          <h1>{{ product_title }}</h1>
          <p v-if="instock">In Stock</p>
          <p v-else :class="{'cancel-the-text': !instock}">Out of Stock</p>

          <div class="box-on-sale">
            <p v-if="onSale" style="background: green;">On sale</p>
            <p v-else style="background: red;">Not for sale</p>
          </div>

          <p>User is premium: {{ premium }}</p>

          <product-details :details=details></product-details>

          <h3>Variants: </h3>
          <div v-for="variant in variants"
               class="color-box"
              :style="{background: variant.variantColor}"
              @mouseover="getSocksImgByColor(variant.variantColor)">
          </div>

          <h3>Sizes: </h3>
          <span v-for="size in sizes">{{ size }} </span>

          <div>
            <button
            @click="incrementCart"
            :disabled=!instock
            :class="{disabledButton: !instock}"
            >
            Add to Cart
            </button>

            <button
            @click="decrementCart"
            :class="{disabledButton: this.cart <= 0}"
            >
            Remove one from Cart
          </button>

          <div class="cart">
            <p>Cart ({{ cart }})</p>
          </div>
          </div>

      </div>

    </div>
    `
  ,
  data() {
    return {
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
    }
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


var app = new Vue({
  el: '#app',
  data: {
    premium: true
  }
});
