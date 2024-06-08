let objeto

async function initMap() {
    // Request needed libraries.
    const { Map, InfoWindow } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const map = new Map(document.getElementById("map"), {
      center: { lat: 40.463667, lng: -3.74922 },
      zoom: 5,
      mapId: "4504f8b37365c3d0"
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
  

  
  