import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyC_LgeO2S3mg3P9hNMgfN25CrhPDdfzTl0';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        };

        this.videoSearch('surfboards');
    }

    videoSearch(term) {
        YTSearch({ key: API_KEY, term: term }, (videos) => {
            console.log('videos => ', videos);
            let selectedVideo = videos[0];
            this.setState({ videos, selectedVideo });
        });
    }

    render() {
        const videoSearch = _.debounce(term => {
            this.videoSearch(term);
        }, 300);

        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch} />
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList
                    videos={this.state.videos}
                    onVideoSelect={selectedVideo => this.setState({ selectedVideo })} />
            </div>
        );
    }
}

// take this component's generated html and put it on the page (in the dom)
ReactDOM.render(<App />, document.querySelector('.container'));