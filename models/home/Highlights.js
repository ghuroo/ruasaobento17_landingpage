var keystone = require('keystone'),
    Types = keystone.Field.Types;

var HomeHighlights = new keystone.List('HomeHighlights', {
    label: 'Destaque', singular: "Destaque", plural: "Destaques"
});

HomeHighlights.add(
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

HomeHighlights.defaultColumns = 'name, experience.title, apartment.title, language';

HomeHighlights.register();
