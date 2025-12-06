'use client';

import { useState, useEffect } from 'react';
import styles from './SocialProofPopup.module.css';

const NOTIFICATIONS = [
    { name: 'Ayşe Y.', location: 'Pendik', action: 'Protez Tırnak Randevusu Aldı', time: 'Az önce' },
    { name: 'Zeynep K.', location: 'Kartal', action: 'Nail Art Fiyat Bilgisi Sordu', time: '2 dakika önce' },
    { name: 'Elif M.', location: 'Maltepe', action: 'İpek Kirpik Randevusu Aldı', time: '5 dakika önce' },
    { name: 'Selin B.', location: 'Pendik', action: 'Kalıcı Oje Yaptırdı', time: '10 dakika önce' },
    { name: 'Merve T.', location: 'Kurtköy', action: 'Manikür Randevusu Aldı', time: 'Az önce' },
    { name: 'Gamze A.', location: 'Kartal', action: 'Jel Tırnak İçin Randevu Aldı', time: '15 dakika önce' },
    { name: 'Pınar S.', location: 'Pendik', action: 'Gelin Tırnağı Tasarımı Yaptırdı', time: '1 saat önce' },
    { name: 'Burcu D.', location: 'Maltepe', action: 'Pedikür Randevusu Aldı', time: '20 dakika önce' },
];

export default function SocialProofPopup() {
    const [visible, setVisible] = useState(false);
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        // İlk gösterim için bekleme
        const initialDelay = setTimeout(() => {
            showRandomNotification();
        }, 5000);

        // Döngüsel gösterim
        const interval = setInterval(() => {
            showRandomNotification();
        }, 20000 + Math.random() * 10000); // 20-30 saniye arası rastgele

        return () => {
            clearTimeout(initialDelay);
            clearInterval(interval);
        };
    }, []);

    const showRandomNotification = () => {
        const randomNotif = NOTIFICATIONS[Math.floor(Math.random() * NOTIFICATIONS.length)];
        setNotification(randomNotif);
        setVisible(true);

        // 5 saniye sonra gizle
        setTimeout(() => {
            setVisible(false);
        }, 5000);
    };

    if (!notification) return null;

    return (
        <div className={`${styles.popup} ${visible ? styles.visible : ''}`}>
            <div className={styles.icon}>💅</div>
            <div className={styles.content}>
                <p className={styles.message}>
                    <strong>{notification.name}</strong> ({notification.location})
                </p>
                <p className={styles.action}>{notification.action}</p>
                <p className={styles.time}>{notification.time}</p>
            </div>
        </div>
    );
}
