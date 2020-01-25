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

Vue.component('product-add-review-box', {
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      errors: []
    }
  },
  template:
  `
  <form class="review-form" @submit.prevent="submitReview">
    <div class="container-product-add-review-box">
      <h3>Add review for product</h3>
      <p>
        <label for="name">Name:</label>
        <input name="name" id="name" v-model="name">
      </p>

      <p>
        <label for="review">Review:</label>
        <textarea name="review" id="review" v-model="review"></textarea>
      </p>

      <p>
        <label for="rating">Rating:</label>
        <select name="rating" id="rating" v-model="rating">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </p>

      <p>
        <button>Submit</button>
      </p>

    </div>
  </form>
  `,
  methods: {
    submitReview() {

      //if (name.)
      let productReview = {
        name: this.name,
        review: this.review,
        rating: this.rating
      }

      if (!this.name) this.errors.push('Name required');
      if (!this.review) this.errors.push('Review required');
      if (!this.rating) this.errors.push('Rating required');

      if (!this.errors.length) {

        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating
        }

        this.$emit('submitted-review', productReview);
        this.name=null,
        this.review=null,
        this.rating=null
      }

      //alert('submit action');
    }
  }
});


Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true
    },
  },
  template:
    `
    <div class="product">
      <div class="row">

        <div class="col-xs-12 col-sm-6">
          <div class="product-image">
            <a :href="imageLink">
              <img :src="image" :title="altText">
            </a>
          </div>

          <div class="product-reviews">

            <h2>Reviews</h2>
            <div v-if="!reviews.length">
              <p>No reviews yet.</p>
            </div>
            <ul>
              <li v-for="review in reviews">
                <p>Name: {{ review.name }}</p>
                <p>Review: {{ review.review }}</p>
                <p>Rating: {{ review.rating }}</p>
              </li>
            </ul>

          </div>

          <product-add-review-box @submitted-review="addReview"></product-add-review-box>


        </div>

        <div class="col-xs-12 col-sm-6">
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
              <div v-for="(variant, index) in variants">
                  <div class="color-box"
                      :style="{background: variant.variantColor}"
                      @mouseover="updateProduct(index)">
                  </div>
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
                Remove from Cart
                </button>
              </div>

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
      imageLink: 'https://elitasoft.com',
      instock: true,
      onSale: true,
      selectedVariant: 0,
      details: ["80% cotton", "20% polyester", "Male"],
      variants: [
        {
          variantID: 1,
          variantColor: "green",
          variantImage: "./images/vmSocks-green.jpg"
        },
        {
          variantID: 2,
          variantColor: "blue",
          variantImage: "./images/vmSocks-blue.jpg"
        }
      ],
      sizes: [
        "M", "L", "XL", "XXL"
      ],
      reviews: []
      //cart: 0
    }
  },

  methods: {
    incrementCart() {
      //console.log(this.variants[this.selectedVariant].variantID);
      this.$emit('add-to-cart', this.variants[this.selectedVariant].variantID);
      // this.cart += 1;
      // if (this.cart >= 3) {
      //   this.instock = false;
      // }
    },
    decrementCart() {
      this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantID);
      // if (this.cart > 0) {
      //   this.cart -= 1;
      //   this.instock = true;
      // }
    },
    updateProduct(index) {
      this.selectedVariant = index;
    },
    addReview(productReview) {
      //alert('component wants to send out submitted review to the parent component');
      this.reviews.push(productReview);
    }
  },
  computed: {
    product_title() {
       return this.brand + ' ' + this.product
     },
     image() {
       return this.variants[this.selectedVariant].variantImage
     }
  }

});


var app = new Vue({
  el: '#app',
  data: {
    premium: true,
    cart: []
  },
  methods: {
    globalyAddToCart(id) {
      this.cart.push(id);
    },
    globalyRemoveFromCart(id) {
      for(var i = this.cart.length - 1; i >= 0; i--) {
        if (this.cart[i] === id) {
           this.cart.splice(i, 1);
           return;
        }
      }
    }
  }
});
