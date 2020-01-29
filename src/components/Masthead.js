import React from 'react';
import { withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import mastheadStyles from "./Masthead.module.css";

const styles = theme => ({
    //desktop background
    containerWrapper: {
        height: '100% !important',
        backgroundAttachment: 'fixed',
        //change path to match image file
        backgroundImage: `url(/images/masthead-background.png)`,
        // background: '#161415 contain left bottom',
        backgroundSize: 'cover !important',
    },
    //mobile background
    '@media screen and (max-width: 659px)': {
        containerWrapper: {
            backgroundAttachment: 'fixed',
            //change path to match image file
            backgroundImage: `url(/images/masthead-background-mobile.jpg)`,
            backgroundSize: 'cover !important',
        },
        title: {
            color: 'rgba(0, 0, 0, .5) !important'
        },
        subtitle: {
            color: 'rgba(0, 0, 0, .5) !important'
        },
        subtitleItem: {
            borderTop: "solid rgba(0, 0, 0, 0.5) !important",
        }
    },
    title: {
        color: '#ffffff',
        textTransform: 'uppercase',
        display: 'inlineBlock'
    },
    subtitle: {
        color: '#ffffff',
        fontSize: '2em',
        letterSpacing: '.25em',
    },
    subtitleItem: {
        borderTop: 'solid white',
    }
});

class Masthead extends React.Component {
    state = {
        titleWidth: null
    };
    
    componentDidMount() {
        this.calcVH();
        window.addEventListener('onorientationchange', this.calcVH, true);
        window.addEventListener('resize', this.calcVH, true);
    }

    calcVH () {
        var vH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        document.getElementById("mastheadWrapper").setAttribute("style", "height:" + vH + "px;");
    }
    
    render () {
        const { classes } = this.props;

        var data = this.props.data;
        if(data) {
            var firstName = data.firstName;
            var lastName = data.lastName;
            var description = data.description;
        }
        
        return (
            <div className={[classes.containerWrapper, mastheadStyles.containerWrapper].join(' ')}
                id="mastheadWrapper"
            >
                <Grid container
                      direction="column"
                      justify="center"
                      alignItems="center"
                >
                    <Grid item
                          className={mastheadStyles.titleItem}
                    >
                        <Typography variant="h2"
                                    className={classes.title}
                        >
                            I'M
                        </Typography>
                        <Typography variant="h1"
                                    className={classes.title}
                                    id="titleItem"
                        >
                            {firstName}<br/>{lastName}.
                        </Typography>
                    </Grid>
                    <Grid item
                          className={[classes.subtitleItem, mastheadStyles.subtitleItem].join(' ')}
                    >
                        <Typography className={[classes.subtitle, mastheadStyles.subtitle].join(' ')}>
                            {description}
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        )
    }    
}

export default withStyles(styles)(Masthead);