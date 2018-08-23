import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import noop from 'noop';
import objectAssign from 'object-assign';
import Quill from 'quill';

export default class extends Component {
  /*===properties start===*/
  static propTypes = {
    className: PropTypes.string,
    options: PropTypes.object,
  };

  static defaultProps = {
    options: {
      theme: 'snow'
    }
  };
  /*===properties end===*/

  constructor(inProps) {
    super(inProps);
    this.state = {
    };
  }

  componentDidMount() {
    const { options } = this.props;
    this.instance = new Quill(this.root, options);
  }

  render() {
    const { className, ...props } = this.props;
    return (
      <section ref={(root) => this.root = root} className={classNames('react-quill', className)} {...props} />
    );
  }
}
