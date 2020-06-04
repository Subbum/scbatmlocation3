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

var perposition;
navigator.geolocation.getCurrentPosition(position => {
    perposition = position;
    console.log('local position is ', position)
})

window.onload = function() {

    const scene = document.querySelector('a-scene');
    // console.log(scene)

    // first get current user location
    

    console.log('global position is ', perposition)
    // navigator.geolocation.getCurrentPosition(function (position) {

        // than use it to load from remote APIs some places nearby
        loadPlaces(perposition.coords)
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
    /* },
        (err) => console.error('Error in retrieving position', err),
        {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 27000,
        }
    ); */



};


const loadDirections = function (coords) {
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
        return loadDirectionFromAPIs(coords);
    }

    return Promise.resolve(PLACES);
};

function loadDirectionFromAPIs(position) {
    const params = {
        radius: 300,    // search places not farther than this value (in meters)
        clientId: 'WUmToqAIQzGL8hUkV3vYeWAVYnMmImrk',
        clientSecret: 'W2BHPK1JRPPY0NDQFKS4LF2OKDFLEVUHUPAW2WOVIBKUWIJZ',
        version: '20300101',    // foursquare versioning, required but unuseful for this demo
        isFuzzed: false,
    };

    var locate = $("#location").val();
    console.log(locate);
    console.log(position)

    // Foursquare API
    const endpoint = `https://open.mapquestapi.com/directions/v2/route?key=${params.clientId}
    &latLng=${position.latitude},${position.longitude}
    &from=${position.latitude},${position.longitude}
    &to=${locate}
    &ambiguities=ignore
    `
    console.log(endpoint)
    return fetch(endpoint)
        .then((res) => {
            return res.json()
                .then((resp) => {
                    console.log(resp)
                    return resp.route.legs[0].maneuvers;
                })
        })
        .catch((err) => {
            console.error('Error with places API', err);
        })
};


function func1() {

    // console.log('tick')
    $('.direction').css({'display':'flex'})
    console.log('hello')
    console.log('global position 2 is ', perposition)

    // first get current user location
    // return navigator.geolocation.getCurrentPosition(function (position) {

        console.log('here');

        // than use it to load from remote APIs some places nearby
        loadDirections(perposition.coords)
            .then((places) => {
                var val = places[0].direction
                document.getElementById('movement').innerHTML = `${places[0].narrative} for ${places[0].distance * 1609} meters`
                // console.log(val);
                if(val == '6'){
                    // console.log('hello')
                    $('#arrow').css({
                        'transform': "rotate(45deg)",
                    });
                }
                else if(val == '1'){
                    $('#arrow').css({
                        'transform': "rotate(-90deg)",
                    }); 
                }
                else if(val == '2'){
                    $('#arrow').css({
                        'transform': "rotate(225deg)",
                    }); 
                }
                else if(val == '3'){
                    $('#arrow').css({
                        'transform': "rotate(-45deg)",
                    }); 
                }
                else if(val == '4'){
                    $('#arrow').css({
                        'transform': "rotate(90deg)",
                    }); 
                }
                else if(val == '5'){
                    $('#arrow').css({
                        'transform': "rotate(135deg)",
                    }); 
                }
                else if(val == '6'){
                    $('#arrow').css({
                        'transform': "rotate(45deg)",
                    }); 
                }
                else if(val == '7'){
                    $('#arrow').css({
                        'transform': "rotate(180deg)",
                    }); 
                }
                else if(val == '8'){
                    $('#arrow').css({
                        'transform': "rotate(0deg)",
                    }); 
                }

                // places.forEach((place) => {
                //     console.log(place);
                // });
            })
    /* },
        (err) => console.error('Error in retrieving position', err),
        {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 27000,
        }
    ); */

    // return setInterval(func1,5000);

};
