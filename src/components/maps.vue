<template>
  <div id="mapContainer" class="basemap"></div>
</template>

<page-query>
query Container {
  container: container {
    add
  }
}
</page-query>

<script>
import mapboxgl from "mapbox-gl";
import axios from "axios";

export default {
  name: "BaseMap",
  data() {
    return {
      accessToken:
        "pk.eyJ1IjoiYmFja3VyZGkiLCJhIjoiY2swZG0wYms2MDhwZTNjbjRkZ2I5bXprYSJ9.2zY5VTZ0IS1qlUsbyJ0weQ",
      map: {},
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

    const map = new mapboxgl.Map({
      container: "mapContainer",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [12.559033, 55.687359],
      zoom: 10,
    });

    this.locations = this.createLocationObj();

    this.locations.then((mappedLocationsArray) => {
      this.getLocationsAndPassIntoMap(map, mappedLocationsArray);
    });

    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    });

    map.addControl(geolocate, "top-right");

    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, "top-right");
  },

  methods: {
    getLocationsAndPassIntoMap: function (map, locationsData) {
      locationsData.forEach((location) => {
        console.log(location.geometry);
        // create a HTML element for each feature
        var el = document.createElement("div");
        el.className = "marker";

        // make a marker for each feature and add to the map
        new mapboxgl.Marker(el)
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
        this.locations.map(async (location) => {
          const locationString = location.add.split(" ").join("+");
          const locationsData = await axios.get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${locationString}.json?limit=2&access_token=${this.accessToken}`
          );

          return {
            type: "Feature",
            properties: {
              title: location.add,
              description: `<strong>${location.text}</strong>`,
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
  },
};
</script>

<style lang="scss">
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
</style>


