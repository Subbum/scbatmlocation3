const loadPlaces = function (coords) {
    // COMMENT FOLLOWING LINE IF YOU WANT TO USE STATIC DATA AND ADD COORDINATES IN THE FOLLOWING 'PLACES' ARRAY
    const method = 'api';

    const PLACES = [
        {
            name: "Your place name",
            location: {
                lat: 19, // add here latitude if using static data
                lng: 72, // add here longitude if using static data
            }
        },
    ];

    if (method === 'api') {
        return loadPlaceFromAPIs(coords);
    }

    return Promise.resolve(PLACES);
};

// getting places from REST APIs
function loadPlaceFromAPIs(position) {
    const params = {
        radius: 300,    // search places not farther than this value (in meters)
        clientId: 'QCNCYBPDW0R2ZUDNBS2GIXK4GGI201GZ50EASXOER4JJBA1I',
        clientSecret: 'W2BHPK1JRPPY0NDQFKS4LF2OKDFLEVUHUPAW2WOVIBKUWIJZ',
        version: '20300101',    // foursquare versioning, required but unuseful for this demo
        isFuzzed: false,
    };

    // Foursquare API
    const endpoint = `https://api.foursquare.com/v2/venues/search?intent=checkin
        &ll=${position.latitude},${position.longitude}
        &radius=${params.radius}
        &client_id=${params.clientId}
        &client_secret=${params.clientSecret}
        &limit=10
        &v=${params.version}`;
    return fetch(endpoint)
        .then((res) => {
            return res.json()
                .then((resp) => {
                    return resp.response.venues;
                })
        })
        .catch((err) => {
            console.error('Error with places API', err);
        })
};


window.onload = function() {

    

    const scene = document.querySelector('a-scene');
    // console.log(scene)

    // first get current user location
    return navigator.geolocation.getCurrentPosition(function (position) {

        // than use it to load from remote APIs some places nearby
        loadPlaces(position.coords)
            .then((places) => {
                places.forEach((place) => {
                    // console.log(place)
                    const latitude = place.location.lat;
                    const longitude = place.location.lng;
                    // add place name
                    // if((place.name).toString().includes('Nahar')){ //Testing to get certain locations
                        const text = document.createElement('a-link');
                        text.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
                        text.setAttribute('title', place.name + ' ' + place.location.distance + ' meters');
                        text.setAttribute('scale', '20 20 20');
                        text.setAttribute('id', place.location.lat + ',' + place.location.lng)
                        text.setAttribute('class', 'maplink')
                        text.addEventListener('loaded', () => {
                            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
                        });

                        // const imgtext = document.createElement('a-link');
                        // imgtext.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
                        // imgtext.setAttribute('title', place.name + ' ' + place.location.distance + ' meters');
                        // imgtext.setAttribute('scale', '10 10 10');
                        // imgtext.addEventListener('loaded', () => {
                        //     window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
                        // });

                        daySelect = document.getElementById('location');
                        daySelect.options[daySelect.options.length] = new Option(place.name, `${latitude},${longitude}`);

                        // console.log(text);
                        scene.appendChild(text);
                        // scene.appendChild(imgtext);
                    // }
                    // else{}
                });
            })
    },
        (err) => console.error('Error in retrieving position', err),
        {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 27000,
        }
    );



};
