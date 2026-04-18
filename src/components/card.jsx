import React from 'react';
import PropTypes from 'prop-types';
import './card.css';

const Card = ({ children, className, ...props }) => {
  return (
    <div className={`card ${className || ''}`} {...props}>
      {children}
    </div>
  );
};

const CardContent = ({ children, className, ...props }) => {
  return (
    <div className={`card-content ${className || ''}`} {...props}>
      {children}
    </div>
  );
};

const CardTitle = ({ children, className, ...props }) => {
  return (
    <h3 className={`card-title ${className || ''}`} {...props}>
      {children}
    </h3>
  );
};

const CardSubtitle = ({ children, className, ...props }) => {
  return (
    <p className={`card-subtitle ${className || ''}`} {...props}>
      {children}
    </p>
  );
};

const CardBody = ({ children, className, ...props }) => {
  return (
    <div className={`card-body ${className || ''}`} {...props}>
      {children}
    </div>
  );
};

const CardActions = ({ children, className, ...props }) => {
  return (
    <div className={`card-actions ${className || ''}`} {...props}>
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

CardContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

CardTitle.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

CardSubtitle.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

CardBody.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

CardActions.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Card.Content = CardContent;
Card.Title = CardTitle;
Card.Subtitle = CardSubtitle;
Card.Body = CardBody;
Card.Actions = CardActions;

export default Card;
