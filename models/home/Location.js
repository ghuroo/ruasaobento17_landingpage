var keystone = require('keystone'),
    Types = keystone.Field.Types;

var HomeLocation = new keystone.List('HomeLocation', {
    label: 'Localização', singular: "Localização", plural: "Localizaçãos"
});

HomeLocation.add(
    'Detalhes',
    {
        name: { type: Types.Text, initial: true, required: true, label: 'Título' },
        text: { type: Types.Html, wysiwyg: true, initial: true, label: 'Texto' },
        image: { type: Types.CloudinaryImage, initial: true, label: 'Mapa' },
    },
    'Localização',
    {
        language: { type: Types.Relationship, ref: 'Language', many: true, required: true, initial: true, label: 'Línguas' },
    }
);

HomeLocation.defaultColumns = 'name, text, image, language';

HomeLocation.register();
