import { JSXElement } from "solid-js";
import { SelectOptionProps } from "./Option";
export interface SelectOptionGroupProps extends SelectOptionProps {
    group?: boolean;
    children?: JSXElement;
    items?: SelectOptionProps[];
}
export declare function OptionGroup(props: SelectOptionGroupProps): import("solid-js").JSX.Element;
