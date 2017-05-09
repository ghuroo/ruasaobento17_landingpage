var keystone = require('keystone'),
    Types = keystone.Field.Types;

var Page = new keystone.List('Page', {
    autokey: { path: 'slug', from: 'parent child language', unique: true, index: true },
    
    nodelete: true,
});

Page.add(
    'Details',
    {
        name: { type: Types.Text, required: true, initial: true },
        url: { type: Types.Text, required: true, initial: true }
    },
    'Hierarchy',
    {
        parent: { type: Types.Text, initial: true, required: true },
        child: { type: Types.Text, initial: true, collapse: true }
    },
    'Language',
    {
        language: { type: Types.Relationship, ref: 'Language', required: true, initial: true },
    }
);

// ui columns
Page.defaultColumns = 'name, parent, child, language';

Page.register();
