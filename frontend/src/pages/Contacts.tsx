import ContactForm from '../components/ContactForm.tsx';
import MyContacts from '../components/MyContacts.tsx';




const ContactsPage = () => {

    return (
        <div className='flex justify-around my-36'>
            <ContactForm />
            <MyContacts />
        </div>
    );
};

export default ContactsPage;
