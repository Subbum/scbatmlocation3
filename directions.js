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

    // Foursquare API
    const endpoint = `https://open.mapquestapi.com/directions/v2/route?key=${params.clientId}
    &latLng=${position.latitude},${position.longitude}
    &from=${position.latitude},${position.longitude}
    &to=19.111597971385113,72.89660249116625
    `
    return fetch(endpoint)
        .then((res) => {
            return res.json()
                .then((resp) => {
                    return resp.route.legs[0].maneuvers;
                })
        })
        .catch((err) => {
            console.error('Error with places API', err);
        })
};


function func1() {

    console.log('tick')

    // first get current user location
    return navigator.geolocation.getCurrentPosition(function (position) {

        // than use it to load from remote APIs some places nearby
        loadDirections(position.coords)
            .then((places) => {
                var val = places[0].direction
                // console.log(val);
                if(val == '6'){
                    // console.log('hello')
                    $('#arrow').css({
                        'transform': "rotate(45deg)",
                    });
                }
                else if(val == '1'){
                    $('.direction').css({
                        'transform': "rotate(-90deg)",
                    }); 
                }
                else if(val == '2'){
                    $('.direction').css({
                        'transform': "rotate(225deg)",
                    }); 
                }
                else if(val == '3'){
                    $('.direction').css({
                        'transform': "rotate(-45deg)",
                    }); 
                }
                else if(val == '4'){
                    $('.direction').css({
                        'transform': "rotate(90deg)",
                    }); 
                }
                else if(val == '5'){
                    $('.direction').css({
                        'transform': "rotate(135deg)",
                    }); 
                }
                else if(val == '6'){
                    $('.direction').css({
                        'transform': "rotate(45deg)",
                    }); 
                }
                else if(val == '7'){
                    $('.direction').css({
                        'transform': "rotate(180deg)",
                    }); 
                }
                else if(val == '8'){
                    $('.direction').css({
                        'transform': "rotate(0deg)",
                    }); 
                }

                // places.forEach((place) => {
                //     console.log(place);
                // });
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

setInterval(func1,5000);