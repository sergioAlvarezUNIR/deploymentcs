let objeto

const URL = process.env.REACT_APP_BACKEND_URL;
//const URL = "http://localhost:4041";

async function initMap() {
    // Request needed libraries.
    const { Map, InfoWindow } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const map = new Map(document.getElementById("map"), {
      center: { lat: 40.463667, lng: -3.74922 },
      zoom: 5,
      mapId: '73169f8f5ea22f74'
    });
    const infoWindow = new InfoWindow();
    const draggableMarker = new AdvancedMarkerElement({
      map,
      position: { lat: 40.463667, lng: -3.74922 },
      gmpDraggable: true,
      title: "This marker is draggable.",
    });
  
    draggableMarker.addListener("dragend", (event) => {
      const position = draggableMarker.position;
  
      infoWindow.close();
      infoWindow.setContent(`Pin dropped at: ${position.lat}, ${position.lng}`);
      infoWindow.open(draggableMarker.map, draggableMarker);
      console.log(`Pin dropped at Lat: ${position.lat}`)
      console.log(`Pin dropped at Lng: ${position.lng}`)


                          //Cargar en el backend nueva posición
                          const fetchRad = async () => {
                            try {
                              console.log(URL)
                              let posAPI=`${URL}/eprad`;                        
                              const response3 = await fetch(posAPI,{method: "POST", headers: {
                                'Content-Type': 'application/json',
                              }, body: JSON.stringify({"lat": position.lat, "lon": position.lng, "eprad": 33})});  
                              const data = await response3.json();
                              console.log('Respuesta del servidor:', data);                              
                              console.log("Esta es la info de response 3 enviada por post eprad al backend"); 
                              console.log(response3);                 
                            } catch (error) {
                              console.error('Error fetching Rad data:', error);
                            }
                          };

                          fetchRad();



                          const funciondeprueba = () => {console.log("Probando funcion de prueba en cada cambio de posición en el mapa")};
                          funciondeprueba();




      window.latVar=position.lat
      window.lonVar=position.lng
      console.log("dentro " + window.latVar);

      objeto = {
        latitud: position.lat,
        longitud: position.lng 
      }

      coordUpdate();

    });
  }
  
  initMap();


  export function coordUpdate() {
    console.log("fuera " + window.lonVar);
  };
  

  
  