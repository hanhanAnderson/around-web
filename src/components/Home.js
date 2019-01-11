import React from 'react';
import { Tabs, Button, Spin } from 'antd';
import { API_ROOT, TOKEN_KEY, AUTH_HEADER, GEO_OPTIONS, POST_KEY } from '../Constants';
import { Gallery } from './Gallery';
import {CreatePostButton} from './CreatePostButton'

const TabPane = Tabs.TabPane;

export class Home extends React.Component {
    state = {
        isLoadingGeoLocation: false,
        isLoadingPosts: false,
        error: '',
        posts:[]
    }
    componentDidMount() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                this.onSuccessLoadGeoLocation,
                this.onFailedLoadGeoLocation,
                GEO_OPTIONS
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
        //         Authorization: `${AUTH_HEADER} ${token}`
        //     }
        // })
        //     .then((response) => {
        //         if (response.ok) {
        //             return response.json();
        //         }
        //         throw new Error(response.statusText);
        //     })
        //     .then(
        //         data => {
        //             console.log(data);
        //             this.setState({ isLoadingPosts: false, posts: data ? data : [] });               
        //     })
        //     .catch(
        //         (error) => { this.setState({ 
        //             isLoadingPosts: false,
        //             error: error.message 
        //         }) }
        //     );
        fetch(`${API_ROOT}/search?lat=${lat}&lon=${lon}&range=20000`, {
            method: 'GET',
            headers: {
                Authorization: `${AUTH_HEADER} ${token}`,
            },
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Failed to load posts.');
        }).then((data) => {
            console.log(data);
            this.setState({posts: data ? data : [], isLoadingPosts: false });
        }).catch((e) => {
            console.log(e.message);
            this.setState({ isLoadingPosts: false, error: e.message });
        });
        //TODO : 
        /*
        read location 
        request api
        setState
        */
    }

    getImagePosts = () => {
        const { error, isLoadingGeoLocation, isLoadingPosts, posts } = this.state;
        if (error) {
          return <div>{error}</div>
        } else if(isLoadingGeoLocation) {
          return <Spin tip="Loading geo location..."/>
        } else if (isLoadingPosts) {
          return <Spin tip="Loading posts..." />
        } else if (this.state.posts.length > 0) {
          const images = this.state.posts.map((post) => {
            return {
              user: post.user,
              src: post.url,
              thumbnail: post.url,
              caption: post.message,
              thumbnailWidth: 400,
              thumbnailHeight: 300,
            }
          });
          return (<Gallery images={images}/>);
        } else {
          return 'No nearby posts.';
        }
      }
     

    render() {
        console.log('state', this.state);
        const operations = <CreatePostButton loadNearbyPosts={this.loadNearbyPosts}/>;
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