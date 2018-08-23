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

  set html(inValue) {
    this.quill.container.firstChild.innerHTML = inValue;
  }

  get html() {
    return this.quill.container.firstChild.innerHTML;
  }

  componentDidMount() {
    const { value, options } = this.props;
    this.quill = new Quill(this.root, options);
    this.quill.on('editor-change', this._onEditorChange);
    this.html = value;
  }

  componentWillUnmount() {
    this.quill.off('editor-change', this._onEditorChange);
    this.quill = null;
  }

  _onEditorChange = () => {
    const { onChange } = this.props;
    onChange({ target: { quill: this.quill, value: this.html } });
  };

  render() {
    const { className, ...props } = this.props;
    return (
      <section ref={(root) => this.root = root} className={classNames('react-quill', className)} {...props} />
    );
  }
}
