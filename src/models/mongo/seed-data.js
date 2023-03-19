export const seedData = {
    users: {
      _model: "User",
      homer: {
        firstName: "Homer",
        lastName: "Simpson",
        email: "homer@simpson.com",
        password: "secret"
      },
      marge: {
        firstName: "Marge",
        lastName: "Simpson",
        email: "marge@simpson.com",
        password: "secret"
      },
      bart: {
        firstName: "Bart",
        lastName: "Simpson",
        email: "bart@simpson.com",
        password: "secret"
      }
    },
    placemarks: {
      _model: "Placemark",
      testPlacemark: {
        title: "testPlacemark Favourites",
        userid: "->users.bart"
      }
    },
    details: {
      _model : "Detail",
      detail_1 : {
        title: "Violin Concerto No. 1",
        latitude: "testPlacemark",
        longitude: "15",
        placemarkid: "->placemarks.testPlacemark"
      },
      detail_2 : {
        title: "Violin Concerto No. 2",
        latitude: "testPlacemark",
        longitude: "11",
        placemarkid: "->placemarks.testPlacemark"
      },
      detail_3 : {
        title: "Violin Concerto No. 3",
        latitude: "testPlacemark",
        longitude: "23",
        placemarkid: "->placemarks.testPlacemark"
      }
    }
  };
  