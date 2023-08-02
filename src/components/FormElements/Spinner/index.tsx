import { InnerInput } from "../Input/input";
import { Icon } from "../../Icon";
import { useClassList } from "../../utils/useProps";
import createField from "../../utils/createField";

type SpinnerProps = {
    classList?: any,
    class?: string,
    size?: 'small'|'default'|'large',
    name?: string,
    value?: number | Function[],
    style?: any,
    max?: number,
    min?: number,
    step?: number,
    loop?: boolean,
    onChange?: Function,
    onPlus?: Function,
    onSub?: Function,
    disabled?: boolean
}
export function Spinner (props: SpinnerProps) {
    const classList = () => useClassList(props, 'cm-spinner', {
        [`cm-spinner-${props.size}`]: props.size,
        'cm-spinner-disabled': props.disabled
    });

    const [value, setValue] = createField(props, Math.max(0, props.min ?? 0));

    const _onInput = (val: string, e: any) => {
        val = val.replace(/[^0-9\.]/g, '');
        e.target.value = val;
    };

    const _onKeyDown = (e: any) => {
        if (e.keyCode === 38) {
            plus();
        }
        if (e.keyCode === 40) {
            sub();
        }
    };

    let min = props.min || 0;
    let step = props.step || 1;
    const _onChange = (value: number) => {
        let val = value;
        if (props.max !== undefined) {
            val = Math.min(val, props.max);
        }
        if (min !== undefined) {
            val = Math.max(val, min);
        }
        
        Promise.resolve().then(() => {
            setValue(val);
        })
        
        props.onChange && props.onChange(val);
    };

    /**
     * 增加
     * @memberof Spinner
     */
    const plus = () => {
        if (props.disabled) {
            return;
        }
        let v = add(value(), step);
        if (props.loop && props.max !== undefined && min !== undefined && v > props.max) {
            const off = v - props.max;
            v = min + off - 1;
        }

        if (props.max !== undefined) {
            v = Math.min(props.max, v);
        }
        
        setValue(v);
        props.onChange && props.onChange(v);
        props.onPlus && props.onPlus(v, step);
    }

    /**
     * 减少
     * @memberof Spinner
     */
    const sub = () => {
        if (props.disabled) {
            return;
        }
        let v = add(value(), -step);
        if (props.loop && props.max !== undefined && min !== undefined && v < min) {
            const off = v - min;
            v = props.max + off + 1;
        }
        if (min !== undefined) {
            v = Math.max(min, v);
        }
        
        setValue(v);
        props.onChange && props.onChange(v);
        props.onSub && props.onSub(v, step);
    }

    /**
     * 解决数字浮点型双精度问题
     * @param {[type]} num1 [description]
     * @param {[type]} num2 [description]
     */
    function add (num1: number, num2: number): number {
        let r1; let r2; let m;
        try {
            r1 = num1.toString().split('.')[1].length;
        } catch (e) {
            r1 = 0;
        }
        try {
            r2 = num2.toString().split('.')[1].length;
        } catch (e) {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2));
        return (num1 * m + num2 * m) / m;
    }

    return <div classList={classList()} style={props.style}>
        <InnerInput size={props.size} disabled={props.disabled} onInput={_onInput} notCreateFiled value={[value, setValue]} 
            onChange={_onChange} onKeyDown={_onKeyDown} append={
                <>
                    <span class='cm-spinner-plus' onClick={plus}>
                        <Icon name='chevron-up' size={12}/>
                    </span>
                    <span class='cm-spinner-subs' onClick={sub}>
                        <Icon name='chevron-down' size={12}/>
                    </span>
                </>
            }/>
    </div>
}