import React from "react";
import { Event } from "../../src/models";


interface IProps {
    event: Event 
  }

    const Marker = ({ event }:IProps)  => {
        const [marker, setMarker] = React.useState<google.maps.Marker>();
        const options = JSON.parse(event.map_point || '{ "lat": -34.91554, "lng": -57.91454 }')
      
        React.useEffect(() => {
          if (!marker) {
            setMarker(new google.maps.Marker());
          }
      
          // remove marker from map on unmount
          return () => {
            if (marker) {
              marker.setMap(null);
            }
          };
        }, [marker]);
      
        React.useEffect(() => {
          if (marker) {
            marker.setOptions(options);
          }
        }, [marker, options]);
      
        return null;
      };

      export default Marker