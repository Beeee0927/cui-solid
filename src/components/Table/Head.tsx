import { Accessor, For, createComputed, createEffect, onCleanup, onMount } from "solid-js"
import { Cell } from "./Cell";

import { TableStore, ColumnProps } from '.';
import { Colgroup } from "./Colgroup";

type HeadProps = {
    data: TableStore,
    sticky?: boolean,
    onInitColumnWidth: Function,
    onResizeHeader: Function,
    virtual?: boolean
}

export function Head(props: HeadProps) {
    let thead: any;
    let headerWrap: any;
    const onWrapEntry = (entry: ResizeObserverEntry) => {
        const el = entry.target;
        const index = el.getAttribute("data-index");
        
        if (index) {
            const idx = parseInt(index);
            if (el) {
                props.onInitColumnWidth(idx, el.getBoundingClientRect().width);
            }
        }
    }
    const onHeadEntry = (entry: ResizeObserverEntry) => {
        const el = entry.target;
        if (el.tagName === 'THEAD') {
            const rect = el.getBoundingClientRect();
            props.onResizeHeader(rect.width, rect.height);
            headerWrap.style.height = rect.height + 'px';
        } else {
            // setTimeout, header变化让body设置height后再计算是否有垂直滚动条
            setTimeout(() => {
                const rect = el.getBoundingClientRect();
                const parentRect = el.closest(".cm-table-body")!.getBoundingClientRect();
                
                if (rect.height > parentRect.height) {
                    headerWrap.style.overflowY = 'scroll';
                } else {
                    headerWrap.style.overflowY = '';
                }
            })
        }
    }

    const ro = new ResizeObserver((entries) => {
        entries.forEach((entry) => onWrapEntry(entry));
    });

    createEffect(() => {
        const columns = props.data.columns;
        if (columns.length) {
            setTimeout(() => {
                const childs = thead.querySelectorAll('th');
                const len = childs.length;
                for (let i = 0; i < len; i++) {
                    ro.unobserve(childs[i]);
                    ro.observe(childs[i]);
                }
            })
        }
    })

    onCleanup(() => {
        const childs = thead.querySelectorAll('th');
        const len = childs.length;
        for (let i = 0; i < len; i++) {
            childs[i] && ro.unobserve(childs[i]);
        }
    });

    onMount(() => {
        const ro2 = new ResizeObserver((entries) => {
            entries.forEach((entry) => onHeadEntry(entry));
        });
        ro2.observe(thead);
        const parent = thead.closest('.cm-table');
        const body = parent.querySelector('.cm-table-body-wrap');
        ro2.observe(body);
        onCleanup(() => {
            ro2.unobserve(thead);
            ro2.unobserve(body);
        });
    })

    const headStyle: any = () => ({
        'position': props.sticky ? 'sticky' : '',
        // position: 'absolute',
        'top': 0,
        'z-index': 2,
        'min-width': '100%',
        'overflow-x': 'hidden'
    });

    createEffect(() => {
        if (headerWrap) {
            headerWrap.scrollLeft = props.data.headerLeft;
        }
    });

    return <div class="cm-table-header" style={headStyle()} ref={headerWrap}>
        <table>
            <Colgroup data={props.data}/>
            <thead ref={thead}>
                <tr>
                    <For each={props.data.columns}>
                        {(col: ColumnProps, index: Accessor<number>) => {
                            return <Cell column={col} type='th' showFixedLeft={props.data.showFixedLeft} colIndex={index()}
                            showFixedRight={props.data.showFixedRight} checkedAll={props.data.checkedAll} ref={(el: Element) => {
                                Promise.resolve().then(() => {
                                    props.onInitColumnWidth(index(), el.getBoundingClientRect().width);
                                })
                            }}/>
                        }}
                    </For>
                </tr>
            </thead>
        </table>
    </div>
}