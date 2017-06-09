var keystone = require('keystone'),
    Types = keystone.Field.Types;

var HomeTourGuide = new keystone.List('HomeTourGuide', {
    label: 'Guias para Roteiros', singular: "Guia para Roteiro", plural: "Guias para Roteiros"
});

HomeTourGuide.add(
    'Detalhes',
    {
        name: { type: Types.Text, initial: true, required: true, label: 'Nome' },
        text: { type: Types.Html, wysiwyg: true, initial: true, label: 'Texto' },
        idioms: { type: Types.Relationship, ref: 'Language', many: true, required: true, initial: true, label: 'Idiomas' },
        contact1: { type: Types.Text, initial: true, label: 'Contacto 1' },
        contact2: { type: Types.Text, initial: true, label: 'Contacto 2' },
    },
    'Localização',
    {
        language: { type: Types.Relationship, ref: 'Language', many: true, required: true, initial: true, label: 'Línguas' },
    }
);

HomeTourGuide.defaultColumns = 'name, text, idioms, contact1, contact2, language';

HomeTourGuide.register();
