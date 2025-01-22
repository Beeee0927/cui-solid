import {
  createSignal,
  For,
  Switch,
  Match,
  onMount,
  createMemo,
  createRenderEffect,
  Suspense
} from 'solid-js'
import { View, HView, VView, Space, BothSide } from '@/components/Layout'
import { Menu, MenuItem, SubMenu } from '@/components/Menu'
import './index.less'
import { menuData } from './menuData'
import logo from './assets/images/logo.svg'
import { Image } from '@/components/Image'
import { Text } from '@/components/Typography/Text'
import type { RouteRecordName } from 'solid-vue-router'
import { RouterView, useRouter, useRoute } from 'solid-vue-router'
import { Dropdown, DropdownItem, DropdownMenu } from '@/components/Dropdown'
import { Popover } from '@/components/Popover'
import { FeatherChevronDown } from 'cui-solid-icons/feather'
import { Spin } from '@/components'

export const Page = (props: any) => {
  const router = useRouter()
  const [activeName, setActiveName] = createSignal<RouteRecordName>('')
  const [theme, setTheme] = createSignal<string>('light')
  onMount(() => {
    setTimeout(() => {
      const route = useRoute()
      setActiveName(route.name!)
    })
  })
  const switchTheme = (theme: string) => {
    setTheme(theme)
    document.body.setAttribute('theme-mod', theme)
  }
  return (
    <HView class="sys-bottom">
      <nav class="sys-nav">
        <Menu
          activeName={[activeName, setActiveName]}
          accordion
          onSelect={(name: string, data: any) => {
            // window.location.hash = data.to;
            // navigate(data.to)
            router.push({ name })
          }}
        >
          <For each={menuData}>
            {(item: any) => {
              return (
                <Switch>
                  <Match when={item.type === 'SubMenu'}>
                    <SubMenu title={item.title} name={item.name}>
                      <For each={item.children}>
                        {(aItem: any) => {
                          aItem.to = item.path + '/' + aItem.path
                          return (
                            <MenuItem name={aItem.name} data={aItem}>
                              {aItem.title}
                            </MenuItem>
                          )
                        }}
                      </For>
                    </SubMenu>
                  </Match>
                  <Match when={item.type === 'MenuItem'}>
                    <MenuItem name={item.name} data={item}>
                      {item.title}
                    </MenuItem>
                  </Match>
                </Switch>
              )
            }}
          </For>
        </Menu>
      </nav>
      <HView class="sys-main">
        <header class="sys-header">
          <BothSide>
            <Space dir="h" align="center">
              <Image src={logo} width={36} placeholder="" />
              <Text strong style={{ 'margin-left': '10px', color: '#fff' }}>
                CUI/SolidJs
              </Text>
              <Dropdown
                onSelect={(v: string) => {
                  if (v === 'cui-admin') {
                    window.open('https://zitie.cqb325.cn/cui-admin/', '_blank')
                  }
                }}
                menu={
                  <DropdownMenu>
                    <DropdownItem name="cui-admin">
                      <Space dir="h" size={16}>
                        <Image src={logo} width={24} placeholder="" />
                        <Space dir="v" size={0}>
                          <div>CUI-Admin</div>
                          <div>权限管理开发平台</div>
                        </Space>
                      </Space>
                    </DropdownItem>
                  </DropdownMenu>
                }
              >
                <div style={{ 'margin-left': '100px' }}>
                  <Text strong style={{ color: '#fff' }}>
                    预览
                  </Text>
                  <FeatherChevronDown />
                </div>
              </Dropdown>
            </Space>
            <Space dir="h" align="center">
              <a
                href="https://github.com/cqb325/cui-solid"
                target="_blank"
                style={{ display: 'inline-flex' }}
              >
                <svg
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2425"
                  width="24"
                  height="24"
                >
                  <path
                    d="M113.777778 550.968889a409.201778 409.201778 0 0 0 274.033778 386.161778c21.504 5.404444 18.204444-9.898667 18.204444-20.309334v-70.826666c-124.017778 14.506667-129.080889-67.527111-137.386667-81.237334-17.066667-28.444444-56.547556-36.010667-44.714666-49.720889 28.444444-14.506667 56.888889 3.640889 90.396444 52.906667a86.414222 86.414222 0 0 0 95.061333 23.779556 115.313778 115.313778 0 0 1 31.687112-55.580445c-128.512-22.755556-182.044444-101.432889-182.044445-194.673778A179.939556 179.939556 0 0 1 303.160889 420.977778a159.288889 159.288889 0 0 1 4.494222-109.681778 187.107556 187.107556 0 0 1 112.583111 41.415111A397.084444 397.084444 0 0 1 523.377778 340.366222a397.425778 397.425778 0 0 1 103.765333 12.686222 183.352889 183.352889 0 0 1 110.876445-40.163555 160.540444 160.540444 0 0 1 5.006222 108.088889 179.996444 179.996444 0 0 1 44.714666 120.945778c0 93.411556-53.930667 171.918222-182.784 194.56a116.508444 116.508444 0 0 1 34.816 82.716444v102.798222c0.739556 8.248889 0 16.384 13.710223 16.384A408.974222 408.974222 0 1 0 113.777778 550.968889z"
                    fill="#000000"
                    fill-opacity="0.9"
                    p-id="2426"
                  />
                </svg>
              </a>
              <a
                href="https://gitee.com/cqb325/cui-solid"
                target="_blank"
                style={{ display: 'inline-flex' }}
              >
                <svg
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2277"
                  width="24"
                  height="24"
                >
                  <path
                    d="M512 960c-246.4 0-448-201.6-448-448s201.6-448 448-448 448 201.6 448 448-201.6 448-448 448z"
                    fill="#D81E06"
                    p-id="2278"
                  />
                  <path
                    d="M721.664 467.968h-235.52a22.272 22.272 0 0 0-20.736 20.736v51.776c0 10.368 10.368 20.736 20.736 20.736H628.48c10.368 0 20.736 10.304 20.736 20.672v10.368c0 33.664-28.48 62.08-62.144 62.08H392.896a22.272 22.272 0 0 1-20.672-20.672V436.928c0-33.664 28.48-62.08 62.08-62.08h287.36a22.272 22.272 0 0 0 20.736-20.736v-51.84a22.272 22.272 0 0 0-20.736-20.672h-287.36A152.96 152.96 0 0 0 281.6 434.368v287.36c0 10.304 10.368 20.672 20.736 20.672h302.848c75.072 0 137.216-62.08 137.216-137.216v-116.48a22.272 22.272 0 0 0-20.736-20.736z"
                    fill="#FFFFFF"
                    p-id="2279"
                  />
                </svg>
              </a>
              <Switch>
                <Match when={theme() === 'light'}>
                  <Popover content="切换到暗色模式" align="bottomRight" arrow>
                    <span
                      onClick={switchTheme.bind(null, 'dark')}
                      style={{ display: 'flex', 'align-self': 'center' }}
                    >
                      <svg
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="20457"
                        width="24"
                        height="24"
                      >
                        <path
                          d="M935.538601 630.40178c-11.43005-11.432249-28.673759-14.738607-43.531086-8.353536-46.733115 20.10317-96.362866 30.296859-147.50719 30.296859-99.589478 0-193.221796-38.783705-263.640252-109.20316-108.636744-108.636744-139.609745-270.022125-78.9083-411.148441 6.388069-14.85233 3.078713-32.098837-8.353536-43.532285-11.432249-11.432249-28.675758-14.743604-43.532285-8.354536-52.637312 22.64025-100.017388 54.809439-140.82552 95.616372-85.346135 85.346135-132.346869 198.821199-132.346869 319.519766 0 120.699566 47.001733 234.172631 132.347868 319.518766s198.821199 132.349067 319.517567 132.349067c120.699566 0 234.172431-47.002932 319.520765-132.351066 40.808132-40.810131 72.977122-88.190207 95.615373-140.82552C950.282205 659.081735 946.971849 641.834029 935.538601 630.40178z"
                          fill="#272636"
                          p-id="20458"
                        />
                      </svg>
                    </span>
                  </Popover>
                </Match>
                <Match when={theme() === 'dark'}>
                  <Popover content="切换到亮色模式" align="bottomRight" arrow>
                    <span
                      onClick={switchTheme.bind(null, 'light')}
                      style={{ display: 'flex', 'align-self': 'center' }}
                    >
                      <svg
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="19393"
                        width="24"
                        height="24"
                      >
                        <path
                          d="M512.001559 773.066053c-69.732521 0-135.292072-27.155389-184.600241-76.463558-49.309168-49.309168-76.463758-114.86772-76.463758-184.60124 0-69.732521 27.155589-135.292072 76.463758-184.600241s114.86772-76.463758 184.600241-76.463758c69.733521 0 135.292072 27.155589 184.60124 76.463758 49.308169 49.309168 76.463558 114.86772 76.463558 184.600241 0 69.733521-27.155389 135.292072-76.463558 184.60124C647.292831 745.910465 581.73508 773.066053 512.001559 773.066053zM512.001559 308.950723c-111.962489 0-203.050532 91.088042-203.050532 203.050532s91.088042 203.050532 203.050532 203.050532 203.050532-91.088042 203.050532-203.050532S623.964048 308.950723 512.001559 308.950723zM163.915162 541.008388 105.900695 541.008388c-16.020138 0-29.007133-12.986995-29.007133-29.007333 0-16.020138 12.986995-29.007133 29.007133-29.007133l58.014466 0c16.020138 0 29.007133 12.986995 29.007133 29.007133C192.922295 528.021393 179.9353 541.008388 163.915162 541.008388zM918.101623 541.008388l-58.014466 0c-16.020338 0-29.007133-12.986995-29.007133-29.007333 0-16.020138 12.986995-29.007133 29.007133-29.007133l58.014466 0c16.020338 0 29.007133 12.986995 29.007133 29.007133C947.108756 528.021393 934.121761 541.008388 918.101623 541.008388zM512.001559 947.108253c-16.020338 0-29.007333-12.986995-29.007333-29.007133l0-58.014466c0-16.020338 12.986995-29.007133 29.007333-29.007133s29.007133 12.986995 29.007133 29.007133l0 58.014466C541.008892 934.121258 528.020898 947.108253 512.001559 947.108253zM512.001559 192.92279c-16.020338 0-29.007333-12.986995-29.007333-29.007133l0-58.014466c0-16.020338 12.986995-29.007133 29.007333-29.007133 16.020138 0 29.007133 12.986995 29.007133 29.007133l0 58.014466C541.008892 179.934796 528.020898 192.92279 512.001559 192.92279zM227.760275 828.165096c-7.423567 0-14.846934-2.83188-20.510694-8.49564-11.328319-11.328319-11.328319-29.694067 0-41.022387l41.022387-41.022387c11.328319-11.328319 29.695067-11.328319 41.022387 0 11.328319 11.328319 11.328319 29.694067 0 41.022387l-41.022387 41.022387C242.608208 825.333216 235.183841 828.165096 227.760275 828.165096zM761.050304 294.874067c-7.424366 0-14.846134-2.830881-20.511693-8.496439-11.32732-11.328319-11.32732-29.694067 0-41.022387l41.022387-41.022387c11.328319-11.32732 29.694067-11.328319 41.022387 0 11.32732 11.328319 11.32732 29.694067 0 41.022387l-41.022387 41.022387C775.898437 292.042187 768.473071 294.874067 761.050304 294.874067zM802.072691 828.165096c-7.423567 0-14.847134-2.83188-20.511693-8.49564l-41.022387-41.022387c-11.32732-11.328319-11.32732-29.694067 0-41.022387 11.328319-11.328319 29.694067-11.328319 41.022387 0l41.022387 41.022387c11.32732 11.328319 11.32732 29.694067 0 41.022387C816.919824 825.333216 809.496258 828.165096 802.072691 828.165096zM268.782661 294.874067c-7.423567 0-14.846934-2.83188-20.511693-8.49564l-41.022387-41.022387c-11.328319-11.328319-11.328319-29.695067 0-41.022387s29.694067-11.32732 41.022387 0l41.022387 41.022387c11.328319 11.328319 11.328319 29.695067 0 41.022387C283.629795 292.042187 276.206228 294.874067 268.782661 294.874067z"
                          fill="#e6e6e6"
                          p-id="19394"
                        />
                      </svg>
                    </span>
                  </Popover>
                </Match>
              </Switch>
            </Space>
          </BothSide>
        </header>
        <HView class="sys-ctx">
          <HView class="sys-ctx-main">
            <Suspense fallback={<Spin />}>
              <RouterView />
            </Suspense>
          </HView>
        </HView>
      </HView>
    </HView>
  )
}
