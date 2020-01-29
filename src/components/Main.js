import React from 'react';
import axios from 'axios';

import Navigation from "./Navigation";
import AboutMe from "./AboutMe";
import Work from "./Work";
import Contact from "./Contact";
import Footer from "./Footer";
import Header from "./Header";

class Main extends React.Component {
    state = {
        resumeData: {},
    };

    componentDidMount() {
        this.getData();
    }
    
    getData(){
        axios.get('/resumeData.json')
            .then(res => {
                this.setState({resumeData: res.data});
            });        
    };
    
    render() {
        return (
            <div>
                <Navigation data={this.state.resumeData.main}/>
                <Header />
                <AboutMe data = {this.state.resumeData.main}/>
                <Work />
                <Contact />
                <Footer />
            </div>
        )              
    }
}

export default Main;