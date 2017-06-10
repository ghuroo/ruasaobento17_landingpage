var keystone = require('keystone'),
    Types = keystone.Field.Types;

var Page = new keystone.List('Page', {
    label: 'Páginas', singular: 'Página', plural: 'Páginas',

    autokey: { path: 'slug', from: 'parent child language.iso', unique: true, index: true },
    
    nocreate: true,
    nodelete: true,
});

Page.add(
    'Details',
    {
        name: { type: Types.Text, required: true, initial: true, label: 'Título' },
        url: { type: Types.Text, required: true, initial: true, label: 'Url' }
    },
    'Hierarchy',
    {
        parent: { type: Types.Text, initial: true, required: true, noedit: true },
        child: { type: Types.Text, initial: true, collapse: true, noedit: true }
    },
    'Language',
    {
        language: { type: Types.Relationship, ref: 'Language', required: true, initial: true, label: 'Língua' },
    }
);

// ui columns
Page.defaultColumns = 'name, language';

Page.register();
