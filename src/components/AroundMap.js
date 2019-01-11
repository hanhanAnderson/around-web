import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import { AroundMarker } from './AroundMarker';
import {POST_KEY} from '../Constants'

export class NormalAroundMap extends React.Component {
    render() {
        const { lat, lon } = JSON.parse(localStorage.getItem(POST_KEY));
        return (
            <GoogleMap
            defaultZoom={12}
            defaultCenter={{ lat: lat, lng: lon }}
          >
                {
                    this.props.posts.map(
                        post =>  (<AroundMarker post = {post} key = {post.url}/> )
                    )
                }

          </GoogleMap>
        )
    }
}

export const AroundMap = withScriptjs(withGoogleMap(NormalAroundMap));

//AIzaSyCckcZPKvejFZihOIXvYVzZKDiiV01rxbc