var keystone = require('keystone'),
    Types = keystone.Field.Types;

var HomeManuscript = new keystone.List('HomeManuscript', {
    label: 'Manuscritos', singular: "Manuscrito", plural: "Manuscritos",
});

HomeManuscript.add(
    // 'Detalhes',
    {
        name: { type: Types.Text, initial: true, required: true, label: 'Título' },
    },
    'Capas',
    {
        covers: {
            front: { type: Types.CloudinaryImage, initial: true, label: 'Frente' },
            back: { type: Types.CloudinaryImage, initial: true, label: 'Trás' },
        },
    },
    'Páginas',
    {
        pages: { type: Types.CloudinaryImages, initial: true, label: 'Páginas' },
    },
    'Localização',
    {
        language: { type: Types.Relationship, ref: 'Language', many: true, required: true, initial: true, label: 'Línguas' },
    }
);

HomeManuscript.defaultColumns = 'name, covers.front, covers.back, pages, language';

HomeManuscript.register();
