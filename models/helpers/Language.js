var keystone = require('keystone'),
    Types = keystone.Field.Types;

var Language = new keystone.List('Language', {
    hidden: true,
});

Language.add({
    name: { type: Types.Text, initial: true, required: true },
    iso: { type: Types.Text, initial: true, required: true }
});

Language.register();
