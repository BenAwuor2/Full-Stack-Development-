import React from 'react';
import ReactMapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';



function App() {
  const [viewPort, setViewPort] = React.useState({
    latitude: 40.7128,
    longitude:  -74.0137,
    zoom: 10,
    width: '100%',
    height: '100%',
    transitionDuration: "200",
  })
  return (
    <div style={{width:"100vw", height: "100vh"}}>
      <ReactMapGL
    {...viewPort}
    mapboxApiAccessToken= {process.env.REACT_APP_MAPBOX_TOKEN}
    onViewportChange={(viewport) => {setViewPort(viewport)}}
    >

    </ReactMapGL>
    </div>
    
    
  );
}

export default App;



