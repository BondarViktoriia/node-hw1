const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./db/contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactList = await listContacts();
      console.table(contactList);
      break;

    case "get":
      const contact = await getContactById(id);
      if (!contact) {
        throw new Error(`Contact with id=${id} not found`);
      }
      console.log(contact);
      break;

    case "add":
      const addNewContact = await addContact(name, email, phone);
      console.log(addNewContact);
      break;

    case "remove":
      const removeContactById = await removeContact(id);
      console.log(removeContactById);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
