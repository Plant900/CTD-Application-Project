import { useRef } from 'react'
import emailjs from '@emailjs/browser'
import styles from './ZeroProductModal.module.css'

export const ZeroProductModal = ({ onClose, zeroBerry }) => {
  const form = useRef()

  const sendEmail = (e) => {
    e.preventDefault()

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log(result.text)
        },
        (error) => {
          console.log(error.text)
        }
      )
  }

  return (
    <div className={styles.modal}>
      <h2>{zeroBerry} stock has depleted to 0</h2>
      <form ref={form} onSubmit={sendEmail}>
        <label>Send to: </label>
        <input type="email" name="destination_email" />
        <label>Message</label>
        <textarea
          defaultValue={`${zeroBerry} has depleted to 0! Please restock this berry.`}
          name="message"
        />
        <input type="submit" value="Send" />
      </form>
      <button
        onClick={onClose}
        className={`${styles.modalButton} ${styles.closeButton}`}
      >
        Close
      </button>
    </div>
  )
}
