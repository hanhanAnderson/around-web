import React from 'react';
import { Tabs, Button, Spin } from 'antd';
import { API_ROOT, TOKEN_KEY} from '../Constants';
import { Gallery } from './Gallery';


const TabPane = Tabs.TabPane;
const operations = <Button>Extra Action</Button>;
const GEO_options = {
    enableHighAccuracy: true,
    timeout: 360000,
    maximumAge: 27000
};
const POST_KEY = 'POST_KEY';

export class Home extends React.Component {
    state = {
        isLoadingGeoLocation: false,
        isLoadingPosts: false,
        error: '',
    }
    componentDidMount() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                this.onSuccessLoadGeoLocation,
                this.onFailedLoadGeoLocation,
                GEO_options
            );
            this.setState({ isLoadingGeoLocation: true });
        } else {
            this.setState({ error: 'geolocation IS NOT available' });
            console.log("geolocation IS NOT available");
        }
    }
    onSuccessLoadGeoLocation = (geolocation) => {
        console.log(geolocation);
        const { latitude, longitude } = geolocation.coords;
        localStorage.setItem(POST_KEY, JSON.stringify({
            lat: latitude,
            lon: longitude
        }));
        this.setState({ isLoadingGeoLocation: false });
        this.loadNearbyPosts();
    }
    onFailedLoadGeoLocation = () => {
        this.setState({
            isLoadingGeoLocation: false,
            error: 'Failed to Load Geo-Location',
        });
    }
    loadNearbyPosts = () => {
        const { lat, lon } = JSON.parse(localStorage.getItem(POST_KEY));
        this.setState({ isLoadingPosts: true });
        const token = localStorage.getItem(TOKEN_KEY);
        // fetch(`${API_ROOT}/search?lat=${lat}&lon=${lon}&range=20000`, {
        //     method: 'GET',
        //     headers: {
        //         Authorization: `${AUTH_HEADER} ${token}`,
        //     },
        // }).then((response) => {
        //     if (response.ok) {
        //         return response.json();
        //     }
        //     throw new Error('Failed to load posts.');
        // }).then((data) => {
        //     console.log(data);
        //     this.setState({ isLoadingPosts: false, posts: data ? data : [] });
        // }).catch((e) => {
        //     console.log(e.message);
        //     this.setState({ isLoadingPosts: false, error: e.message });
        // });
        this.setState({ isLoadingPosts: false});

        //TODO : 
        /*
        read location 
        request api
        setState
        */
    }

    getImagePosts = () => {
        if (this.state.error) {
            return <div>{this.state.error}</div>
        }
        if (this.state.isLoadingGeoLocation) {
            return <Spin tip="loading geoLocation" />;
        }
        if (this.state.isLoadingPosts) {
            return <Spin tip="loading Posts" />;
        }
        //TODO : get post from api
        return <Gallery />;
    }

    render() {
        console.log('state', this.state);
        const operations = <Button>Extra Action</Button>;
        return (
            <Tabs className="main-tabs" tabBarExtraContent={operations}>
                <TabPane tab="Posts" key="1">
                    {this.getImagePosts()}
                </TabPane>
                <TabPane tab="Map" key="2">Map</TabPane>
            </Tabs>
        )
    }
}