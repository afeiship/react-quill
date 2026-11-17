import cx from 'classnames';
import { ReactNode, FC, HTMLAttributes } from "react";

const CLASS_NAME = "react-quill";

export type ReactQuillProps = {
  /**
   * The extended className for component.
   * @default ''
   */
  className?: string;
  /**
   * The children element.
   */
  children?: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

type ReactQuillComponent = FC<ReactQuillProps> & { version?: string };

const ReactQuill: ReactQuillComponent = ({ className, children, ...rest }) => (
  <div {...rest} data-component={CLASS_NAME} className={cx(CLASS_NAME, className)}>
    {children}
  </div>
);

ReactQuill.displayName = CLASS_NAME;
ReactQuill.version = __VERSION__;

export default ReactQuill;
