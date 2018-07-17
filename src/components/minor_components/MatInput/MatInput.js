// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import FormControl from '@material-ui/core/FormControl';

// const styles = theme => ({
//   container: {
//     display: 'flex',
//     flexWrap: 'wrap',
//   },
//   formControl: {
//     margin: theme.spacing.unit,
//   },
// });

// class MatInput extends Component {
//   constructor(props) {
//     super(props);
//   }

//   handleChange = event => {
//     this.setState({ name: event.target.value });
//   };

//   render() {
//     const { classes } = this.props;

//     return (
//       <div className={classes.container}>
//         <FormControl className={classes.formControl}>
//           <InputLabel htmlFor="name-simple">Search for a song here</InputLabel>
//           <Input id="name-simple" onChange={this.handleChange} />
//         </FormControl>
//       </div>
//     );
//   }
// }

// MatInput.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(MatInput);



import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  textFieldRoot: {
    padding: 0,
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  textFieldError: {
    border: '1px solid red',
  },
  textFieldInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 12px',
    width: 'calc(100% - 24px)',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
  textFieldFormLabel: {
    fontSize: 18,
  },
});

function MatInput(props) {
  const { classes } = props;

  // const checkField = () => {
  //   // some condition to check for error
  //   let errorVariable = true
  // }

  return (
    <div className={ classes.container} >
      <TextField
        label={ props.label }
        placeholder={ props.placeholder }
        name={ props.name }
        value={ props.value }
        onChange={ props.onChange }
        InputProps={{
          disableUnderline: true,
          classes: {
            root: classes.textFieldRoot,
            input: classes.textFieldInput,
          },
        }}
        InputLabelProps={{
          shrink: true,
          className: classes.textFieldFormLabel,
        }}
      />
    </div>
  );
}

export default withStyles(styles)(MatInput);