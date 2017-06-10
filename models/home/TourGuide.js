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
        idioms: { type: Types.Relationship, ref: 'Language', many: true, label: 'Idiomas' },
    },

    'Localização',
    {
        language: { type: Types.Relationship, ref: 'Language', many: true, required: true, initial: true, label: 'Línguas' },
    }
);

HomeTourGuide.defaultColumns = 'name, text, idioms, contact1, contact2, language';

HomeTourGuide.register();
