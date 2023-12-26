import * as React from 'react';
import Map, {Marker, Popup}  from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { logListEntries } from './Api';
import img from "./img/placeholder.png";
import LogEntryForm from './LogEntryForm';

function App() {
  const [showPopup, setShowPopup] = React.useState({});
  const [logEntries, setLogEntries] = React.useState([]);
  const [addEntryLocation, setAddEntryLocation] = React.useState(null);
  const [viewport, setViewport] = React.useState({
    longitude: 36.8219,
    latitude: -1.2921,
    zoom: 3.5,
  });


  React.useEffect(() => {
    (async() => {
      const logEntries = await logListEntries();
      setLogEntries(logEntries);
      // console.log(logEntries);
    })()}, []);

    const showAddMarkerPopup = (event) => {
      console.log(event);
      const { lng, lat } = event.lngLat;
      console.log({ lng, lat });
      setAddEntryLocation({
        latitude: lat,
        longitude: lng
      });
    };
    

    
  return (
      
      <Map
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      {...viewport}
      onViewportChange={setViewport}
      style={{width: '100%', height: '100vh'}}
      mapStyle="mapbox://styles/mapbox/dark-v10"
      onDblClick = {showAddMarkerPopup}
    >
    {
      logEntries.map(entry => (
        <div key={entry._id}>
        <Marker
            key={entry._id}
            longitude={entry.longitude}
            latitude={entry.latitude}
           >
          <div 
            onClick={() => setShowPopup({
              [entry._id] : true,
             })}
          >
          <img 
              style={{
                width:`${6 * viewport.zoom}px`,
                height:`${6 * viewport.zoom}px`
              }}
              className='marker' 
              src='https://i.imgur.com/y0G5YTX.png' 
              alt='marker'>

            </img>
          </div>

        </Marker>
        {
          showPopup[entry._id] ? (
            <Popup 
              longitude={entry.longitude}
              latitude={entry.latitude}
              anchor="top"
              dynamicPositioning={true}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setShowPopup(false)}
              >
             <div className='popup'>
                <h3>{entry.title}</h3>
                <p>{entry.comments}</p>
                <small>Visited on: {new Date(entry.visitDate).toLocaleDateString()}</small>
             </div>
            </Popup>
          ) : null
        } 
        
        </div>
        
      ))
    }

    {
      addEntryLocation ? (
      <>
        <Marker
            longitude={addEntryLocation.longitude}
            latitude={addEntryLocation.latitude}
           >
          <div>
          <img 
              style={{
                width:`${6 * viewport.zoom}px`,
                height:`${6 * viewport.zoom}px`
              }}
              className='marker' 
              src={img}
              alt='marker'>

            </img>
          </div>

        </Marker>
        <Popup 
              longitude={addEntryLocation.longitude}
              latitude={addEntryLocation.latitude}
              anchor="top"
              dynamicPositioning={true}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setAddEntryLocation(null)}
              >
             <div className='popup'>
                <LogEntryForm/>
             </div>
          </Popup>
      </> ): null
    }
      
    </Map>
    
    
  )};
export default App;


