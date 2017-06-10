var keystone = require('keystone'),
    Types = keystone.Field.Types;

var HomeHighlight = new keystone.List('HomeHighlight', {
    label: 'O apartamento', singular: "O apartamento", plural: "O apartamentos"
});

HomeHighlight.add(
    {
        name: { type: Types.Text, initial: true, required: true, label: 'Nome' },
    },
    'Experiência inesquecível',
    {
        experience: {
            title: { type: Types.Text, initial: true, label: 'Título' },
            text: { type: Types.Html, wysiwyg: true, initial: true, label: 'Texto' },
        }
    },
    'O apartamento',
    {
        apartment: {
            title: { type: Types.Text, initial: true, label: 'Título' },
            text: { type: Types.Html, wysiwyg: true, initial: true, label: 'Texto' },
        }
    },
    'Localização',
    {
        language: { type: Types.Relationship, ref: 'Language', many: true, required: true, initial: true, label: 'Línguas' },
    }
);

HomeHighlight.defaultColumns = 'name, experience.title, apartment.title, language';

HomeHighlight.register();
