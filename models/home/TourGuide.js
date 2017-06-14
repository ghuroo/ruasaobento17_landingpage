var keystone = require('keystone'),
    Types = keystone.Field.Types;

var HomeTourGuide = new keystone.List('HomeTourGuide', {
    label: 'Guias', singular: "Guia", plural: "Guias",
});

HomeTourGuide.add(
    'Detalhes',
    {
        name: { type: Types.Text, initial: true, required: true, label: 'Nome' },
        text: { type: Types.Html, wysiwyg: true, label: 'Texto' },
        footnote: { type: Types.Text, initial: true, label: 'Nota' },
        idioms: { type: Types.Relationship, ref: 'Language', many: true, label: 'Idiomas' },
        logo: { type: Types.CloudinaryImage, initial: true, label: 'Logo' },
        readMore: { type: Types.Text, initial: true, label: 'Ler mais' },
    },
    
    'Contacto 1',
    {
        contact1: {
            active: { type: Types.Boolean, label: 'Mostrar?' },
            name: { type: Types.Text, label: 'Nome' },
            phone: { type: Types.Text, label: 'Telemóvel' },
            email: { type: Types.Email, label: 'E-mail' },
        },
    },

    'Contacto 2',
    {
        contact2: {
            active: { type: Types.Boolean, label: 'Mostrar?' },
            name: { type: Types.Text, label: 'Nome' },
            phone: { type: Types.Text, label: 'Telemóvel' },
            email: { type: Types.Email, label: 'E-mail' },
        },
    },

    'Localização',
    {
        language: { type: Types.Relationship, ref: 'Language', many: true, required: true, initial: true, label: 'Línguas' },
    }
);

HomeTourGuide.defaultColumns = 'name, text, idioms, contact1, contact2, language';

HomeTourGuide.register();
