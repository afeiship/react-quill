import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import noop from 'noop';
import objectAssign from 'object-assign';
import Quill from 'quill';
import { html } from 'js-beautify';
import ReactTextarea from 'react-textarea';
import QuillImageUploader from 'quill-image-uploader';


// import modules:
Quill.register('modules/image-uploader', QuillImageUploader);


export default class extends Component {
  /*===properties start===*/
  static propTypes = {
    className: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onUpload: PropTypes.func,
    options: PropTypes.object,
  };

  static defaultProps = {
    onChange: noop,
    onUpload: noop,
    options: {
      theme: 'snow'
    }
  };
  /*===properties end===*/

  constructor(inProps) {
    super(inProps);
    const { value } = inProps;
    this.state = {
      value,
      rawActive: false
    };
  }

  set html(inValue) {
    this.quill.container.firstChild.innerHTML = inValue;
  }

  get html() {
    return this.quill && html(this.quill.container.firstChild.innerHTML, { indent_size: 2 });
  }

  get rawText() {
    const { rawActive } = this.state;
    return rawActive ? '预览' : '源码'
  }

  initOptions() {
    const { options } = this.props;
    objectAssign(options, {
      modules: {
        toolbar: this.toolbar,
        'image-uploader': {
          onChange: this._onImageUpload
        }
      }
    });
  }

  componentDidMount() {
    const { value, options } = this.props;
    this.initOptions();
    this.quill = new Quill(this.container, options);
    this.quill.on('editor-change', this._onEditorChange);
    this.html = value;
  }

  componentWillReceiveProps(inProps) {
    const { value } = inProps;
    if (value !== this.state.value) {
      this.setState({ value });
    }
  }

  componentWillUnmount() {
    this.quill.off('editor-change', this._onEditorChange);
    this.quill = null;
  }

  change(inValue) {
    const { onChange } = this.props;
    this.setState({ value: inValue }, () => {
      onChange({ target: { quill: this.quill, value: this.html } });
    });
  }

  _onEditorChange = (inEvent) => {
    const { rawActive } = this.state;
    if (!rawActive) {
      this.change(this.html);
    }
  };

  _onRawChange = inEvent => {
    const { value } = inEvent.target;
    this.html = value;
    this.change(value);
  };

  _toggleActive = () => {
    const { rawActive } = this.state;
    this.setState({ rawActive: !rawActive });
  };

  _onImageUpload = (inEvent) => {
    const { onUpload } = this.props;
    return onUpload(inEvent);
  };

  render() {
    const { className, options, value, onUpload, ...props } = this.props;
    const { rawActive } = this.state;

    return (
      <section className="react-quill-toolbar">
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
            <select className="ql-align"></select>
            <select className="ql-color"></select>
            <select className="ql-background"></select>
          </span>
          <span className="ql-formats">
            <button className="ql-blockquote"></button>
            <button className="ql-list" value="ordered"></button>
            <button className="ql-list" value="bullet"></button>
          </span>
          <span className="ql-formats">
            <button className="ql-link"></button>
            <button className="ql-image"></button>
            <button onClick={this._toggleActive} className={'react-quill-ql-raw'}>{this.rawText}</button>
          </span>
        </div>
        <section hidden={rawActive} ref={(container) => this.container = container} className={classNames('react-quill', className)} {...props} />
        {rawActive && <ReactTextarea className={'ql-editor react-quill-raw'} value={this.state.value} onChange={this._onRawChange} />}
        <div id="container"></div>
      </section>
    );
  }
}
