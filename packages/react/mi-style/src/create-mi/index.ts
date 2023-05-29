import { cx, css } from '@emotion/css';
import React from 'react';
import { CreateMiInterface } from '../types';
import { ThemeContext } from 'theme/MiProvider';


export const createMi: CreateMiInterface = ({ tagName, styles = [], className, classSet, cssSet, css: cssOption }) => {
  return React.memo(React.forwardRef((props: ({ set?: string } & React.AllHTMLAttributes<any>), ref) => {
    const { theme } = React.useContext(ThemeContext);
    const { set = '' } = props;
    const cssFromstyles = styles.reduce((acc, style) => ({ ...acc, ...style.apply(props, theme) }), {});
    let classes = [css(cssOption), className, props.className];

    const propNames = styles.reduce((acc, style) => acc.concat(style.propsNames ? style.propsNames : []), ['set']);
    const newProps = Object.keys(props).reduce((acc, key) => ({ ...acc, ...(!propNames.includes(key) && { [key]: props[key] }) }), {})

    if (classSet && set) {
      classes.push(...set.split(',').flatMap(s => classSet[s]));
    };

    if (cssSet) {
      classes.push(css(['default'].concat(set.split(',')).map(s => cssSet(theme)[s])));
    }

    classes.push(css(cssFromstyles));

    const newClassName = cx(...classes);

    if (typeof tagName === 'string') {
      return React.createElement(tagName, { ...newProps, ref, className: newClassName });
    } else {
      return React.cloneElement(tagName as React.ReactElement, { ...newProps, ref, className: newClassName });
    }
  }));
}