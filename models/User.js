var keystone = require('keystone'),
    Types = keystone.Field.Types;

var User = new keystone.List('User', {
    label: 'Utilizadores', singular: 'Utilizador', plural: 'Utilizadores',
    
    autokey: { path: 'slug', from: 'email', unique: true },
    track: true
});

User.add({
    name: { type: Types.Name, initial: true, required: true, hidden: false, label: 'Nome' },
    email: { type: Types.Email, initial: true, required: true, hidden: false, unique: true, label: 'E-Mail' },
    password: { type: Types.Password, initial: true, required: true, label: 'Palavra-passe' },
    isAdmin: { type: Types.Boolean, initial: false, required: false, default: false, label: 'Administrador' }
});

// virtual schema
User.schema.virtual('canAccessKeystone').get(function () {
	if (this.isAdmin) return true;
});

// ui columns
User.defaultColumns = 'name, email, createdAt';

User.register();
