import React from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import { Input } from 'antd';
import '../CreateParty.css'

const mapStyles={
    width: "100%",
    height: "100%",
    margin: "2px auto"
}
 
const MapContainer = ({onInputBlur, draggable, inputStyle, addressValue, onChange, google, center, position, onDragend, name, initialCenter }) => (
    <div>
        <Input
            style={inputStyle}
            onBlur={onInputBlur}
            value={addressValue} 
            className="input" 
            placeholder="Address"
            onChange={onChange} 
        />
        <div className="mapContent" >
            <Map
                google={google}
                style={mapStyles}
                initialCenter={initialCenter}
                zoom={15}
                center={center}
                
            >
                <Marker
                    position={position}
                    draggable={draggable}
                    onDragend={onDragend}
                    name={name}
                />
            </Map>
        </div>
    </div>
) 

export default GoogleApiWrapper({
  apiKey: ("AIzaSyABXOuxZCI3Rmrd5wEEFPEx_jDUGiCEJbw")
})(MapContainer)