'use client';

import { useState } from 'react';
import { SERVICES, BRAND_INFO } from '@/lib/constants';
import styles from './AppointmentModal.module.css';

export default function AppointmentModal({ isOpen, onClose }) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        service: '',
        date: '',
        time: '',
        name: '',
        phone: '',
    });

    // Saat seçenekleri (09:00 - 19:00)
    const timeOptions = [];
    for (let hour = 9; hour <= 19; hour++) {
        timeOptions.push(`${hour.toString().padStart(2, '0')}:00`);
        if (hour < 19) {
            timeOptions.push(`${hour.toString().padStart(2, '0')}:30`);
        }
    }

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleNext = () => {
        if (step < 3) setStep(step + 1);
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleSubmit = () => {
        // WhatsApp mesaj formatı
        const selectedService = SERVICES.find(s => s.slug === formData.service);
        const serviceName = selectedService ? selectedService.title : formData.service;

        const message = `Randevu Talebi

Hizmet: ${serviceName}
Tarih: ${formData.date}
Saat: ${formData.time}
Ad Soyad: ${formData.name}
Telefon: ${formData.phone}`;

        const whatsappUrl = `https://wa.me/${BRAND_INFO.phone.replace(/\s/g, '')}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');

        // Modal'ı kapat ve formu sıfırla
        onClose();
        setStep(1);
        setFormData({
            service: '',
            date: '',
            time: '',
            name: '',
            phone: '',
        });
    };

    const isStep1Valid = formData.service && formData.date && formData.time;
    const isStep2Valid = formData.name && formData.phone;

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>×</button>

                {/* Progress Indicator */}
                <div className={styles.progressBar}>
                    <div className={`${styles.progressStep} ${step >= 1 ? styles.active : ''}`}>1</div>
                    <div className={`${styles.progressLine} ${step >= 2 ? styles.active : ''}`}></div>
                    <div className={`${styles.progressStep} ${step >= 2 ? styles.active : ''}`}>2</div>
                    <div className={`${styles.progressLine} ${step >= 3 ? styles.active : ''}`}></div>
                    <div className={`${styles.progressStep} ${step >= 3 ? styles.active : ''}`}>3</div>
                </div>

                <h2 className={styles.title}>Online Randevu Al</h2>

                {/* Step 1: Service, Date, Time */}
                {step === 1 && (
                    <div className={styles.stepContent}>
                        <h3 className={styles.stepTitle}>Hizmet ve Tarih Seçin</h3>

                        <div className={styles.formGroup}>
                            <label>Hizmet</label>
                            <select
                                value={formData.service}
                                onChange={(e) => handleInputChange('service', e.target.value)}
                                className={styles.select}
                            >
                                <option value="">Hizmet Seçin</option>
                                {SERVICES.map((service) => (
                                    <option key={service.slug} value={service.slug}>
                                        {service.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Tarih</label>
                            <input
                                type="date"
                                value={formData.date}
                                onChange={(e) => handleInputChange('date', e.target.value)}
                                min={new Date().toISOString().split('T')[0]}
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Saat (09:00 - 19:00)</label>
                            <select
                                value={formData.time}
                                onChange={(e) => handleInputChange('time', e.target.value)}
                                className={styles.select}
                            >
                                <option value="">Saat Seçin</option>
                                {timeOptions.map((time) => (
                                    <option key={time} value={time}>
                                        {time}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            className={styles.nextButton}
                            onClick={handleNext}
                            disabled={!isStep1Valid}
                        >
                            İleri
                        </button>
                    </div>
                )}

                {/* Step 2: Contact Info */}
                {step === 2 && (
                    <div className={styles.stepContent}>
                        <h3 className={styles.stepTitle}>İletişim Bilgileri</h3>

                        <div className={styles.formGroup}>
                            <label>Ad Soyad</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                placeholder="Adınız ve soyadınız"
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Telefon</label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                placeholder="05XX XXX XX XX"
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.buttonGroup}>
                            <button className={styles.backButton} onClick={handleBack}>
                                Geri
                            </button>
                            <button
                                className={styles.nextButton}
                                onClick={handleNext}
                                disabled={!isStep2Valid}
                            >
                                İleri
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 3: Summary */}
                {step === 3 && (
                    <div className={styles.stepContent}>
                        <h3 className={styles.stepTitle}>Randevu Özeti</h3>

                        <div className={styles.summary}>
                            <div className={styles.summaryItem}>
                                <strong>Hizmet:</strong>
                                <span>{SERVICES.find(s => s.slug === formData.service)?.title}</span>
                            </div>
                            <div className={styles.summaryItem}>
                                <strong>Tarih:</strong>
                                <span>{formData.date}</span>
                            </div>
                            <div className={styles.summaryItem}>
                                <strong>Saat:</strong>
                                <span>{formData.time}</span>
                            </div>
                            <div className={styles.summaryItem}>
                                <strong>Ad Soyad:</strong>
                                <span>{formData.name}</span>
                            </div>
                            <div className={styles.summaryItem}>
                                <strong>Telefon:</strong>
                                <span>{formData.phone}</span>
                            </div>
                        </div>

                        <p className={styles.note}>
                            "Oluştur" butonuna tıkladığınızda WhatsApp üzerinden randevu talebiniz gönderilecektir.
                        </p>

                        <div className={styles.buttonGroup}>
                            <button className={styles.backButton} onClick={handleBack}>
                                Geri
                            </button>
                            <button className={styles.submitButton} onClick={handleSubmit}>
                                Oluştur
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
