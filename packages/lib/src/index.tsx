import cx from 'classnames';
import { ReactNode, FC, HTMLAttributes } from "react";

const CLASS_NAME = "react-component-library";

export type AnonymousProps = {
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

type AnonymousComponent = FC<AnonymousProps> & { version?: string };

const Anonymous: AnonymousComponent = ({ className, children, ...rest }) => (
  <div {...rest} data-component={CLASS_NAME} className={cx(CLASS_NAME, className)}>
    {children}
  </div>
);

Anonymous.displayName = CLASS_NAME;
Anonymous.version = __VERSION__;

export default Anonymous;
