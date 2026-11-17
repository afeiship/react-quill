import Quill, { Module } from 'quill';
import './style.css';

export const DEFAULT_MAX_LENGTH = 500;

class CounterModule extends Module<{ maxLength: number }> {
  private counter: HTMLSpanElement;
  private maxLength: number;

  constructor(quill: Quill, options: { maxLength: number }) {
    super(quill, options);
    this.maxLength = options.maxLength;

    const { container } = quill.getModule('toolbar') as { container: HTMLElement };
    const counter = document.createElement('span');
    counter.className = 'ql-counter';
    container.appendChild(counter);
    this.counter = counter;

    this.update();
    quill.on('text-change', this.update);
  }

  private update = () => {
    const quill = this.quill;
    const length = Math.min(quill.getLength() - 1, this.maxLength);
    this.counter.textContent = `${length}/${this.maxLength}`;
  };
}

Quill.register('modules/counter', CounterModule);
