const dropdownMenu = {
    data: function () {
        return {
            visibility: false,
            mainMenuOptions: {
                "About Us": "aboutUs",
                "Contact Us": "contactUs",
                "Tour List": "tourList"
            },
        };
    },
  template: `
   <b-navbar-nav>
      <b-nav-item class="ml-3" v-for = "(item, key) in mainMenuOptions" :key="item" :to="{ name: item }">{{key}}</b-nav-item>
  </b-navbar-nav>
  `
};

const Tour = {
  props: ['id'],
  template: `<div>
  <b-tabs class="text-center">
    <b-tab title="Gallery" active>
      <b-carousel id="carousel1"
                  style="text-shadow: 1px 1px 2px #333;"
                  controls
                  indicators
                  background="#ababab"
                  :interval="4000"
                  img-width="1024"
                  img-height="480"
                  v-model="slide"
                  @sliding-start="onSlideStart"
                  @sliding-end="onSlideEnd"
      >

        <b-carousel-slide v-for='item in imageLinks' :key="item" :img-src="item">
        </b-carousel-slide>
      </b-carousel>
  </b-tab>
    <b-tab title="Video tour" >
      <video  class="container" controls>
        <source :src="videoUrl" type="video/mp4">
      </video>
  </b-tab>
  </b-tabs>
    <ul class="list-group">
      <li class="list-group-item" v-for='(item, key) in currentCity.description' v-html="key + ': ' + item"></li>
    </ul>
    <div class='contact' v-if="currentCity.description">Contact us <router-link :to="{ name: 'contactUs' }">here</router-link> if you are interested!</div>

  </div>`,
  data: function () {
    return {
      slide: 0,
      sliding: null,
      showVideo: false,
      images: {
        vienna: ["assets/img/vienna_1.jpg", "assets/img/vienna_2.jpg", "assets/img/vienna_3.jpg"],
        amsterdam: ["assets/img/amsterdam_1.jpg", "assets/img/amsterdam_2.jpg", "assets/img/amsterdam_3.jpg"],
        florence: ["assets/img/florence_1.jpg", "assets/img/florence_2.jpg", "assets/img/florence_3.jpg"]
      }
    };
  },
  mounted: function () {
    this.$store.dispatch ('fetchTour', this.id);
  },

  destroyed: function () {
    this.$store.commit('setCurrentTour', 
    {
      description: null,
    });
  },

  computed: {
    currentCity: function () {
      return this.$store.state.currentTour;
    },
    // ...mapGetters([
    //   'currentCity'
    // ])
    videoUrl: function () {
      return "assets/video/" + this.id + ".mp4";
    },
    imageLinks: function () {
      return this.images[this.id];
    }
  },
   methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    }
  }
};

const Landing = {
  template: `
    <div class="col align-self-center">
        <video playsinline autoplay muted loop id="video-background">
            <source src="assets/video/landing/cover.mp4" type="video/mp4" />Your browser does not support the video tag. I suggest you upgrade your browser.
            <source src="assets/video/landing/cover.webm" type="video/webm" />Your browser does not support the video tag. I suggest you upgrade your browser.
        </video>
        <div class="landing-container col align-self-center">
        <b-jumbotron header-level="4" header="Cheap Happiness" lead="Tour agency for you. Unforgettable journeys for affordable prices!" class="landing-info">
          <p></p>
          <b-btn variant="danger" :to="{ name: 'tourList' }" size="lg">Pick your trip now!</b-btn>
        </b-jumbotron>
        </div>
    </div>`,
};

const aboutUs = {
  template: `<div class="card">
    <div class="card-body">
      <h4 class="card-title">About us</h4>
      <p class="card-text">We are travel agancy 'Super tour for you'. Our company appeared in 1999 and was the first modern agency that organizes top class journeys. If you want to travel around the world safely and worry about nothing - contact 'Super tour for you' agency. Our team of processionals will organize the bext trip for you!</p>
    </div>
    <img class="card-img-bottom" src="assets/img/location.png" alt="Card image cap">
  </div>`
};

const contactUs = {
  template: `<div class="row  justify-content-center">
  <div class="col-12 col-md-6">
    <div v-if='formSubmited'>
      <div class="alert alert-success" role="alert">
        <h4 class="alert-heading">Thank you!</h4>
          <p>Your message has been sent. We will get back to you as soon as possible.</p>
      </div>
    </div>
    <b-form v-else @submit="onSubmit">
      <b-form-group id="exampleInputGroup1"
                    label="Email address:"
                    description="We'll never share your email with anyone else.">
        <b-form-input id="exampleInput1"
                      type="email"
                      v-model="form.email"
                      required
                      placeholder="Enter email">
        </b-form-input>
      </b-form-group>
      <b-form-group id="exampleInputGroup2" label="Your Name:">
        <b-form-input id="exampleInput2"
                      type="text"
                      v-model="form.name"
                      required
                      placeholder="Enter name">
        </b-form-input>
      </b-form-group>
      <b-form-group id="exampleInputGroup3" label="Priority:">
        <b-form-select id="exampleInput3"
                      :options="priority"
                      required
                      v-model="form.priority">
        </b-form-select>
      </b-form-group>
      <b-form-group>
       <b-form-textarea id="textarea1"
                     v-model="form.text"
                     placeholder="Enter something"
                     :rows="3"
                     :max-rows="6">
    </b-form-textarea>
    </b-form-group>

      <b-form-group id="exampleGroup4">
        <b-form-checkbox v-model="form.checked" id="exampleInput4">
          Send me a copy of my question
        </b-form-checkbox>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
    </div>
  </div>`,
  data () {
    return {
      formSubmited: false,
      form: {
        email: '',
        name: '',
        priority: null,
        checked: false,
        text: '',
      },
      priority: [
        { text: 'Select One', value: null },
        'Urgent', 'Critical', 'Normal', 'Minor'
      ],
      show: true
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault();
      this.formSubmited = true;
    },
  }
};

const tourList = {
  template: `<div class="d-flex flex-md-row flex-column justify-content-between align-items-center align-items-md-stretch">
      <b-card :title="city.title" v-for='city in toursInfo' :key="city.id"
              :img-src="images[city.id]"
              img-alt="Image"
              img-top
              tag="article"
              style="max-width: 20rem;"
              class="mb-2">
        <p class="card-text">
          {{city.description}}
        </p>
        <div slot="footer">
          <b-button :to='{ name: city.name, params: {id: city.id }}' variant="primary">Check the tour</b-button>
        </div>    
      </b-card>
  </div>`,
  data () {
    return {
      images: {
        vienna: 'assets/img/main/1.jpg',
        amsterdam: 'assets/img/main/2.jpg',
        florence: 'assets/img/main/3.jpg'
      },
    }
  },
  mounted: function () {
    this.$store.dispatch ('fetchTourList');
  },
  computed: {
    toursInfo: function () {
      return this.$store.state.tourList;
    }
  }
};

const myHeader = {
  components: {
    dropdownMenu,
  },
  template: `<b-navbar toggleable="md" type="dark" variant="info">
  <div class="container">

  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

  <b-navbar-brand :to="{ name: 'landing' }"><i class="fa fa-home"></i></b-navbar-brand>

  <b-collapse is-nav id="nav_collapse">

    <b-navbar-nav class="ml-auto">

      <dropdown-menu></dropdown-menu>
    </b-navbar-nav>

  </b-collapse>
  </div>
</b-navbar>`
};

const myFooter = {
  template: `<footer><hr>
    <div class="container">
      <address>&copy; All rights reserved 2017</address>
      <div class="social">
        <a href="https://github.com/" target="_blank"><i class="fa fa-github-alt"></i></a>
      </div>
    </div>
  </footer>`
}

var PulseLoader = VueSpinner.PulseLoader;

const Spinner = {
  components: {
    PulseLoader
  },
  template: `<pulse-loader :loading="showLoader" color="grey" size="20px" class="loader"></pulse-loader>`,
  computed: {
    showLoader: function () {
      return this.$store.state.showLoader;
    }
  }
}

const store = new Vuex.Store({
  state: {
    currentTour: {
      description: null,
    },
    tourList: [],
    showLoader: false
  },
  mutations: {
    setCurrentTour (state, tourInfo) {
      state.currentTour = tourInfo;
    },
    setTourList (state, tourList) {
      state.tourList = tourList;
    },
    setShowLoader (state, enabled) {
      state.showLoader = enabled;
    }
  },
  actions: {
    fetchTour ({ commit }, tourName) {
      commit('setShowLoader', true);
      Vue.http.get('https://demo2157898.mockable.io/tour/' + tourName).then(function (response) {
        commit('setCurrentTour', response.body);
        commit('setShowLoader', false);
      }, 
      function (response) {
        alert('An error occurred, please contact site administrator.');
        commit('setShowLoader', false);
      });
    },
    fetchTourList ({ commit }) {
      commit('setShowLoader', true);
      Vue.http.get('https://demo2157898.mockable.io/tourList').then(function (response) {
        commit('setTourList', response.body);
        commit('setShowLoader', false);
      }, 
      function (response) {
        alert('An error occurred, please contact site administrator.');
        commit('setShowLoader', false);
      });
    },
  },
  getters: {
    currentTour: function (state) {
      return state.currentTour;
    }
  }
})


const router = new VueRouter({
  routes: [
    { 
      path: '/tour/:id', 
      component: Tour, 
      props: true,
      name: 'tour',
    },
    { 
      path: '/', 
      component: Landing, 
      name: 'landing',
    },
    { 
      path: '/aboutUs', 
      component: aboutUs, 
      name: 'aboutUs',
    },
    { 
      path: '/contactUs', 
      component: contactUs, 
      name: 'contactUs',
    },
    { 
      path: '/tourList', 
      component: tourList, 
      name: 'tourList',
    }
  ]
});


const app = new Vue ( {
  router,
  store,
  components: {
    myHeader,
    myFooter,
    Spinner,
  },
  template: `<div class="d-flex flex-column main-wrapper">           
                <my-header>
                </my-header>
                <main class="container flex-grow">
                <spinner></spinner>
                <transition name="fade"><router-view></router-view></transition>
              </main>
              <my-footer>
              </my-footer>
            </div> `
 
}).$mount('#app');  