var keystone = require('keystone'),
    Types = keystone.Field.Types;

var HomeTour = new keystone.List('HomeTour', {
    label: 'Roteiros', singular: "Roteiro", plural: "Roteiros",

    map: { name: 'title' }
});

HomeTour.add(
    'Detalhes',
    {
        title: { type: Types.Text, initial: true, required: true, label: 'Título' },
        subTitle: { type: Types.Text, initial: true, required: true, label: 'Sub-título' },
        text: { type: Types.Html, wysiwyg: true, label: 'Texto' },
    },

    'Localização',
    {
        language: { type: Types.Relationship, ref: 'Language', many: true, required: true, initial: true, label: 'Línguas' },
    }
);

HomeTour.defaultColumns = 'title, subTitle, text, language';

HomeTour.register();
