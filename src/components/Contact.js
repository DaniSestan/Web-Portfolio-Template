import React from 'react';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";

import contactStyles from './Contact.module.css';

class Contact extends React.Component {
    
    state = {
        name: '',
        email: '',
        message: ''
    };
    
    render() {
        return (
            <form id="contact"
                  className={contactStyles.formElement}
            >
                <div className={contactStyles.gridWrapper}>
                    <Grid container
                          direction="column"
                          justify="center"
                          alignItems="flex-start"
                    >
                        <Grid item>
                            <Typography variant="h2"
                                        className={contactStyles.typographyHdr}
                            >
                                Reach out.
                            </Typography>
                        </Grid>
                        <Grid item className={contactStyles.input}>
                            <TextField 
                                required 
                                label="Your Name"
                                onChange={e => this.setState({ name: e.target.value })}
                                value={this.state.name}
                            />
                        </Grid>
                        <Grid item
                              className={contactStyles.input}
                        >
                            <TextField required
                                       label="Your Email"
                                       onChange={e => this.setState({ name: e.target.value })}
                                       value={this.state.email}
                            />
                        </Grid>
                        <Grid item
                              className={contactStyles.input}
                        >
                            <TextareaAutosize required
                                              aria-label="minimum height" 
                                              placeholder="Your message.*"
                                              className={contactStyles.textArea}
                            />
                        </Grid>
                        <Grid item className={contactStyles.submitWrapper}>
                            <Button type="submit">
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </form>      
        )
    }
}

export default Contact;

