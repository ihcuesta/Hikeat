import React, { useState, useEffect } from "react";
import { Map, Marker, TileLayer, Popup } from "react-leaflet";
import "../../App.css";
import { Icon } from "leaflet";

export const MapLeaflet = ({ lat, long }) => {
  const pin = new Icon({
    iconUrl: "/pin2.svg",
    iconSize: [50, 50]
  });

  return (
    <Map
      style={{ height: "300px", width: "100%" }}
      center={[lat, long]}
      zoom={17}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, long]} icon={pin} />
    </Map>
  );
};
