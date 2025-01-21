import type { JSX } from 'solid-js'
export interface InputProps
  extends Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'onInput'> {
  classList?: any
  class?: any
  children?: any
  style?: any
  name?: string
  disabled?: boolean
  size?: 'small' | 'default' | 'large'
  type?: string
  append?: any
  prepend?: any
  prefix?: any
  suffix?: any
  suffixStyle?: any
  prefixStyle?: any
  clearable?: boolean
  value?: any
  placeholder?: string
  autocomplete?: string
  onChange?(value: any): void
  onEnter?(value: any): void
  onKeyDown?(e: any): void
  onKeyUp?(e: any): void
  onInput?(value: any, e: any): void
  onBlur?: (e: any) => void
  onCompositionStart?: (e: any) => void
  onCompositionEnd?: (e: any) => void
  trigger?: string
  ref?: any
  password?: boolean
  wordCount?: boolean
  maxLength?: number
  autoHeight?: boolean
  rows?: number
  asFormField?: boolean
}
export declare function Input(props: InputProps): JSX.Element
