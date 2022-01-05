<template>
  <div class="map-container">
    <h2>Donere dit tøj</h2>
    <div class="zip-code-container">
      <p>Indtast postnummer</p>
      <input
        type="number"
        placeholder="fx. 2200"
        @keyup="getZipCode"
        v-model="zipCode"
      />
    </div>
    <div id="mapContainer" class="basemap"></div>
  </div>
</template>

<static-query>
query Container {
	container: allContainer(sortBy: "date") {
    edges {
      node {
        id
        add
        open
      }
    }}}
</static-query>

<script>
import mapboxgl from "mapbox-gl";
import axios from "axios";
import { mapActions } from "vuex";

export default {
  name: "BaseMap",
  data() {
    return {
      zipCode: 2200,
      accessToken:
        "pk.eyJ1IjoiYmFja3VyZGkiLCJhIjoiY2swZG0wYms2MDhwZTNjbjRkZ2I5bXprYSJ9.2zY5VTZ0IS1qlUsbyJ0weQ",
      map: {},
      markers: "",
      locations: [
        { add: "Hadsundvej 12E Rødovre", text: "Åben fra 10-14" },
        { add: "Baggesensgade 16 2200 Kbh", text: "Åbent fra 10-14" },
        { add: "Horsebakken 2, 2400 København NV.", text: "Åbent fra 10-14" },
        { add: "Heimdalsgade 39, 2200 København N.", text: "Åbent fra 10-14" },
        {
          add: "Gammel Køge Landevej 113, 2500 Valby",
          text: "Åbent fra 10-14",
        },
        { add: "Hejrevej 3, 2400 København NV", text: "Åbent fra 10-14" },
        { add: "Mimersgade 69, 2200 København N.", text: "Åbent fra 10-14" },
        { add: "Dortheavej mel 45 2400 København NV", text: "Åbent fra 10-14" },
      ],
    };
  },
  async mounted() {
    mapboxgl.accessToken = this.accessToken;

    this.locations = this.createLocationObj();

    this.map = new mapboxgl.Map({
      container: "mapContainer",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [12.559033, 55.687359],
      zoom: 10,
    });
    this.locations.then((mappedLocationsArray) => {
      this.getLocationsAndPassIntoMap(this.map, mappedLocationsArray);
    });

    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    });

    this.map.addControl(geolocate, "top-right");

    const nav = new mapboxgl.NavigationControl();
    this.map.addControl(nav, "top-right");
  },

  methods: {
    ...mapActions(["fetchZipCode"]),
    getLocationsAndPassIntoMap: function (map, locationsData) {
      locationsData.forEach((location) => {
        // create a HTML element for each feature
        var el = document.createElement("div");
        el.className = "marker";

        // make a marker for each feature and add to the map
        this.markers = new mapboxgl.Marker(el)
          .setLngLat(location.geometry.coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // add popups
              .setHTML(
                "<h3>" +
                  location.properties.title +
                  "</h3><p>" +
                  location.properties.description +
                  "</p>"
              )
          )
          .addTo(map);
      });
    },

    createLocationObj: function () {
      const mappedLocations = Promise.all(
        this.$static.container.edges.map(async (location) => {
          const locationString = location.node.add.split(" ").join("+");
          const locationsData = await axios.get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${locationString}.json?limit=2&access_token=${this.accessToken}`
          );

          return {
            type: "Feature",
            properties: {
              title: `<a href="#">${location.node.add}</a>`,
              description: `<strong>${location.node.open}</strong>`,
              icon: "bakery",
            },
            geometry: {
              type: "Point",
              coordinates: locationsData.data.features[0].center,
            },
          };
        })
      );
      return mappedLocations;
    },
    getZipCode() {
      if (this.zipCode.length === 4) {
        this.fetchZipCode(this.zipCode).then((zipData) => {
          debugger;
          this.map.flyTo({
            center: zipData[0].visueltcenter,
            essential: true,
          });
        });
      }
    },
  },
};
</script>

<style lang="scss">
.map-container {
  padding: 20px calc(var(--space) / 2);
  background-color: var(--primary-color);
  text-align: center;

  h2 {
    color: var(--body-color);
    margin-bottom: 10px;
    font-size: 40px;
  }
}

.zip-code-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;

  p {
    margin: 0;
    margin-right: 10px;
  }

  input {
    height: 25px;
    width: 100px;
    border: none;
    padding-left: 10px;
    border-radius: 20px;
  }
}

.basemap {
  width: 100%;
  height: 400px;

  .mapboxgl-canvas {
    height: 100%;
  }
}

.marker {
  width: 40px;
  height: 40px;
  background-color: #000;
  background-image: url("../../static/images/logo.png");
  background-size: cover;
  z-index: 20;
}

.mapboxgl-popup {
  max-width: 200px;
  z-index: 20;
}

.mapboxgl-popup-content {
  text-align: center;
  font-family: "Open Sans", sans-serif;

  h3 {
    margin: 0;
    color: #000;
  }

  p {
    color: darkslategrey;
  }
}

.mapboxgl-user-location-accuracy-circle {
  z-index: 10;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
