var keystone = require('keystone'),
    Types = keystone.Field.Types;

var HomeContact = new keystone.List('HomeContact', {
    label: 'Contactos', singular: "Contacto", plural: "Contactos",
});

HomeContact.add(
    'Detalhes',
    {
        name: { type: Types.Text, initial: true, required: true, label: 'Nome' },
        phone: { type: Types.Text, label: 'Telemóvel' },
        email: { type: Types.Email, label: 'E-mail' },
    },

    'Localização',
    {
        language: { type: Types.Relationship, ref: 'Language', many: true, required: true, initial: true, label: 'Línguas' },
    }
);

HomeContact.defaultColumns = 'name, phone, email, language';

HomeContact.register();
