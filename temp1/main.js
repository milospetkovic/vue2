Vue.component('reviews-tabs', {
  template:
  `
  <div>
    <div>
      <span v-for="(tab, index) in tabs"
            :key="index"
            :class="{activeTab: selectedTab === index}"
            @click="selectedTab = index"
            class="tab">
            {{ tab }}
      </span>
    </div>
    <div>

      <div class="product-reviews" v-show="selectedTab === 0">

        <div v-if="!reviews.length">
          <p>No reviews yet.</p>
        </div>
        <ul>
          <li v-for="review in reviews">
            <p>Name: {{ review.name }}</p>
            <p>Review: {{ review.review }}</p>
            <p>Rating: {{ review.rating }}</p>
            <p>Recommend: {{ review.recommend }}</p>
          </li>
        </ul>

      </div>

      <product-add-review-box v-show="selectedTab === 1" @submitted-review="addReview"></product-add-review-box>

    </div>
  </div>
  `
  ,
  data() {
    return {
      tabs: ['Reviews', 'Add review'],
      selectedTab: 0,
      reviews: []
    }
  },
  methods: {
    addReview(productReview) {
      //alert('add review');
      //console.log(productReview);
      this.reviews.push(productReview);
      this.selectedTab = 0;
    }
  }
});


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
      recommend: null,
      errors: []
    }
  },
  template:
  `
  <form class="review-form" @submit.prevent="submitReview">
    <div class="container-product-add-review-box">

      <div v-if="errors.length" class="text-danger">
          <h6>Errors during submit:</h6>
          <ul>
            <li v-for="error in errors">{{ error }}</li>
          </ul>
      </div>

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
        <label for="recommend">Would you recommend this product:</label>
        <select name="recommend" id="recommend" v-model="recommend">
          <option value="yes">Yes</option>
          <option value="no">No</option>
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

      this.errors = [];

      if (!this.name) this.errors.push('Name required');
      if (!this.review) this.errors.push('Review required');
      if (!this.rating) this.errors.push('Rating required');
      if (!this.recommend) this.errors.push('Recommend required');

      if (!this.errors.length) {

        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          recommend: this.recommend
        }

        this.$emit('submitted-review', productReview);
        this.name=null,
        this.review=null,
        this.rating=null,
        this.recommend=null,
        this.errors = []
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

          <reviews-tabs></reviews-tabs>

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
      ]
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
