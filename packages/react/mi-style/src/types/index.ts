import { CSSInterpolation, CSSObject } from "@emotion/css";
import { ComponentPropsWithRef, ReactElement } from "react";

export interface MiStyle {
  apply: (props, theme?) => Partial<CSSStyleDeclaration>;
  propsNames?: string[];
}

export interface CreateMiOptions {
  tagName: string | React.ReactElement;
  styles?: MiStyle[];
  classSet?: { [key: string]: string[] | string };
  cssSet?: (theme: Theme) => { [key: string]: CSSInterpolation };
  className?: string;
  css?: CSSInterpolation | CSSInterpolation[];
}

export interface Theme {
  unit?: number;
  media?: Media<string>;
  color?: { [key: string]: string };
  createSet?: (theme: Theme) => { [key: string]: any };
  set?: { [key: string]: any };
}

export interface Media<T> {
  mobile?: T;
  tablet?: T;
  desktop?: T;
}

export type CreateMiInterface = <T>(options: CreateMiOptions) => React.ForwardRefExoticComponent<React.PropsWithoutRef<T & ({ set?: string } & React.AllHTMLAttributes<any>)> & React.RefAttributes<any>>;


export type Result<T> = (props: T & {
  children?: React.ReactNode;
}, context?: any) => ReactElement | null;

export type NumberOrString = number | string;
