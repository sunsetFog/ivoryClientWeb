import React, { Component } from 'react';

import { Menu } from 'antd';
// antd 图标和导航菜单
import { AppstoreOutlined } from '@ant-design/icons';

import routesArr from '@/router/index';
import history from '@/utils/history';
import withNavigation from '@/@energy/ivoryDesign/@higherOrder/withNavigation';

class menuDesign extends Component {
    state = {
        box1: [{ label: '哈哈', key: '/' }],
        listArr: [
            {
                label: '类组件',
                key: 'type1',
                icon: <AppstoreOutlined />,
                children: [],
            },
            {
                label: '函数组件',
                key: 'type2',
                icon: <AppstoreOutlined />,
                children: [],
            },
            {
                label: '业务模块',
                key: 'type3',
                icon: <AppstoreOutlined />,
                children: [],
            },
            {
                label: '表单',
                key: 'type4',
                icon: <AppstoreOutlined />,
                children: [],
            },
        ],
        openOfKeys: [],
    };
    constructor(props) {
        super(props);
        let routesArr1 = JSON.parse(JSON.stringify(routesArr));
        let routesArr2 = routesArr1[1].children;
        for (let i = 0; i < this.state.listArr.length; i++) {
            let item = this.state.listArr[i];
            for (let k = 0; k < routesArr2.length; k++) {
                let row = routesArr2[k];
                if (item.key == row.menuType) {
                    item.children.push({
                        label: row.name,
                        key: row.path,
                    });
                }
            }
            for (let i = 0; i < routesArr1.length; i++) {
                let row = routesArr1[i];
                if (item.key == row.menuType) {
                    item.children.push({
                        label: row.name,
                        key: row.path,
                    });
                }
            }
        }

        console.log('--listArr--', this.state.listArr);
    }
    menuWay(value) {
        console.log('--menuWay--', value, '---', this);
        // history.push(value.key);
        // @ts-ignore
        this.props.navigate(value.key);
    }
    onOpenChange(keys) {
        this.setState({
            openOfKeys: [keys[keys.length - 1]],
        });
    }
    render() {
        const {
            state: { listArr, openOfKeys },
        } = this;
        return (
            <section>
                <Menu
                    openKeys={openOfKeys}
                    onClick={this.menuWay.bind(this)}
                    onOpenChange={this.onOpenChange.bind(this)}
                    defaultSelectedKeys={['1']}
                    mode='inline'
                    items={listArr}
                />
            </section>
        );
    }
}

export default withNavigation(menuDesign);
