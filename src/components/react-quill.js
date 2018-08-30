import React, { Component, Fragment } from 'react';
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
    objectAssign(options, { modules: { toolbar: this.toolbar } });
    this.quill = new Quill(this.container, options);
    this.quill.on('editor-change', this._onEditorChange);
    this.html = value;
  }

  componentWillReceiveProps(inProps) {
    const { value } = inProps;
    if (value !== this.html) {
      this.html = value;
    }
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
      <Fragment>
        <div ref={(toolbar) => this.toolbar = toolbar}>
          <span className="ql-formats">
            <select className="ql-font"></select>
            <select className="ql-size"></select>
          </span>
          <span className="ql-formats">
            <button className="ql-bold"></button>
            <button className="ql-italic"></button>
            <button className="ql-underline"></button>
            <button className="ql-strike"></button>
          </span>
          <span className="ql-formats">
            <select className="ql-color"></select>
            <select className="ql-background"></select>
          </span>
          <span className="ql-formats">
            <button className="ql-script" value="sub"></button>
            <button className="ql-script" value="super"></button>
          </span>
          <span className="ql-formats">
            <button className="ql-header" value="1"></button>
            <button className="ql-header" value="2"></button>
            <button className="ql-blockquote"></button>
            <button className="ql-code-block"></button>
          </span>
          <span className="ql-formats">
            <button className="ql-list" value="ordered"></button>
            <button className="ql-list" value="bullet"></button>
            <button className="ql-indent" value="-1"></button>
            <button className="ql-indent" value="+1"></button>
          </span>
          <span className="ql-formats">
            <button className="ql-direction" value="rtl"></button>
            <select className="ql-align"></select>
          </span>
          <span className="ql-formats">
            <button className="ql-link"></button>
            <button className="ql-image"></button>
            <button className="ql-video"></button>
            <button className="ql-formula"></button>
          </span>
          <span className="ql-formats">
            <button className="ql-clean"></button>
          </span>
        </div>
        <section ref={(container) => this.container = container} className={classNames('react-quill', className)} {...props} />
      </Fragment>
    );
  }
}
