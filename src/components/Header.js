import React from 'react';
import axios from 'axios';

// import MastheadText from "./MastheadV1";
import Masthead from "./Masthead";
import SocialFooter from "./SocialFooter";
import headerStyles from './Header.module.css';

class Header extends React.Component {
    state = {
        resumeData: {},
    };
    
    componentDidMount() {
        this.calcVH();
        window.addEventListener('onorientationchange', this.calcVH, true);
        window.addEventListener('resize', this.calcVH, true);
        this.getData();
    }
    
    getData(){
        axios.get('/resumeData.json')
            .then(res => {
                this.setState({resumeData: res.data});
            });
    }

    calcVH() {
        var vH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        document.getElementById("headerWrapper").setAttribute("style", "height:" + vH + "px;");
    }
    
    render() {
        return (
            <div id='headerWrapper' 
                 className={headerStyles.wrapper}
            >
                {/*<MastheadText data={this.state.resumeData.main} />*/}
                <Masthead data={this.state.resumeData.main} />
                <SocialFooter />
            </div>
        )
    }
}

export default Header;