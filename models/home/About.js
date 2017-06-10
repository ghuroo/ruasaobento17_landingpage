var keystone = require('keystone'),
    Types = keystone.Field.Types;

var HomeAbout = new keystone.List('HomeAbout', {
    label: 'Fernando Pessoa', singular: "Fernando Pessoa", plural: "Fernando Pessoa"
});

HomeAbout.add(
    'Detalhes',
    {
        name: { type: Types.Text, initial: true, required: true, label: 'Título' },
        text: { type: Types.Html, wysiwyg: true, initial: true, label: 'Texto' },
        images: { type: Types.CloudinaryImages, initial: true, label: 'Imagens' },
    },
    
    'Pesquisador 1',
    {
        researcher1: {
            active: { type: Types.Boolean, label: 'Mostrar?' },
            name: { type: Types.Text, dependsOn: { 'researcher1.active': true }, label: 'Nome' },
            title: { type: Types.Text, dependsOn: { 'researcher1.active': true }, label: 'Título' },
            text: { type: Types.Html, dependsOn: { 'researcher1.active': true }, wysiwyg: true, label: 'Texto' },
        },
    },
    'Pesquisador 2',
    {
        researcher2: {
            active: { type: Types.Boolean, label: 'Mostrar?' },
            name: { type: Types.Text, dependsOn: { 'researcher2.active': true }, label: 'Nome' },
            title: { type: Types.Text, dependsOn: { 'researcher2.active': true }, label: 'Título' },
            text: { type: Types.Html, dependsOn: { 'researcher2.active': true }, wysiwyg: true, label: 'Texto' },
        }
    },

    'Artigo 1',
    {
        article1: {
            name: { type: Types.Text, initial: true, required: true, label: 'Título' },
            ficheiro: { type: Types.Url, initial: true, label: 'Url para ficheiro' }
        },
    },
    'Artigo 2',
    {
        article2: {
            name: { type: Types.Text, initial: true, required: true, label: 'Título' },
            ficheiro: { type: Types.Url, initial: true, label: 'Url para ficheiro' }
        }
    },

    'Localização',
    {
        language: { type: Types.Relationship, ref: 'Language', many: true, required: true, initial: true, label: 'Línguas' },
    }
);

HomeAbout.defaultColumns = 'name, text, language';

HomeAbout.register();
