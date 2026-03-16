import styles from './ContactSection.module.scss';

import { useState, useRef, type ChangeEvent, type FormEvent } from 'react';
import emailjs from '@emailjs/browser';

import { useTranslation } from 'react-i18next';

interface ContactData {
  name: string;
  email: string;
  message: string;
  _honey: string; // The Honeypot field
}

export default function ContactSection() {
  const { t } = useTranslation();

  const form = useRef<HTMLFormElement>(null);

  const [status, setStatus] = useState<string>('');
  const [formData, setFormData] = useState<ContactData>({
    name: '',
    email: '',
    message: '',
    _honey: '' 
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Honeypot check
    if (formData._honey) {
      console.warn("Bot detected.");
      setStatus(t("contact.success")); 
      return;
    }

    if (!form.current) return;

    setStatus(t('contact.sending'));

    emailjs.sendForm(
      'service_57vrrtb', 
      'template_lmjjqpv', 
      form.current, 
      'YkglMNSzDoUkOmfpv'
    )
    .then(() => {
        setStatus(t("contact.success"));
        setFormData({ name: '', email: '', message: '', _honey: '' });
    })
    .catch((error) => {
        console.error('EmailJS Error:', error);
        setStatus(t("contact.fail"));
    });
  };

  return (
    <div className={styles["contact"]}>
      <form ref={form} onSubmit={sendEmail} className={styles.form}>
        
        {/* HONEYPOT - Hidden from users */}
        <div style={{ display: 'none' }} aria-hidden="true">
          <input 
            type="text" 
            name="_honey" 
            value={formData._honey} 
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className={styles.field}>
          <label>{t("contact.name")}</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className={styles.field}>
          <label>{t("contact.mail")}</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className={styles.field}>
          <label>{t("contact.message")}</label>
          <textarea name="message" value={formData.message} onChange={handleChange} required />
        </div>

        <button type="submit">{t("contact.send")}</button>
        
        {status && <p className={styles.status}>{status}</p>}
      </form>
    </div>
  );
}