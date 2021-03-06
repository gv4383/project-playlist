import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

/* Customizable Material-UI Button */

const styles = {
  default: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    fontSize: '14px'
  },
  button: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 35,
    padding: '0 10px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    fontSize: '12px'
  },
  blue: {
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 35,
    padding: '0 10px',
    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
    fontSize: '12px'
  }
};

function MatButton(props) {
  return (
    <Button
    className={ props.classes[props.classNames] }
    type="submit"
    size={ props.size }
    onClick={ props.clickButton }
    >
      { props.children ? props.children : 'idk' }
    </Button>
  );
}

MatButton.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MatButton);