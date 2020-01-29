import React from 'react';
import axios from "axios";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import {Hidden, Typography, withStyles} from "@material-ui/core";

import resumeStyles from './Resume.module.css';
import clsx from "clsx";

const styles = theme => ({
    resumeWrapper: {
        backgroundColor: '#ffffff'
    }
});

class Resume extends React.Component {
    state = {
        data: null,
    };
    
    componentDidMount() {
        this.getData();
    }
    
    getData(){
        axios.get('/resumeData.json')
            .then(res => {
                this.setState({data: res.data.resume});
            });
    };

    render () {
        const { classes } = this.props;

        const data = this.state.data;
        
        if (data) {
            var education = this.state.data.education.map((education, i) => {
                return (
                    <Grid item
                          key={i}
                          className={resumeStyles.detailsInnerGridItem}
                    >
                        <Typography variant="h5"
                                    className={resumeStyles.detailsSubsection1}
                        >
                            {education.school}
                        </Typography>
                        <Typography className={resumeStyles.details}>
                            <span className={resumeStyles.detailsSubsection2}>
                                {education.program}
                            </span>
                            <span>
                                &nbsp;&nbsp;&bull;&nbsp;&nbsp;
                            </span>
                            <span>
                                {education.graduation}
                            </span>
                        </Typography>
                        <Typography className={resumeStyles.detailsSubsection3}>
                            {education.description}
                        </Typography>
                    </Grid>
                )
            });

            var experience = this.state.data.experience.map((experience) => {
                return (
                    <Grid item
                          key={experience.company}
                          className={resumeStyles.detailsInnerGridItem}
                    >
                        <Typography variant="h5"
                                    className={resumeStyles.detailsSubsection1}
                        >
                            {experience.company}
                        </Typography>
                        <Typography className={resumeStyles.details}>
                            <span className={resumeStyles.detailsSubsection2}>
                                {experience.title}
                            </span>
                            <span>
                                &nbsp;&nbsp;&bull;&nbsp;&nbsp;
                            </span>
                            <span>
                                {experience.years}
                            </span>
                        </Typography>
                        <Typography className={resumeStyles.detailsSubsection3}>
                            {experience.description}
                        </Typography>
                    </Grid>
                )
            });
            
            var skillsDescription = this.state.data.skillsDescription;
            
            var skills = this.state.data.skills.map((skill) =>{
                return (
                    <Grid item
                          key={skill.name}
                          className={resumeStyles.toolsGridItem}
                    >
                        <div className={resumeStyles.imageOuterWrapper}>
                            <div 
                                // className={resumeStyles.imageContainer}>
                                className={clsx({
                                    [resumeStyles.imageContainerSm]: skill.imageSize === "small",
                                    [resumeStyles.imageContainerMed]: skill.imageSize === "medium"
                                })}
                            >
                                
                                <img src={'/images/toolIcons/' + skill.image}
                                     alt={skill.name}
                                     className={resumeStyles.image}
                                />
                            </div>
                        </div>
                        <Typography variant="h5" 
                                    className={resumeStyles.toolsName}
                        >
                            {skill.name}
                        </Typography>
                        <Typography className={resumeStyles.toolsDescription}>
                            {skill.description}
                        </Typography>
                    </Grid>
                )
            });
        }
        
        return (
            <div className={classes.resumeWrapper}
                 id="resume"
            >
                <div className={resumeStyles.innerResumeWrapper}>
                    <Container>
                        {/*desktop and tablet resolution*/}
                        <Hidden xsDown>
                            <Grid container
                                  direction="column"
                                  justify="flex-start"
                                  alignItems="stretch"
                            >
                                <Grid item
                                      className={resumeStyles.gridRow}
                                >
                                    <Grid container
                                          direction="row"
                                          justify="center"
                                          alignItems="flex-start"
                                    >
                                        <Grid item
                                              className={resumeStyles.categoryGridItem}
                                        >
                                            <Typography variant="h6"
                                                        className={resumeStyles.categoryTitle}
                                            >
                                                <u className={resumeStyles.categoryUnderline}>
                                                    EDUCATION
                                                </u>
                                            </Typography>
                                        </Grid>
                                        <Grid item
                                              className={resumeStyles.detailsGridItem}
                                        >
                                            <Grid container
                                                  direction="column"
                                                  justify="center"
                                                  alignItems="flex-start"
                                            >
                                                {education}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Divider />
                                <Grid item
                                      className={resumeStyles.gridRow}
                                >
                                    <Grid container
                                          direction="row"
                                          justify="center"
                                          alignItems="flex-start"
                                    >
                                        <Grid item
                                              className={resumeStyles.categoryGridItem}
                                        >
                                            <Typography variant="h6"
                                                        className={resumeStyles.categoryTitle}
                                            >
                                                <u className={resumeStyles.categoryUnderline}>
                                                    EXPERIENCE
                                                </u>
                                            </Typography>
                                        </Grid>
                                        <Grid item
                                              className={resumeStyles.detailsGridItem}
                                        >
                                            <Grid container
                                                  direction="column"
                                                  justify="center"
                                                  alignItems="flex-start"
                                            >
                                                {experience}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Divider />
                                <Grid item
                                      className={resumeStyles.gridRow}
                                >
                                    <Grid container
                                          direction="row"
                                          justify="flex-start"
                                          alignItems="flex-start"
                                    >
                                        <Grid item
                                              className={resumeStyles.categoryGridItem}
                                        >
                                            <Typography variant="h6"
                                                        className={resumeStyles.categoryTitle}
                                            >
                                                <u className={resumeStyles.categoryUnderline}>
                                                    SKILLS
                                                </u>
                                            </Typography>
                                        </Grid>
                                        <Grid item
                                                className={resumeStyles.skillsDescriptionGridItem}
                                        >
                                            <Typography className={resumeStyles.skillsDescriptionTypography}>
                                                {skillsDescription}
                                            </Typography>
                                            
                                        </Grid>
                                    </Grid>
                                    
                                </Grid>
                                <Grid item>
                                    <Grid container
                                          direction="row"
                                          justify="center"
                                          alignItems="flex-start"
                                    >
                                        {skills}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Hidden>
                        {/*mobile resolution*/}
                        <Hidden smUp>
                            <Grid container
                                  direction="column"
                                  justify="space-evenly"
                                  alignItems="stretch"
                            >
                                <Grid item>
                                    <Typography variant="h6"
                                                className={resumeStyles.categoryTitle}
                                    >
                                        <u className={resumeStyles.categoryUnderline}>
                                            EDUCATION
                                        </u>
                                    </Typography>
                                </Grid>
                                {education}
                                <div className={resumeStyles.dividerUpperPadding}/>
                                <Divider />
                                <div className={resumeStyles.dividerLowerPadding}/>
                                <Grid item>
                                    <Typography variant="h6"
                                                className={resumeStyles.categoryTitle}
                                    >
                                        <u className={resumeStyles.categoryUnderline}>
                                            EXPERIENCE
                                        </u>
                                    </Typography>
                                </Grid>
                                {experience}
                                <div className={resumeStyles.dividerUpperPadding}/>
                                <Divider />
                                <div className={resumeStyles.dividerLowerPadding}/>
                                <Grid item>
                                    <Typography variant="h6"
                                                className={resumeStyles.categoryTitle}
                                    >
                                        <u className={resumeStyles.categoryUnderline}>
                                            FAVORITE LANGUAGES <br />& BUILD TOOLS
                                        </u>
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography className={resumeStyles.skillsDescription}>
                                        {skillsDescription}
                                    </Typography>
                                </Grid>
                                {skills}
                            </Grid>
                        </Hidden>
                    </Container>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Resume);