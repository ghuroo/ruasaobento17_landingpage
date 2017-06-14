var keystone = require('keystone'),
    Types = keystone.Field.Types;

var HomeArticle = new keystone.List('HomeArticle', {
    label: 'Notícias', singular: "Notícia", plural: "Notícias",

    map: { name: 'title' }
});

HomeArticle.add(
    'Detalhes',
    {
        title: { type: Types.Text, initial: true, required: true, label: 'Título' },
        text: { type: Types.Text, initial: true, label: 'Texto' },
        file: { type: Types.Url, initial: true, label: 'Idiomas' },
    },

    'Localização',
    {
        language: { type: Types.Relationship, ref: 'Language', many: true, required: true, initial: true, label: 'Línguas' },
    }
);

HomeArticle.defaultColumns = 'title, text, url, language';

HomeArticle.register();