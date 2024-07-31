import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Mousewheel } from 'swiper/modules';

import 'swiper/css';

function swiperPage() {
    const [heightMove, setHeightOfMove] = useState(0);
    const cardPage1 = () => {
        return <SwiperSlide className={`${styles.cardBox} ${styles.card1}`}></SwiperSlide>;
    };
    const cardPage2 = () => {
        return <SwiperSlide className={`${styles.cardBox} ${styles.card2}`}></SwiperSlide>;
    };
    const cardPage3 = () => {
        return <SwiperSlide className={`${styles.cardBox} ${styles.card3}`}></SwiperSlide>;
    };
    const cardPage4 = () => {
        return <SwiperSlide className={`${styles.cardBox} ${styles.card4}`}></SwiperSlide>;
    };
    useEffect(() => {
        const handleResize = () => {
            // 获取当前的clientHeight
            let appSwiper = document.getElementById('appSwiper');
            const clientHeight = appSwiper.clientHeight || 0;
            console.log('clientHeight:', clientHeight);
            setHeightOfMove(clientHeight);
            // 在这里可以根据需要进行其他操作
        };

        // 监听窗口大小变化
        window.addEventListener('resize', handleResize);

        // 初始加载时执行一次
        handleResize();

        // 组件卸载时移除事件监听
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <section className={styles.swiperPage} id='appSwiper'>
            <Swiper
                direction={'vertical'}
                mousewheel={true}
                speed={1000}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination, Mousewheel]}
                height={heightMove}
            >
                {cardPage1()}
                {cardPage2()}
                {cardPage3()}
                {cardPage4()}
            </Swiper>
        </section>
    );
}

export default swiperPage;
