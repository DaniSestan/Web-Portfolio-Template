import React from 'react';
import {withStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Hidden from "@material-ui/core/Hidden";
import Box from "@material-ui/core/Box";
import axios from "axios";

import workStyles from './Work.module.css';


const styles = theme => ({
    header: {
        color: 'rgba(0, 0, 0, 0.5)'
    },
});

class Work extends React.Component {
    state = {
        data: null,
        displaySubtitle: 'none',
        hoveredTile: null
    };

    getData(){
        axios.get('/resumeData.json')
            .then(res => {
                this.setState({data: res.data.portfolio});
            });
    };

    componentDidMount() {
        this.getData();
    }
    
    renderSubtitle (i) {
        if (i !== this.state.hoveredTile)
            return 'none';
    }
    
    getTileHeight (i) {
        if (i === this.state.hoveredTile)
            return '100%';
    }
    
    
    renderProjects (cellHeight, cols) {
        const data = this.state.data;
        
        if (data) {
            return (
                <GridList cellHeight={cellHeight}
                          className={workStyles.gridList}
                          cols={cols}
                >
                    {this.state.data.projects.map((tile, i) => {
                        return (
                            <GridListTile key={i}
                                          onMouseOver={() => { this.setState({ hoveredTile: i })}}
                                          onMouseOut={() => { this.setState({ hoveredTile: null })}}
                            >
                                <img src={'/images/portfolio/' + tile.image} 
                                     alt={tile.title}
                                />
                                <a href={tile.url}>
                                    <GridListTileBar
                                        className={workStyles.tileBar}
                                        title = {
                                            <span className={workStyles.tileBarTitle}>
                                                {tile.title}
                                            </span>
                                        }
                                        subtitle=
                                            {
                                                <span id={i}
                                                  className={workStyles.tileBarSubtitle}
                                                  style={{display: this.renderSubtitle(i)}}
                                                >
                                                <br/>
                                                {tile.description}
                                                </span>
                                            }
                                        style={{height: this.getTileHeight(i)}}
                                    />
                                </a>
                            </GridListTile>
                        )
                    })}
                    <GridListTile id='childObjPlaceholder'
                                  style={{display: 'none' }}
                    />
                </GridList>
                
            )
        }
    }    
    
    render () {
        const { classes } = this.props;
        
        return (
            <div id="work"
                 className={workStyles.workOuterWrapper}
            >
                <Grid container
                      direction="column"
                      justify="center"
                      alignItems="center"
                >
                    <Grid item
                          className={workStyles.headerGridItem}
                    >
                        <Typography variant="h4" 
                                    className={[classes.header, workStyles.header].join(' ')}>
                            Check out some of my projects and posts.
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Hidden only={['sm', 'md', 'lg', 'xl']}>
                            <div className={workStyles.xsRes}>
                                {this.renderProjects(200, 1)}
                            </div>
                        </Hidden>
                        <Hidden only={['xs', 'md', 'lg', 'xl']}>
                            <div className={workStyles.smRes}>
                                {this.renderProjects(300, 2)}
                            </div>
                        </Hidden>
                        <Hidden only={['xs', 'sm', 'lg', 'xl']}>
                            <div>
                                {this.renderProjects(250, 3)}
                            </div>
                        </Hidden>
                        <Hidden only={['xs', 'sm', 'md']}>
                            <div style={{width: '1200px'}}>
                                {this.renderProjects(200, 4)}
                            </div>
                        </Hidden>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(Work);