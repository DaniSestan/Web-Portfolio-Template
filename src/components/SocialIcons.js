import React from 'react';
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import SVGIcon from "./SVGIcon";

import socialIconsStyles from './SocialIcons.module.css';
import axios from "axios";

class SocialIcons extends React.Component {
    state = {
        data: null,
        mastheadIsInView: null,
        hoveredSocialIcon: null
    };

    componentDidMount() {
        this.getData();
        
        window.pageYOffset < window.innerHeight ?
            this.setState( { mastheadIsInView: true }) :
            this.setState({ mastheadIsInView: false });

        window.addEventListener('scroll', () => {
            this.getMastheadPosition();
        });
    }


    getData(){
        axios.get('/resumeData.json')
            .then(res => {
                this.setState({data: res.data.main});
            });
    };

    getMastheadPosition = () => {
        if (window.pageYOffset < window.innerHeight && !this.state.mastheadIsInView)
            this.setState( { mastheadIsInView: true});
        else if (window.pageYOffset >= window.innerHeight && this.state.mastheadIsInView)
            this.setState( { mastheadIsInView: false})
    };

    setSVGfill = (id) => {
        if(id === this.state.hoveredSocialIcon) {
            return this.props.hoverFill;
        } else {
            if (this.state.mastheadIsInView)
                return this.props.fillInMasthead;
            else
                return this.props.fillBelowMasthead;
        }
    };

    render() {
        const  data = this.state.data;

        if(data) {
            var githubURL = data.socialUrl.github;
            var linkedInURL = data.socialUrl.linkedIn;
            var twitterURL = data.socialUrl.twitter;
            // var facebookURL = data.socialUrl.facebook;
            // var instagramURL = data.socialUrl.instagram;
        }

        return (
            <Box className={socialIconsStyles.icons}>
                <Link href={githubURL}
                      onMouseOver={(e) => {this.setState({ hoveredSocialIcon: e.target.id })}}
                      onMouseOut={() => {this.setState({ hoveredSocialIcon: null })}}
                >
                    <SVGIcon name="gitlab"
                             width={40}
                             fill={this.setSVGfill('gitlab')}
                             className={socialIconsStyles.icon}
                             id="gitlab"
                    />
                </Link>
                <Link href={linkedInURL}
                      onMouseOver={(e) => {this.setState({ hoveredSocialIcon: e.target.id })}}
                      onMouseOut={() => {this.setState({ hoveredSocialIcon: null })}}
                >
                    <SVGIcon name="linkedin"
                             width={40}
                             fill={this.setSVGfill('linkedin')}
                             className={socialIconsStyles.icon}
                             id="linkedin"
                    />
                </Link>
                <Link href={twitterURL}
                      onMouseOver={(e) => {this.setState({ hoveredSocialIcon: e.target.id })}}
                      onMouseOut={() => {this.setState({ hoveredSocialIcon: null })}}
                >
                    <SVGIcon name="twitter"
                             width={40}
                             fill={this.setSVGfill('twitter')}
                             className={socialIconsStyles.icon}
                             id="twitter"
                    />
                </Link>
                {/*<Link href={facebookURL} */}
                {/*      onMouseOver={(e) => {this.setState({ hoveredSocialIcon: e.target.id })}}*/}
                {/*      onMouseOut={() => {this.setState({ hoveredSocialIcon: null })}}*/}
                {/*>*/}
                {/*    <SVGIcon name="facebook"*/}
                {/*             width={40}*/}
                {/*             fill={this.setSVGfill('facebook')}*/}
                {/*             className={socialFooterStyles.icon}*/}
                {/*             id="facebook"*/}
                {/*    />*/}
                {/*</Link>*/}
                {/*<Link href={instagramURL} */}
                {/*      onMouseOver={(e) => {this.setState({ hoveredSocialIcon: e.target.id })}}*/}
                {/*      onMouseOut={() => {this.setState({ hoveredSocialIcon: null })}}*/}
                {/*>*/}
                {/*    <SVGIcon name="instagram"*/}
                {/*             width={40}*/}
                {/*             fill={this.setSVGfill('instagram')}*/}
                {/*             className={socialFooterStyles.icon}*/}
                {/*             id="instagram"*/}
                {/*    />*/}
                {/*</Link>*/}
            </Box>
        )
    }
}

export default SocialIcons;