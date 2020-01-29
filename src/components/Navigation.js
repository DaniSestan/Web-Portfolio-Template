import React from 'react';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/styles';
import { Link, scrollSpy } from "react-scroll";

import navigationStyles from './Navigation.module.css';
import SocialIcons from "./SocialIcons";


/* NOTE: To change social icon fill color find the <SocialIcons> tag, and change the 'fillInMasthead', 'fillBelowMasthead'
 and the 'hoverFill' attributes. */
const styles = theme => ({
    mastheadInView: {
        backgroundColor: "rgba(255, 255, 255, 0.0)"
    },
    mastheadOutOfView: {
        backgroundColor: "rgba(255, 255, 255, 0.5)"
    },
    typographyInMasthead: {
        color: '#ffffff'
    },
    typographyBelowMasthead: {
        color: '#616161'
    },
    anchorLinkInMasthead: {
        color: "#ffffff"
    },
    anchorLinkBelowMasthead: {
        color: '#616161'
    },
    activeAnchorLink: {
        color: "#3bcfb4"
    },
    mobileMenu: {
        backgroundColor: '#94c7b6'
    },
    closeButtonTypography: {
        color: '#ffffff'
    },
    menuNavLinksTypography: {
        color: '#ffffff'        
    }
});

var scrollToElement = require('scroll-to-element');

class Navigation extends React.Component {
    state = {
        navbarVisibility: null,
        renderNavbar: null,
        mastheadIsInView: null,
        hoveredSocialIcon: null
    };

    componentDidMount() {
        scrollSpy.update();

        window.pageYOffset > 0 ?
            this.setState( { navbarVisibility: 'visible' }) :
            this.setState({ navbarVisibility: 'hidden' });

        window.pageYOffset < (window.innerHeight) ?
            this.setState( { mastheadIsInView: true }) :
            this.setState({ mastheadIsInView: false });

        window.addEventListener('scroll', () => {
            this.toggleNavbarVisibility();
            this.getMastheadPosition();
        });

        this.setState({ hash: window.location.hash });
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.toggleNavbarVisibility);
        window.removeEventListener('scroll', this.getMastheadPosition);
    }

    toggleNavbarVisibility = () => {
        if (window.pageYOffset > 0 && this.state.navbarVisibility === 'hidden') 
            this.setState( { navbarVisibility: 'visible' });
        else if (window.pageYOffset <= 0 && this.state.navbarVisibility === 'visible')
                this.setState( { navbarVisibility: 'hidden' })
    };
    
    toggleTitleDisplay = () => {
      if (this.state.mastheadIsInView)
          return 'none';
      else
          return 'block';
    };

    getMastheadPosition = () => {
        if (window.pageYOffset < (window.innerHeight) && !this.state.mastheadIsInView) 
                this.setState( { mastheadIsInView: true});
        else if (window.pageYOffset >= (window.innerHeight) && this.state.mastheadIsInView)
                this.setState( { mastheadIsInView: false})
    };

    justifyNavLinks = () => {
        if (this.state.mastheadIsInView) {
            return 'center'
        } else {
            return 'space-between'
        }
    };

    displaySeparator = () => {
        if (this.state.mastheadIsInView) {
            return 'block';
        } else {
            return 'none';
        }
    };
    
    toggleNavbarRendering = () => {
        if (this.state.renderNavbar || this.state.renderNavbar === null) {
            this.setState({ renderNavbar: false });
            document.body.style.overflow = 'hidden';
        } else {
            this.setState({ renderNavbar: true });
            document.body.style.overflow = 'visible';
        }
    };
    
    handleMenuNav = (element) => {
      this.toggleNavbarRendering();
      scrollToElement(element)
    };

    renderMobileMenu () {
        const { classes } = this.props;
        
        return (
            <div className={[classes.mobileMenu, navigationStyles.mobileMenu].join(' ')}>
                <Grid container
                      direction="column"
                      justify="space-between"
                      alignItems="stretch"
                  >
                    <Grid item>
                        <Button onClick={this.toggleNavbarRendering}>
                            <Typography className={[classes.closeButtonTypography, navigationStyles.closeButtonTypography].join(' ')}>
                                X
                            </Typography>
                        </Button>
                    </Grid>
                    <Grid item
                          className={navigationStyles.menuNavLinksGridItem}
                    >
                        <Button onClick={() => {this.handleMenuNav('#aboutme')}}>
                            <Typography className={[classes.menuNavLinksTypography, navigationStyles.menuNavLinksTypography].join(' ')}>
                                About Me
                            </Typography>
                        </Button>
                    </Grid>
                    <Grid item
                          className={navigationStyles.menuNavLinksGridItem}
                    >
                        <Button onClick={() => {this.handleMenuNav('#work')}}>
                            <Typography className={[classes.menuNavLinksTypography, navigationStyles.menuNavLinksTypography].join(' ')}>
                                Work
                            </Typography>
                        </Button>
                    </Grid>
                    <Grid item
                          className={navigationStyles.menuNavLinksGridItem}
                    >
                        <Button onClick={() => {this.handleMenuNav('#contact')}}>
                            <Typography className={[classes.menuNavLinksTypography, navigationStyles.menuNavLinksTypography].join(' ')}>
                                Contact 
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
    
    renderContent () {
        const { classes } = this.props;

        const  data = this.props.data;
        if(data) {
            var firstName = data.firstName;
            var lastName = data.lastName;
            var tagline = data.tagline;
        }

        return (
            <div className={navigationStyles.navbar}>
                <Hidden smUp>
                    <Box clone
                         visibility={this.state.navbarVisibility}
                    >
                        <Grid
                            container
                            className={clsx(navigationStyles.root, {
                                [classes.mastheadInView]: this.state.mastheadIsInView,
                                [classes.mastheadOutOfView]: !this.state.mastheadIsInView
                            })}
                            direction="row"
                            justify="flex-end"
                            alignItems="center"
                        >
                            <Grid item>
                                <IconButton edge="start"
                                            aria-label="menu"
                                            onClick={this.toggleNavbarRendering}>
                                    <Box clone className={navigationStyles.menuIcon}>
                                        <MenuIcon fontSize='large'/>
                                    </Box>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Box>
                </Hidden>
                <Hidden xsDown>
                    <Box clone
                         visibility={this.state.navbarVisibility}
                    >
                        <Grid
                            container
                            className={clsx(navigationStyles.root, {
                                [classes.mastheadInView]: this.state.mastheadIsInView,
                                [classes.mastheadOutOfView]: !this.state.mastheadIsInView
                            })}
                            direction="row"
                            justify={this.justifyNavLinks()}
                            alignItems="center"
                        >
                            <Hidden smUp>
                                <Grid item>
                                    <IconButton edge="start"
                                                aria-label="menu"
                                    >
                                        <MenuIcon fontSize='large'
                                                  style={{ backgroundColor: '#3bcfb4' }}
                                        />
                                    </IconButton>
                                </Grid>
                            </Hidden>
                            <Grid item>
                                <Typography className={[navigationStyles.typography, navigationStyles.links].join(' ')}>
                                    <Link className={clsx(navigationStyles.link, {
                                        [classes.anchorLinkInMasthead]: this.state.mastheadIsInView
                                    })}
                                          activeClass="active"
                                          to="aboutme"
                                          hashSpy={true}
                                          spy={true}
                                          smooth={true}
                                          offset={-40}
                                          duration={500}
                                    >
                                        About Me
                                    </Link>
                                    <Link className={clsx(navigationStyles.link, {
                                        [classes.anchorLinkInMasthead]: this.state.mastheadIsInView
                                    })}
                                          activeClass="active"
                                          to="work"
                                          hashSpy={true}
                                          spy={true}
                                          smooth={true}
                                          offset={0}
                                          duration={500}
                                    >
                                        Work
                                    </Link>
                                    <Link className={clsx(navigationStyles.link, {
                                        [classes.anchorLinkInMasthead]: this.state.mastheadIsInView
                                    })}
                                          activeClass="active"
                                          to="contact"
                                          hashSpy={true}
                                          spy={true}
                                          smooth={true}
                                          offset={0}
                                          duration={500}
                                    >
                                        Contact
                                    </Link>
                                </Typography>
                            </Grid>
                            <Box clone display={this.displaySeparator()}>
                                <Grid item>
                                    <Typography className={clsx(navigationStyles.typography, navigationStyles.title, {
                                        [classes.typographyInMasthead]: this.state.mastheadIsInView,
                                        [classes.typographyBelowMasthead]: !this.state.mastheadIsInView
                                    })}
                                                variant="h6"
                                    >
                                        |
                                    </Typography>
                                </Grid>
                            </Box>
                            <Hidden smDown>
                                <Grid item>
                                    <Box className={navigationStyles.titleLogo}
                                         display={this.toggleTitleDisplay()}
                                    >
                                        <Typography className={clsx(navigationStyles.typography, navigationStyles.title, {
                                            [classes.typographyInMasthead]: this.state.mastheadIsInView,
                                            [classes.typographyBelowMasthead]: !this.state.mastheadIsInView
                                        })}
                                                    variant="h6"
                                        >
                                            {firstName} {lastName}
                                        </Typography>
                                        <Hidden mdDown>
                                            <Typography className={clsx(navigationStyles.typography, navigationStyles.title, {
                                                [classes.typographyInMasthead]: this.state.mastheadIsInView,
                                                [classes.typographyBelowMasthead]: !this.state.mastheadIsInView
                                            })}
                                            >
                                                |
                                            </Typography>
                                            <Typography className={clsx(navigationStyles.typography, navigationStyles.tagline, {
                                                [classes.typographyInMasthead]: this.state.mastheadIsInView,
                                                [classes.typographyBelowMasthead]: !this.state.mastheadIsInView
                                            })}
                                            >
                                                {tagline}
                                            </Typography>
                                        </Hidden>
                                    </Box>
                                </Grid>
                            </Hidden>
                            <Grid item>
                                <SocialIcons hoverFill='#3bcfb4' fillInMasthead='#ffffff' fillBelowMasthead='#616161'/>
                            </Grid>
                        </Grid>
                    </Box>
                </Hidden>
            </div>
        )
    }
    
    render() {
        if (this.state.renderNavbar === null || this.state.renderNavbar) {
            return (
                <div>
                    {this.renderContent()}
                </div>
            )
        } else if (this.state.renderNavbar === false) {
            return (
                <div>
                    {this.renderMobileMenu()}
                </div>
            )    
        }
    }
}

export default withStyles(styles)(Navigation);