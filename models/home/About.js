var keystone = require('keystone'),
    Types = keystone.Field.Types;

var HomeAbout = new keystone.List('HomeAbout', {
    label: 'O Apartamento', singular: "O Apartamento", plural: "Os Apartamentos"
});

HomeAbout.add(
    'Detalhes',
    {
        name: { type: Types.Text, initial: true, required: true, label: 'Título' },
        text: { type: Types.Html, wysiwyg: true, initial: true, label: 'Texto' },
        images: { type: Types.CloudinaryImages, initial: true, label: 'Imagens' },
    },
    'O Apartamento',
    {
        language: { type: Types.Relationship, ref: 'Language', many: true, required: true, initial: true, label: 'Línguas' },
    }
);

HomeAbout.defaultColumns = 'name, text, language';

HomeAbout.register();
