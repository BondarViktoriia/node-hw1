const fs = require("fs").promises;
const path = require("path");

const { v4 } = require("uuid");


const contactsPath = path.join(__dirname,"contacts.json")

async function listContacts () {
  const data = await fs.readFile(contactsPath);
  const list = JSON.parse(data)
  return list;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contactById = contacts.find(contact =>contact.id === contactId);
 if(!contactById){
  return null;
 }
  return contactById;
}

async function removeContact(contactId) {
 const list  = await listContacts();
 const idx = list.findIndex(item=>item.id === contactId);
 if(idx === -1){
  return null;
 }
const newContactList = list.filter((_,index)=>index !== idx)
 await fs.writeFile(contactsPath, JSON.stringify(newContactList));
return list[idx];
}

 async function addContact(name, email, phone) {
  const list = await listContacts();
  const newContact = {id:v4(),name,email,phone}
  list.push(newContact);
  await fs.writeFile(contactsPath,JSON.stringify(list));
  return newContact;
}

module.exports={
 listContacts,
  getContactById,
  removeContact,
  addContact
}