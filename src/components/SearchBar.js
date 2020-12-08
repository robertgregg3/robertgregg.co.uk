import React from 'react';

import { Paper, TextField } from '@material-ui/core';

class SearchBar extends React.Component{
    state = {
        searchTerm: '',
    }

// when the text is inputted, the search term is now the value of what is typed in the search bar
    handleChange = (event) => this.setState({ searchTerm: event.target.value});

// When the form is submittedm the search term updates the search term on the page through This.props and this.state.
    handleSubmit = (event) => {
        const { searchTerm }   = this.state;
        const { onFormSubmit } = this.props;

// When the form is submitted, run that function with the search term
        onFormSubmit(searchTerm);

        event.preventDefault();
    }

    render(){
        return(
            <Paper elevation={6} style={{ padding: '2rem' }}>
                <form onSubmit={this.handleSubmit}>
                    <TextField fullWidth label="Search..." onChange={this.handleChange} />
                </form>
            </Paper>
        )
    }
}

export default SearchBar;