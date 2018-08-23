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
    value: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.object,
  };

  static defaultProps = {
    onChange: noop,
    options: {
      theme: 'snow'
    }
  };
  /*===properties end===*/

  componentDidMount() {
    const { options } = this.props;
    this.quill = new Quill(this.root, options);
    this.quill.on('editor-change', this._onEditorChange);
  }

  _onEditorChange = () => {
    const { onChange } = this.props;
    const value = this.quill.container.firstChild.innerHTML;
    onChange({ target: { quill: this.quill, value } });
  };

  render() {
    const { className, ...props } = this.props;
    return (
      <section ref={(root) => this.root = root} className={classNames('react-quill', className)} {...props} />
    );
  }
}
