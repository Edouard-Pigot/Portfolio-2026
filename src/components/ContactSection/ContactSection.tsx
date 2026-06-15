import Button from '@components/Button/Button';

import { useState, useRef, type ChangeEvent, type FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { useTranslation } from 'react-i18next';

import styles from './ContactSection.module.scss';

interface ContactData {
  name: string;
  email: string;
  message: string;
  _honey: string; // The Honeypot field
}

export default function ContactSection() {
  const { t } = useTranslation();

  const form = useRef<HTMLFormElement>(null);
  const submitButton = useRef<HTMLButtonElement>(null);

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

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Honeypot check
    if (formData._honey) {
      console.warn("Bot detected.");
      setStatus("contact.success"); 
      return;
    }

    if (!form.current) return;

    setStatus("contact.sending");

    emailjs.sendForm(
      'service_57vrrtb', 
      'template_lmjjqpv', 
      form.current, 
      'YkglMNSzDoUkOmfpv'
    )
    .then(() => {
        setStatus("contact.success");
        setFormData({ name: '', email: '', message: '', _honey: '' });
    })
    .catch((error) => {
        console.error('EmailJS Error:', error);
        setStatus("contact.fail");
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
          <label htmlFor="name">{t("contact.name")}</label>
          <input type="text" name="name" id="name" autoComplete="name" value={formData.name} onChange={handleChange} placeholder={t("contact.nameExample")} required />
        </div>

        <div className={styles.field}>
          <label htmlFor="email">{t("contact.mail")}</label>
          <input type="email" name="email" id="email" autoComplete="email" value={formData.email} onChange={handleChange} placeholder={t("contact.mailExample")} required />
        </div>

        <div className={styles.field}>
          <label htmlFor="message">{t("contact.message")}</label>
          <textarea name="message" id="message" autoComplete="off" value={formData.message} onChange={handleChange} placeholder={t("contact.messageExample")} required />
        </div>

        <Button type="submit" ref={submitButton} disabled={formData.name === '' || !isValidEmail(formData.email) || formData.message === ''}>
          <p>{t("contact.send")}</p>
        </Button>
        
        {status && <p className={styles.status}>{t(status)}</p>}
      </form>

      <div className={styles.links}>
        <Button>
          <a href={`${import.meta.env.BASE_URL}${t("contact.resume_link")}`} download={t("contact.resume_name")} target="_blank" rel="noopener noreferrer">
            <p>{t("contact.resume")}</p>
            <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="24px">
              <path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/>
            </svg>
          </a>
        </Button>
        <Button>
          <a href='https://www.linkedin.com/in/edouard-pigot/' target="_blank" rel="noopener noreferrer">
            <p>LinkedIn</p>
            <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="24px">
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"/>
            </svg>
          </a>
        </Button>
      </div>
    </div>
  );
}