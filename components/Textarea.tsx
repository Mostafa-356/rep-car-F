
import React from 'react';
import { cx, styles } from '../styles';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea: React.FC<TextareaProps> = ({ className, ...props }) => {
  return <textarea className={cx(styles.field, 'min-h-32', className)} {...props} />;
};

export default Textarea;
