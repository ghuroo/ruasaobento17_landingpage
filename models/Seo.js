var keystone = require('keystone'),
    Types = keystone.Field.Types;

var Seo = new keystone.List('Seo', {
    label: 'SEO', singular: "SEO", plural: "SEO",
    
    nodelete: true,

    map: { name: 'title' }
});

Seo.add(
    {
        title: { type: Types.Text, initial: true, required: true, label: 'Título do Website' },
        description: { type: Types.Text, initial: true, label: 'Descrição' },
        keywords: { type: Types.Text, initial: true, label: 'Palavras-chave', note: 'Palavras-chave: separar as palavras por vírgulas "," Exemplo: palavra1,palavra2,palavra3' },
        image: { type: Types.CloudinaryImage, initial: true, label: 'Imagem', note: 'De preferência com formato quadrado' },
    },
    'Localização',
    {
        language: { type: Types.Relationship, ref: 'Language', many: true, required: true, initial: true, label: 'Línguas' },
    }
);

Seo.defaultColumns ='title, description, keywords, image, language';

Seo.register();
