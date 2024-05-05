// reacthocShare
import React, { useEffect } from 'react';
import { compose } from 'redux';

// component
import Tab1 from './components/tab1';
import Tab2 from './components/tab2';
import Tab3 from './components/tab3';
import Tab4 from './components/tab4';
import Tab5 from './components/tab5';

// static
import { navList } from './constants';
// utils
import { isEmpty } from 'lodash';

// styles
import styles from './index.module.scss';

import { useSetState, useRequest } from 'ahooks';

// services
import { getActiveInfoReq } from './service';

import { formatContent } from './utils';

const DragonBoatFestival = ({ initActiveInfo = {} }) => {
    const router = {
        query: {
            id: 4979,
        },
    };

    let { data: refreshObj = initActiveInfo } = useRequest(getActiveInfoReq, {
        manual: !isEmpty(initActiveInfo),
        defaultParams: [{ id: router.query.id }],
        onSuccess: () => {},
    });
    refreshObj = refreshObj.data || {};
    console.log('--refreshObj--', refreshObj);

    const { webImgPath = '' } = refreshObj;

    const content = formatContent(refreshObj.content);
    const [
        content1_1,
        content1_2,
        content2_1,
        content2_2,
        content2_3,
        content3_1,
        content3_2,
        content4_1,
        content4_2,
        content5_1,
        content5_2,
    ] = content || [];

    const [state, setState] = useSetState({
        activeIndex: 0,
    });

    useEffect(() => {}, []);

    const onActivityChange = (index) => {
        setState({ activeIndex: index });
    };

    const { activeIndex } = state;

    return (
        <section className={styles.DragonBoatFestival}>
            <div className={styles.banner}>
                {webImgPath && <img src={require('./img/banner.png')} alt={''} />}
            </div>

            <section
                className={styles.bgBox}
                style={{
                    background: `url(${require(`./img/img_bg_0${activeIndex + 1}.jpg`)})`,
                }}
            >
                <div className={styles.navList}>
                    <main></main>
                    <div>
                        {navList.map((item, index) => {
                            return (
                                <img
                                    width={230}
                                    height={200}
                                    src={index === activeIndex ? item.activeBg : item.bg}
                                    key={index}
                                    onClick={() => {
                                        onActivityChange(index);
                                    }}
                                />
                            );
                        })}
                    </div>
                </div>

                {activeIndex == 0 && (
                    <Tab1
                        content={{
                            content1_1,
                            content1_2,
                        }}
                    ></Tab1>
                )}
                {activeIndex == 1 && (
                    <Tab2
                        content={{
                            content2_1,
                            content2_2,
                            content2_3,
                        }}
                    ></Tab2>
                )}
                {activeIndex == 2 && (
                    <Tab3
                        content={{
                            content3_1,
                            content3_2,
                        }}
                    ></Tab3>
                )}
                {activeIndex == 3 && (
                    <Tab4
                        content={{
                            content4_1,
                            content4_2,
                        }}
                    ></Tab4>
                )}
                {activeIndex == 4 && (
                    <Tab5
                        content={{
                            content5_1,
                            content5_2,
                        }}
                    ></Tab5>
                )}
            </section>
        </section>
    );
};

export default compose()(DragonBoatFestival);
