import { validationResult } from 'express-validator';
import ContactMessage from '../models/contactSchema.js'



export const sendContactMessage = async (req, res) => {

    try {
        const errors = validationResult(req)
        
        if (!errors.isEmpty()){
            return res.status(400).json({
                message: "Проблема с введенными данными.",
                errors: errors.array()
            })
        }

        const { 
            name, 
            surname,
            age, 
            email, 
            telegram, 
            title, 
            message 
        } = req.body;

        const newContactMessage = new ContactMessage({
            name,
            surname,
            age,
            email,
            telegram,
            title,
            message
        });

        await newContactMessage.save();

        res.status(201).json(newContactMessage)


    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const getAllContactsMessage = async (req, res) => {

    try {

        const contacts = await ContactMessage.find();
        if (!contacts) {
            return res.status(404).json({ message: "Контакты не найдены" });
        }

        res.status(200).json(contacts);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const deleteContactMessage = async (req, res) => {

    try {

        const { id } = req.params;
        const contact = ContactMessage.findById(id);
        if (!contact) {
            return res.status(404).json({ message: 'Контактное сообщение не найдено' });
        }
        await contact.deleteOne();

    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}

export const getContactMessageById = async (req, res) => {

    try {

        const { id } = req.params;
        const contact = await ContactMessage.findById(id);
        if (!contact) {
            return res.status(404).json({ message: 'Контактное сообщение не найдено' });
        }
        res.status(200).json(contact);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const deleteALLContactMessage = async (req, res) => {

    try {

        await ContactMessage.deleteMany({});
        res.status(200).json({ message: 'Контактные сообщения удалены' });


    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};