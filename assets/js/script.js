Vue.component("card-movie", {
  template: `<div><img :src="'https://image.tmdb.org/t/p/w500'+poster_path" alt="" class="poster"/>
              <div class="line1">
                <h4>{{title}}</h4>
                <img
                  src="./assets/img/fav.png"
                  alt="heart-fav"
                  class="heart"
                  @click="changefav(id)"
                />
              </div>
              `,

  props: ["title", "poster_path", "id"],
  // data() {
  //   return {
  //     isFav: true,
  //   };
  // },
  methods: {
    changefav: function (id) {
      // this.isFav = !this.isFav;
      this.$emit("changefav", id);
    },
  },
});
{
  /* <div class="line2">
                <five-stars
                  v-if="getStars(moovie.vote_average)==='five-stars'"
                ></five-stars>
                <fourth-stars
                  v-if="getStars(moovie.vote_average)==='fourth-stars'"
                ></fourth-stars>
                <three-stars
                  v-if="getStars(moovie.vote_average)==='three-stars'"
                ></three-stars>
                <two-stars
                  v-if="getStars(moovie.vote_average)==='two-stars'"
                ></two-stars>
                <one-star
                  v-if="getStars(moovie.vote_average)==='one-star'"
                ></one-star>
                <star v-if="getStars(moovie.vote_average)==='star'"></star>
                <img
                  src="./assets/img/fav.png"
                  alt="heart-fav"
                  class="heart"
                  @click="addFav(moovie.id)"
                />
              </div> */
}
Vue.component("star", {
  template: `<div>
  <span class="fas fa-star"></span>
    <span class="fas fa-star"></span>
    <span class="fas fa-star"></span>
    <span class="fas fa-star"></span>
    <span class="fas fa-star"></span>
    </div>`,
});
Vue.component("one-star", {
  template: `<div>
  <span class="fas fa-star checked"></span>
  <span class="fas fa-star"></span>
  <span class="fas fa-star"></span>
  <span class="fas fa-star"></span>
  <span class="fas fa-star"></span>
  </div>`,
});
Vue.component("two-stars", {
  template: `<div>
  <span class="fas fa-star checked"></span>
    <span class="fas fa-star checked"></span>
    <span class="fas fa-star"></span>
    <span class="fas fa-star"></span>
    <span class="fas fa-star"></span>
    </div>`,
});
Vue.component("three-stars", {
  template: `<div>
  <span class="fas fa-star checked"></span>
    <span class="fas fa-star checked"></span>
    <span class="fas fa-star checked"></span>
    <span class="fas fa-star"></span>
    <span class="fas fa-star"></span>
    </div>`,
});
Vue.component("fourth-stars", {
  template: `<div>
  <span class="fas fa-star checked"></span>
    <span class="fas fa-star checked"></span>
    <span class="fas fa-star checked"></span>
    <span class="fas fa-star checked"></span>
    <span class="fas fa-star"></span>
    </div>`,
});
Vue.component("five-stars", {
  template: `<div>
  <span class="fas fa-star checked"></span>
    <span class="fas fa-star checked"></span>
    <span class="fas fa-star checked"></span>
    <span class="fas fa-star checked"></span>
    <span class="fas fa-star checked"></span>
    </div>`,
});

new Vue({
  el: "#app",
  data: {
    listMostPopular: [],
    isActive: false,
    listSearch: [],
    listLastestMovie: [],
    name: "",
    storageId: [],
    data: [],
  },
  computed: {},
  methods: {
    getPopularMoovie: function () {
      axios
        .get(
          "https://api.themoviedb.org/3/movie/popular?api_key=2e394beba2303cc35e94f1c237eb5fd7&language=fr"
        )
        .then((response) => {
          for (let index = 0; index < 15; index++) {
            this.listMostPopular.push(response.data.results[index]);
          }
        })
        .finally(() => {
          $(".owl-carousel").owlCarousel({
            items: 1,
            center: true,
            // responsive: {
            //   600: {
            //     items: 3,
            //   },
            // },
          });
        });

      //   console.log(this.listMostPopular);
    },
    getLastestMovie: function () {
      axios
        .get(
          "https://api.themoviedb.org/3/movie/now_playing?api_key=2e394beba2303cc35e94f1c237eb5fd7&language=fr"
        )
        .then((response) => {
          console.log(response);
          for (let index = 0; index < 3; index++) {
            this.listLastestMovie.push(response.data.results[index]);
          }
        });

      console.log(this.listLastestMovie);
    },
    seekMovie: function () {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=2e394beba2303cc35e94f1c237eb5fd7&language=fr&query=${this.name}&page=1&include_adult=false`
        )
        .then((response) => {
          this.listSearch = response.data.results;
        });
    },
    getStars: function (voteAverage) {
      if (voteAverage / 2 > 4.5) {
        return "five-stars";
      } else if (voteAverage / 2 > 3.5) {
        return "fourth-stars";
      } else if (voteAverage / 2 > 2.5) {
        return "three-stars";
      } else if (voteAverage / 2 > 1.5) {
        return "two-stars";
      } else if (voteAverage / 2 > 0.5) {
        return "one-star";
      } else {
        return "star";
      }
    },
    returnSearch: function () {
      this.name = "";
      this.seekMovie();
    },
    addFav: function (id) {
      let storage = JSON.parse(localStorage.getItem("favMovie"));
      data = [];

      if (storage) {
        data = [...storage, id];
      }
      localStorage.setItem("favMovie", JSON.stringify(data));
    },
    getoverview: function (event) {
      event.target.nextSibling.nextSibling.style.display = "block";
    },
    hideoverview: function (event) {
      event.target.nextSibling.nextSibling.style.display = "none";
    },
  },

  mounted() {
    this.getPopularMoovie();
    window.addEventListener("resize", (event) => {
      if (window.innerWidth <= 570) {
        this.isActive = true;
      } else {
        this.isActive = false;
      }
    });
    this.getLastestMovie();
    if (localStorage.getItem("favMovie")) {
      this.storageId = JSON.parse(localStorage.getItem("favMovie"));
    }
  },
});

// header
let screen = document.querySelector("#Header");
let arrow1 = document.querySelector(".arrowRight");
console.log(arrow1);
let arrow2 = document.querySelector(".arrowLeft");
console.log(arrow2);
let title = document.querySelector("#title");
let texte = document.querySelector("#texte");
texte.textContent =
  " Jake Sully et Ney'tiri ont formé une famille et font tout pour rester aussi soudés que possible. Ils sont cependant contraints de quitter leur foyer et d'explorer les différentes régions encore mystérieuses de Pandora. Lorsqu'une ancienne menace refait surface, Jake va devoir mener une guerre difficile contre les humains.";

arrow1.addEventListener("click", function slide() {
  screen.style.backgroundImage = 'url("./assets/img/spidermanfd.jpg")';
  title.textContent = "SPIDERMAN";
  texte.textContent =
    " Orphelin, Peter Parker est élevé par sa tante May et son oncle Ben dans le quartier Queens de New York. Tout en poursuivant ses études à luniversité, il trouve un emploi de photographe au journal Daily Bugle. Il partage son appartement avec Harry Osborn, son meilleur ami, et rêve de séduire la belle Mary Jane.";
});
arrow2.addEventListener("click", function slide2() {
  screen.style.backgroundImage = 'url("./assets/img/Group.png")';
  title.textContent = "AVATAR II";
  texte.textContent =
    " Jake Sully et Ney'tiri ont formé une famille et font tout pour rester aussi soudés que possible. Ils sont cependant contraints de quitter leur foyer et d'explorer les différentes régions encore mystérieuses de Pandora. Lorsqu'une ancienne menace refait surface, Jake va devoir mener une guerre difficile contre les humains.";
});
