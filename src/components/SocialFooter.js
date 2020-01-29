import React from 'react';
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { withStyles } from "@material-ui/core";
import { Link } from 'react-scroll';

import SocialIcons from "./SocialIcons";
import socialFooterStyles from './SocialFooter.module.css';

/* NOTE: To change social footer icon fill color find the <SocialIcon> tags, change the 'fill' attribute in each. 
*  The <SocialIcon> inside xsDown is the desktop display, while the <SocialIcon> inside xsUp is the mobile display*/
const styles = theme => ({
    arrowIcon: {
        color: '#ffffff',
        fontSize: '2.5em',
        "&:hover": {
            color: "#33b097"
        }
    },
    '@media screen and (max-width: 658px)': {
        arrowIcon: {
            color: 'rgba(0, 0, 0, .5)'
        }   
    }
});

class SocialFooter extends React.Component {
    state = {
        deviceResolution: null,
        showSocialFooter: null,
    };

    componentDidMount() {
        if (window.innerWidth > 659)
            this.setState({ deviceResolution: 'desktop-tablet' });
        else {
            this.setState({deviceResolution: 'mobile'});
            this.setState({showSocialFooter: 'block'});
        }

        if (this.state.deviceResolution === 'desktop-tablet') {
            window.pageYOffset > 0 ?
                this.setState({showSocialFooter: 'none'}) :
                this.setState({showSocialFooter: 'block'});
        }

        window.addEventListener('resize', this.mobileView);
        window.addEventListener('scroll', this.toggleSocialFooter);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.mobileView);
        window.removeEventListener('scroll', this.toggleSocialFooter);
    }

    mobileView = async () => {
        if (window.innerWidth > 659 && this.state.deviceResolution !== 'desktop-tablet') {
            await this.setState({deviceResolution: 'desktop-tablet'});
            this.toggleSocialFooter();
        }
        else if (window.innerWidth <= 659 && this.state.deviceResolution !== 'mobile') {
            await this.setState({deviceResolution: 'mobile'});
            this.toggleSocialFooter();
        }
    };

    toggleSocialFooter = () => {
        if (this.state.showSocialFooter === null)
            this.setState({ showSocialFooter: 'block'});
        if (this.state.deviceResolution === 'mobile' && this.state.showSocialFooter !== 'block')
            this.setState({ showSocialFooter: 'block' });
        else if (this.state.deviceResolution === 'desktop-tablet') {
            if (window.pageYOffset > 0 && this.state.showSocialFooter === 'block')
                this.setState({showSocialFooter: 'none'});
            else if (window.pageYOffset <= 0 && this.state.showSocialFooter === 'none')
                this.setState({showSocialFooter: 'block'})
        }
    };


    render () {
        const { classes } = this.props;
        
        return (
            <div className={socialFooterStyles.footerContainer}
                 style={{display: this.state.showSocialFooter}}>
                <Box clone className={socialFooterStyles.gridWrapper}>
                    <Grid container
                          direction="column"
                          justify="flex-end"
                          alignItems="center"
                    >
                        <Grid item>
                            <Link activeClass="active"
                                  to="aboutme"
                                  spy={true}
                                  smooth={true}
                                  offset={0}
                                  duration={500}
                            >
                                <IconButton edge="start"
                                            aria-label="scrolldown"
                                >
                                    <KeyboardArrowDownIcon className={classes.arrowIcon}/>
                                </IconButton>
                            </Link>
                        </Grid>
                        <Grid item
                              className={socialFooterStyles.socialIconsGridItem}
                        >
                            <Hidden xsDown>
                                <SocialIcons hoverFill='#3bcfb4' fillInMasthead='#ffffff'/>
                            </Hidden>
                            <Hidden smUp>
                                <SocialIcons hoverFill='#3bcfb4' fillInMasthead='rgba(0, 0, 0, .5'/>
                            </Hidden>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        )
    }
}

export default withStyles(styles)(SocialFooter);