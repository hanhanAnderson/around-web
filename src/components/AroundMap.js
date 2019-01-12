import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, } from "react-google-maps";
import { AroundMarker } from './AroundMarker';
import {POST_KEY} from '../Constants'

export class NormalAroundMap extends React.Component {
    reloadMarkers =() => {
        const center = this.getCenter();
        const radius = this.getRadius();
        this.props.loadNearbyPosts(
            center, radius
        );
    }
    getMapRef = (mapInstance) => {
        this.map = mapInstance;
    }
    getCenter = () => {
        if (!this.map) return;
        const center = this.map.getCenter();
        return {
            lat : center.lat(),
            lon : center.lng(),
        }
    }

    getRadius = () => {
        const center = this.map.getCenter();
        const bounds = this.map.getBounds();
        if (center && bounds) {
          const ne = bounds.getNorthEast();
          const right = new window.google.maps.LatLng(center.lat(), ne.lng());
          return 0.001 * window.google.maps.geometry.spherical.computeDistanceBetween(center, right);
        }
      }
     

    render() {
        const { lat, lon } = JSON.parse(localStorage.getItem(POST_KEY));
        return (
            <GoogleMap
            defaultZoom={12}
            defaultCenter={{ lat: lat, lng: lon }}
            onDragEnd={this.reloadMarkers}
            onZoomChanged={this.reloadMarkers}
            ref = {this.getMapRef}
          >
                {
                    this.props.posts &&this.props.posts.length >0 && this.props.posts.map(
                        post =>  (<AroundMarker post = {post} key = {post.url}/> )
                    )
                }

          </GoogleMap>
        )
    }
}

export const AroundMap = withScriptjs(withGoogleMap(NormalAroundMap));

//AIzaSyCckcZPKvejFZihOIXvYVzZKDiiV01rxbc