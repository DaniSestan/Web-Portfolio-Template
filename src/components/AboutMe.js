import React from 'react';
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from '@material-ui/styles';
import {Link} from "react-scroll";

import Resume from "./Resume";
import aboutMeStyles from './AboutMe.module.css';
import axios from "axios";

const styles = theme => ({
    typography: {
      color: '#ffffff'  
    },
    aboutMePageWrapper: {
        backgroundColor: '#161415',
    },
    bioHeader: {
        color: '#ffffff !important',
    },
    bio: {
        color: '#5e5e5e'  
    },
    contactHeader: {
        color: '#ffffff',
    },
    contactDetails: {
        color: '#5e5e5e'
    },
    credentialsLink: {
        color: '#3f51b5',
        "&:hover": {
            color: '#ffffff'
        }
    }
});

class AboutMe extends React.Component {

    state = {
        data: null,
    };

    componentDidMount() {
        this.getData();
    }

    getData(){
        axios.get('/resumeData.json')
            .then(res => {
                this.setState({resumeData: res.data.main});
            });
    }


    renderContentForDesktopTablet () {
        var data = this.props.data;
        if(data) {
            var selfPortraitURL= data.image;
        }
        return (
            <div className={aboutMeStyles.contentDesktopTablet}>
                <Grid container
                      direction="row"
                      justify="center"
                      alignItems="flex-start"
                >
                    <Grid item>
                        <Box className={aboutMeStyles.imageContainer}>
                            <img src={selfPortraitURL}
                                 alt='dani-sestan'
                                 className={aboutMeStyles.image}
                            />
                        </Box>
                    </Grid>
                    <Grid item className={aboutMeStyles.aboutMePageTextGridItem}>
                        {this.renderContent()}
                    </Grid>
                </Grid>
            </div>
        );
    }
    
    renderContentForMobile () {
      return (
          <div className={aboutMeStyles.contentMobile}>
              {this.renderContent()}
          </div>
      )    
    }
    
    renderContent () {
        const { classes } = this.props;

        var data = this.props.data;
        if(data) {
            var selfPortraitURL = data.image;
            var bio = data.bio;
        }
        
        return (
            <Grid container
                  direction="column"
                  justify="flex-start"
                  alignItems="stretch"
            >
                <Grid item className={aboutMeStyles.bioGridItem}>
                    <Typography className={[classes.typography, aboutMeStyles.bioHeader].join(' ')}>
                        About Me
                    </Typography>
                    <Box clone
                         className={aboutMeStyles.imageGridContainerMobile}
                    >
                        <Grid container
                              direction="column"
                              justify="space-around"
                              alignItems="center"
                        >
                            <Grid item
                                  className={aboutMeStyles.imageGridItemMobile}>
                                <img src={selfPortraitURL}
                                     alt='dani-sestan'
                                     className={aboutMeStyles.image}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Typography className={classes.bio}
                    >
                        {bio}
                    </Typography>
                </Grid>
                {/*Responsive display: desktop and tablet resolution*/}
                <Grid item className={aboutMeStyles.contactDetailsAndResumeGridItemDesktopTablet}>
                    {this.renderContactAndResumeSection('row', 'flex-start', 'center')}
                </Grid>
                {/*Responsive display: mobile resolution*/}
                <Grid item className={aboutMeStyles.contactDetailsAndResumeGridItemMobile}>
                    {this.renderContactAndResumeSection('column', 'flex-start', 'flex-start')}
                </Grid>
            </Grid>
        )    
    };
    
    renderContactAndResumeSection (direction, justify, alignItems) {
        const { classes } = this.props;

        var data = this.props.data;
        if(data) {
            var firstName = data.firstName;
            var lastName = data.lastName;
            // var street = data.address.street;
            var city = data.address.city;
            var state = data.address.state;
            var zip = data.address.zip;
            var email = data.email;
            var phone = data.phone;
            var resumeURL = data.resumeFile;
        }
        
        return (
            <Grid 
                container
                direction={direction}
                justify={justify}
                alignItems={alignItems}
            >
                <Grid item className={aboutMeStyles.contactGridItem}>
                    <Typography className={[classes.contactHeader, aboutMeStyles.contactHeader].join(' ')}>
                        Contact
                    </Typography>
                    <Typography className={[classes.contactDetails, aboutMeStyles.contactDetails].join(' ')}>
                        {firstName} {lastName}
                    </Typography>
                    {/*<Typography className={[classes.contactDetails, aboutMeStyles.contactDetails].join(' ')}>
                           {street}
                       </Typography>*/}
                   <Typography className={[classes.contactDetails, aboutMeStyles.contactDetails].join(' ')}>
                       {city}, {state} {zip}
                   </Typography>
                    <Typography className={[classes.contactDetails, aboutMeStyles.contactDetails].join(' ')}>
                        {phone}
                    </Typography>
                    <Typography className={[classes.contactDetails, aboutMeStyles.contactDetails].join(' ')}>
                        {email}
                    </Typography>
                </Grid>
                <Grid item className={aboutMeStyles.resumeGridItem}>
                    <Button href={resumeURL}
                            variant="outlined"
                            color="primary"
                            download={[lastName, ', ', firstName, ' - Resume'].join('')}
                    >
                        Download Resume
                    </Button>
                    <Link activeClass="active"
                          to="resume"
                          spy={true}
                          smooth={true}
                          offset={0}
                          duration={500}
                    >
                        <Typography className={[classes.credentialsLink, aboutMeStyles.credentialsLink].join(' ')}>
                            View More
                        </Typography>
                    </Link>
                </Grid>
            </Grid>
        );  
    };
    
    render () {
        const { classes } = this.props;
        
        return (
            <div>
                <Box className={[classes.aboutMePageWrapper, aboutMeStyles.aboutMePageWrapper].join(' ')}>
                    <Container>
                        <Grid container
                              direction="column"
                              justify="flex-start"
                              alignItems="center"
                        >
                            {/*hacky, but worky*/}
                            {/*resolves issue with active class appendage upon clicking the corresponding 'react-scroll' link*/}
                            <Grid item>
                                <div className={aboutMeStyles.placeholder} />
                            </Grid>
                            <Grid item id="aboutme">
                                {this.renderContentForDesktopTablet()}
                                {this.renderContentForMobile()}
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
                <Resume/>
            </div>
        )    
    }
}

export default withStyles(styles)(AboutMe);