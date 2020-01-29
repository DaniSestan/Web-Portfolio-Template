import React from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from "@material-ui/core/Divider";
import Link from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { withStyles } from '@material-ui/styles';

import SocialIcons from "./SocialIcons";
import footerStyles from "./Footer.module.css";
import * as Scroll from "react-scroll";

/* NOTE: To change social icon fill color find the <SocialIcons> tag, and change the 'fillBelowMasthead'
 and the 'hoverFill' attributes. */
const styles = theme => ({
    link: {
      color: '#3bcfb4'  
    },
    wrappingContainer: {
        background: '#161415'  
    },
    arrowIcon: {
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: '2.5em',
        "&:hover": {
            color: "#33b097"
        }
    }
});

let scroll = Scroll.animateScroll;

class Footer extends React.Component {

    scrollToTop () {
        scroll.scrollToTop();
    }
    
    render () {
        const {classes} = this.props;
        
        return (
            <Grid
                container
                direction="column"
                justify="flex-end"
                alignItems="center"
                className={classes.wrappingContainer}
            >
                <Grid item>
                    <Link onClick={this.scrollToTop}>
                        <IconButton edge="start"
                                    aria-label="scrollup"
                        >
                            <KeyboardArrowUpIcon className={classes.arrowIcon}/>
                        </IconButton>
                    </Link>
                </Grid>
                <Grid item>
                    <SocialIcons fillBelowMasthead='rgba(255, 255, 255, 0.5)' hoverFill='#3bcfb4'/>
                </Grid>
                <Grid item>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item className={footerStyles.textLeft}>
                            <Typography className={footerStyles.typography}>
                                © Copyright 2019 Dani Sestan
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Divider className={footerStyles.divider}
                                     orientation="vertical"
                            />
                        </Grid>
                        <Grid item className={footerStyles.textRight}>
                            <Typography className={footerStyles.typography}
                                        style={{display:"inline-block"}}
                            >
                                Design by 
                            </Typography>
                            <Link href='https://github.com/daniasestan'
                                  className={[footerStyles.typography, classes.link].join(' ')}
                                  style={{marginLeft: '.5em'}}>
                                Dani Sestan
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(Footer);