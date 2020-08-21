import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import './Modal.css';
import Typography from "@material-ui/core/Typography";

const styles = {
  root: {
    background: ''
  }
}
const InformedConsentModal = ({ children, customClass, show, closeCallback }) => (
  <div className={`modal ${customClass}`} style={{ display: show ? 'block' : 'none'}}>
    <div className="overlay"></div>
      <div className="modal_content">
        <span>
          {children}
        </span>
        <span>
          <div>

            <Grid
            justify="center" 
            direction="row"
            alignItems="center"
            container 
            spacing={0}
            >
              <Grid item>
                <Button
                  color="inherit"
                  aria-label="OK"
                  font="Bold"
                  title="OK"
                  onClick={closeCallback}><Typography style={{ fontSize: '1.5em', fontWeight: `bold`, color: `#000000` }}>OK</Typography>
                </Button>
              </Grid>
            </Grid>
          </div>
        </span>
      </div>
  </div>
);

InformedConsentModal.propTypes = {
  children: PropTypes.element,
  customClass: PropTypes.string,
  show: PropTypes.bool,
  closeCallback: PropTypes.func,
};

InformedConsentModal.defaultProps = {
  children: <div>Empty Modal</div>,
  customClass: '',
  show: false,
  closeCallback: () => (false)
};

export default InformedConsentModal;